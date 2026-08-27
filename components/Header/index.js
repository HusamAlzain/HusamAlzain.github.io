import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { name, showBlog, showResume } = data;

  const navigateTo = (path, scrollFn) => {
    if (router.pathname === "/") {
      if (scrollFn) scrollFn();
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(path);
    }
  };

  return (
    <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}>
      <button
        className="brand-mark"
        onClick={() => navigateTo("/")}
        aria-label="العودة للأعلى"
      >
        <span className="brand-orbit" />
        {name}
        <span className="brand-dot">.</span>
      </button>
      <nav className="desktop-nav" aria-label="التنقل الرئيسي">
        <button onClick={() => navigateTo("/", handleWorkScroll)}>الأعمال</button>
        <button onClick={() => navigateTo("/", handleAboutScroll)}>عني</button>
        <div
          className="services-nav-wrap"
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <button
            className={`services-nav-trigger ${servicesOpen ? "is-open" : ""}`}
            aria-expanded={servicesOpen}
            aria-controls="services-nav-panel"
            onClick={() => setServicesOpen((open) => !open)}
          >
            الخدمات <span>⌄</span>
          </button>
          <div
            id="services-nav-panel"
            className={`services-nav-panel ${servicesOpen ? "is-open" : ""}`}
            role="dialog"
            aria-label="نظرة عامة على الخدمات"
          >
            <div className="services-panel-intro">
              <div>
                <span className="signal-label">مجموعة القدرات</span>
                <h2>الخدمات</h2>
              </div>
              <p>عمق تقني مع انحياز نحو النتائج المفيدة.</p>
              <span className="services-panel-count">0{data.services.length}</span>
            </div>
            <div className="services-panel-list">
              {data.services.map((service, index) => (
                <button
                  key={service.id || index}
                  onClick={() => {
                    setServicesOpen(false);
                    navigateTo("/", () => {
                      const el = document.getElementById("services");
                      el?.scrollIntoView({ behavior: "smooth" });
                    });
                  }}
                >
                  <span>0{index + 1}</span>
                  <strong>{service.title}</strong>
                  <em aria-hidden="true">↗</em>
                </button>
              ))}
            </div>
          </div>
        </div>
        {showBlog && <Link href="/blog">المدونة</Link>}
        {showResume && <Link href="/resume">السيرة الذاتية</Link>}
        <a className="nav-contact contact-link" href="mailto:husam1551@gmail.com">
          ابدأ محادثة <span>↗</span>
        </a>
      </nav>
    </header>
  );
};

export default Header;
