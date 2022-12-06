import styled, { createGlobalStyle } from "styled-components";
import BGImage from "./images/rafael-garcin-gDSQLdCSfoE-unsplash.jpg";

export const GlobalStyle = createGlobalStyle`
html {
    height: 100%
}

body {
    background-image: url(${BGImage});
    background-size: cover;
    background-position: center;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items:center;
}

* {
    box-sizing:border-box;
    font-family: 'Ubuntu';
}
.loading{
  margin: auto; background: rgb(241, 242, 243); display: block; shape-rendering: auto;
}


`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f3f3f3;
  border-radius: 15px;
  padding:20px;
  place-content:center;
  box-shadow: 0 5px 10px $33333;

  > p {
    color: #333333
  }

  .score{
    color: #fff
    font-size: 1.5rem;
    margin: 0;
  }
  h1{
    font-family: 'ubuntu';
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    -moz-background-clip:text;
    -moz-text-fill-color: transparent;
    filter:drop-shadow(2px 2px #0085a3);
    font-size: 50px;
    font-weight: 400;
    text-align:center;
    margin:20px;
  }
  .start, .next{
    cursor: pointer;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    border: none;
    box-shadow: 0 5px 15px #0085a3;
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 25px;
  }
  .start {
    max-width: 200px;
  }
`;
