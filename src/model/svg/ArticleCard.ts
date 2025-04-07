import { Position } from "../../types/position";
import { formatDate } from "../../utils/formatDate";
import { take } from "../../utils/take";
import { Article } from "../Article";
import { ArticleCardEmptyThumbnail, ArticleCardImageThumbnail, ArticleCardThumbnail } from "./ArticleCardThumbnail";

export class ArticleCard {
  constructor(
    private readonly article: Article,
    private readonly thumbnail: ArticleCardThumbnail,
    private readonly position: Position,
  ) {}

  public static from(article: Article, position: Position) {
    const thumbnail: ArticleCardThumbnail = article.isThumbnailExists()
      ? new ArticleCardImageThumbnail(article)
      : new ArticleCardEmptyThumbnail();

    return new ArticleCard(article, thumbnail, position);
  }

  public async getSvg() {
    const url = this.article.getUrl();

    return `
    <g class="card" transform="translate(${this.position.x}, ${this.position.y})">
      ${await this.thumbnail.getSvg(url)}
      <a id="title" href="${url}">
        <text x="0" y="210" class="title">${take(this.article.title, 25)}</text>
      </a>
  
      <a id="description" href="${url}">
        <text x="0" y="235" class="desc">
          <tspan x="0" dy="0">${take(this.article.summary, 30)}</tspan>
        </text>
      </a>
  
      <g id="meta" transform="translate(0,280)">
        <text x="0" y="0" class="meta">${formatDate(this.article.createdAt)}</text>
        <text x="80" y="0" class="meta">${this.article.minRead} min read</text>
      </g>
    </g>`;
  }
}
