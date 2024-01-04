"use client"

import { useEffect, useState } from "react"
import { FilterIcon, XIcon } from "lucide-react"

import { fetchGithubIssues } from "@/core/lib/fetchGithubIssues"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import LabelPill from "./LabelPill"
import Dropdown from "@/components/ui/ModelSelector"
import LabelFilter from "./FilterDropdown"

function SearchBar() {
  return (
    <div className="relative">
      <Input placeholder="Search data..." type="search" />
    </div>
  )
}

function FilterMenu({ onFilter }) {
  const [issues, setIssues] = useState([])
  const [labels, setLabels] = useState([])
  const [activeFilters, setActiveFilters] = useState([])
  useEffect(() => {
    const getLabels = async () => {
      const tasks = await fetchGithubIssues()
      const priorityLabels = [
        "Medium priority",
        "High priority",
        "Low priority",
      ]
      const allLabels = tasks.flatMap((task) => task.labels || [])
      const filteredLabels = allLabels.filter(
        (label) => !priorityLabels.includes(label.name)
      )

      const uniqueLabels = filteredLabels.reduce((unique, label) => {
        return unique.some((u) => u.name === label.name)
          ? unique
          : [...unique, label]
      }, [])

      setLabels(uniqueLabels)
    }

    getLabels()
  }, [])

  const handleLabelClick = (labelName) => {
    if (activeFilters.includes(labelName)) {
      setActiveFilters(activeFilters.filter((filter) => filter !== labelName))
    } else {
      setActiveFilters([...activeFilters, labelName])
    }

    if (onFilter) {
      onFilter(labelName)
    }
  }

  const handleFilterRemove = (filterToRemove) => {
    setActiveFilters(
      activeFilters.filter((filter) => filter !== filterToRemove)
    )
    setActiveFilters([])
    if (onFilter) {
      onFilter("all")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      {activeFilters.length > 0 && (
        <div className="ml-2 flex gap-2">
          {activeFilters.map((filter, index) => (
            <div
              key={index}
              className="00 mb-2 mr-2 flex items-center rounded-full px-2 py-1 text-xs text-gray-500"
            >
              {filter}
              <XIcon
                className="ml-2 h-4 w-4 cursor-pointer text-red-500"
                onClick={() => handleFilterRemove(filter)}
              />
            </div>
          ))}
        </div>
      )}
      <DropdownMenuContent align="start" className="w-[200px]">
        {labels.map((label) => (
          <div className="relative" key={label.name}>
            <DropdownMenuItem
              className="align-start flex flex-col items-start gap-4"
              onClick={() => handleLabelClick(label.name)}
            >
              <LabelPill
                label={label.name}
                color={`#${label.color}`}
                background={`#${label.color}`}
                borderColor={`#${label.color}`}
              >
                {label.name}
              </LabelPill>
            </DropdownMenuItem>
            {activeFilters.includes(label.name) && (
              <XIcon className="absolute right-0 top-0 h-4 w-4 text-red-500" />
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function TableToolbar({ onSearch, onFilter }) {
  return (
    <div className="mb-2 flex items-center justify-between rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <SearchBar />
        <FilterMenu onFilter={onFilter} />
      </div>
      <AddNew />
    </div>
  )
}

function AddNew() {
  const items = ["Task", "Issue", "Bug", "Feature"]

  const data = [
    { id: 1, name: "John", status: "Active" },
    { id: 2, name: "Jane", status: "Inactive" },
    // ... other data
  ];

  const statusColumn = {
    Header: "Status",
    accessor: "status",
    filter: "includes",
  };
  const customLabels = ['Label1', 'Label2', 'Label3'];

  const handleLabelSelect = (selectedLabel) => {
    // Handle the selected label as needed
    console.log('Selected label:', selectedLabel);
  };
  return (
    <>

      <LabelFilter labels={customLabels} onSelect={handleLabelSelect} />

      <Dropdown items={items} renderItem={(item) => <div>{item}</div>} />
    </>
  )
}