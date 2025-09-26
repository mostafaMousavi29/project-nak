import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./i18n";
import { Global, css } from "@emotion/react";
import "react-toastify/dist/ReactToastify.css";

const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: Inter, Roboto, Arial, sans-serif;
    background: #fafafa;
  }
`;

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
