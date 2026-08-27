import React from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Socials from "../components/Socials";
import SEO from "../components/SEO";
import arabicData from "../data/portfolio.json";
import englishData from "../data/portfolio.en.json";
import translations from "../data/translations";
import { useLanguage } from "../contexts/LanguageContext";

const datasets = { ar: arabicData, en: englishData };

const Resume = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const text = translations[language];
  const { name, showResume, resume } = datasets[language];

  React.useEffect(() => {
    if (!showResume) router.push("/");
  }, [showResume, router]);

  if (!showResume) return null;

  return (
    <div className="site-shell">
      <SEO title={text.resume.title(name)} description={text.resume.description(name)} path="/resume" language={language} />
      <Header />
      <main className="container mx-auto pt-40 pb-20">
        <section className="resume-hero mb-20">
          <p className="eyebrow mb-4">{text.resume.kicker}</p>
          <h1 className="hero-title mb-8">{name}<span className="brand-dot">.</span></h1>
          <p className="hero-tagline max-w-2xl">{resume.tagline}</p>
          <p className="hero-summary max-w-3xl mt-8">{resume.description}</p>
          <div className="mt-10"><Socials /></div>
        </section>

        <div className="resume-grid">
          <section className="resume-section">
            <div className="section-heading"><div><p className="eyebrow">{text.resume.professional}</p><h2>{text.resume.experience}</h2></div></div>
            <div className="experience-list">
              {resume.experiences.map((exp) => (
                <div key={exp.id} className="experience-item py-10 border-t border-[var(--line)]">
                  <div className="flex justify-between items-baseline mb-4"><h3 className="text-xl font-bold">{exp.position}</h3><span className="text-xs font-mono text-[var(--cyan)] uppercase tracking-widest">{exp.dates}</span></div>
                  <p className="text-sm text-[var(--dim)] mb-6 uppercase tracking-wider">{exp.type}</p>
                  <ul className="list-none space-y-3">
                    {exp.bullets.split(",").map((bullet, i) => <li key={i} className="text-sm text-[var(--muted)] leading-relaxed flex gap-3"><span className="text-[var(--cyan)]">—</span>{bullet.trim()}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="resume-sidebar space-y-20">
            <section className="resume-section">
              <div className="section-heading"><div><p className="eyebrow">{text.resume.academic}</p><h2>{text.resume.education}</h2></div></div>
              <div className="py-8 border-t border-[var(--line)]"><h3 className="text-lg font-bold mb-2">{resume.education.universityName}</h3><p className="text-xs font-mono text-[var(--cyan)] mb-4 uppercase tracking-widest">{resume.education.universityDate}</p><p className="text-sm text-[var(--muted)] leading-relaxed">{resume.education.universityPara}</p></div>
            </section>

            <section className="resume-section">
              <div className="section-heading"><div><p className="eyebrow">{text.resume.technical}</p><h2>{text.resume.skills}</h2></div></div>
              <div className="space-y-10 border-t border-[var(--line)] pt-8">
                {resume.languages && <div><h3 className="text-xs font-mono text-[var(--dim)] uppercase tracking-widest mb-4">{text.resume.languages}</h3><div className="flex flex-wrap gap-2">{resume.languages.map((item, i) => <span key={i} className="text-xs px-3 py-1 bg-[var(--line)] rounded-full text-[var(--ink)]">{item}</span>)}</div></div>}
                {resume.frameworks && <div><h3 className="text-xs font-mono text-[var(--dim)] uppercase tracking-widest mb-4">{text.resume.frameworks}</h3><div className="flex flex-wrap gap-2">{resume.frameworks.map((item, i) => <span key={i} className="text-xs px-3 py-1 bg-[var(--line)] rounded-full text-[var(--ink)]">{item}</span>)}</div></div>}
                {resume.others && <div><h3 className="text-xs font-mono text-[var(--dim)] uppercase tracking-widest mb-4">{text.resume.expertise}</h3><div className="flex flex-wrap gap-2">{resume.others.map((item, i) => <span key={i} className="text-xs px-3 py-1 bg-[var(--line)] rounded-full text-[var(--ink)]">{item}</span>)}</div></div>}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resume;
