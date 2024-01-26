import { doc, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import moment from 'moment'; // import moment
import { db } from "@/core/lib/database/firebase";
import { useAuth } from "@/core/lib/database/auth";
import { toast } from "sonner";
import FirestormForm from "../Shells/FirestormForm";

export default function IncomeForm() {
    const [income, setIncome] = useState(0);
    const [date, setDate] = useState(moment());
    const [incomeFor, setIncomeFor] = useState('');
    const { user } = useAuth();

    const handleSubmit = async () => {
        if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, "users", userId);
            const incomeCollectionRef = collection(userDocRef, "income");
            const incomeData = {
                income: income,
                date: date.format('DD-MM-YYYY'),
                incomeFor: moment().add(1, 'month').format('MMMM')
            };
            console.log(incomeData);

            toast(`A total of ${income} has been added to your income`);

            try {
                await addDoc(incomeCollectionRef, incomeData);
            } catch (error) {
                console.error("Error adding income:", error);
                toast(`Error adding income: ${error}`);
            }
        }
    };


    return (
        <>
            <FirestormForm
                title="Add New Income"
                inputs={[
                    { placeholder: "Income", type: "number" }
                ]}
                buttonText="Submit"
                onSubmit={value => setIncome(parseFloat(value))}
                onDateChange={date => setDate(date)}
                income={income}
                date={date}
            />
        </>

    );
}