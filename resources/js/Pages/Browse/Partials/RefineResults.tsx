import { useState } from "react";
import RefineCheckbox from "../../../Components/UI/RefineCheckbox";
import DropdownMenu from "../../../Components/UI/DropdownMenu";


const RefineResults = () => {
  // const [clear, setClear] = useState(false);
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
    <div className="bg-surface border-border hidden self-start rounded-lg border p-5 lg:flex lg:w-64 lg:flex-col lg:gap-6">
      <div className="border-border flex w-full items-center justify-between border-b pb-4">
        <h2 className="text-text font-bold">Refine Results</h2>
        <button
          onClick={handleClearAll}
          className="text-primary hover:text-primary-dark text-sm font-semibold transition-colors focus:outline-none"
        >
          Clear All
        </button>
      </div>

      {/* Genre Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-text text-sm font-bold">Genre</h3>
        <div className="flex flex-col gap-2.5">
          <RefineCheckbox label="Action" count="142" />
          <RefineCheckbox label="Adventure" count="389" />
          <RefineCheckbox label="Drama" count="501" />
          <RefineCheckbox label="Fantasy" count="422" />
          <RefineCheckbox label="Romance" count="194" />
        </div>
      </div>

      {/* Year Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-text text-sm font-bold">Year</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <DropdownMenu title={fromYear} items={fromItems} />
          </div>
          <span className="text-border font-medium">-</span>
          <div className="flex-1">
            <DropdownMenu title={toYear} items={toItems} />
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-text text-sm font-bold">Number of Episodes</h3>
        <div className="flex flex-col gap-2.5">
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
