import React from "react";
import Button from "../Button";
import arabicData from "../../data/portfolio.json";
import englishData from "../../data/portfolio.en.json";
import { useLanguage } from "../../contexts/LanguageContext";

const datasets = { ar: arabicData, en: englishData };
const labels = {
  ar: { Github: "GitHub", LinkedIn: "LinkedIn", Email: "البريد الإلكتروني" },
  en: { Github: "GitHub", LinkedIn: "LinkedIn", Email: "Email" },
};

const Socials = ({ className = "" }) => {
  const { language } = useLanguage();
  const data = datasets[language];

  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {data.socials.map((social, index) => (
        <Button key={index} classes="contact-link" onClick={() => window.open(social.link, "_blank", "noopener,noreferrer")}>
          {labels[language][social.title] || social.title}
        </Button>
      ))}
    </div>
  );
};

export default Socials;
