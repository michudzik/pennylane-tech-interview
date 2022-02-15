import React from "react";
import Row from "./Row";
import Recipe from "../types/recipe";
import "./index.css";

const Table = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th class="align-left">Name</th>
          <th class="align-left">Author</th>
          <th class="align-left">Tip</th>
          <th class="align-left">Difficulty</th>
          <th class="align-left">Budget</th>
          <th class="align-right">Rate</th>
          <th class="align-right">Quantity of people</th>
          <th class="align-right">Prep time</th>
          <th class="align-right">Cook time</th>
          <th class="align-right">Total time</th>
          <th class="align-left">Ingredients</th>
          <th class="align-left">Tags</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe: Recipe) => (
          <Row recipe={recipe} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
