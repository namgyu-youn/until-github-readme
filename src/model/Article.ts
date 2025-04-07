import { ArticleResponse } from "../types/blog";
import { formatDate } from "../utils/formatDate";
import { Author } from "./Author";
import { Blog } from "./Blog";

export class Article {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly summary: string,
    public readonly minRead: number,
    public readonly thumbnailUrl: string | null,
    public readonly author: Author,
    public readonly blog: Blog,
    private readonly urlSlug: string,
    private readonly _createdAt: Date,
  ) {}

  public static fromResponse(response: ArticleResponse) {
    return new Article(
      response.articleId,
      response.title,
      response.summary,
      response.minRead,
      response.thumbnailUrl,
      new Author(response.author),
      new Blog(response.blog),
      response.urlSlug,
      new Date(response.createdAt),
    );
  }

  public getUrl() {
    return `https://until.blog/@${this.blog.username}/${this.urlSlug}`;
  }

  public get createdAt() {
    return formatDate(this._createdAt);
  }

  public isThumbnailExists(): this is Article & { thumbnailUrl: string } {
    return this.thumbnailUrl !== null;
  }
}
