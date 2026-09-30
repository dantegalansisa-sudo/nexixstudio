import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./styles/nx.css";
import "./styles/nx-services.css";
import "./styles/nx-portfolio.css";
import "./styles/nx-process.css";
import "./styles/nx-closing.css";
import "./styles/nx-service-page.css";
import "./styles/nx-hero-mobile.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
