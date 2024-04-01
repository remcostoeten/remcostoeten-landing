"use client"

import { CaretSortIcon, CheckIcon, Cross1Icon } from "@radix-ui/react-icons"
import { FilterIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { cn } from "@/core/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export    default function FilterDropdown({ labels, onSelect, clear }) {
  const form = useForm({
    defaultValues: {
      labels: [],
    },
  })

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          name="label"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <FilterIcon className="mr-2 size-4 shrink-0 opacity-50" />
                      {field.value ? field.value : "Select label"}
                      <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search label..."
                      className="h-9"
                    />
                    <CommandEmpty>No label found.</CommandEmpty>

                    <CommandGroup>
                      {labels.map((label) => (
                        <CommandItem
                          value={label}
                          onSelect={() => {
                            field.onChange(label)
                            onSelect(label)
                          }}
                          key={label}
                        >
                          {label}
                          <CheckIcon
                            className={cn(
                              "ml-auto size-4",
                              label === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {field.value && (
                <button
                  className="unset-all -translate-y-1 cursor-pointer transition-all hover:rotate-12 hover:scale-125"
                  onClick={clear}
                >
                  <Cross1Icon />
                </button>
              )}
            </FormItem>
          )}
        />
        </div>
    </Form>
  )
}

/**
 * Example usage of the FilterDropdown component.
 *
 * import React, { useState } from 'react';
 * import FilterDropdown from '@/components/FilterDropdown';
 *
 * export default function FilterLabelsExample App = () => {
 *   const labels = ['Label1', 'Label2', 'Label3'];
 *   const [selectedLabel, setSelectedLabel] = useState('');
 *
 *   const handleLabelSelect = (label) => {
 *     setSelectedLabel(label);
 *   };
 *
 *   return (
 *     <div>
 *       <h1>Filter Dropdown Example</h1>
 *       <FilterDropdown labels={labels} onSelect={handleLabelSelect} />
 *       <p>Selected Label: {selectedLabel}</p>
 *     </div>
 *   );
 * };
 *
 */
