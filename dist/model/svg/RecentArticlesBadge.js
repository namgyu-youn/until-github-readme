"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentArticlesBadge = void 0;
const ArticleCard_1 = require("./ArticleCard");
class RecentArticlesBadge {
    constructor(articleCards, title = "📝 블로그 최신 글", theme = "dark") {
        this.articleCards = articleCards;
        this.title = title;
        this.theme = theme;
    }
    static from(articles, title = "📝 블로그 최신 글", theme = "dark") {
        const articleCards = articles.map((article, idx) => new ArticleCard_1.ArticleCard(article, RecentArticlesBadge.POSITIONS[idx]));
        return new RecentArticlesBadge(articleCards, title, theme);
    }
    async getSvg() {
        const backgroundColor = this.theme === 'light' ? "#ffffff" : "#171717";
        const headerColor = this.theme === 'light' ? "#000000" : "#ffffff";
        const titleColor = this.theme === 'light' ? "#000000" : "#ffffff";
        const descColor = this.theme === 'light' ? "#4b5563" : "#6b7280";
        const metaColor = this.theme === 'light' ? "#6b7280" : "#9ca3af";
        return `
      <svg xmlns="http://www.w3.org/2000/svg" width="720" height="720">
        <defs>
        <clipPath id="imgClip" width="300" height="180" rx="12" ry="12">
            <rect width="300" height="180" rx="12" ry="12"/>
        </clipPath>
        <style>
            .card { font-family: 'Pretendard', sans-serif; }
            .header { font-size: 24px; font-weight: 600; fill: ${headerColor}; }
            .title { font-size: 16px; font-weight: 600; fill: ${titleColor}; }
            .desc { font-size: 14px; font-weight: 300; fill: ${descColor}; }
            .meta { font-size: 12px; font-weight: 300; fill: ${metaColor}; }
            a { text-decoration: none; cursor: pointer; }
            image { transition: transform 0.3s ease-in-out; }
            .card:hover image { transform: scale(1.025); }
        </style>
        </defs>

        <rect x="0" y="0" width="720" height="720" rx="16" ry="16" fill="${backgroundColor}" />

        <!-- 헤더 -->
        <text x="30" y="50" class="header">${this.title}</text>

        <g class="card-container" transform="translate(30, 80)">
        ${await this.getRecentArticlesCardsSvg()}
        </g>
      </svg>
    `;
    }
    async getRecentArticlesCardsSvg() {
        if (this.articleCards.length === 0) {
            // TODO: 블로그 글이 없을 경우 대응 필요
            return "";
        }
        const cardSvgs = await Promise.all(this.articleCards.map((card) => card.getSvg()));
        return cardSvgs.join("");
    }
}
exports.RecentArticlesBadge = RecentArticlesBadge;
RecentArticlesBadge.POSITIONS = [
    { x: 0, y: 0 },
    { x: 350, y: 0 },
    { x: 0, y: 320 },
    { x: 350, y: 320 },
];
