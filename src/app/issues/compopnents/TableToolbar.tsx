"use client";

import LabelFilter from "./FilterDropdown";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function TableToolbar({ onFilter, onSearch, labels }) {
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLabelSelect = (selectedLabel) => {
    setActiveFilters([...activeFilters, selectedLabel]);
    onFilter(selectedLabel);
  };

  const handleSearch = (searchTerm) => {
    onSearch(searchTerm);
  };

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    handleSearch(newSearchTerm);
  };

  const handleLabelRemove = () => {
    setActiveFilters([]);
    onFilter("all");
  };

  return (
    <div className="my-4 flex items-center justify-between space-x-4">
      <Input
        type="text"
        placeholder="Search issues..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <LabelFilter
        onSelect={handleLabelSelect}
        selectedLabels={activeFilters}
      />
    </div>
  );
}

export default TableToolbar;
