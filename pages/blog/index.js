import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import SEO, { SITE_NAMES, canonicalUrl } from "../../components/SEO";
import arabicData from "../../data/portfolio.json";
import translations from "../../data/translations";
import { useLanguage } from "../../contexts/LanguageContext";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/api";

const estimateReadingTime = (content = "") => Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220));
const fields = ["slug", "title", "image", "preview", "author", "date", "content"];

const Blog = ({ postsByLanguage }) => {
  const { language } = useLanguage();
  const text = translations[language];
  const posts = postsByLanguage[language] || [];
  const showBlog = useRef(arabicData.showBlog);
  const textRef = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!showBlog.current) router.push("/");
  }, [router]);

  useEffect(() => setMounted(true), []);

  const createBlog = () => {
    if (process.env.NODE_ENV !== "development") return;
    fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ locale: language }) }).then(() => router.reload(window.location.pathname));
  };

  const deleteBlog = (slug) => {
    if (process.env.NODE_ENV !== "development") return;
    fetch("/api/blog", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, locale: language }) }).then(() => router.reload(window.location.pathname));
  };

  const itemList = posts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: canonicalUrl(`/blog/${post.slug}`),
    name: post.title,
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    inLanguage: text.locale,
    name: text.blog.pageTitle,
    url: canonicalUrl("/blog"),
    description: text.blog.description,
    isPartOf: { "@type": "WebSite", name: SITE_NAMES[language], url: canonicalUrl("/") },
    mainEntity: { "@type": "ItemList", itemListElement: itemList },
  };

  return showBlog.current ? (
    <>
      {arabicData.showCursor && <Cursor />}
      <SEO title={text.blog.pageTitle} description={text.blog.description} path="/blog" keywords={language === "ar" ? ["هندسة الذكاء الاصطناعي", "التعلم الآلي", "إدارة المنتجات التقنية", "بناء البرمجيات", "أنظمة البيانات"] : ["AI engineering", "machine learning", "technical product management", "software engineering", "data systems"]} language={language} structuredData={structuredData} />
      <div className={`blog-shell ${arabicData.showCursor ? "cursor-none" : ""}`}>
        <Header isBlog />
        <main>
          <section className="blog-hero container">
            <p className="blog-kicker">{text.blog.kicker}</p>
            <h1 ref={textRef}>{text.blog.heroTitle}</h1>
            <div className="blog-hero-bottom">
              <p>{text.blog.heroIntro}</p>
              <span className="blog-count">{text.blog.entries(posts.length)}</span>
            </div>
          </section>
          <section className="blog-index-section container" aria-labelledby="latest-notes">
            <div className="blog-section-heading"><h2 id="latest-notes">{text.blog.latest}</h2><span>{text.blog.rhythm}</span></div>
            <div className="blog-post-grid">
              {posts.map((post, index) => {
                const minutes = estimateReadingTime(post.content);
                return (
                  <article className={`blog-post-card ${index === 0 ? "blog-post-featured" : ""}`} key={post.slug} onClick={() => router.push(`/blog/${post.slug}`)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") router.push(`/blog/${post.slug}`); }} role="link" tabIndex={0}>
                    <div className="blog-card-image-wrap"><img src={post.image} alt={post.title} loading={index < 2 ? "eager" : "lazy"} decoding="async" /><span className="blog-card-arrow" aria-hidden="true">↗</span></div>
                    <div className="blog-card-meta"><span>{post.date ? ISOToDate(post.date, text.locale) : ""}</span><span>{text.blog.readTime(minutes)}</span></div>
                    <h3>{post.title}</h3>
                    <p>{post.preview}</p>
                    <span className="blog-read-link">{text.blog.readNote} <span aria-hidden="true">↗</span></span>
                    {process.env.NODE_ENV === "development" && mounted && <div className="blog-admin-action"><Button onClick={(event) => { event.stopPropagation(); deleteBlog(post.slug); }} type="primary">{text.blog.delete}</Button></div>}
                  </article>
                );
              })}
            </div>
          </section>
        </main>
        {process.env.NODE_ENV === "development" && mounted && <div className="blog-admin-create"><Button onClick={createBlog} type="primary">{text.blog.addPost}</Button></div>}
      </div>
    </>
  ) : null;
};

export async function getStaticProps() {
  return {
    props: {
      postsByLanguage: {
        ar: getAllPosts(fields, "ar"),
        en: getAllPosts(fields, "en"),
      },
    },
  };
}

export default Blog;
