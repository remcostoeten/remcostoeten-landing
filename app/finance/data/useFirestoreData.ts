import { useEffect, useState } from 'react';
import { db } from "@/core/lib/database/firebase";
import { getDocs, collection, doc } from "firebase/firestore";

export interface DocumentData {
    id: string;
    [key: string]: any;
}

export const useFirestoreCollection = (userId: string, collectionName: string) => {
    const [data, setData] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDocRef = doc(db, "users", userId);
                const collectionRef = collection(userDocRef, collectionName);
                const querySnapshot = await getDocs(collectionRef);
                let documents: DocumentData[] = [];
                querySnapshot.forEach((doc) => {
                    documents.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setData(documents);
                setLoading(false);
            } catch (e) {
                setError(new Error("Error getting data: " + e));
                setLoading(false);
            }
        };

        fetchData();
    }, [userId, collectionName]);

    return { data, loading, error };
};