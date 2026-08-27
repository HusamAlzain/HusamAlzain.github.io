import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

function getLocaleDirectory(locale = "en") {
  const localizedDirectory = join(postsDirectory, locale);
  return fs.existsSync(localizedDirectory) ? localizedDirectory : postsDirectory;
}

export function getPostSlugs(locale = "en") {
  return fs.readdirSync(getLocaleDirectory(locale)).filter((fileName) => fileName.endsWith(".md"));
}

export function getPostBySlug(slug, fields = [], locale = "en") {
  const realSlug = slug.replace(/\.md$/, "");
  const localeDirectory = getLocaleDirectory(locale);
  const localizedPath = join(localeDirectory, `${realSlug}.md`);
  const legacyPath = join(postsDirectory, `${realSlug}.md`);
  const fullPath = fs.existsSync(localizedPath) ? localizedPath : legacyPath;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  fields.forEach((field) => {
    if (field === "slug") items[field] = realSlug;
    if (field === "content") items[field] = content;
    if (typeof data[field] !== "undefined") items[field] = data[field];
  });

  return items;
}

export function getAllPosts(fields = [], locale = "en") {
  const slugs = getPostSlugs(locale);
  return slugs
    .map((slug) => getPostBySlug(slug, fields, locale))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
