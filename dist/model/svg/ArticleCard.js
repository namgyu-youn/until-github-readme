"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleCard = void 0;
const take_1 = require("../../utils/take");
const ArticleCardThumbnail_1 = require("./ArticleCardThumbnail");
class ArticleCard {
    constructor(article, position) {
        this.article = article;
        this.position = position;
    }
    async getSvg() {
        const url = this.article.getUrl();
        const thumbnail = ArticleCardThumbnail_1.ArticleCardThumbnail.of(this.article);
        return `
    <g class="card" transform="translate(${this.position.x}, ${this.position.y})">
      ${await thumbnail.getSvg(url)}
      <a id="title" href="${url}">
        <text x="0" y="210" class="title">${(0, take_1.take)(this.article.title, 25)}</text>
      </a>
  
      <a id="description" href="${url}">
        <text x="0" y="235" class="desc">
          <tspan x="0" dy="0">${(0, take_1.take)(this.article.summary, 30)}</tspan>
        </text>
      </a>
  
      <g id="meta" transform="translate(0,280)">
        <text x="0" y="0" class="meta">${this.article.createdAt}</text>
        <text x="80" y="0" class="meta">${this.article.minRead} min read</text>
      </g>
    </g>`;
    }
}
exports.ArticleCard = ArticleCard;
