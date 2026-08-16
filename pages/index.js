import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import data from "../data/portfolio.json";
import AuroraField from "../components/AuroraField";
import Footer from "../components/Footer";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const heroLine = [data.headerTaglineOne, data.headerTaglineTwo, data.headerTaglineThree, data.headerTaglineFour].filter(Boolean);

  return (
    <div className="site-shell">
      <Head><title>{data.name} — AI Engineer & Technical Leader</title></Head>
      <AuroraField />
      <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}>
        <button className="brand-mark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <span className="brand-orbit" />{data.name}<span className="brand-dot">.</span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <button onClick={() => scrollTo(workRef)}>Work</button>
          <button onClick={() => scrollTo(aboutRef)}>About</button>
          {data.showBlog && <Link href="/blog">Journal</Link>}
          {data.showResume && <Link href="/resume">Resume</Link>}
          <a className="nav-contact" href="mailto:husam1551@gmail.com">Start a conversation <span>↗</span></a>
        </nav>
      </header>

      <main>
        <section className="hero-section container mx-auto">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-pulse" /> Available for thoughtful technical work</p>
            <h1>{heroLine.map((line, index) => <span key={index} className={index === 1 ? "hero-accent" : ""}>{line}</span>)}</h1>
            <p className="hero-summary">{data.aboutpara}</p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => scrollTo(workRef)}>Explore selected work <span>↓</span></button>
              <a className="text-action" href="mailto:husam1551@gmail.com">Let’s build something useful <span>↗</span></a>
            </div>
          </div>
          <div className="hero-aside" aria-label="Profile summary">
            <div className="signal-card"><span className="signal-label">CURRENT SIGNAL</span><strong>Data × Products × Business</strong><span className="signal-line" /></div>
            <div className="hero-index">01 <span>/</span> 04</div>
          </div>
        </section>

        <section className="ticker" aria-label="Capabilities">
          <div className="ticker-track"><div className="ticker-group"><span>AI & AGENTIC WORKFLOWS</span><i /><span>FULL-STACK SYSTEMS</span><i /><span>COMPUTER VISION</span><i /><span>PRODUCT EXECUTION</span><i /></div><div className="ticker-group" aria-hidden="true"><span>AI & AGENTIC WORKFLOWS</span><i /><span>FULL-STACK SYSTEMS</span><i /><span>COMPUTER VISION</span><i /><span>PRODUCT EXECUTION</span><i /></div><div className="ticker-group" aria-hidden="true"><span>AI & AGENTIC WORKFLOWS</span><i /><span>FULL-STACK SYSTEMS</span><i /><span>COMPUTER VISION</span><i /><span>PRODUCT EXECUTION</span><i /></div></div>
        </section>

        <section className="content-section container mx-auto" ref={workRef} id="work">
          <div className="section-heading"><div><p className="eyebrow">Selected systems</p><h2>Work that moves<br /><em>from signal to scale.</em></h2></div><p className="section-note">A focused set of platforms, models, and products built to turn complexity into momentum.</p></div>
          <div className="project-grid">{data.projects.map((project, index) => <WorkCard key={project.id} index={index} img={project.imageSrc} name={project.title} description={project.description} onClick={() => project.url && window.open(project.url, "_blank", "noopener,noreferrer")} />)}</div>
        </section>

        <section className="content-section services-section container mx-auto">
          <div className="section-heading"><div><p className="eyebrow">Capability stack</p><h2>Useful at every<br /><em>layer of the system.</em></h2></div><p className="section-note">From strategy to QA, the work is designed to survive contact with real teams, real users, and real constraints.</p></div>
          <div className="services-grid">{data.services.map((service, index) => <ServiceCard key={service.id || index} index={index} name={service.title} description={service.description} />)}</div>
        </section>

        <section className="about-section container mx-auto" ref={aboutRef} id="about">
          <div className="about-label"><span className="eyebrow">About the practice</span><span className="about-mark">◎</span></div>
          <div className="about-copy"><h2>{data.aboutpara}</h2><div className="about-bottom"><Socials /><p>Based in the space between technical clarity and business execution.</p></div></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
