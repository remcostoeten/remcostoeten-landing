"use client"

import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button, Card, Input } from "@/components/ui/ui-imports";
import DatePicker from "antd/es/date-picker";
import dayjs from "dayjs";

interface InputProps {
    placeholder: string;
    type: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


interface FirestormFormProps {
    title: string;
    buttonText: string;
    onSubmit: (values: any) => void;
    onDateChange?: (date: any) => void;
    income: number;
    date?: any;
    value?: any;
    inputs: InputProps[];

}

export default function FirestormForm({ title, inputs, buttonText, onSubmit, onDateChange, income, date }: FirestormFormProps) {
    return (
        <>
            <div className="mt-12">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="bg-[#1E1E1E]">
                        <CardHeader>
                            <CardTitle>{inputs[0].placeholder}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {inputs.map((input, index) => (
                                <Input key={index} className="mb-4" placeholder={input.placeholder} type={input.type} />
                            ))}
                            {onDateChange && date && (
                                <>
                                    <DatePicker value={dayjs(date, 'DD-MM-YYYY')} onChange={(_, dateString) => onDateChange(dateString)} />
                                    <DatePicker value={dayjs(date, 'DD-MM-YYYY')} onChange={onDateChange} />
                                </>
                            )}
                            <Button onClick={onSubmit}>{buttonText}</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}