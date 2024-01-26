'use client'
// useGenericForm.tsx
import { useState } from 'react';
import { Form, Button, DatePicker, Select } from 'antd';
import { doc, collection, addDoc } from 'firebase/firestore';
import { useAuth } from '@/core/lib/database/auth';
import moment, { Moment } from 'moment';
import { toast } from 'sonner';
import { db } from '@/core/lib/database/firebase';

interface FormField {
    label: string;
    type: 'text' | 'number' | 'date' | 'select';
    key: string;
    options?: string[];
}

interface FormData {
    [key: string]: string | number | boolean | Date | Moment;
}

interface FormProps {
    formFields: FormField[];
    submitButtonText: string;
    onSubmitSuccess: (data: FormData) => void;
    collectionName: string;
}

const useGenericForm = ({
    formFields,
    submitButtonText,
    onSubmitSuccess,
    collectionName,
}: FormProps) => {
    const [formState, setFormState] = useState<FormData>({});
    const { user } = useAuth();

    const handleSubmit = async () => {
        if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);
            const collectionRef = collection(userDocRef, collectionName);

            try {
                await addDoc(collectionRef, formState);
                toast(`Data submitted successfully`);
                onSubmitSuccess(formState);
            } catch (error) {
                console.error('Error submitting data:', error);
                toast(`Error submitting data: ${error}`);
            }
        }
    };

    const renderFormField = (field: FormField) => {
        switch (field.type) {
            case 'text':
            case 'number':
                return (
                    <InputWithLabel
                        key={field.key}
                        label={field.label}
                        type={field.type}
                        value={formState[field.key] as string | number}
                        onChange={(e) =>
                            setFormState((prevState) => ({
                                ...prevState,
                                [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value,
                            }))
                        }
                    />
                );
            case 'date':
                return (
                    <Form.Item key={field.key} label={field.label}>
                        <DatePicker
                            value={formState[field.key] as Moment}
                            onChange={(date) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    [field.key]: date,
                                }))
                            }
                        />
                    </Form.Item>
                );
            case 'select':
                return (
                    <Form.Item key={field.key} label={field.label}>
                        <Select
                            onChange={(value) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    [field.key]: value,
                                }))
                            }
                        >
                            {field.options?.map((option) => (
                                <Select.Option key={option} value={option}>
                                    {option}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                );
            default:
                return null;
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            {formFields.map((field) => renderFormField(field))}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {submitButtonText}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default useGenericForm;
