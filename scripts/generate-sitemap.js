const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const siteUrl = "https://husamalzain.github.io";
const postsDirectory = path.join(process.cwd(), "_posts");
const localizedPostsDirectory = path.join(postsDirectory, "ar");
const publicDirectory = path.join(process.cwd(), "public");

const escapeXml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&apos;");

const sourceDirectory = fs.existsSync(localizedPostsDirectory) ? localizedPostsDirectory : postsDirectory;
const posts = fs.readdirSync(sourceDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const slug = file.replace(/\.md$/, "");
    const source = fs.readFileSync(path.join(sourceDirectory, file), "utf8");
    const { data } = matter(source);
    return { slug, date: data.date ? new Date(data.date) : null };
  })
  .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));

const staticRoutes = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/blog/", changefreq: "weekly", priority: "0.9" },
];

const postRoutes = posts.map((post) => ({
  path: `/blog/${post.slug}/`,
  changefreq: "monthly",
  priority: "0.7",
  lastmod: post.date && !Number.isNaN(post.date.getTime()) ? post.date.toISOString() : null,
}));

const urls = [...staticRoutes, ...postRoutes].map((route) => `  <url>\n    <loc>${escapeXml(`${siteUrl}${route.path}`)}</loc>\n    ${route.lastmod ? `<lastmod>${escapeXml(route.lastmod)}</lastmod>\n    ` : ""}<changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

fs.writeFileSync(path.join(publicDirectory, "sitemap.xml"), sitemap);
console.log(`Generated sitemap.xml with ${staticRoutes.length + postRoutes.length} URLs.`);
