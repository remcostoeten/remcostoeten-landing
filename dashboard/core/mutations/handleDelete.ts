type Category = {
    id: string;
    name: string;
    parent?: string;
    files: string[];
};

type DeleteFunction = (id: string, deleteCategory: DeleteFunction, deleteSnippet: DeleteFunction) => Promise<void>;
type UpdateFunction = (id: string, newData: Partial<Category>, updateCategory: UpdateFunction, updateSnippet: UpdateFunction) => Promise<void>;

// Export the CRUD operations as functions
export const handleDelete: DeleteFunction = async (id: string, deleteCategory: DeleteFunction, deleteSnippet: DeleteFunction) => {
    await deleteCategory(id, deleteCategory, deleteSnippet);
    await deleteSnippet(id, deleteCategory, deleteSnippet);
};

export const handleUpdate: UpdateFunction = async (id: string, newData: Partial<Category>, updateCategory: UpdateFunction, updateSnippet: UpdateFunction) => {
    await updateCategory(id, newData, updateCategory, updateSnippet);
    await updateSnippet(id, newData, updateCategory, updateSnippet);
};
