/**
 * Until 블로그 포스트의 데이터 인터페이스
 */
export interface BlogPost {
  /** 포스트 ID */
  id: string;
  /** 포스트 제목 */
  title: string;
  /** 포스트 내용 요약 */
  summary?: string;
  /** 포스트 URL */
  url: string;
  /** 포스트 작성일 */
  publishedAt: string;
  /** 포스트 작성자 */
  author?: {
    /** 작성자 이름 */
    name: string;
    /** 작성자 이미지 URL */
    imageUrl?: string;
  };
  /** 포스트 태그 */
  tags?: string[];
}

/**
 * Until API 응답 타입
 */
export interface UntilApiResponse {
  /** 포스트 목록 */
  posts: BlogPost[];
  /** 다음 페이지 토큰 */
  nextPageToken?: string;
}

/**
 * SVG 생성에 필요한 구성 옵션
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
