import * as React from "react";
import * as ReactDOM from "react-dom";
import Recipes from "./components/Recipes";

const App = () => {
  return <Recipes />;
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  ReactDOM.render(<App />, rootEl);
});
