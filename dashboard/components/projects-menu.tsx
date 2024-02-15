'use client';
import { FileIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Wrapper from "./layout/Wrapper";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Icons } from "./theme/icons";
import Seperator from "./ui/Seperator";
import { useFirestoreCollection } from "@/hooks/useGetFirestoreData";

interface Category {
  id: string;
  name: string;
  files: string[];
}

export function ProjectsMenu() {
  const { data: categories, loading, error, deleteItem, updateItem } = useFirestoreCollection<Category>('categories');

  const pathname = usePathname().toLowerCase();

  if (loading) {
    return <div>Loading...</div>; // replace with your loading component
  }

  if (error) {
    return <div>Error: {error.message}</div>; // replace with your error component
  }

  const handleDelete = async (id: string) => {
    await deleteItem(id);
  };

  const handleUpdate = async (id: string, newData: Partial<Category>) => {
    await updateItem(id, newData);
  };

  return (
    <Wrapper horizontalPadding="0" isEmpty padding="none" className="text-white">
      <h2 className="text-lg text-grey font-medium tracking-wide">All snippet</h2>
      <Seperator spacingTop="10" spacingBottom="10" />
      {categories?.map((category, index) => (
        <React.Fragment key={index}>
          <div className={`bg-grey-light px-4 py-[6px] lg:pt-2 rounded-lg flex justify-between ${index === 0 ? '' : 'mt-2 '}`}>
            <h3 className="text-sm font-medium">{category?.name}</h3>
            <CrudOperation onDelete={() => handleDelete(category.id)} onUpdate={() => handleUpdate(category.id, { name: 'New Name' })} />
          </div>
          <div className={`flex flex-col gap-2 ${category?.files?.length > 0 ? '!mt-2' : ''} hover:file-hover--text`}>
            {category?.files?.map((file, fileIndex) => (
              <div key={fileIndex} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileIcon />
                  <p className="text-sm">{file}</p>
                </div>
                <CrudOperation onDelete={() => handleDelete(category.id)} onUpdate={() => handleUpdate(category.id, { name: 'New Name' })} />
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
          <DropdownMenuLabel className="p-0"><Icons.MoreDots className="p-0 rotate-90 " /></DropdownMenuLabel>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpdate} className="text-xs font-medium text-grey-dark">Rename</DropdownMenuItem>
          <DropdownMenuItem className="text-xs font-medium text-grey-dark">Folder</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDelete} className="text-xs font-medium text-grey-dark flex gap-2">
            <Icons.Danger width={20} fill='white' className="mr-8 text-white" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}