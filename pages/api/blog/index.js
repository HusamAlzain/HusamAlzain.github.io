import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { getRandomImage } from "../../../utils";

const getLocale = (locale) => (locale === "en" ? "en" : "ar");

export default function handler(req, res) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(200).json({ name: "This route works in development mode only" });
  }

  const locale = getLocale(req.body?.locale);
  const localeDirectory = join(process.cwd(), `_posts/${locale}`);
  fs.mkdirSync(localeDirectory, { recursive: true });

  if (req.method === "POST") {
    const isEnglish = locale === "en";
    const postPath = join(localeDirectory, `${uuidv4()}.md`);
    const data = matter.stringify(isEnglish ? "# New Blog" : "# منشور جديد", {
      date: new Date().toISOString(),
      title: isEnglish ? "New Blog" : "منشور جديد",
      tagline: isEnglish ? "An editorial note worth sharing." : "ملاحظة تحريرية تستحق المشاركة.",
      preview: isEnglish ? "A short preview for this new blog post." : "معاينة قصيرة لهذا المنشور الجديد.",
      image: getRandomImage(),
    });
    fs.writeFileSync(postPath, data, "utf8");
    return res.status(200).json({ status: "CREATED" });
  }

  if (req.method === "DELETE") {
    const deleteFile = join(localeDirectory, `${req.body.slug}.md`);
    if (fs.existsSync(deleteFile)) fs.unlinkSync(deleteFile);
    return res.status(200).json({ status: "DONE" });
  }

  return res.status(405).json({ status: "METHOD_NOT_ALLOWED" });
}
