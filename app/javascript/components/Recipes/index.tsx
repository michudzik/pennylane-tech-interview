import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Recipe from "./types/recipe";
import Table from "./Table";
import Form from "./Form";
import { budgetValues, recipesUrl } from "./utils";

const initialPageCount = 0;
const initialPage = 1;
const displayedPageRange = 5;

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [budgetFilters, setBudgetFilters] = useState<boolean[]>(
    new Array(budgetValues.length).fill(false)
  );
  const [ingredientQuery, setingredientQuery] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [pageCount, setPageCount] = useState(initialPageCount);
  const [currentPage, setCurrentPage] = useState(initialPage);

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
      <Form
        currentDifficulty={difficulty}
        budgetFilters={budgetFilters}
        handleDifficultyFilterChange={handleDifficultyFilterChange}
        handleBudgetFilterChange={handleBudgetFilterChange}
        handleSubmit={handleSubmit}
        handleSearchChange={handleSearchChange}
      />
      {shouldDiplayLoader() && <div>Loading...</div>}
      {shouldDisplayError() && <div>{error}</div>}
      {shouldDisplayTable() && (
        <>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(e) => handlePageChange(e.selected)}
            pageRangeDisplayed={displayedPageRange}
            pageCount={pageCount}
            forcePage={currentPage - 1}
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
