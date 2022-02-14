import React from "react";
import Row from "../Row";
import Recipe from "../types/recipe";

const Table = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Author</th>
          <th>Tip</th>
          <th>Difficulty</th>
          <th>Budget</th>
          <th>Rate</th>
          <th>Quantity of people</th>
          <th>Prep time</th>
          <th>Cook time</th>
          <th>Total time</th>
          <th>Ingredients</th>
          <th>Tags</th>
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
