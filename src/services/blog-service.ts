import axios from "axios";
import { BlogPost, UntilApiResponse } from "../types/blog";

/**
 * Until 블로그 서비스 클래스
 * 블로그 포스트를 가져오는 기능을 제공합니다.
 */
export class BlogService {
  private readonly apiUrl: string;

  /**
   * BlogService 생성자
   * @param apiUrl Until API URL
   */
  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || process.env.UNTIL_API_URL || "";

    if (!this.apiUrl) {
      throw new Error("UNTIL_API_URL 환경 변수가 설정되지 않았습니다.");
    }
  }

  /**
   * 최신 블로그 포스트를 가져옵니다.
   * @param limit 가져올 포스트 수 (기본값: 5)
   * @returns 블로그 포스트 배열
   */
  public async getLatestPosts(limit: number = 5): Promise<BlogPost[]> {
    try {
      // 실제 API가 없으므로 임시 데이터를 반환합니다.
      // 실제 구현에서는 이 부분을 Until API 호출로 대체해야 합니다.
      if (this.apiUrl === "mock") {
        return this.getMockPosts(limit);
      }

      const response = await axios.get<UntilApiResponse>(
        `${this.apiUrl}/posts`,
        {
          params: {
            limit,
            sort: "publishedAt:desc",
          },
        }
      );

      return response.data.posts;
    } catch (error) {
      console.error("블로그 포스트를 가져오는 중 오류 발생:", error);
      // 오류 발생 시 빈 배열을 반환하지 말고 예외를 던집니다.
      throw new Error("블로그 포스트를 가져오는 중 오류가 발생했습니다.");
    }
  }

  /**
   * 테스트용 목업 데이터를 반환합니다.
   * @param limit 가져올 포스트 수
   * @returns 목업 블로그 포스트 배열
   */
  private getMockPosts(limit: number): BlogPost[] {
    const mockPosts: BlogPost[] = [
      {
        id: "1",
        title: "TypeScript와 함께하는 함수형 프로그래밍",
        summary:
          "TypeScript에서 함수형 프로그래밍 패러다임을 적용하는 방법에 대해 알아봅니다.",
        url: "https://until.blog/posts/functional-programming-with-typescript",
        publishedAt: "2023-04-01T00:00:00Z",
        author: {
          name: "홍길동",
          imageUrl: "https://until.blog/images/profile/hong.jpg",
        },
        tags: ["TypeScript", "함수형 프로그래밍", "개발"],
      },
      {
        id: "2",
        title: "React Query로 상태 관리 최적화하기",
        summary:
          "React Query를 사용하여 서버 상태 관리를 효율적으로 구현하는 방법을 소개합니다.",
        url: "https://until.blog/posts/optimizing-state-management-with-react-query",
        publishedAt: "2023-03-28T00:00:00Z",
        author: {
          name: "김철수",
          imageUrl: "https://until.blog/images/profile/kim.jpg",
        },
        tags: ["React", "React Query", "상태 관리"],
      },
      {
        id: "3",
        title: "Next.js 13의 새로운 기능 총정리",
        summary:
          "Next.js 13 버전에서 추가된 새로운 기능들을 살펴보고 실제 프로젝트에 적용하는 방법을 알아봅니다.",
        url: "https://until.blog/posts/next-js-13-features",
        publishedAt: "2023-03-25T00:00:00Z",
        author: {
          name: "이영희",
          imageUrl: "https://until.blog/images/profile/lee.jpg",
        },
        tags: ["Next.js", "React", "웹 개발"],
      },
      {
        id: "4",
        title: "AWS Lambda와 TypeScript를 활용한 서버리스 아키텍처",
        summary:
          "AWS Lambda와 TypeScript를 사용하여 확장 가능한 서버리스 아키텍처를 구축하는 방법을 설명합니다.",
        url: "https://until.blog/posts/serverless-architecture-with-aws-lambda-and-typescript",
        publishedAt: "2023-03-20T00:00:00Z",
        author: {
          name: "박지민",
          imageUrl: "https://until.blog/images/profile/park.jpg",
        },
        tags: ["AWS", "Lambda", "TypeScript", "서버리스"],
      },
      {
        id: "5",
        title: "효과적인 Git 브랜치 전략",
        summary:
          "다양한 Git 브랜치 전략을 비교하고 프로젝트에 맞는 전략을 선택하는 방법을 알아봅니다.",
        url: "https://until.blog/posts/effective-git-branch-strategies",
        publishedAt: "2023-03-15T00:00:00Z",
        author: {
          name: "정민수",
          imageUrl: "https://until.blog/images/profile/jung.jpg",
        },
        tags: ["Git", "개발 프로세스", "협업"],
      },
      {
        id: "6",
        title: "Docker와 Kubernetes로 마이크로서비스 운영하기",
        summary:
          "Docker와 Kubernetes를 활용하여 마이크로서비스 아키텍처를 구축하고 운영하는 방법을 소개합니다.",
        url: "https://until.blog/posts/microservices-with-docker-and-kubernetes",
        publishedAt: "2023-03-10T00:00:00Z",
        author: {
          name: "최영준",
          imageUrl: "https://until.blog/images/profile/choi.jpg",
        },
        tags: ["Docker", "Kubernetes", "마이크로서비스"],
      },
    ];

    return mockPosts.slice(0, limit);
  }
}
