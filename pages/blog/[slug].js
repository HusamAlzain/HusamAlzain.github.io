import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/Button";
import BlogEditor from "../../components/BlogEditor";
import ContentSection from "../../components/ContentSection";
import Cursor from "../../components/Cursor";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SEO, { canonicalUrl } from "../../components/SEO";
import data from "../../data/portfolio.json";
import { getAllPosts, getPostBySlug } from "../../utils/api";

const estimateReadingTime = (content = "") => Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220));

const BlogPost = ({ post, relatedPosts }) => {
  const [showEditor, setShowEditor] = useState(false);
  const router = useRouter();
  const readingTime = estimateReadingTime(post.content);
  const dateObj = post.date ? new Date(post.date) : new Date();
  const published = isNaN(dateObj.getTime()) ? new Date().toISOString() : dateObj.toISOString();
  const description = post.preview || post.tagline || "ملاحظة ميدانية من حسام الزين حول بناء أنظمة مفيدة.";
  const articleUrl = canonicalUrl(`/blog/${post.slug}`);
  const wordCount = post.content?.trim().split(/\s+/).filter(Boolean).length || 0;
  
  const structuredData = [
    { "@context": "https://schema.org", "@type": "BlogPosting", inLanguage: "ar-SA", headline: post.title, description, image: post.image, url: articleUrl, datePublished: published, dateModified: published, wordCount, articleSection: "الذكاء الاصطناعي، المنتجات، والتنفيذ", author: { "@type": "Person", name: "حسام الزين", url: canonicalUrl("/") }, publisher: { "@type": "Person", name: "حسام الزين", url: canonicalUrl("/") }, mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "الرئيسية", item: canonicalUrl("/") }, { "@type": "ListItem", position: 2, name: "المدونة", item: canonicalUrl("/blog") }, { "@type": "ListItem", position: 3, name: post.title, item: articleUrl }] },
  ];

  return (
    <>
      <SEO title={post.title} description={description} path={`/blog/${post.slug}`} image={post.image} type="article" publishedTime={published} modifiedTime={published} articleSection="الذكاء الاصطناعي، المنتجات، والتنفيذ" structuredData={structuredData} />
      {data.showCursor && <Cursor />}
      <div className={`blog-shell article-shell ${data.showCursor ? "cursor-none" : ""}`}>
        <Header isBlog />
        <main>
          <article>
            <div className="article-crumbs container"><Link href="/blog">المدونة</Link><span>/</span><span>{post.title}</span></div>
            <header className="article-hero container">
              <div className="article-hero-copy">
                <p className="blog-kicker">ملاحظة ميدانية / {readingTime} دقائق قراءة</p>
                <h1>{post.title}</h1>
                <p className="article-tagline">{post.tagline}</p>
                <div className="article-meta">
                  <time dateTime={published}>{dateObj.toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}</time>
                  <span>بواسطة حسام الزين</span>
                </div>
              </div>
              <div className="article-hero-image"><img src={post.image} alt={post.title} /></div>
            </header>
            <div className="article-body-wrap">
              <aside className="article-aside">
                <span>حول هذه الملاحظة</span>
                <span>{String(readingTime).padStart(2, "0")} دقيقة</span>
              </aside>
              <div className="article-body"><ContentSection content={post.content} /></div>
            </div>
          </article>
          {relatedPosts.length > 0 && (
            <section className="related-posts container" aria-labelledby="related-notes">
              <div className="blog-section-heading">
                <h2 id="related-notes">تابع القراءة</h2>
                <Link href="/blog">كل الملاحظات ↗</Link>
              </div>
              <div className="related-post-grid">
                {relatedPosts.map((related) => (
                  <Link href={`/blog/${related.slug}`} key={related.slug} className="related-post">
                    <span>{new Date(related.date).getFullYear()}</span>
                    <h3>{related.title}</h3>
                    <span>اقرأ الملاحظة ↗</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="blog-admin-create">
          <Button onClick={() => setShowEditor(true)} type="primary">تعديل هذه المدونة</Button>
        </div>
      )}
      {showEditor && <BlogEditor post={post} close={() => setShowEditor(false)} refresh={() => router.reload(window.location.pathname)} />}
    </>
  );
};

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, ["date", "slug", "preview", "title", "tagline", "image", "content"]);
  const relatedPosts = getAllPosts(["date", "slug", "title", "image"]).filter((item) => item.slug !== params.slug).slice(0, 2);
  return { props: { post, relatedPosts } };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);
  return { paths: posts.map((post) => ({ params: { slug: post.slug } })), fallback: false };
}

export default BlogPost;
