'use client'

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FirestoreForm } from './FirestormForm';

interface Field {
    label: string;
    name: string;
    type?: string;
    options?: Array<{ value: string, label: string }>;
}

const IncomeForm = () => {
    const firestore = useFirestore();
    const [incomeNames, setIncomeNames] = useState([]);
    const initialState = { income: 0, date: moment(), incomeFor: '' };
    const collectionRef = "income";

    useEffect(() => {
        const fetchIncomeNames = async () => {
            const snapshot = await firestore.collection('debt').get();
            const names = snapshot.docs.map(doc => ({ value: doc.id, label: doc.data().name }));
            setIncomeNames(names);
        };

        fetchIncomeNames();
    }, [firestore]);

    const fields: Field[] = [
        { label: "Income", name: "income", type: "number" },
        { label: "Date", name: "date", type: "date" },
        { label: "Income For", name: "incomeFor", type: "select", options: incomeNames },
    ];

    return (
        <FirestoreForm initialState={initialState} collectionRef={collectionRef} formFields={fields} />
    );
};

export default IncomeForm;