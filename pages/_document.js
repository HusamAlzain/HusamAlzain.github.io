import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const SITE_URL = "https://husamalzain.github.io/";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "حسام الزين",
    url: SITE_URL,
    jobTitle: "مهندس ذكاء اصطناعي",
    description: "خبرة في البيانات والمنتجات والأعمال",
    sameAs: ["https://github.com/HusamAlzain", "https://www.linkedin.com/in/husam-alzain/"],
    image: `${SITE_URL}/og-image.png`,
  };

  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="حسام الزين - مهندس ذكاء اصطناعي متخصص في البيانات والمنتجات والأعمال. خبرة في التطوير المتكامل والتعلم الآلي وأتمتة سير العمل." />
        <meta name="keywords" content="مهندس ذكاء اصطناعي, مطور برمجيات, تعلم آلي, علم البيانات, مطور Full-Stack, المملكة العربية السعودية" />
        <meta name="author" content="حسام الزين" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="حسام الزين - مهندس ذكاء اصطناعي وقائد تقني" />
        <meta property="og:description" content="محفظة شخصية تعرض مشاريع الذكاء الاصطناعي والتعلم الآلي، والتطوير المتكامل، والخبرة التقنية في أنظمة البيانات وتحسين الأعمال." />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:locale" content="ar_SA" />
        <meta property="og:site_name" content="محفظة حسام الزين" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="حسام الزين - مهندس ذكاء اصطناعي وقائد تقني" />
        <meta name="twitter:description" content="محفظة شخصية تعرض مشاريع الذكاء الاصطناعي والتعلم الآلي والخبرة التقنية." />
        
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
