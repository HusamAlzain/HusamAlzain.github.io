import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export default function handler(req, res) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(200).json({ name: "This route works in development mode only" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ status: "METHOD_NOT_ALLOWED" });
  }

  const locale = req.body.locale === "en" ? "en" : "ar";
  const postsDirectory = join(process.cwd(), `_posts/${locale}`);
  fs.mkdirSync(postsDirectory, { recursive: true });
  const { date, title, tagline, preview, image } = req.body.variables;
  const postPath = join(postsDirectory, `${req.body.slug}.md`);

  fs.writeFileSync(postPath, matter.stringify(req.body.content, { date, title, tagline, preview, image }), "utf8");
  return res.status(200).json({ status: "DONE" });
}
