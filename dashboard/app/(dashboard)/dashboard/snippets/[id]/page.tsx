"use client";
import { FileIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { usePathname } from "next/navigation";
import React from "react";
import { useFirestoreCollection } from "@/hooks/useGetFirestoreData";
import Wrapper from "@c/layout/Wrapper";
import { Icons } from "@c/theme/icons";
import Seperator from "@c/ui/Seperator";
import Link from "@c/core/Anchor";

interface Category {
  id: string;
  name: string;
  parent?: string;

  files: string[];
}

export default function ProjectsMenu() {
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

  if (categoriesLoading || snippetsLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesError || snippetsError) {
    return (
      <div>Error: {categoriesError?.message || snippetsError?.message}</div>
    );
  }

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    await deleteSnippet(id);
  };

  const handleUpdate = async (id: string, newData: Partial<Category>) => {
    await updateCategory(id, newData);
    await updateSnippet(id, newData);
  };

  const categoryNames = categories?.map((category) => category.name);
  const snippetNames = snippets?.map((snippet) => snippet.name);

  return (
    <Wrapper
      horizontalPadding="0"
      isEmpty
      padding="none"
      className="text-white"
    >
      <h2 className="text-lg text-grey font-medium tracking-wide">
        All snippets
      </h2>
      <Seperator spacingTop="10" spacingBottom="10" />
      {categories?.map((category, index) => (
        <React.Fragment key={index}>
          <div
            className={`bg-grey-light px-4 py-[6px] lg:pt-2 rounded-lg flex justify-between ${
              index === 0 ? "" : "mt-2 "
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
              onDelete={() => handleDelete(category.id)}
              onUpdate={() => handleUpdate(category.id, { name: "New Name" })}
            />
          </div>
          <div
            className={`ml-3 mt-2.5 ${
              category?.files?.length > 0 ? "!mt-2" : ""
            } hover:file-hover--text`}
          >
            {snippets
              ?.filter((snippet) => snippet.parent === category.id)
              .map((snippet, snippetIndex) => (
                <div
                  key={snippetIndex}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <FileIcon />
                    <Link
                      variant="heading"
                      headingLevel={3}
                      className="text-sm font-medium"
                      href={`/dashboard/snippets/${snippet.id}`}
                    >
                      {snippet.name}
                    </Link>
                  </div>
                  <CrudOperation
                    onDelete={() => handleDelete(snippet.id)}
                    onUpdate={() =>
                      handleUpdate(snippet.id, { name: "New Name" })
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
            <Icons.MoreDots className="p-0 rotate-90 " />
          </DropdownMenuLabel>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={onUpdate}
            className="text-xs font-medium text-grey-dark"
          >
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs font-medium text-grey-dark">
            Folder
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onDelete}
            className="text-xs font-medium text-grey-dark flex gap-2"
          >
            <Icons.Danger width={20} fill="white" className="mr-8 text-white" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
