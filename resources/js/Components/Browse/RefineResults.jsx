import { useState } from "react";
import RefineCheckbox from "../UI/RefineCheckbox";
import DropdownMenu from "../UI/DropdownMenu";

const RefineResults = () => {
  const [clear, setClear] = useState(false);
  const [fromYear, setFromYear] = useState("From");
  const [toYear, setToYear] = useState("To");

  const hardcodedYears = ["2026", "2025", "2024", "2023"];

  const fromItems = hardcodedYears.map((year) => ({
    label: year,
    onClick: () => setFromYear(year),
  }));

  const toItems = hardcodedYears.map((year) => ({
    label: year,
    onClick: () => setToYear(year),
  }));

  const handleClearAll = () => {
    setFromYear("From");
    setToYear("To");
  };

  return (
    <div className="bg-background hidden self-start rounded-lg p-4 lg:flex lg:flex-1 lg:flex-col lg:gap-6">
      <div className="flex w-full items-center justify-between">
        <p className="font-bold">Refine Results</p>
        <button
          onClick={handleClearAll}
          className="text-primary text-sm font-semibold hover:underline focus:outline-none"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4">
          <p className="font-bold">Genre</p>
          <RefineCheckbox label="Action" count="142" />
          <RefineCheckbox label="Adventure" count="389" />
          <RefineCheckbox label="Drama" count="501" />
          <RefineCheckbox label="Fantasy" count="422" />
          <RefineCheckbox label="Romance" count="194" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4">
          <p className="font-bold">Year</p>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <DropdownMenu title={fromYear} items={fromItems} />
            </div>
            <span className="text-muted-foreground font-medium">-</span>
            <div className="flex-1">
              <DropdownMenu title={toYear} items={toItems} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4">
          <p className="font-bold">Number of Episodes</p>
          <RefineCheckbox label="1 - 25" />
          <RefineCheckbox label="25 - 50" />
          <RefineCheckbox label="51 - 100" />
          <RefineCheckbox label="100+" />
        </div>
      </div>
    </div>
  );
};

export default RefineResults;
