import React from "react";
import Recipe from "../../types/recipe";
import Ingredient from "../../types/ingredient";
import Tag from "../../types/tag";

const Row = ({ recipe }: { recipe: Recipe }) => {
  return (
    <tr>
      <td>
        {recipe.image.url && (
          <img src={recipe.image.url} height="50px" width="50px" />
        )}
      </td>
      <td>{recipe.name}</td>
      <td>{recipe.author.username}</td>
      <td>{recipe.tip}</td>
      <td>{recipe.difficulty}</td>
      <td>{recipe.budget}</td>
      <td>{recipe.rate}</td>
      <td>{recipe.quantity_of_people}</td>
      <td>{recipe.prep_time}</td>
      <td>{recipe.cook_time}</td>
      <td>{recipe.total_time}</td>
      <td>
        {recipe.ingredients
          .map((ingredient: Ingredient) => ingredient.name)
          .join(", ")}
      </td>
      <td>{recipe.tags.map((tag: Tag) => tag.name).join(", ")}</td>
    </tr>
  );
};

export default Row;
