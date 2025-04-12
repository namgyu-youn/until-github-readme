"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const blog_service_1 = require("./services/blog-service");
const RecentArticlesBadge_1 = require("./model/svg/RecentArticlesBadge");
async function run() {
    try {
        // Get action inputs
        const username = core.getInput('username', { required: true });
        const maxPosts = parseInt(core.getInput('max_posts') || '4');
        const title = core.getInput('title') || '📝 Until 블로그 최신 글';
        const theme = core.getInput('theme') || 'dark';
        const filename = core.getInput('filename') || 'blog-widget.svg';
        core.info(`Generating blog widget for user: ${username}`);
        // Create blog service
        const blogService = new blog_service_1.UntilBlogService();
        // Get latest articles
        core.info('Fetching latest articles...');
        const articles = await blogService.getLatestArticles(username, maxPosts);
        core.info(`Found ${articles.length} articles.`);
        // Generate SVG
        core.info('Generating SVG...');
        const recentArticlesBadge = RecentArticlesBadge_1.RecentArticlesBadge.from(articles, title, theme);
        const svgContent = await recentArticlesBadge.getSvg();
        // Save to file
        const outputPath = path.join(process.cwd(), filename);
        fs.writeFileSync(outputPath, svgContent);
        core.info(`✅ Successfully generated blog widget: ${outputPath}`);
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
        else {
            core.setFailed('An unknown error occurred');
        }
    }
}
run();
