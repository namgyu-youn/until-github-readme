import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { BlogService } from "../services/blog-service";

/**
 * 최신 블로그 포스트를 JSON 형태로 반환하는 핸들러
 */
export const getBlogPosts = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.queryStringParameters || {};
    const limit = query.limit ? parseInt(query.limit) : 5;

    // 환경 변수에서 API URL을 가져옵니다. 없으면 mock을 사용합니다.
    const apiUrl = process.env.UNTIL_API_URL || "mock";
    const blogService = new BlogService(apiUrl);

    const posts = await blogService.getLatestPosts(limit);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Cache-Control": "public, max-age=300", // 5분 캐싱
      },
      body: JSON.stringify({ posts }),
    };
  } catch (error) {
    console.error("블로그 포스트 조회 중 오류 발생:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "블로그 포스트를 가져오는 중 오류가 발생했습니다.",
      }),
    };
  }
};
