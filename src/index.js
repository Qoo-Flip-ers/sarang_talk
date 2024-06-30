import React from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Reset } from "styled-reset";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      <Reset />
    </RecoilRoot>
  </React.StrictMode>
);
