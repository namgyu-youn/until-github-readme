"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeImageBase64 = encodeImageBase64;
async function encodeImageBase64(imageUrl) {
    return fetch(imageUrl)
        .then((res) => res.blob())
        .then((blob) => blob.arrayBuffer())
        .then((buffer) => Buffer.from(buffer).toString("base64"));
}
