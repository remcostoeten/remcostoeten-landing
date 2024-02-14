'use client';
import { useState, useEffect } from "react";
import { onSnapshot, collection, CollectionReference, QuerySnapshot } from "firebase/firestore";

type FirestoreHookReturnType<T> = {
    data: T[];
    loading: boolean;
    error: Error | null;
};

export function useFirestoreCollection<T>(collectionRef: CollectionReference): FirestoreHookReturnType<T> {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collectionRef, (snapshot: QuerySnapshot<T>) => {
            try {
                const fetchedData: T[] = [];
                snapshot.forEach((doc) => {
                    fetchedData.push({ ...(doc.data() as T), id: doc.id });
                });
                setData(fetchedData);
                setLoading(false);
            } catch (error) {
                setError(error);
            }
        });

        return () => unsubscribe();
    }, [collectionRef]);

    return { data, loading, error };
}