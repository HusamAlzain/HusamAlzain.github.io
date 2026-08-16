import Socials from "../Socials";

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-grid container mx-auto">
      <div className="footer-label"><span className="eyebrow">Contact.</span><span className="footer-orbit">◎</span></div>
      <div className="footer-main">
        <h2>LET&apos;S WORK<br /><em>TOGETHER</em></h2>
        <div className="footer-actions"><a className="footer-cta" href="https://calendar.app.google/53KRN6ydvF1XEKzW8" target="_blank" rel="noreferrer">Schedule a call <span>↗</span></a><Socials /></div>
      </div>
    </div>
    <div className="footer-base container mx-auto"><span>© {new Date().getFullYear()} Husam Alzain</span><span>Built between clarity and execution.</span><span>↗</span></div>
  </footer>
);

export default Footer;
