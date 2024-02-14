'use client';

import { useState, useEffect } from 'react';
import { firestore } from '@/core/database/firebase';

type FormFields = {
    [key: string]: any;
};

export default function useFirestoreForm(collection: string) {
    const [formFields, setFormFields] = useState<FormFields>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await firestore.collection(collection).add(formFields);
            setSuccess(true);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setFormFields({});
    }, [collection]);

    return {
        formFields,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    };
}

