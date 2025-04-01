import axios from "axios";

export async function encodeImageBase64(imageUrl: string) {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  return Buffer.from(await response.data).toString("base64");
}
