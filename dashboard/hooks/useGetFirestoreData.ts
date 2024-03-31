"use client";
import { useState, useEffect } from "react";
import {
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  CollectionReference,
  QuerySnapshot,
} from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@core/database/firebase";

type FirestoreHookReturnType<T> = {
  data: T[];
  loading: boolean;
  error: Error | null;
  deleteItem: (id: string) => Promise<void>;
  updateItem: (id: string, newData: Partial<T>) => Promise<void>;
};

export function useFirestoreCollection<T>(
  collectionName: string,
): FirestoreHookReturnType<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const collectionRef: CollectionReference = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot: QuerySnapshot<T>) => {
        try {
          const fetchedData: T[] = [];
          snapshot.forEach((doc) => {
            const item = { ...(doc.data() as T), id: doc.id };
            fetchedData.push(item);
          });
          setData(fetchedData);
          setLoading(false);
        } catch (error) {
          setError(error);
        }
      },
    );

    return () => unsubscribe();
  }, [collectionName]);

  const deleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success("Item deleted successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  const updateItem = async (id: string, newData: Partial<T>) => {
    try {
      await updateDoc(doc(db, collectionName, id), newData);
      toast.success("Item updated successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return { data, loading, error, deleteItem, updateItem };
}
