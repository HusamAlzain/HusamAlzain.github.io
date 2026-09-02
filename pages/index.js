import { Fragment, useRef } from "react";
import SEO, { SITE_URL } from "../components/SEO";
import arabicData from "../data/portfolio.json";
import englishData from "../data/portfolio.en.json";
import translations from "../data/translations";
import { useLanguage } from "../contexts/LanguageContext";
import AuroraField from "../components/AuroraField";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import ServiceCard from "../components/ServiceCard";
import ProjectResume from "../components/ProjectResume";

const datasets = { ar: arabicData, en: englishData };

export default function Home() {
  const { language } = useLanguage();
  const data = datasets[language];
  const text = translations[language];
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const experienceRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const isArabic = language === "ar";
  const title = isArabic ? "مهندس ذكاء اصطناعي وقائد تقني" : "AI Engineer and Technical Leader";
  const description = isArabic
    ? "حسام الزين يبني أنظمة بيانات، منتجات ذكاء اصطناعي، ومنصات برمجية موثوقة تربط الوضوح التقني بتنفيذ الأعمال."
    : "Husam Alzain builds data systems, AI products, and dependable software platforms that connect technical clarity with business execution.";
  const keywords = isArabic
    ? ["مهندس ذكاء اصطناعي السعودية", "مهندس تعلم آلي", "مطور متكامل", "أنظمة بيانات", "استراتيجية منتجات الذكاء الاصطناعي"]
    : ["AI engineer Saudi Arabia", "machine learning engineer", "full-stack developer", "data systems", "AI product strategy"];
  const structuredData = [
    { "@context": "https://schema.org", "@type": "WebSite", name: data.name, url: SITE_URL, description },
    { "@context": "https://schema.org", "@type": "ProfessionalService", name: `${data.name} — ${title}`, url: SITE_URL, description },
  ];

  return (
    <div className="site-shell">
      <SEO title={title} description={description} path="/" keywords={keywords} language={language} structuredData={structuredData} />
      <AuroraField />
      <Header handleWorkScroll={() => scrollTo(workRef)} handleAboutScroll={() => scrollTo(aboutRef)} handleExperienceScroll={() => scrollTo(experienceRef)} />

      <main>
        <section className="hero-section container mx-auto">
          <div className="hero-copy">
            <div className="hero-greeting">
              <span className="status-pulse" />
              <span className="eyebrow">{text.home.available}</span>
            </div>
            <div className="hero-intro">
              <span className="hero-name">{data.name}<span className="brand-dot">.</span></span>
              <h1 className="hero-title">{text.home.titleLineOne}<br /><em>{text.home.titleLineTwo}</em></h1>
            </div>
            <p className="hero-tagline">{text.home.tagline}</p>
            <p className="hero-summary">{data.aboutpara}</p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => scrollTo(workRef)} type="button">{text.home.exploreWork} <span>↓</span></button>
              <a className="text-action" href="mailto:husam1551@gmail.com">{text.home.buildSomething} <span>↗</span></a>
            </div>
          </div>
          <div className="hero-aside" aria-label={text.home.profileSummary}>
            <div className="signal-card">
              <span className="signal-label">{text.home.currentSignal}</span>
              <strong>{text.home.signal}</strong>
              <span className="signal-line" />
            </div>
            <div className="hero-location">
              <span className="signal-label">{text.home.location}</span>
              <p>{text.home.city}</p>
            </div>
            <div className="hero-index">01 <span>/</span> 04</div>
          </div>
        </section>

        <section className="ticker" aria-label={text.home.capabilities}>
          <div className="ticker-track">
            {[0, 1, 2].map((group) => (
              <div className="ticker-group" aria-hidden={group > 0 ? "true" : undefined} key={group}>
                {text.home.ticker.map((item) => <Fragment key={`${group}-${item}`}><span>{item}</span><i /></Fragment>)}
              </div>
            ))}
          </div>
        </section>

        <section className="content-section container mx-auto" ref={workRef} id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{text.home.selectedSystems}</p>
              <h2>{text.home.workTitleOne}<br /><em>{text.home.workTitleTwo}</em></h2>
            </div>
            <p className="section-note">{text.home.workNote}</p>
          </div>
          <div className="project-grid">
            {data.projects.map((project, index) => (
              <WorkCard key={project.id} index={index} img={project.imageSrc} name={project.title} description={project.description} onClick={() => project.url && window.open(project.url, "_blank", "noopener,noreferrer")} />
            ))}
          </div>
        </section>

        <section className="content-section services-section container mx-auto" ref={servicesRef} id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{text.home.capabilityStack}</p>
              <h2>{text.home.serviceTitleOne}<br /><em>{text.home.serviceTitleTwo}</em></h2>
            </div>
            <p className="section-note">{text.home.serviceNote}</p>
          </div>
          <div className="services-grid">
            {data.services.map((service, index) => <ServiceCard key={service.id || index} index={index} name={service.title} description={service.description} />)}
          </div>
        </section>

        {/* <section className="content-section container mx-auto" ref={experienceRef} id="experience">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{text.resume.professional}</p>
              <h2>{text.resume.experience}</h2>
            </div>
          </div>
          <div className="mt-10">
            {data.resume.experiences.map((exp) => (
              <ProjectResume
                key={exp.id}
                dates={exp.dates}
                type={exp.type}
                position={exp.position}
                bullets={exp.bullets}
              />
            ))}
          </div>
        </section> */}

        <section className="about-section container mx-auto" ref={aboutRef} id="about">
          <div className="about-label">
            <span className="eyebrow">{text.home.aboutPractice}</span>
            <span className="about-mark">◎</span>
          </div>
          <div className="about-copy">
            <h2 className="about-lead">{text.home.aboutTitleOne} <em>{text.home.aboutTitleTwo}</em> {text.home.aboutTitleThree}</h2>
            <p className="about-body">{data.aboutpara}</p>
            <div className="about-principles">
              <article><span>01</span><h3>{text.home.principleOneTitle}</h3><p>{text.home.principleOneText}</p></article>
              <article><span>02</span><h3>{text.home.principleTwoTitle}</h3><p>{text.home.principleTwoText}</p></article>
              <article><span>03</span><h3>{text.home.principleThreeTitle}</h3><p>{text.home.principleThreeText}</p></article>
            </div>
            <div className="about-bottom"><Socials /><p>{text.home.aboutFooter}</p></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
