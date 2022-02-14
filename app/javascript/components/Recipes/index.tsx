import React, { useState, useEffect } from "react";
import Recipe from "./types/recipe";
import Table from "./Table";
import { budgetValues, difficultyValues, recipesUrl } from "./utils";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [budgetFilters, setBudgetFilters] = useState<boolean[]>(
    new Array(budgetValues.length).fill(false)
  );
  const [ingredientQuery, setingredientQuery] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("all");

  const constructUrl = () => {
    const query = [];

    budgetFilters.forEach((value, index) => {
      if (value === true) {
        query.push(`budget[]=${budgetValues[index]}`);
      }
    });

    if (ingredientQuery && ingredientQuery !== "") {
      query.push(`ingredients=${ingredientQuery}`);
    }

    if (difficulty && difficulty !== "all") {
      query.push(`difficulty=${difficulty}`);
    }

    if (query.length === 0) {
      return recipesUrl;
    }

    return `${recipesUrl}?${query.join("&")}`;
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await fetch(constructUrl());
      setRecipes(await result.json());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  const shouldDiplayLoader = () => isLoading && !error;
  const shouldDisplayError = () => !isLoading && error;
  const shouldDisplayTable = () =>
    !shouldDiplayLoader() && !shouldDisplayError();

  const handleBudgetFilterChange = (index: number) => {
    const updatedBugetFilters = budgetFilters.map((item, idx) =>
      idx === index ? !item : item
    );

    setBudgetFilters(updatedBugetFilters);
  };

  const handleDifficultyFilterChange = (value: string) => {
    setDifficulty(value);
  };

  const handleSearchChange = (value: string) => {
    setingredientQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {budgetValues.map((value: string, index: number) => (
            <>
              <input
                type="checkbox"
                id={`budget-checkbox-${index}`}
                name={value}
                value={value}
                checked={budgetFilters[index]}
                onChange={() => handleBudgetFilterChange(index)}
              />
              <label htmlFor={`budget-checkbox-${index}`}>{value}</label>
            </>
          ))}
        </div>
        <div>
          {difficultyValues.map((value: string) => (
            <div>
              <input
                id={`difficulty-radio-${value}`}
                type="radio"
                value={value}
                checked={value === difficulty}
                name="difficulty"
                onChange={(e) => handleDifficultyFilterChange(e.target.value)}
              />
              <label htmlFor={`difficulty-radio-${value}`}>{value}</label>
            </div>
          ))}
        </div>
        <div>
          <label>
            Search by ingredients (comma separated, eg: "onion, bread, ...")
            <input
              type="text"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </label>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
      {shouldDiplayLoader() && <div>Loading...</div>}
      {shouldDisplayError() && <div>{error}</div>}
      {shouldDisplayTable() && <Table recipes={recipes} />}
    </>
  );
};

export default Recipes;
