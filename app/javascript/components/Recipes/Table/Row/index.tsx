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
      <td class="align-left">{recipe.name}</td>
      <td class="align-left">{recipe.author.username}</td>
      <td class="align-left">{recipe.tip}</td>
      <td class="align-left">{recipe.difficulty}</td>
      <td class="align-left">{recipe.budget}</td>
      <td class="align-right">{recipe.rate}</td>
      <td class="align-right">{recipe.quantity_of_people}</td>
      <td class="align-right">{recipe.prep_time}</td>
      <td class="align-right">{recipe.cook_time}</td>
      <td class="align-right">{recipe.total_time}</td>
      <td class="align-left">
        {recipe.ingredients
          .map((ingredient: Ingredient) => ingredient.name)
          .join(", ")}
      </td>
      <td class="align-left">
        {recipe.tags.map((tag: Tag) => tag.name).join(", ")}
      </td>
    </tr>
  );
};

export default Row;
