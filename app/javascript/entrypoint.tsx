import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipes from "./components/Recipes";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Recipes />} />
      </Routes>
    </BrowserRouter>,
    rootEl
  );
});
