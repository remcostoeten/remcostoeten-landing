'use client'

import { Icons } from "@/components/icons";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { FilterIcon } from "lucide-react";
import { useState } from "react";

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
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

function AddNew() {
    return (
        <AlertDialog >
            <AlertDialogTrigger className="flex w-full items-center justify-between">
                <Button className="ml-auto" variant="outline">
                    Add New
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Card>
                    Add New
                </Card>
            </AlertDialogContent>
        </AlertDialog>
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
    );
}
