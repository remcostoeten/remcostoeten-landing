"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"

import FilterDropdown from "./FilterDropdown"
import { ToggleGroupDemo } from "./ToggleIssueProvider"

function TableToolbar({ onFilter, onSearch }) {
  const [labels, setLabels] = useState([])
  const [activeFilters, setActiveFilters] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleLabelSelect = (selectedLabel) => {
    setActiveFilters([...activeFilters, selectedLabel])
    onFilter(selectedLabel)
  }

  const handleSearch = (searchTerm) => {
    onSearch(searchTerm)
  }

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)
    handleSearch(newSearchTerm)
  }

  const handleLabelRemove = () => {
    setActiveFilters([])
    onFilter("all")
  }

  return (
    <div className="my-4 flex items-center justify-between space-x-4">
      <div className="flex items-center gap-2   ">
        <Input
          type="text"
          placeholder="Search issues..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <ToggleGroupDemo />
      </div>
      <FilterDropdown
        clear={handleLabelRemove}
        labels={labels.map((label) => label.name)}
        onSelect={handleLabelSelect}
      />
    </div>
  )
}

export default TableToolbar
