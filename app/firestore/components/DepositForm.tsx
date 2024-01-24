import { Button } from "@/components/ui/button";
import { Form, Select } from "antd";
import { doc, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "@/core/lib/database/firebase";
import { useAuth } from "@/core/lib/database/auth";
import { toast } from "sonner";
import InputWithLabel from "@/components/generics/InputWithELement";

export default function DepositForm() {
    const [nameOfDept, setNameOfDept] = useState('');
    const [amountDeposited, setAmountDeposited] = useState(0);
    const { user } = useAuth();

    const handleSubmit = async () => {
        try {
            if (user) {
                const userId = user.uid;
                const userDocRef = doc(db, "users", userId);
                const depositCollectionRef = collection(userDocRef, "deposit");
                const depositData = {
                    nameOfDept: nameOfDept,
                    amountDeposited: amountDeposited
                };
                await addDoc(depositCollectionRef, depositData);
                toast.success(`Deposit data added successfully. Name of Dept - ${nameOfDept}, Amount Deposited - ${amountDeposited}`);
            }
        } catch (error) {
            console.error('Error adding deposit data: ', error);
            toast.error('Failed to add deposit data');
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item label="Name Of Dept">
                <Select value={nameOfDept} onChange={value => setNameOfDept(value)}>
                    <Select.Option value="Debt1">Debt1</Select.Option>
                    <Select.Option value="Debt2">Debt2</Select.Option>
                </Select>
            </Form.Item>
            <InputWithLabel
                label="Amount Deposited"
                value={amountDeposited}
                onChange={e => setAmountDeposited(parseFloat(e.target.value))}
            />
            <Form.Item>
                <Button >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}