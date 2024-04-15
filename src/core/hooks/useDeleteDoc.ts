import { firestore } from "../database/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useCallback } from "react";
import { toast } from "sonner";

export function useDeleteDoc(
  collectionName: string,
  successMessage: string,
  errorMessage: string
) {
  const deleteDocument = useCallback(
    async (docId: string) => {
      try {
        await deleteDoc(doc(firestore, collectionName, docId));
        toast.success(successMessage);
      } catch (error) {
        console.error("Error deleting document:", error);
        toast.error(errorMessage);
      }
    },
    [collectionName, successMessage, errorMessage]
  );

  return deleteDocument;
}
