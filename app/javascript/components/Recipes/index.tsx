import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Recipe from "./types/recipe";
import Table from "./Table";
import Form from "./Form";
import { budgetValues, recipesUrl } from "./utils";

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

    query.push(`page=${currentPage}`);

    return `${recipesUrl}?${query.join("&")}`;
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await fetch(constructUrl());
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
    await fetchData();
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

    fetchData();
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
            pageRangeDisplayed={5}
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
