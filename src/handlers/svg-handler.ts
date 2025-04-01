import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { BlogService } from "../services/blog-service";
import { SvgService } from "../services/svg-service";
import { SvgOptions } from "../types/blog";

/**
 * 블로그 포스트를 SVG 이미지로 변환하여 반환하는 핸들러
 */
export const generateSvg = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const query = event.queryStringParameters || {};

    // 쿼리 파라미터에서 옵션을 가져옵니다.
    const svgOptions: SvgOptions = {
      title: query.title,
      maxPosts: query.max ? parseInt(query.max) : 5,
      theme:
        query.theme === "dark" || query.theme === "light"
          ? query.theme
          : "light",
      customCss: query.css,
    };

    // 환경 변수에서 API URL을 가져옵니다. 없으면 mock을 사용합니다.
    const apiUrl = process.env.UNTIL_API_URL || "mock";
    const blogService = new BlogService(apiUrl);
    const svgService = new SvgService();

    // 블로그 포스트를 가져옵니다.
    const posts = await blogService.getLatestPosts(svgOptions.maxPosts || 5);

    // SVG를 생성합니다.
    const svgContent = svgService.generatePostsSvg(posts, svgOptions);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Cache-Control": "public, max-age=3600", // 1시간 캐싱
      },
      body: svgContent,
    };
  } catch (error) {
    console.error("SVG 생성 중 오류 발생:", error);

    // 오류 발생 시 간단한 오류 SVG를 반환합니다.
    const errorSvg = `
      <svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="100" fill="#f8d7da" rx="8" ry="8" />
        <text x="20" y="45" font-family="Arial" font-size="14" fill="#721c24">
          블로그 포스트를 불러오는 중 오류가 발생했습니다.
        </text>
        <text x="20" y="70" font-family="Arial" font-size="12" fill="#721c24">
          잠시 후 다시 시도해 주세요.
        </text>
      </svg>
    `;

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "image/svg+xml",
        "Access-Control-Allow-Origin": "*",
      },
      body: errorSvg.trim().replace(/\s+/g, " "),
    };
  }
};
