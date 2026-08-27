import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/Button";
import BlogEditor from "../../components/BlogEditor";
import ContentSection from "../../components/ContentSection";
import Cursor from "../../components/Cursor";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SEO, { SITE_NAMES, canonicalUrl } from "../../components/SEO";
import arabicData from "../../data/portfolio.json";
import translations from "../../data/translations";
import { useLanguage } from "../../contexts/LanguageContext";
import { getAllPosts, getPostBySlug } from "../../utils/api";

const estimateReadingTime = (content = "") => Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220));
const fields = ["date", "slug", "preview", "title", "tagline", "image", "content"];

const BlogPost = ({ postsByLanguage, relatedPostsByLanguage }) => {
  const { language } = useLanguage();
  const text = translations[language];
  const post = postsByLanguage[language] || postsByLanguage.ar || postsByLanguage.en;
  const relatedPosts = relatedPostsByLanguage[language] || relatedPostsByLanguage.ar || relatedPostsByLanguage.en || [];
  const [showEditor, setShowEditor] = useState(false);
  const router = useRouter();
  const readingTime = estimateReadingTime(post.content);
  const dateObj = post.date ? new Date(post.date) : new Date();
  const published = isNaN(dateObj.getTime()) ? new Date().toISOString() : dateObj.toISOString();
  const description = post.preview || post.tagline || (language === "ar" ? "ملاحظة ميدانية من حسام الزين حول بناء أنظمة مفيدة." : "A field note from Husam Alzain on building useful systems.");
  const articleUrl = canonicalUrl(`/blog/${post.slug}`);
  const wordCount = post.content?.trim().split(/\s+/).filter(Boolean).length || 0;
  const articleSection = language === "ar" ? "الذكاء الاصطناعي، المنتجات، والتنفيذ" : "AI, products, and execution";
  const authorName = SITE_NAMES[language];
  const structuredData = [
    { "@context": "https://schema.org", "@type": "BlogPosting", inLanguage: text.locale, headline: post.title, description, image: post.image, url: articleUrl, datePublished: published, dateModified: published, wordCount, articleSection, author: { "@type": "Person", name: authorName, url: canonicalUrl("/") }, publisher: { "@type": "Person", name: authorName, url: canonicalUrl("/") }, mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: language === "ar" ? "الرئيسية" : "Home", item: canonicalUrl("/") }, { "@type": "ListItem", position: 2, name: text.nav.blog, item: canonicalUrl("/blog") }, { "@type": "ListItem", position: 3, name: post.title, item: articleUrl }] },
  ];

  return (
    <>
      <SEO title={post.title} description={description} path={`/blog/${post.slug}`} image={post.image} type="article" publishedTime={published} modifiedTime={published} articleSection={articleSection} language={language} structuredData={structuredData} />
      {arabicData.showCursor && <Cursor />}
      <div className={`blog-shell article-shell ${arabicData.showCursor ? "cursor-none" : ""}`}>
        <Header isBlog />
        <main>
          <article>
            <div className="article-crumbs container"><Link href="/blog">{text.nav.blog}</Link><span>/</span><span>{post.title}</span></div>
            <header className="article-hero container">
              <div className="article-hero-copy">
                <p className="blog-kicker">{text.blog.fieldNote(readingTime)}</p>
                <h1>{post.title}</h1>
                <p className="article-tagline">{post.tagline}</p>
                <div className="article-meta">
                  <time dateTime={published}>{dateObj.toLocaleDateString(text.locale, { year: "numeric", month: "long", day: "numeric" })}</time>
                  <span>{text.resume.by} {authorName}</span>
                </div>
              </div>
              <div className="article-hero-image"><img src={post.image} alt={post.title} /></div>
            </header>
            <div className="article-body-wrap">
              <aside className="article-aside">
                <span>{text.blog.onThisNote}</span>
                <span>{String(readingTime).padStart(2, "0")} {language === "ar" ? "دقيقة" : "min"}</span>
              </aside>
              <div className="article-body"><ContentSection content={post.content} /></div>
            </div>
          </article>
          {relatedPosts.length > 0 && (
            <section className="related-posts container" aria-labelledby="related-notes">
              <div className="blog-section-heading"><h2 id="related-notes">{text.blog.continueReading}</h2><Link href="/blog">{text.blog.allNotes} ↗</Link></div>
              <div className="related-post-grid">
                {relatedPosts.map((related) => (
                  <Link href={`/blog/${related.slug}`} key={related.slug} className="related-post">
                    <span>{new Date(related.date).toLocaleDateString(text.locale, { year: "numeric" })}</span>
                    <h3>{related.title}</h3>
                    <span>{text.blog.readNote} ↗</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="blog-admin-create"><Button onClick={() => setShowEditor(true)} type="primary">{text.blog.editPost}</Button></div>
      )}
      {showEditor && <BlogEditor post={post} locale={language} close={() => setShowEditor(false)} refresh={() => router.reload(window.location.pathname)} />}
    </>
  );
};

export async function getStaticProps({ params }) {
  return {
    props: {
      postsByLanguage: {
        ar: getPostBySlug(params.slug, fields, "ar"),
        en: getPostBySlug(params.slug, fields, "en"),
      },
      relatedPostsByLanguage: {
        ar: getAllPosts(["date", "slug", "title", "image"], "ar").filter((item) => item.slug !== params.slug).slice(0, 2),
        en: getAllPosts(["date", "slug", "title", "image"], "en").filter((item) => item.slug !== params.slug).slice(0, 2),
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"], "ar");
  return { paths: posts.map((post) => ({ params: { slug: post.slug } })), fallback: false };
}

export default BlogPost;
