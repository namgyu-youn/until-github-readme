export async function encodeImageBase64(imageUrl: string) {
  return fetch(imageUrl)
    .then((res) => res.blob())
    .then((blob) => blob.arrayBuffer())
    .then((buffer) => Buffer.from(buffer).toString("base64"));
}
