import { Article } from "../Article";
import { ArticleCard } from "./ArticleCard";
import { Position } from "../../types/position";

const POSITIONS: Position[] = [
  { x: 0, y: 0 },
  { x: 350, y: 0 },
  { x: 0, y: 320 },
  { x: 350, y: 320 },
];

export class RecentArticlesBadge {
  constructor(private readonly articleCards: ArticleCard[]) {}

  public static from(articles: Article[]) {
    return new RecentArticlesBadge(articles.map((article, idx) => ArticleCard.from(article, POSITIONS[idx])));
  }

  public async getSvg() {
    const recentArticleCardsSvg = await this.getRecentArticlesCardsSvg();

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="720" height="720">
        <defs>
        <clipPath id="imgClip" width="300" height="180" rx="12" ry="12">
            <rect width="300" height="180" rx="12" ry="12"/>
        </clipPath>
        <style>
            .card { font-family: 'Pretendard', sans-serif; }
            .header { font-size: 24px; font-weight: 600; fill: white; }
            .title { font-size: 16px; font-weight: 600; fill: white; }
            .desc { font-size: 14px; font-weight: 300; fill: #6b7280; }
            .meta { font-size: 12px; font-weight: 300; fill: #9ca3af; }
            a { text-decoration: none; cursor: pointer; }
            image { transition: transform 0.3s ease-in-out; }
            .card:hover image { transform: scale(1.025); }
        </style>
        </defs>
        
        <rect x="0" y="0" width="720" height="720" rx="16" ry="16" fill="#171717" />
    
        <!-- 헤더 -->
        <text x="30" y="50" class="header">📝 블로그 최신 글</text>
    
        <g class="card-container" transform="translate(30, 80)">
        ${recentArticleCardsSvg}
        </g>
      </svg>
    `;
  }

  private async getRecentArticlesCardsSvg() {
    if (this.articleCards.length === 0) {
      // TODO: 블로그 글이 없을 경우 대응 필요
      return "";
    }

    const cardSvgs = await Promise.all(this.articleCards.map((card) => card.getSvg()));
    return cardSvgs.join("");
  }
}
