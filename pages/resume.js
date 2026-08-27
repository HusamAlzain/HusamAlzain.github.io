import React from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Socials from "../components/Socials";
import SEO from "../components/SEO";
import data from "../data/portfolio.json";

const Resume = () => {
  const router = useRouter();
  const { name, showResume, resume } = data;

  React.useEffect(() => {
    if (!showResume) {
      router.push("/");
    }
  }, [showResume, router]);

  if (!showResume) return null;

  return (
    <div className="site-shell">
      <SEO title={`السيرة الذاتية — ${name}`} description={`الخبرة المهنية والمهارات التقنية لـ ${name}.`} path="/resume" />
      <Header />
      <main className="container mx-auto pt-40 pb-20">
        <section className="resume-hero mb-20">
          <p className="eyebrow mb-4">السيرة الذاتية</p>
          <h1 className="hero-title mb-8">{name}<span className="brand-dot">.</span></h1>
          <p className="hero-tagline max-w-2xl">{resume.tagline}</p>
          <p className="hero-summary max-w-3xl mt-8">{resume.description}</p>
          <div className="mt-10">
            <Socials />
          </div>
        </section>

        <div className="resume-grid">
          <section className="resume-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">احترافي</p>
                <h2>الخبرة</h2>
              </div>
            </div>
            <div className="experience-list">
              {resume.experiences.map((exp) => (
                <div key={exp.id} className="experience-item py-10 border-t border-[var(--line)]">
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-xl font-bold">{exp.position}</h3>
                    <span className="text-xs font-mono text-[var(--cyan)] uppercase tracking-widest">{exp.dates}</span>
                  </div>
                  <p className="text-sm text-[var(--dim)] mb-6 uppercase tracking-wider">{exp.type}</p>
                  <ul className="list-none space-y-3">
                    {exp.bullets.split(",").map((bullet, i) => (
                      <li key={i} className="text-sm text-[var(--muted)] leading-relaxed flex gap-3">
                        <span className="text-[var(--cyan)]">—</span>
                        {bullet.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="resume-sidebar space-y-20">
            <section className="resume-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">أكاديمي</p>
                  <h2>التعليم</h2>
                </div>
              </div>
              <div className="py-8 border-t border-[var(--line)]">
                <h3 className="text-lg font-bold mb-2">{resume.education.universityName}</h3>
                <p className="text-xs font-mono text-[var(--cyan)] mb-4 uppercase tracking-widest">{resume.education.universityDate}</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{resume.education.universityPara}</p>
              </div>
            </section>

            <section className="resume-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">تقني</p>
                  <h2>المهارات</h2>
                </div>
              </div>
              <div className="space-y-10 border-t border-[var(--line)] pt-8">
                {resume.languages && (
                  <div>
                    <h3 className="text-xs font-mono text-[var(--dim)] uppercase tracking-widest mb-4">اللغات</h3>
                    <div className="flex flex-wrap gap-2">
                      {resume.languages.map((lang, i) => (
                        <span key={i} className="text-xs px-3 py-1 bg-[var(--line)] rounded-full text-[var(--ink)]">{lang}</span>
                      ))}
                    </div>
                  </div>
                )}
                {resume.frameworks && (
                  <div>
                    <h3 className="text-xs font-mono text-[var(--dim)] uppercase tracking-widest mb-4">إطارات العمل</h3>
                    <div className="flex flex-wrap gap-2">
                      {resume.frameworks.map((fw, i) => (
                        <span key={i} className="text-xs px-3 py-1 bg-[var(--line)] rounded-full text-[var(--ink)]">{fw}</span>
                      ))}
                    </div>
                  </div>
                )}
                {resume.others && (
                  <div>
                    <h3 className="text-xs font-mono text-[var(--dim)] uppercase tracking-widest mb-4">الخبرة</h3>
                    <div className="flex flex-wrap gap-2">
                      {resume.others.map((other, i) => (
                        <span key={i} className="text-xs px-3 py-1 bg-[var(--line)] rounded-full text-[var(--ink)]">{other}</span>
                      ))}
                    </div>
                  </div>
                )}
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
