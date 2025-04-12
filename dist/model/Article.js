"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const formatDate_1 = require("../utils/formatDate");
const Author_1 = require("./Author");
const Blog_1 = require("./Blog");
class Article {
    constructor(id, title, summary, minRead, thumbnailUrl, author, blog, urlSlug, _createdAt) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.minRead = minRead;
        this.thumbnailUrl = thumbnailUrl;
        this.author = author;
        this.blog = blog;
        this.urlSlug = urlSlug;
        this._createdAt = _createdAt;
    }
    static fromResponse(response) {
        return new Article(response.articleId, response.title, response.summary, response.minRead, response.thumbnailUrl, new Author_1.Author(response.author), new Blog_1.Blog(response.blog), response.urlSlug, new Date(response.createdAt));
    }
    getUrl() {
        return `https://until.blog/@${this.blog.username}/${this.urlSlug}`;
    }
    get createdAt() {
        return (0, formatDate_1.formatDate)(this._createdAt);
    }
    isThumbnailExists() {
        return this.thumbnailUrl !== null;
    }
}
exports.Article = Article;
