import {ThemeProvider} from "styled-components";
import "./App.css";
import {theme} from "./styles/theme";
import MobileLayout from "./layouts/MobileLayout";

import GlobalStyle from "./styles/GlobalStyle";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ThemeProvider theme={theme}>
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
