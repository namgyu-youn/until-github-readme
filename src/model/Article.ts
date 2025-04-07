import { ArticleResponse } from "../types/blog";
import { ArticleThumbnail } from "./ArticleThumbnail";
import { Author } from "./Author";
import { Blog } from "./Blog";

export class Article {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly summary: string,
    public readonly minRead: number,
    public readonly thumbnail: ArticleThumbnail,
    public readonly author: Author,
    public readonly blog: Blog,
    public readonly urlSlug: string,
    public readonly createdAt: Date,
  ) {}

  public static fromResponse(response: ArticleResponse) {
    return new Article(
      response.articleId,
      response.title,
      response.summary,
      response.minRead,
      new ArticleThumbnail(response.thumbnailUrl),
      new Author(response.author),
      new Blog(response.blog),
      response.urlSlug,
      new Date(response.createdAt),
    );
  }

  public getUrl() {
    return `https://until.blog/@${this.blog.username}/${this.urlSlug}`;
  }

  public isThumbnailExists() {
    return this.thumbnail.thumbnailUrl !== null;
  }
}
