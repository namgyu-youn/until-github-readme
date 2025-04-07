import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { BlogService, UntilBlogService } from "../services/blog-service";
import { RecentArticlesBadge } from "../model/svg/RecentArticlesBadge";

const BLOG_ARTICLE_SHOW_COUNT = 4;

const blogService: BlogService = new UntilBlogService();

export const generateSvg = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { username } = event.queryStringParameters ?? {};

  if (!username) {
    return {
      statusCode: 400,
      body: "username is required",
    };
  }

  try {
    const articles = await blogService.getLatestArticles(username, BLOG_ARTICLE_SHOW_COUNT);

    const recentArticlesBadge = RecentArticlesBadge.from(articles);
    const svgContent = await recentArticlesBadge.getSvg();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-cache",
        // "Cache-Control": "public, max-age=3600",
      },
      body: svgContent,
    };
  } catch (error) {
    console.error("SVG 생성 중 오류 발생:", error);
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
