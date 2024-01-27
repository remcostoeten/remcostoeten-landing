'use client';
import { Button } from "@/components/ui/button";
import { Form, Select } from "antd";
import { doc, collection, addDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/core/lib/database/firebase";
import { useAuth } from "@/core/lib/database/auth";
import { toast } from "sonner";
import InputWithLabel from "@/components/generics/InputWithELement";
import useFirestoreCollection from "../../data/useFirestoreCollection";
import { name } from "country-emoji";

export default function DepositForm() {
    const [amountDeposited, setAmountDeposited] = useState(0)
    const { user } = useAuth()
    const userId = user?.uid
    const db = getFirestore()
    const [nameOfDebt, setNameOfDebt] = useState("");

    const {
        data: debts,
        loading,
        error,
    } = useFirestoreCollection(db, `users/${userId}/debt`)

    useEffect(() => {
        if (debts) {
            console.log("debs", debts)
        }
    }, [debts])

    const handleSubmit = async () => {
        try {
            if (user) {
                const userId = user.uid
                const userDocRef = doc(db, "users", userId)
                const depositCollectionRef = collection(userDocRef, "deposit")
                const depositData = {
                    nameOfDebt: nameOfDebt, // changed from nameOfDept
                    amountDeposited: amountDeposited,
                }
                await addDoc(depositCollectionRef, depositData)
                toast.success(
                    `Deposit data added successfully. Name of Debt - ${nameOfDebt}, Amount Deposited - ${amountDeposited}`
                )
            }
        } catch (error) {
            console.error("Error adding deposit data: ", error)
            toast.error("Failed to add deposit data")
        }
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item label="Name Of Dept">
                <Form.Item label="Name Of Dept">
                    <Select value={nameOfDebt} onChange={(value) => setNameOfDebt(value)}>
                        {loading ? (
                            <Select.Option disabled>Loading...</Select.Option>
                        ) : (
                            debts.map((debt) => (
                                <Select.Option key={debt.id} value={debt.nameOfDebt}>
                                    {debt.nameOfDebt}
                                </Select.Option>
                            ))
                        )}
                    </Select>

                </Form.Item>
            </Form.Item>
            <InputWithLabel
                label="Amount Deposited"
                value={amountDeposited}
                onChange={(e) => setAmountDeposited(parseFloat(e.target.value))}
            />
            <Form.Item>
                <Button>Submit</Button>
            </Form.Item>
        </Form>
    )
}