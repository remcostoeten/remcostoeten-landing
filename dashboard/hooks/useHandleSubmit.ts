// hooks/useFormSubmit.ts

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/core/database/firebase';
import { toast } from 'sonner';

const useFormSubmit = (collectionName: string) => {
  const [values, setValues] = useState<{ [key: string]: any }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, collectionName), values);
      setValues({});
      toast.success('Item added!');
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    }
  };

  return { values, setValues, handleSubmit };
};

export default useFormSubmit;
