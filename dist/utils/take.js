"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.take = take;
const ELLIPSIS = "...";
function take(str, length) {
    if (str.length >= length + ELLIPSIS.length) {
        return str.slice(0, length) + ELLIPSIS;
    }
    if (str.length > length) {
        return str.slice(0, length - 3) + ELLIPSIS;
    }
    return str;
}
