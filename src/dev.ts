import express, { Request, Response } from "express";
import { BlogService, UntilBlogService } from "./services/blog-service";
import { SvgService } from "./services/svg-service";

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const blogService: BlogService = new UntilBlogService();
const svgService = new SvgService(blogService, {
  info: console.log,
});

app.get("/", async (req: Request, res: Response) => {
  const { username } = req.query;

  if (!username || typeof username !== "string") {
    res.status(400).send("username is required");
    return;
  }

  const svgContent = await svgService.generateSvg(username);
  res.setHeader("Content-Type", "image/svg+xml").send(svgContent);
});
