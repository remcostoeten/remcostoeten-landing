'use client';
import React, { useEffect, useState } from "react"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { db } from "@/core/database/firebase";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@c/ui/button"

type Field = {
    name: string;
    type: 'text' | 'number' | 'select' | 'textarea';
    placeholder?: string;
    optionsCollection?: string;
}

type FormProps = {
    fields: Field[] | any[];
    collectionName: string;
}

export function FForm({ fields, collectionName }: FormProps) {
    const [values, setValues] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        fields.forEach(field => {
            if (field.type === 'select' && field.optionsCollection) {
                const unsubscribe = onSnapshot(collection(db, field.optionsCollection), (snapshot) => {
                    const options: { id: string, snippetName: string }[] = []
                    snapshot.forEach((doc) => {
                        const option: { id: string, snippetName: string } = doc.data()
                        option.id = doc.id
                        options.push(option)
                    })
                    field.options = options
                })
                return (): void => unsubscribe()
            }
        })
    }, [fields])

    const handleChange = (name: string, value: any) => {
        setValues(prevValues => ({ ...prevValues, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await addDoc(collection(db, collectionName), values)
            setValues({})
            toast.success("Item added!")
        } catch (error) {
            toast.error("Something went wrong!")
            console.error(error)
        }
    }

    return (
        <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
            {fields.map(field => (
                field.type === 'select' ?
                    <Select key={field.name} onValueChange={value => handleChange(field.name, value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((option) => (
                                <SelectItem key={option.id} value={option.id}>
                                    {option.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    :
                    field.type === 'textarea' ?
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor={field.name}>{field.placeholder}</Label>
                            <Textarea
                                id={field.name}
                                placeholder={field.placeholder}
                                value={values[field.name] ?? ''}
                                onChange={e => handleChange(field.name, e.target.value)}
                            />
                        </div>
                        :
                        <Input
                            key={field.name}
                            type={field.type}
                            value={values[field.name] ?? ''}
                            onChange={e => handleChange(field.name, field.type === 'number' ? e.target.valueAsNumber : e.target.value)}
                            placeholder={field.placeholder}
                        />
            ))}
            <Button type="submit">Add Item</Button>
        </form>
    )
}