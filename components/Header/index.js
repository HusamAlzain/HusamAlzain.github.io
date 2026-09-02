import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import arabicData from "../../data/portfolio.json";
import englishData from "../../data/portfolio.en.json";
import translations from "../../data/translations";
import { useLanguage } from "../../contexts/LanguageContext";

const datasets = { ar: arabicData, en: englishData };

const Header = ({ handleWorkScroll, handleAboutScroll, handleExperienceScroll, isBlog }) => {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const text = translations[language];
  const data = datasets[language];
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigateTo = (path, scrollFn) => {
    if (router.pathname === "/") {
      if (scrollFn) scrollFn();
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(path).then(() => {
        if (scrollFn) window.setTimeout(scrollFn, 100);
      });
    }
  };

  return (
    <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}>
      <button
        className="brand-mark"
        onClick={() => navigateTo("/")}
        aria-label={text.nav.backToTop}
        type="button"
      >
        <span className="brand-orbit" />
        {data.name}
        <span className="brand-dot">.</span>
      </button>
      <nav className="desktop-nav" aria-label={text.nav.primary}>
        <button type="button" onClick={() => navigateTo("/", handleWorkScroll)}>{text.nav.work}</button>
        <button type="button" onClick={() => navigateTo("/", handleExperienceScroll)}>{text.nav.experience}</button>
        <button type="button" onClick={() => navigateTo("/", handleAboutScroll)}>{text.nav.about}</button>
        <div
          className="services-nav-wrap"
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <button
            type="button"
            className={`services-nav-trigger ${servicesOpen ? "is-open" : ""}`}
            aria-expanded={servicesOpen}
            aria-controls="services-nav-panel"
            onClick={() => setServicesOpen((open) => !open)}
          >
            {text.nav.services} <span>⌄</span>
          </button>
          <div
            id="services-nav-panel"
            className={`services-nav-panel ${servicesOpen ? "is-open" : ""}`}
            role="dialog"
            aria-label={text.servicesPanel.ariaLabel}
          >
            <div className="services-panel-intro">
              <div>
                <span className="signal-label">{text.servicesPanel.eyebrow}</span>
                <h2>{text.servicesPanel.title}</h2>
              </div>
              <p>{text.servicesPanel.description}</p>
              <span className="services-panel-count">{String(data.services.length).padStart(2, "0")}</span>
            </div>
            <div className="services-panel-list">
              {data.services.map((service, index) => (
                <button
                  type="button"
                  key={service.id || index}
                  onClick={() => {
                    setServicesOpen(false);
                    navigateTo("/", () => {
                      const element = document.getElementById("services");
                      element?.scrollIntoView({ behavior: "smooth" });
                    });
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{service.title}</strong>
                  <em aria-hidden="true">↗</em>
                </button>
              ))}
            </div>
          </div>
        </div>
        {data.showBlog && <Link href="/blog">{text.nav.blog}</Link>}
        {data.showResume && <Link href="/resume">{text.nav.resume}</Link>}
        <button
          type="button"
          className="language-toggle"
          onClick={toggleLanguage}
          aria-label={text.switchToLabel}
          title={text.switchToLabel}
        >
          <span className="language-toggle-current">{text.languageName}</span>
          <span className="language-toggle-mark" aria-hidden="true">↔</span>
          <span className="language-toggle-next">{text.switchTo}</span>
        </button>
        <a className="nav-contact contact-link" href="mailto:husam1551@gmail.com">
          {text.nav.contact} <span>↗</span>
        </a>
      </nav>
    </header>
  );
};

export default Header;
