import React from "react";
import { budgetValues, difficultyValues } from "../utils";

const Form = ({
  budgetFilters,
  currentDifficulty,
  handleSubmit,
  handleBudgetFilterChange,
  handleSearchChange,
  handleDifficultyFilterChange,
}) => {
  return (
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
              checked={value === currentDifficulty}
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
  );
};

export default Form;
