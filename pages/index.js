import { useRef } from "react";
import SEO, { SITE_URL } from "../components/SEO";
import data from "../data/portfolio.json";
import AuroraField from "../components/AuroraField";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="site-shell">
      <SEO 
        title="مهندس ذكاء اصطناعي وقائد تقني" 
        description="حسام الزين يبني أنظمة بيانات، منتجات ذكاء اصطناعي، ومنصات برمجية موثوقة تربط الوضوح التقني بتنفيذ الأعمال." 
        path="/" 
        keywords={["مهندس ذكاء اصطناعي السعودية", "مهندس تعلم آلي", "مطور full-stack", "أنظمة بيانات", "استراتيجية منتجات الذكاء الاصطناعي"]} 
        structuredData={[
          {"@context":"https://schema.org","@type":"WebSite","name":"حسام الزين","url":SITE_URL,"description":"مهندس ذكاء اصطناعي يبني أنظمة بيانات ومنتجات ومنصات برمجية موثوقة."},
          {"@context":"https://schema.org","@type":"ProfessionalService","name":"حسام الزين — هندسة الذكاء الاصطناعي والقيادة التقنية","url":SITE_URL,"description":"هندسة الذكاء الاصطناعي، إدارة المنتجات التقنية، الأنظمة المتكاملة، تحليلات البيانات، وضمان الجودة."}
        ]} 
      />
      <AuroraField />
      <Header
        handleWorkScroll={() => scrollTo(workRef)}
        handleAboutScroll={() => scrollTo(aboutRef)}
      />

      <main>
        <section className="hero-section container mx-auto">
          <div className="hero-copy">
            <div className="hero-greeting">
              <span className="status-pulse" />
              <span className="eyebrow">متاح للعمل التقني المدروس</span>
            </div>
            <div className="hero-intro">
              <span className="hero-name">{data.name}<span className="brand-dot">.</span></span>
              <h1 className="hero-title">مهندس ذكاء اصطناعي<br /><em>وقائد تقني.</em></h1>
            </div>
            <p className="hero-tagline">خبرة في البيانات، المنتجات، والأعمال — مقيم في المملكة العربية السعودية.</p>
            <p className="hero-summary">{data.aboutpara}</p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => scrollTo(workRef)}>استكشف أعمالاً مختارة <span>↓</span></button>
              <a className="text-action" href="mailto:husam1551@gmail.com">لنقم ببناء شيء مفيد <span>↗</span></a>
            </div>
          </div>
          <div className="hero-aside" aria-label="ملخص الملف الشخصي">
            <div className="signal-card">
              <span className="signal-label">الإشارة الحالية</span>
              <strong>البيانات × المنتجات × الأعمال</strong>
              <span className="signal-line" />
            </div>
            <div className="hero-location">
              <span className="signal-label">الموقع</span>
              <p>المدينة المنورة، المملكة العربية السعودية</p>
            </div>
            <div className="hero-index">01 <span>/</span> 04</div>
          </div>
        </section>

        <section className="ticker" aria-label="القدرات">
          <div className="ticker-track">
            <div className="ticker-group">
              <span>سير عمل الذكاء الاصطناعي والوكلاء</span><i />
              <span>الأنظمة المتكاملة</span><i />
              <span>رؤية الحاسوب</span><i />
              <span>تنفيذ المنتجات</span><i />
            </div>
            <div className="ticker-group" aria-hidden="true">
              <span>سير عمل الذكاء الاصطناعي والوكلاء</span><i />
              <span>الأنظمة المتكاملة</span><i />
              <span>رؤية الحاسوب</span><i />
              <span>تنفيذ المنتجات</span><i />
            </div>
            <div className="ticker-group" aria-hidden="true">
              <span>سير عمل الذكاء الاصطناعي والوكلاء</span><i />
              <span>الأنظمة المتكاملة</span><i />
              <span>رؤية الحاسوب</span><i />
              <span>تنفيذ المنتجات</span><i />
            </div>
          </div>
        </section>

        <section className="content-section container mx-auto" ref={workRef} id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">الأنظمة المختارة</p>
              <h2>أعمال تنتقل<br /><em>من الإشارة إلى النطاق.</em></h2>
            </div>
            <p className="section-note">مجموعة مركزة من المنصات والنماذج والمنتجات المصممة لتحويل التعقيد إلى زخم.</p>
          </div>
          <div className="project-grid">
            {data.projects.map((project, index) => (
              <WorkCard 
                key={project.id} 
                index={index} 
                img={project.imageSrc} 
                name={project.title} 
                description={project.description} 
                onClick={() => project.url && window.open(project.url, "_blank", "noopener,noreferrer")} 
              />
            ))}
          </div>
        </section>

        <section className="content-section services-section container mx-auto" ref={servicesRef} id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow">مجموعة القدرات</p>
              <h2>مفيد في كل<br /><em>طبقة من طبقات النظام.</em></h2>
            </div>
            <p className="section-note">من الاستراتيجية إلى ضمان الجودة، تم تصميم العمل للبقاء في مواجهة الفرق الحقيقية، والمستخدمين الحقيقيين، والقيود الحقيقية.</p>
          </div>
          <div className="services-grid">
            {data.services.map((service, index) => (
              <ServiceCard 
                key={service.id || index} 
                index={index} 
                name={service.title} 
                description={service.description} 
              />
            ))}
          </div>
        </section>

        <section className="about-section container mx-auto" ref={aboutRef} id="about">
          <div className="about-label">
            <span className="eyebrow">عن الممارسة</span>
            <span className="about-mark">◎</span>
          </div>
          <div className="about-copy">
            <h2 className="about-lead">أعمل حيث يلتقي <em>الوضوح التقني</em> بتنفيذ الأعمال.</h2>
            <p className="about-body">{data.aboutpara}</p>
            <div className="about-principles">
              <article>
                <span>01</span>
                <h3>البناء للعالم الحقيقي.</h3>
                <p>أنظمة على مستوى الإنتاج، نتائج قابلة للقياس، واختناقات تشغيلية أقل.</p>
              </article>
              <article>
                <span>02</span>
                <h3>جعل التعقيد مقروءاً.</h3>
                <p>تفكير واضح في المنتج يساعد الفرق على الانتقال من فكرة واعدة إلى إصدار موثوق.</p>
              </article>
              <article>
                <span>03</span>
                <h3>البقاء قريباً من الإشارة.</h3>
                <p>البيانات والتعليقات وضمان الجودة الصارم تبقي كل قرار متصلاً بما يهم.</p>
              </article>
            </div>
            <div className="about-bottom">
              <Socials />
              <p>مقرنا في المساحة بين الوضوح التقني وتنفيذ الأعمال.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
