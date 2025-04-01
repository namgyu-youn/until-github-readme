import axios from "axios";
import { Article, UntilApiResponse } from "../types/blog";

/**
 * Until 블로그 서비스 클래스
 * 블로그 포스트를 가져오는 기능을 제공합니다.
 */
export class BlogService {
  /**
   * 최신 블로그 포스트를 가져옵니다.
   * @param limit 가져올 포스트 수 (기본값: 5)
   * @returns 블로그 포스트 배열
   */
  public async getLatestArticles(limit: number): Promise<Article[]> {
    // TODO: 가짜 api 호출하는 코드 추가 필요

    try {
      const response = await axios.get<UntilApiResponse>(
        `https://api2.until.blog/blog/octoping/articles?pageSize=${limit}`
      );

      return response.data.articles;
    } catch (error) {
      console.error("블로그 포스트를 가져오는 중 오류 발생:", error);
      throw new Error("블로그 포스트를 가져오는 중 오류가 발생했습니다.");
    }
  }
}
