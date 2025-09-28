import { StrictMode } from "react";
import { createRoot, ReactDOM } from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Layout />
  </StrictMode>
);
