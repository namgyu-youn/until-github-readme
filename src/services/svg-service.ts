import { RecentArticlesBadge } from "../model/svg/RecentArticlesBadge";
import { Logger } from "../types/logger";
import { BlogService } from "./blog-service";

export class SvgService {
  private static readonly DEFAULT_TITLE = "📝 Until 블로그 최신 글";
  private static readonly DEFAULT_THEME = "dark";
  private static readonly BLOG_ARTICLE_SHOW_COUNT = 4;

  constructor(
    private readonly blogService: BlogService,
    private readonly logger: Logger,
  ) {}

  public async generateSvg(
    username: string,
    title: string = SvgService.DEFAULT_TITLE,
    theme: string = SvgService.DEFAULT_THEME,
    maxPosts: number = SvgService.BLOG_ARTICLE_SHOW_COUNT,
  ): Promise<string> {
    const articles = await this.blogService.getLatestArticles(username, maxPosts);
    this.logger.info(`Found ${articles.length} articles.`);

    this.logger.info("Generating SVG...");
    const recentArticlesBadge = RecentArticlesBadge.from(articles, title, theme);
    const svgContent = await recentArticlesBadge.getSvg();

    this.logger.info("SVG generated successfully.");
    return svgContent;
  }
}
