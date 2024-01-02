"use client"

import { useEffect, useState } from "react"
import { FilterIcon } from "lucide-react"

import { fetchGithubIssues } from "@/core/lib/fetchGithubIssues"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

import LabelPill from "./LabelPill"

function SearchBar({ onSearch }) {
  return (
    <div className="relative">
      <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 pl-4 text-gray-500 dark:text-gray-400" />
      <input
        className="flex h-8 w-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 lg:w-[250px]"
        placeholder="Search data..."
        type="search"
      />
    </div>
  )
}

function FilterMenu({ onFilter }) {
  const [issues, setIssues] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const getLabels = async () => {
      const tasks = await fetchGithubIssues();
      const priorityLabels = ["Medium priority", "High priority", "Low priority"];
      const allLabels = tasks.flatMap((task) => task.labels || []);
      const filteredLabels = allLabels.filter(
        (label) => !priorityLabels.includes(label.name)
      );

      const uniqueLabels = filteredLabels.reduce((unique, label) => {
        return unique.some((u) => u.name === label.name)
          ? unique
          : [...unique, label];
      }, []);

      setLabels(uniqueLabels);
    };

    getLabels();
  }, []);

  const handleLabelClick = (labelName) => {
    if (onFilter) {
      onFilter(labelName);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {labels.map((label) => (
          <DropdownMenuItem
            key={label.name}
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
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



export default function TableToolbar({ onSearch, onFilter }) {
  return (
    <div className="flex items-center justify-between rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <SearchBar onSearch={onSearch} />
        <FilterMenu onFilter={onFilter} />
      </div>
      <AddNew />
    </div>
  )
}

function AddNew() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex w-full items-center justify-between">
        <Button className="ml-auto" variant="outline">
          Add New
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Card>add new</Card>
      </AlertDialogContent>
    </AlertDialog>
  )
}