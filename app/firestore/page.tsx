'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/core/lib/database/auth';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '@/core/lib/database/firebase';
import DebtForm from './components/DebtForm';
import DepositForm from './components/DepositForm';
import IncomeForm from './components/IncomeForm';
import { Input } from "@/components/ui/input";

const App = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [debtData, setDebtData] = useState([]);
    const [depositData, setDepositData] = useState([]);
    const user = useAuth();

    useEffect(() => {
        const fetchData = async (userId: string) => {
            const userDocRef = doc(db, "users", userId);
            const incomeCollectionRef = collection(userDocRef, "income");
            const debtCollectionRef = collection(userDocRef, "debt");
            const depositCollectionRef = collection(userDocRef, "deposit");

            const incomeSnapshot = await getDocs(incomeCollectionRef);
            const debtSnapshot = await getDocs(debtCollectionRef);
            const depositSnapshot = await getDocs(depositCollectionRef);

            setIncomeData(incomeSnapshot.docs.map(doc => doc.data()));
            setDebtData(debtSnapshot.docs.map(doc => doc.data()));
            setDepositData(depositSnapshot.docs.map(doc => doc.data()));
        };

        if (user) {
            fetchData(user.uid);
        }
    }, [user]);



    return (
        <div className='p-5 bg-gray-900'>
            <div className='text-whitee'>
                <h1 className="text-lg font-bold">Income Form</h1>
                <IncomeForm />
                <h1 className="text-lg font-bold">Income Data</h1>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Income</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Income For</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomeData.map((income, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{income.income}</td>
                                <td className="border px-4 py-2">{income.date}</td>
                                <td className="border px-4 py-2">{income.incomeFor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h1 className="text-lg font-bold">Debt Form</h1>
                <DebtForm />
                <h1 className="text-lg font-bold">Debt Data</h1>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name Of Dept</th>
                            <th className="px-4 py-2">Amount Of Dept</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Is Paid Off</th>
                            <th className="px-4 py-2">Amount Paid Off</th>
                        </tr>
                    </thead>
                    <tbody>
                        {debtData.map((debt, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{debt.nameOfDept}</td>
                                <td className="border px-4 py-2">{debt.amountOfDept}</td>
                                <td className="border px-4 py-2">{debt.date}</td>
                                <td className="border px-4 py-2">{debt.isPaidOff ? 'Yes' : 'No'}</td>
                                <td className="border px-4 py-2">{debt.amountPaidOff}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h1 className="text-lg font-bold">Deposit Form</h1>
                <DepositForm />
                <h1 className="text-lg font-bold">Deposit Data</h1>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name Of Dept</th>
                            <th className="px-4 py-2">Amount Deposited</th>
                        </tr>
                    </thead>
                    <tbody>
                        {depositData.map((deposit, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{deposit.nameOfDept}</td>
                                <td className="border px-4 py-2">{deposit.amountDeposited}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
