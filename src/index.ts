import * as core from "@actions/core";
import * as fs from "fs";
import * as path from "path";
import { UntilBlogService } from "./services/blog-service";
import { SvgService } from "./services/svg-service";

const svgService = new SvgService(new UntilBlogService(), { info: core.info });

async function run(): Promise<void> {
  try {
    // Get action inputs
    const username = core.getInput("username", { required: true });
    const maxPosts = parseInt(core.getInput("max_posts") || "4");
    const title = core.getInput("title") || "📝 Until 블로그 최신 글";
    const theme = core.getInput("theme") || "dark";
    const filename = core.getInput("filename") || "blog-widget.svg";

    core.info(`Generating blog widget for user: ${username}`);

    const svgContent = await svgService.generateSvg(username, title, theme, maxPosts);

    // Save to file
    const outputPath = path.join(process.cwd(), filename);
    fs.writeFileSync(outputPath, svgContent);

    core.info(`✅ Successfully generated blog widget: ${outputPath}`);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unknown error occurred");
    }
  }
}

run();
