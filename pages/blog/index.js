import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import SEO, { SITE_NAME, canonicalUrl } from "../../components/SEO";
import data from "../../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/api";

const estimateReadingTime = (content = "") => Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220));

const Blog = ({ posts }) => {
  const showBlog = useRef(data.showBlog);
  const text = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!showBlog.current) router.push("/");
  }, [router]);

  useEffect(() => setMounted(true), []);

  const createBlog = () => {
    if (process.env.NODE_ENV !== "development") return;
    fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" } }).then(() => router.reload(window.location.pathname));
  };

  const deleteBlog = (slug) => {
    if (process.env.NODE_ENV !== "development") return;
    fetch("/api/blog", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug }) }).then(() => router.reload(window.location.pathname));
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
    inLanguage: "ar-SA",
    name: "ملاحظات حول الذكاء الاصطناعي والمنتجات والتنفيذ",
    url: canonicalUrl("/blog"),
    description: "ملاحظات افتتاحية من حسام الزين حول أنظمة الذكاء الاصطناعي، تنفيذ المنتجات، البيانات، وتسليم البرمجيات الموثوقة.",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: canonicalUrl("/") },
    mainEntity: { "@type": "ItemList", itemListElement: itemList },
  };

  return showBlog.current ? (
    <>
      {data.showCursor && <Cursor />}
      <SEO
        title="ملاحظات حول الذكاء الاصطناعي والمنتجات والتنفيذ"
        description="ملاحظات افتتاحية من حسام الزين حول أنظمة الذكاء الاصطناعي، تنفيذ المنتجات، البيانات، وتسليم البرمجيات الموثوقة."
        path="/blog"
        keywords={["هندسة الذكاء الاصطناعي", "التعلم الآلي", "إدارة المنتجات التقنية", "بناء البرمجيات", "أنظمة البيانات"]}
        structuredData={structuredData}
      />
      <div className={`blog-shell ${data.showCursor ? "cursor-none" : ""}`}>
        <Header isBlog />
        <main>
          <section className="blog-hero container">
            <p className="blog-kicker">ملاحظات ميدانية / 2022—2026</p>
            <h1 ref={text}>ملاحظات حول بناء أنظمة مفيدة.</h1>
            <div className="blog-hero-bottom">
              <p>أفكار حول الذكاء الاصطناعي، قرارات المنتج، أنظمة البيانات، والعمل الهندسي الهادئ الذي يحول الأفكار الطموحة إلى برمجيات موثوقة.</p>
              <span className="blog-count">{String(posts.length).padStart(2, "0")} مدخلات</span>
            </div>
          </section>
          <section className="blog-index-section container" aria-labelledby="latest-notes">
            <div className="blog-section-heading"><h2 id="latest-notes">أحدث الملاحظات</h2><span>اقرأ / تأمل / طبق</span></div>
            <div className="blog-post-grid">
              {posts.map((post, index) => (
                <article className={`blog-post-card ${index === 0 ? "blog-post-featured" : ""}`} key={post.slug} onClick={() => Router.push(`/blog/${post.slug}`)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") Router.push(`/blog/${post.slug}`); }} role="link" tabIndex={0}>
                  <div className="blog-card-image-wrap"><img src={post.image} alt={post.title} loading={index < 2 ? "eager" : "lazy"} decoding="async" /><span className="blog-card-arrow">↗</span></div>
                  <div className="blog-card-meta"><span>{post.date ? ISOToDate(post.date) : ""}</span><span>{estimateReadingTime(post.content)} دقائق قراءة</span></div>
                  <h3>{post.title}</h3>
                  <p>{post.preview}</p>
                  <span className="blog-read-link">اقرأ الملاحظة <span>↗</span></span>
                  {process.env.NODE_ENV === "development" && mounted && <div className="blog-admin-action"><Button onClick={(event) => { event.stopPropagation(); deleteBlog(post.slug); }} type="primary">حذف</Button></div>}
                </article>
              ))}
            </div>
          </section>
        </main>
        {process.env.NODE_ENV === "development" && mounted && <div className="blog-admin-create"><Button onClick={createBlog} type="primary">إضافة منشور جديد +</Button></div>}
      </div>
    </>
  ) : null;
};

export async function getStaticProps() {
  const posts = getAllPosts(["slug", "title", "image", "preview", "author", "date", "content"]);
  return { props: { posts } };
}

export default Blog;
