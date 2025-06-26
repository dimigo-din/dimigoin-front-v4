import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    list-style: none;
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: "Pretendard Variable", Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    background-color: black;
    color: ${({ theme }) => theme.Colors.Core.Brand.Primary};
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  img, svg {
    display: block;
    max-width: 100%;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }
`;

export default GlobalStyle;
