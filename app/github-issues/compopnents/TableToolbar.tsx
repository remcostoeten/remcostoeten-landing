'use client';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons";
import { SearchIcon, FilterIcon } from "lucide-react";
import { useState } from "react";

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        console.log('d');
        setSearchTerm(event.target.value);
        if (event.target.value.trim() !== '') {
            onSearch(event.target.value);
        }
    };

    return (
        <div className="relative">
            <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input className="pl-8" placeholder="Search data..." type="search" value={searchTerm} onChange={handleSearch} />
        </div>
    );
}

function FilterMenu({ onFilter }) {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const handleSelect = (value) => {
        setSelectedFilter(value);
        if (value.trim() !== '') {
            onFilter(value);
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
                <DropdownMenuRadioGroup value="all">
                    <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="inactive">Inactive</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="priority">Priority</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="closed">Closed</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="opened">Opened</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="label">Label</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function TableToolbar({ onSearch, onFilter }) {
    return (
        <div className="rounded-lgshadow-sm flex items-center justify-between ">
            <div className="flex items-center space-x-4">
                <SearchBar onSearch={onSearch} />
                <FilterMenu onFilter={onFilter} />
            </div>
            <Button className="ml-auto" variant="outline">
                Add New
            </Button>
        </div>
    )
}
