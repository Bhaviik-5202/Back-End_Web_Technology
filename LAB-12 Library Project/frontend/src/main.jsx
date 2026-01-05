import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import MyPage from "./MyPage";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
