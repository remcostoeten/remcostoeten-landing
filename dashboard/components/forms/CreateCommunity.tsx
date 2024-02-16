'use client'
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/core/database/firebase';
import { toast } from 'sonner';

export default function NewCategoryForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'categories'), { name, description });
            setName('');
            setDescription('');
            toast.success('Category added!');
        } catch (error) {
            toast.error('Something went wrong!');
            console.error(error);
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">Category Name</span>
                <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-md"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </label>
            <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">Description</span>
                <textarea
                    className="border border-gray-300 p-2 rounded-md"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </label>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Add Category</button>
        </form>
    );
}