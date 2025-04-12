"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UntilBlogService = void 0;
const Article_1 = require("../model/Article");
class UntilBlogService {
    async getLatestArticles(username, limit) {
        try {
            const response = await fetch(`https://api2.until.blog/blog/${username}/articles?pageSize=${limit}`);
            const data = await response.json();
            return data.articles.map((article) => Article_1.Article.fromResponse(article));
        }
        catch (error) {
            console.error("블로그 포스트를 가져오는 중 오류 발생:", error);
            throw new Error("블로그 포스트를 가져오는 중 오류가 발생했습니다.");
        }
    }
}
exports.UntilBlogService = UntilBlogService;
