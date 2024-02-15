'use client'
import { useState, useEffect } from 'react';
import { onSnapshot, doc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { toast } from 'sonner';
import { db } from '@core/database/firebase';

export function useFirestoreCollection(collectionName) {
    const [data, setData] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
            const fetchedData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(fetchedData);
        });

        return () => unsubscribe();
    }, [collectionName]);

    const handleDelete = async (itemId) => {
        try {
            await deleteDoc(doc(db, collectionName, itemId));
            toast.success('Item deleted successfully.');
        } catch (error) {
            toast.error('Something went wrong.');
            console.error(error);
        }
    };

    const handleEdit = (itemId) => {
        setEditingItemId(itemId);
    };

    const handleUpdate = async (itemId, newData) => {
        try {
            await updateDoc(doc(db, collectionName, itemId), newData);
            toast.success('Item updated successfully.');
            setEditingItemId(null);
        } catch (error) {
            toast.error('Something went wrong.');
            console.error(error);
        }
    };

    return { data, editingItemId, handleDelete, handleEdit, handleUpdate };
}
