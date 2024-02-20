"use client";
import { FileIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Wrapper from "./layout/Wrapper";
import React from "react";
import { Icons } from "./theme/icons";
import Seperator from "./ui/Seperator";
import { useFirestoreCollection } from "@/hooks/useGetFirestoreData";
import Link from "./core/Anchor";
import { handleDelete, handleUpdate } from "@core/mutations/handleDelete";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  name: string;
  parent?: string;
  files: string[];
}

export function ProjectsMenu() {
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
    deleteItem: deleteCategory,
    updateItem: updateCategory,
  } = useFirestoreCollection<Category>("categories");
  const {
    data: snippets,
    loading: snippetsLoading,
    error: snippetsError,
    deleteItem: deleteSnippet,
    updateItem: updateSnippet,
  } = useFirestoreCollection<Category>("snippets");
  const pathname = usePathname();

  const styleCurrentActive = (href: string) => {
    if (href === pathname) {
      return "text-theme-primary";
    }
    return "";
  };

  if (categoriesLoading || snippetsLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesError || snippetsError) {
    return (
      <div>Error: {categoriesError?.message || snippetsError?.message}</div>
    );
  }

  const handleDeleteWrapper = async (id: string) => {
    await handleDelete(id, deleteCategory, deleteSnippet);
  };

  const handleUpdateWrapper = async (
    id: string,
    newData: Partial<Category>,
  ) => {
    await handleUpdate(id, newData, updateCategory, updateSnippet);
  };

  return (
    <Wrapper
      horizontalPadding="0"
      isEmpty
      padding="none"
      className="text-white"
    >
      <h2 className="text-lg font-medium tracking-wide text-grey">
        All snippets
      </h2>
      <Seperator spacingTop="10" spacingBottom="10" />
      {categories?.map((category, index) => (
        <React.Fragment key={index}>
          <div
            className={`bg-grey-light flex justify-between rounded-lg px-4 py-[6px] lg:pt-2 ${index === 0 ? "" : "mt-2 "
              }`}
          >
            <Link
              variant="heading"
              headingLevel={3}
              className="text-sm font-medium"
              href={`/dashboard/categories/${category.name}`}
            >
              {category?.name}
            </Link>
            <CrudOperation
              onDelete={() => handleDeleteWrapper(category.id)}
              onUpdate={() =>
                handleUpdateWrapper(category.id, { name: "New Name" })
              }
            />
          </div>
          <div
            className={`ml-3 mt-2.5 flex flex-col gap-2 ${category?.files?.length > 0 && !category?.files?.lastIndexOf(0) ? "mt-0" : "mt-0"
              } hover:file-hover--text`}
          >
            {snippets
              ?.filter((snippet) => snippet.parent === category.id)
              .map((snippet, snippetIndex) => (
                <div
                  key={snippetIndex}
                  className="flex gap-2  mt-2 items-center justify-between"
                >
                  <Link
                    href={`/dashboard/snippets/${snippet.name.replace(
                      /\s/g,
                      "-",
                    )}`}
                    className={`flex items-cente ${styleCurrentActive(
                      `/dashboard/snippets/${snippet.name.replace(/\s/g, "-")}`,
                    )}`}
                  >
                    <FileIcon />
                    <p className="text-sm">{snippet.name}</p>
                  </Link>
                  <CrudOperation
                    onDelete={() => handleDeleteWrapper(snippet.id)}
                    onUpdate={() =>
                      handleUpdateWrapper(snippet.id, { name: "New Name" })
                    }
                  />
                </div>
              ))}
          </div>
        </React.Fragment>
      ))}
    </Wrapper>
  );
}

interface CrudOperationProps {
  onDelete: () => void;
  onUpdate: () => void;
}

function CrudOperation({ onDelete, onUpdate }: CrudOperationProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DropdownMenuLabel className="p-0">
            <Icons.MoreDots className="rotate-90 p-0 " />
          </DropdownMenuLabel>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={onUpdate}
            className="text-grey-dark text-xs font-medium"
          >
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem className="text-grey-dark text-xs font-medium">
            Folder
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onDelete}
            className="text-grey-dark flex gap-2 text-xs font-medium"
          >
            <Icons.Danger width={20} fill="white" className="mr-8 text-white" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
