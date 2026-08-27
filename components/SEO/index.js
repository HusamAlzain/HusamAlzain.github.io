import Head from "next/head";

export const SITE_URL = "https://husamalzain.github.io";
export const SITE_NAME = "حسام الزين";
export const DEFAULT_DESCRIPTION =
  "حسام الزين مهندس ذكاء اصطناعي وقائد تقني يبني أنظمة بيانات ومنتجات ومنصات برمجية موثوقة.";

export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
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
  const canonical = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const pageTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — مهندس ذكاء اصطناعي وقائد تقني`;
  const graph = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <link rel="canonical" href={canonical} />
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
