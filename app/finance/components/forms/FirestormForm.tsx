'use client'
import { Form, DatePicker } from "antd";
import moment from 'moment';
import { Button } from "@/components/ui/button";
import { useFirestoreForm } from "./useFirestormForm";
import InputWithLabel from "@/components/generics/InputWithELement";

export const FirestoreForm = ({ initialState, collectionRef, formFields }) => {
    const fields = formFields; // Declare the 'fields' variable and assign it the value of 'formFields'
    const { state, handleChange, handleSubmit } = useFirestoreForm(initialState, collectionRef, fields); // Use the 'fields' variable in the hook

    return (
        <Form onFinish={handleSubmit}>
            {fields.map((field) => {
                switch (field.type) {
                    case "select":
                        return (
                            <Form.Item label={field.label}>
                                <select
                                    value={state[field.name]}
                                    onChange={value => handleChange(field.name, value)}
                                >
                                    {field.options.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </Form.Item>
                        );
                    case "date":
                        return (
                            <Form.Item key={field.label} label={field.label}>
                                <DatePicker
                                    value={moment(state[field.name], 'DD-MM-YYYY')}
                                    onChange={(_, dateString) => handleChange(field.name, dateString)}
                                />
                            </Form.Item>
                        );
                    default:
                        return (
                            <InputWithLabel
                                key={field.label}
                                label={field.label}
                                type={field.type || "text"}
                                value={state[field.name]}
                                onChange={e => handleChange(field.name, field.type === "number" ? Number(e.target.value) : e.target.value)}
                            />
                        );
                }
            })}
            <Form.Item>
                <Button>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
