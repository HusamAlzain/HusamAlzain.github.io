import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const SITE_URL = 'https://husamalzain.github.io/Husam';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Husam Alzain',
    url: SITE_URL,
    jobTitle: 'AI Engineer',
    description: 'Expertise in Data, Products, and Business',
    sameAs: [
      'https://github.com/HusamAlzain',
      'https://www.linkedin.com/in/husam-alzain/',
    ],
    image: `${SITE_URL}/og-image.png`,
  };

  return (
    <Html lang="en">
      <Head>
        {/* Metadata */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Husam Alzain - AI Engineer specializing in Data, Products, and Business. Expertise in full-stack development, machine learning, and workflow automation." />
        <meta name="keywords" content="AI Engineer, Software Developer, Machine Learning, Data Science, Full-Stack Developer, Next.js Portfolio" />
        <meta name="author" content="Husam Alzain" />
        <meta name="creator" content="Husam Alzain" />
        <meta name="publisher" content="Husam Alzain" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="Husam Alzain - AI Engineer & Technical Leader" />
        <meta property="og:description" content="Personal portfolio showcasing AI/ML projects, full-stack development, and technical expertise in data systems and business optimization." />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Husam Alzain Portfolio" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Husam Alzain - AI Engineer & Technical Leader" />
        <meta name="twitter:description" content="Personal portfolio showcasing AI/ML projects, full-stack development, and technical expertise." />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
        
        {/* Robots & Indexing */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="format-detection" content="telephone=no, email=no, address=no" />
        
        {/* Canonical */}
        <link rel="canonical" href={SITE_URL} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* JSON-LD Structured Data */}
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
