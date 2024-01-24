import { db } from "@/core/lib/database/firebase";
import { getDocs, collection, doc } from "firebase/firestore";

export interface Income {
    id: string;
    income: number;
    date: string;
    incomeFor: string;
}

export const getIncome = (userId: string) =>
    new Promise<Income[]>(async (resolve, reject) => {
        try {
            const userDocRef = doc(db, "users", userId);
            const incomeCollRef = collection(userDocRef, "income");
            const querySnapshot = await getDocs(incomeCollRef);
            let incomes: Income[] = [];
            querySnapshot.forEach((doc) => {
                incomes.push({
                    id: doc.id,
                    income: doc.data().income as number,
                    date: doc.data().date as string,
                    incomeFor: doc.data().incomeFor as string,
                });
            });
            return resolve(incomes);
        } catch (e) {
            return reject(new Error("Error getting income data: " + e));
        }
    });
    