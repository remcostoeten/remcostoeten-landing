'use client'
import { useState } from "react";
import { useAuth } from "@/core/lib/database/auth";
import { db } from "@/core/lib/database/firebase";
import { doc, collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";

interface Field {
    label: string;
    name: string;
    type?: string;
    options?: Array<{ value: string, label: string }>;
}

interface FirestoreFormProps {
    initialState: Record<string, any>;
    collectionRef: string;
    fields: Field[];
}

export const useFirestoreForm = (initialState: Record<string, any>, collectionRef: string, fields: Field[]) => {
    const [state, setState] = useState(initialState);
    const { user } = useAuth();

    const handleChange = (field: string, value: any) => {
        setState({ ...state, [field]: value });
    };

    const handleSubmit = async () => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const collectionRefForUser = collection(userDocRef, collectionRef);

            try {
                await addDoc(collectionRefForUser, state);
                toast(`Data has been added`);
            } catch (error) {
                toast("Something went wrong");
            }
        }
    };

    return { state, handleChange, handleSubmit, fields };
};
