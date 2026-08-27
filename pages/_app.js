import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "../contexts/LanguageContext";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
