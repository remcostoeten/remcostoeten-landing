"use client"
import { useState } from 'react';
import FilterDropdown from "./FilterDropdown";
import { Input } from '@/components/ui/input';

function TableToolbar({ onFilter, onSearch }) {
  const [labels, setLabels] = useState([]);
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
      <FilterDropdown
        clear={handleLabelRemove}
        labels={labels.map((label) => label.name)}
        onSelect={handleLabelSelect}
      />
    </div>
  );
}

export default TableToolbar;