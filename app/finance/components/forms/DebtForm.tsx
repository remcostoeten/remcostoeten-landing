'use client';
import React from 'react';
import moment from 'moment';
import { FirestoreForm } from './FirestormForm';

interface Field {
    label: string;
    name: string;
    type?: string;
    options?: Array<{ value: string, label: string }>;
}

const fields: Field[] = [
    { label: "Name Of Debt", name: "nameOfDebt", type: "text" },
    { label: "Amount Of Debt", name: "amountOfDebt", type: "number" },
    { label: "Date", name: "date", type: "date" },
    { label: "Is Paid Off", name: "isPaidOff", type: "select", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
    { label: "Amount Paid Off", name: "amountPaidOff", type: "number" },
];


const Usage = () => {
    const initialState = { nameOfDebt: "", amountOfDebt: 0, date: moment().format('DD-MM-YYYY'), isPaidOff: "no", amountPaidOff: 0 };
    const collectionRef = "debt";

    return (
        <FirestoreForm initialState={initialState} collectionRef={collectionRef} formFields={fields} />
    );
};

export default Usage;
