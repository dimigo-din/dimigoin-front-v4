import {ThemeProvider} from "styled-components";
import "./App.css";
import {lightTheme, darkTheme} from "./styles/theme";
import MobileLayout from "./layouts/MobileLayout";

import GlobalStyle from "./styles/GlobalStyle";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import {useEffect, useState} from "react";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <BrowserRouter>
        <GlobalStyle/>
        <MobileLayout>
          <AppRouter/>
        </MobileLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
