import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "husam-portfolio-language";
const DEFAULT_LANGUAGE = "ar";

const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  toggleLanguage: () => {},
  isArabic: true,
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (savedLanguage === "ar" || savedLanguage === "en") setLanguage(savedLanguage);
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.language = language;
    if (hasHydrated) window.localStorage.setItem(STORAGE_KEY, language);
  }, [language, hasHydrated]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((current) => current === "ar" ? "en" : "ar"),
    isArabic: language === "ar",
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
