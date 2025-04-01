import { BlogPost, SvgOptions } from "../types/blog";

/**
 * SVG 생성 서비스
 * 블로그 포스트 데이터를 기반으로 SVG 이미지를 생성합니다.
 */
export class SvgService {
  /**
   * 블로그 포스트 목록을 SVG로 변환합니다.
   * @param posts 블로그 포스트 배열
   * @param options SVG 생성 옵션
   * @returns SVG 문자열
   */
  public generatePostsSvg(posts: BlogPost[], options: SvgOptions = {}): string {
    const {
      title = "Until 블로그 최신 글",
      maxPosts = 5,
      theme = "light",
    } = options;

    // 테마에 따른 색상 설정
    const colors = this.getThemeColors(theme);

    // 최대 표시할 포스트 수로 제한
    const limitedPosts = posts.slice(0, maxPosts);

    // SVG 높이 계산 (헤더 + 포스트 * 포스트당 높이 + 푸터)
    const headerHeight = 60;
    const postHeight = 100;
    const footerHeight = 40;
    const totalHeight =
      headerHeight + limitedPosts.length * postHeight + footerHeight;

    // SVG 내용 생성
    let svg = `
      <svg width="800" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">
        <style>
          .container {
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
            line-height: 1.5;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            fill: ${colors.title};
          }
          .post-title {
            font-size: 16px;
            font-weight: bold;
            fill: ${colors.text};
            text-decoration: none;
          }
          .post-title:hover {
            text-decoration: underline;
          }
          .post-date {
            font-size: 12px;
            fill: ${colors.subtext};
          }
          .post-summary {
            font-size: 14px;
            fill: ${colors.text};
          }
          .post-tag {
            font-size: 12px;
            fill: ${colors.tag};
          }
          .footer {
            font-size: 12px;
            fill: ${colors.subtext};
          }
          a {
            cursor: pointer;
          }
          ${options.customCss || ""}
        </style>
        
        <rect width="100%" height="100%" fill="${colors.background}" rx="8" ry="8" />
        
        <g class="container">
          <!-- 헤더 -->
          <text x="40" y="40" class="header">${this.escapeXml(title)}</text>
          
          <!-- 포스트 목록 -->
          ${this.generatePostsContent(limitedPosts, headerHeight, postHeight, colors)}
          
          <!-- 푸터 -->
          <text x="40" y="${totalHeight - 20}" class="footer">
            Generated with 💖 by until-github-readme
          </text>
        </g>
      </svg>
    `;

    // 공백 제거 및 SVG 최적화
    return svg.trim().replace(/\s+/g, " ");
  }

  /**
   * 포스트 목록 SVG 콘텐츠를 생성합니다.
   * @param posts 포스트 배열
   * @param startY 시작 Y 좌표
   * @param postHeight 포스트당 높이
   * @param colors 테마 색상
   * @returns 포스트 목록 SVG 문자열
   */
  private generatePostsContent(
    posts: BlogPost[],
    startY: number,
    postHeight: number,
    colors: ThemeColors
  ): string {
    return posts
      .map((post, index) => {
        const y = startY + index * postHeight;
        const postDate = new Date(post.publishedAt).toLocaleDateString(
          "ko-KR",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );

        // 태그 문자열 생성
        const tags =
          post.tags && post.tags.length > 0
            ? post.tags
                .slice(0, 3)
                .map((tag) => `#${tag}`)
                .join(" ")
            : "";

        // 요약 텍스트 제한 (필요시)
        const summary = post.summary ? this.truncateText(post.summary, 80) : "";

        return `
        <!-- 포스트 ${index + 1} -->
        <g transform="translate(40, ${y + 20})">
          <a href="${this.escapeXml(post.url)}" target="_blank">
            <text x="0" y="0" class="post-title">${this.escapeXml(post.title)}</text>
          </a>
          <text x="0" y="20" class="post-date">${postDate}</text>
          ${summary ? `<text x="0" y="40" class="post-summary">${this.escapeXml(summary)}</text>` : ""}
          ${tags ? `<text x="0" y="65" class="post-tag">${this.escapeXml(tags)}</text>` : ""}
        </g>
      `;
      })
      .join("");
  }

  /**
   * 테마에 따른 색상 설정을 반환합니다.
   * @param theme 테마 ('light' | 'dark')
   * @returns 테마 색상 객체
   */
  private getThemeColors(theme: "light" | "dark"): ThemeColors {
    if (theme === "dark") {
      return {
        background: "#0d1117",
        title: "#e6edf3",
        text: "#c9d1d9",
        subtext: "#8b949e",
        tag: "#58a6ff",
      };
    }

    // 기본 라이트 테마
    return {
      background: "#ffffff",
      title: "#24292f",
      text: "#24292f",
      subtext: "#57606a",
      tag: "#0969da",
    };
  }

  /**
   * 텍스트가 너무 길 경우 자르고 줄임표를 추가합니다.
   * @param text 원본 텍스트
   * @param maxLength 최대 길이
   * @returns 제한된 텍스트
   */
  private truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength - 3) + "...";
  }

  /**
   * XML에서 특수 문자를 이스케이프 처리합니다.
   * @param str 원본 문자열
   * @returns 이스케이프된 문자열
   */
  private escapeXml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }
}

/**
 * 테마 색상 인터페이스
 */
interface ThemeColors {
  background: string;
  title: string;
  text: string;
  subtext: string;
  tag: string;
}
