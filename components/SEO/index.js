import Head from "next/head";

export const SITE_URL = "https://husamalzain.github.io";
export const SITE_NAME = "حسام الزين";
export const DEFAULT_TITLE = `${SITE_NAME} — مهندس ذكاء اصطناعي وقائد تقني`;
export const DEFAULT_DESCRIPTION =
  "حسام الزين مهندس ذكاء اصطناعي وقائد تقني يبني أنظمة بيانات ومنتجات ومنصات برمجية موثوقة.";

export function absoluteUrl(path = "") {
  if (/^https?:\/\//i.test(path)) return path;
  if (!path) return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonicalUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  const cleanPath = String(path || "").replace(/^\/+|\/+$/g, "");
  return cleanPath ? `${SITE_URL}/${cleanPath}/` : `${SITE_URL}/`;
}

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = "/og-image.png",
  type = "website",
  publishedTime,
  modifiedTime,
  articleSection,
  keywords = [],
  structuredData,
}) => {
  const canonical = canonicalUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const pageTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
  const graph = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="language" content="Arabic" />
      <meta httpEquiv="content-language" content="ar-SA" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar-SA" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title || SITE_NAME} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ar_SA" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {articleSection && <meta property="article:section" content={articleSection} />}
      {graph.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
    </Head>
  );
};

export default SEO;
