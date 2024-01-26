'use client';
import { useAuth } from "@/core/lib/database/auth";
import { db } from "@/core/lib/database/firebase";
import { doc, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";
import moment from 'moment';
import FirestormForm from "../Shells/FirestormForm";

const DebtForm = () => {
    const [amountOfDept, setAmountOfDept] = useState(100);
    const [amountPaidOff, setAmountPaidOff] = useState(100);
    const [nameOfDept, setNameOfDept] = useState("Debt");
    const [date, setDate] = useState(moment().format('DD-MM-YYYY'));
    const [isPaidOff, setIsPaidOff] = useState(false);
    const { user } = useAuth();

    const handleSubmit = async () => {
        if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, "users", userId);
            const debtCollectionRef = collection(userDocRef, "debt");

            const debtData = {
                nameOfDept: nameOfDept,
                amountOfDept: amountOfDept,
                date: moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                isPaidOff: isPaidOff,
                amountPaidOff: amountPaidOff
            };

            try {
                await addDoc(debtCollectionRef, debtData);
                toast(`A debt named ${nameOfDept} has been added with an amount of ${amountOfDept}`);
            } catch (error) {
                toast("Something went wrong");
            }
        }
    };

    return (
        <FirestormForm
            title="Add New Debt"
            inputs={[
                {
                    placeholder: "Amount Of Debt",
                    type: "number",
                    value: amountOfDept,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAmountOfDept(Number(e.target.value))
                },
                {
                    placeholder: "Amount Paid Off",
                    type: "number",
                    value: amountPaidOff,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAmountPaidOff(Number(e.target.value))
                },
                {
                    placeholder: "Name Of Debt",
                    type: "text",
                    value: nameOfDept,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNameOfDept(e.target.value)
                }
            ]}
            date={moment(date)}
            buttonText="Submit"
            onSubmit={handleSubmit}
            onDateChange={date => setDate(moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY'))}
            income={amountOfDept}
        />
    );
};

export default DebtForm;
