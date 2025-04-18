"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleCardThumbnail = void 0;
const encodeImageBase64_1 = require("../../utils/encodeImageBase64");
class ArticleCardThumbnail {
    static of(article) {
        if (article.isThumbnailExists()) {
            return new ArticleCardImageThumbnail(article.thumbnailUrl);
        }
        return new ArticleCardEmptyThumbnail();
    }
}
exports.ArticleCardThumbnail = ArticleCardThumbnail;
class ArticleCardImageThumbnail extends ArticleCardThumbnail {
    constructor(imgUrl) {
        super();
        this.imgUrl = imgUrl;
    }
    async getSvg(url) {
        return `
      <a id="thumbnail" href="${url}" clip-path="url(#imgClip)">
        <rect x="0" y="0" width="300" height="180" rx="12" ry="12" fill="none" stroke="#d1d5db"/>
        <image x="0" y="0" width="300" height="180" href="data:image/png;base64,${await (0, encodeImageBase64_1.encodeImageBase64)(this.imgUrl)}" preserveAspectRatio="xMidYMid slice"/>
      </a>
    `;
    }
}
class ArticleCardEmptyThumbnail extends ArticleCardThumbnail {
    async getSvg(url) {
        return `
        <a href="${url}" clip-path="url(#imgClip)">
            <rect width="300" height="180" rx="12" ry="12" fill="#262626" stroke="#d1d5db"/>
            ${EMPTY_THUMBNAIL_SVG}
        </a>
      `;
    }
}
const EMPTY_THUMBNAIL_SVG = '<svg stroke="#52525c" fill="none" stroke-width="0" x="144" y="84" viewBox="0 0 24 24" class="text-label-assertive" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8.01562 6.98193C7.46334 6.98193 7.01562 7.43285 7.01562 7.98513C7.01562 8.53742 7.46334 8.98833 8.01563 8.98833H15.9659C16.5182 8.98833 16.9659 8.53742 16.9659 7.98513C16.9659 7.43285 16.5182 6.98193 15.9659 6.98193H8.01562Z" fill="#52525c"></path><path d="M7.01562 12C7.01562 11.4477 7.46334 10.9968 8.01562 10.9968H15.9659C16.5182 10.9968 16.9659 11.4477 16.9659 12C16.9659 12.5523 16.5182 13.0032 15.9659 13.0032H8.01563C7.46334 13.0032 7.01562 12.5523 7.01562 12Z" fill="#52525c"></path><path d="M8.0249 15.0122C7.47262 15.0122 7.0249 15.4631 7.0249 16.0154C7.0249 16.5677 7.47262 17.0186 8.0249 17.0186H15.9752C16.5275 17.0186 16.9752 16.5677 16.9752 16.0154C16.9752 15.4631 16.5275 15.0122 15.9752 15.0122H8.0249Z" fill="#52525c"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5Z" fill="#52525c"></path></svg>';
