import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';
import { UntilBlogService } from './services/blog-service';
import { RecentArticlesBadge } from './model/svg/RecentArticlesBadge';

async function run(): Promise<void> {
  try {
    // Get action inputs
    const username = core.getInput('username', { required: true });
    const maxPosts = parseInt(core.getInput('max_posts') || '4');
    const title = core.getInput('title') || '📝 Until 블로그 최신 글';
    const theme = core.getInput('theme') || 'dark';
    const filename = core.getInput('filename') || 'blog-widget.svg';

    core.info(`Generating blog widget for user: ${username}`);

    // Create blog service
    const blogService = new UntilBlogService();

    // Get latest articles
    core.info('Fetching latest articles...');
    const articles = await blogService.getLatestArticles(username, maxPosts);
    core.info(`Found ${articles.length} articles.`);

    // Generate SVG
    core.info('Generating SVG...');
    const recentArticlesBadge = RecentArticlesBadge.from(articles, title, theme);
    const svgContent = await recentArticlesBadge.getSvg();

    // Save to file
    const outputPath = path.join(process.cwd(), filename);
    fs.writeFileSync(outputPath, svgContent);

    core.info(`✅ Successfully generated blog widget: ${outputPath}`);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed('An unknown error occurred');
    }
  }
}

run();