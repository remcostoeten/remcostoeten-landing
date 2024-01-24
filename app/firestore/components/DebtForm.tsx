import { useAuth } from "@/core/lib/database/auth";
import { db } from "@/core/lib/database/firebase";
import { Form, DatePicker, Select } from "antd";
import { doc, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import dayjs from 'dayjs';
import InputWithLabel from "@/components/generics/InputWithELement";
import moment from 'moment';

const DebtForm = () => {
    const [nameOfDept, setNameOfDept] = useState('');
    const [amountOfDept, setAmountOfDept] = useState(0);

    const [date, setDate] = useState(moment().format('DD-MM-YYYY'));
    const [isPaidOff, setIsPaidOff] = useState(false);
    const [amountPaidOff, setAmountPaidOff] = useState(0);
    const { user } = useAuth();

    const handleSubmit = async () => {
        if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, "users", userId);
            const debtCollectionRef = collection(userDocRef, "debt");

            const debtData = {
                nameOfDept: nameOfDept,
                amountOfDept: amountOfDept,
                date: moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY'), // Convert date to moment object and format it as a string
                isPaidOff: isPaidOff,
                amountPaidOff: amountPaidOff
            };

            console.log(debtData);

            toast(`A debt named ${nameOfDept} has been added with an amount of ${amountOfDept}`);

            await addDoc(debtCollectionRef, debtData);
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <InputWithLabel
                label="Name Of Debt"
                value={nameOfDept}
                onChange={e => setNameOfDept(e.target.value)}
            />
            <InputWithLabel
                label="Amount Of Debt"
                type="number"
                value={amountOfDept}
                onChange={e => setAmountOfDept(Number(e.target.value))}
            />
            <DatePicker value={dayjs(date, 'DD-MM-YYYY')} onChange={(_, dateString) => setDate(dateString)} />
            <Form.Item label="Is Paid Off">
                <Select value={isPaidOff ? 'Yes' : 'No'} onChange={value => setIsPaidOff(value === 'Yes')}>
                    <Select.Option value="Yes">Yes</Select.Option>
                    <Select.Option value="No">No</Select.Option>
                </Select>
            </Form.Item>
            <InputWithLabel
                label="Amount Paid Off"
                type="number"
                value={amountPaidOff}
                onChange={e => setAmountPaidOff(Number(e.target.value))}
            />
            <Form.Item>
                <Button>
                    Submit
                </Button>
            </Form.Item>
        </Form >
    );
};

export default DebtForm;
