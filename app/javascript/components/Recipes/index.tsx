import React, { useState, useEffect } from "react";
import Recipe from "./types/recipe";
import Row from "./Row";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/recipes")
      .then((res) => res.json())
      .then(
        (result: Recipe[]) => {
          setRecipes(result);
          setIsLoading(false);
        },
        (error: string) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

  const shouldDiplayLoader = () => isLoading && !error;
  const shouldDisplayError = () => !isLoading && error;
  const shouldDisplayTable = () =>
    !shouldDiplayLoader() && !shouldDisplayError();

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
        {shouldDiplayLoader() && (
          <tr>
            <td>Loading...</td>
          </tr>
        )}
        {shouldDisplayError() && (
          <tr>
            <td>{error}</td>
          </tr>
        )}
        {shouldDisplayTable() &&
          recipes.map((recipe: Recipe) => <Row recipe={recipe} />)}
      </tbody>
    </table>
  );
};

export default Recipes;
