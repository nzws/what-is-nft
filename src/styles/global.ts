import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
      font-family: "Helvetica Neue",
    Arial,
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    Meiryo,
    sans-serif;
  }

  #app {
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  max-width: 100%;
  }
`;
