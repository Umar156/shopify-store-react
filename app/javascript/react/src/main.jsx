import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./components/Home";

document.addEventListener("DOMContentLoaded", () => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Home />
    </StrictMode>
  );
});
