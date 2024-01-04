import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/core/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { FilterIcon } from 'lucide-react';

/**
 * A reusable label filter component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string[]} props.labels - An array of labels to display in the filter.
 * @param {Function} props.onSelect - A callback function triggered when a label is selected.
 * @returns {JSX.Element} - The LabelFilter component.
 */

export default function FilterDropdown({ labels, onSelect }) {
    const form = useForm({
        defaultValues: {
            label: '',
        },
    });

    const onSubmit = (data) => {
        toast.success('Form submitted successfully');
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Label</FormLabel>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                                        >
                                            <FilterIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                            {field.value ? field.value : 'Select label'}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search label..." className="h-9" />
                                        <CommandEmpty>No label found.</CommandEmpty>

                                        <CommandGroup>
                                            {labels.map((label) => (
                                                <CommandItem
                                                    value={label}
                                                    key={label}
                                                    onSelect={() => {
                                                        form.setValue('label', label);
                                                        onSelect(label);
                                                    }}
                                                >
                                                    {label}
                                                    <CheckIcon
                                                        className={cn('ml-auto h-4 w-4', label === field.value ? 'opacity-100' : 'opacity-0')}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

/**
 * Example usage of the FilterDropdown component.
 *
 * ```jsx
 * import React, { useState } from 'react';
 * import FilterDropdown from './FilterDropdown'; // Replace with the actual path
 *
 * const App = () => {
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
 * export default App;
 * ```
 */
