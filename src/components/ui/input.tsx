// components/ui/Input.tsx
import * as React from "react";

import { cn } from "@/core/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showSearchContent?: boolean;
  onSearch?: (query: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showSearchContent, onSearch, ...props }, ref) => {
    const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
      const query = event.currentTarget.value;
      if (onSearch) {
        onSearch(query);
      }
    };

    return (
      <div className="relative">
        {!showSearchContent && (
          <input
            type={type}
            className={cn(
              "flex h-10 !w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        )}
        {showSearchContent && (
          <input
            type={type}
            placeholder="Search for whatever your ❤️ desires"
            className="flex shrink grow basis-[0%] flex-col items-stretch justify-center self-stretch overflow-hidden text-ellipsis rounded-lg border
            border-solid px-4 py-3 text-base leading-6 text-zinc-500 shadow-sm placeholder:text-[16px] max-md:max-w-full"
            onChange={handleSearch}
          />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
