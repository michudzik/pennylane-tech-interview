import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
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
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const constructUrl = (page: number) => {
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

    query.push(`page=${page}`);

    return `${recipesUrl}?${query.join("&")}`;
  };

  const fetchData = async (page: number) => {
    setIsLoading(true);
    try {
      const result = await fetch(constructUrl(page));
      const { pagination, recipes } = await result.json();
      setPageCount(pagination.pages);
      setRecipes(recipes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(async () => {
    await fetchData(currentPage);
  }, [currentPage]);

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

    fetchData(1);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value + 1);
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
      {shouldDisplayTable() && (
        <>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(e) => handlePageChange(e.selected)}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            forcePage={currentPage - 1 }
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
          <Table recipes={recipes} />
        </>
      )}
    </>
  );
};

export default Recipes;
