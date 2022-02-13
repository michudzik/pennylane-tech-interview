import React, { useState, useEffect } from "react";
import Recipe from "./types/recipe";
import Row from "./Row";

const budgetValues = ['cheap', 'reasonable', 'expensive'];
const recipesUrl = '/api/recipes';

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [budgetFilters, setBudgetFilters] = useState<boolean[]>(new Array(budgetValues.length).fill(false));

  const constructUrl = () => {
    const query = [];

    budgetFilters.forEach((value, index) => {
      if (value === true) {
        query.push(`budget[]=${budgetValues[index]}`)
      }
    })

    if (query.length === 0) {
      return recipesUrl
    }

    return `${recipesUrl}?${query.join('&')}`
  }

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await fetch(constructUrl())
      setRecipes(await result.json());
      setIsLoading(false);
    } catch(error) {
      setIsLoading(false);
      setError(error);
    }
  }

  useEffect(async () => {
    await fetchData();
  }, []);

  const shouldDiplayLoader = () => isLoading && !error;
  const shouldDisplayError = () => !isLoading && error;
  const shouldDisplayTable = () =>
    !shouldDiplayLoader() && !shouldDisplayError();

  const handleOnChange = (index: number) => {
    const updatedBugetFilters = budgetFilters.map((item, idx) =>
      idx === index ? !item : item
    );

    setBudgetFilters(updatedBugetFilters);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData();
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      {budgetValues.map((value: string, index: number) => (
        <>
        <input
          type="checkbox"
          id={`budget-checkbox-${index}`}
          name={value}
          value={value}
          checked={budgetFilters[index]}
          onChange={() => handleOnChange(index)}
          />
          <label htmlFor={`budget-checkbox-${index}`}>{value}</label>
        </>
      ))}
      <input type="submit" />
    </form>
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
    </>
  );
};

export default Recipes;
