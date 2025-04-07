export interface UntilApiResponse {
  count: number;
  articles: ArticleResponse[];
  hasMore: boolean;
}

export interface ArticleResponse {
  articleId: number;
  title: string;
  summary: string;
  urlSlug: string;
  thumbnailUrl: string | null;
  /**
   * 그룹 블로그의 경우, 작성하는 유저의 정보 (author)와 글이 게시되는 블로그 (blog)가 다를 수 있음
   * 이를 위해 작성자 정보와 게시 블로그 정보를 분리하여 반환
   */
  author: {
    profileName: string;
    username: string;
    profileImgUrl: string | null;
  };
  blog: {
    profileName: string;
    username: string;
    profileImgUrl: string | null;
  };
  tags: { name: string; slug: string }[];
  minRead: number;
  createdAt: string;
}

/**
 * SVG 생성에 필요한 구성 옵션
 * TODO: 구현 필요
 */
export interface SvgOptions {
  /** 제목 */
  title?: string;
  /** 최대 표시할 포스트 수 */
  maxPosts?: number;
  /** 테마 (light/dark) */
  theme?: "light" | "dark";
  /** 사용자 정의 CSS */
  customCss?: string;
}
