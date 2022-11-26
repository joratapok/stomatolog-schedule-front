import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "ir";
    src: local("ir"), url('/fonts/Quicksand-Regular.ttf') format("truetype");
  }
  html {
  box-sizing: border-box;
  display: block;
  height: 100%;
  margin: 0 auto;
  padding: 0;
}
`;
