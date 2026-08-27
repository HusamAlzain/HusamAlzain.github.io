import Socials from "../Socials";
import translations from "../../data/translations";
import { useLanguage } from "../../contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();
  const text = translations[language];
  const dataName = language === "ar" ? "حسام الزين" : "Husam Alzain";

  return (
    <footer className="site-footer">
      <div className="footer-grid container mx-auto">
        <div className="footer-label"><span className="eyebrow">{text.footer.label}</span><span className="footer-orbit">◎</span></div>
        <div className="footer-main">
          <h2>{text.footer.titleLineOne}<br /><em>{text.footer.titleLineTwo}</em></h2>
          <div className="footer-actions"><a className="footer-cta" href="https://calendar.app.google/53KRN6ydvF1XEKzW8" target="_blank" rel="noreferrer">{text.footer.schedule} <span>↗</span></a><Socials /></div>
        </div>
      </div>
      <div className="footer-base container mx-auto"><span>© {new Date().getFullYear()} {dataName}</span><span>{text.footer.built}</span><span>↗</span></div>
    </footer>
  );
};

export default Footer;
