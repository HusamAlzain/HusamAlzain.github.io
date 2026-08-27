import Head from "next/head";

export const SITE_URL = "https://husamalzain.github.io";
export const SITE_NAMES = { ar: "حسام الزين", en: "Husam Alzain" };
export const SITE_NAME = SITE_NAMES.ar;
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
  language = "ar",
}) => {
  const canonical = canonicalUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const siteName = SITE_NAMES[language] || SITE_NAMES.ar;
  const pageTitle = title ? `${title} — ${siteName}` : DEFAULT_TITLE;
  const locale = language === "ar" ? "ar-SA" : "en-US";
  const openGraphLocale = language === "ar" ? "ar_SA" : "en_US";
  const graph = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="language" content={language === "ar" ? "Arabic" : "English"} />
      <meta httpEquiv="content-language" content={locale} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar-SA" href={canonical} />
      <link rel="alternate" hrefLang="en-US" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title || siteName} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={openGraphLocale} />
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
