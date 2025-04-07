import { UntilApiResponse } from "../types/blog";
import { Article } from "../model/Article";

export interface BlogService {
  /**
   * 최신 블로그 포스트를 가져옵니다.
   * @param username 블로그 유저네임
   * @param limit 가져올 포스트 수
   */
  getLatestArticles(username: string, limit: number): Promise<Article[]>;
}

export class UntilBlogService implements BlogService {
  async getLatestArticles(username: string, limit: number): Promise<Article[]> {
    try {
      const response = await fetch(`https://api2.until.blog/blog/${username}/articles?pageSize=${limit}`);
      const data: UntilApiResponse = await response.json();

      return data.articles.map((article) => Article.fromResponse(article));
    } catch (error) {
      console.error("블로그 포스트를 가져오는 중 오류 발생:", error);
      throw new Error("블로그 포스트를 가져오는 중 오류가 발생했습니다.");
    }
  }
}
