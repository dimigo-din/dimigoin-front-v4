import { createGlobalStyle } from 'styled-components';
import styledReset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${styledReset}
  :root {
    --main-theme-accent: #FF3284;
    --main-theme-accent-background: #FFFBFC;
  }
  
  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont,
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #EEEEEE;
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #9A9A9A;
    border-radius: 5px;
  }

  html {
    background-color: #E5E5E5;
  }

  #root {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Helvetica, Arial, sans-serif;
  }
`;

export default GlobalStyle;
