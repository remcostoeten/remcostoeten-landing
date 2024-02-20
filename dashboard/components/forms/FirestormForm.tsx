// @ts-nocheck
"use client";
// components/FirebaseForm.tsx

import React, { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/core/database/firebase";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@c/ui/button";
import useFormSubmit from "@/hooks/useHandleSubmit";

type Field = {
  options?: Option[];
  name?: string;
  type?: "text" | "number" | "select" | "textarea";
  placeholder?: string;
  optionsCollection?: string;
};

type Option = {
  id: string;
  categoryName: string;
};

type FormProps = {
  fields: any;
  collectionName: string;
};

export function FirebaseForm({ fields, collectionName }: FormProps) {
  const { values, setValues, handleSubmit } = useFormSubmit(collectionName);

  useEffect(() => {
    fields.forEach((field: Field) => {
      if (field.type === "select" && field.optionsCollection) {
        const unsubscribe = onSnapshot(
          collection(db, field.optionsCollection),
          (snapshot) => {
            const options: Option[] = [];
            snapshot.forEach((doc) => {
              const option = doc.data() as Option;
              option.id = doc.id;
              options.push(option);
            });
            field.options = options;
          },
        );
        return (): void => unsubscribe();
      }
    });
  }, [fields]);

  const handleChange = (name: string, value: any) => {
    setValues((prevValues: any) => ({ ...prevValues, [name]: value }));
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      {fields.map((field: Field) =>
        field.type === "select" ? (
          <Select
            key={field.name}
            onValueChange={(value: any) => handleChange(field.name, value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: Option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.categoryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : field.type === "textarea" ? (
          <div className="grid w-full gap-1.5">
            <Label htmlFor={field.name}>{field.placeholder}</Label>
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              value={values[field.name] ?? ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChange(field.name, e.target.value)
              }
            />
          </div>
        ) : (
          <Input
            key={field.name}
            type={field.type}
            value={values[field.name] ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(
                field.name,
                field.type === "number"
                  ? e.target.valueAsNumber
                  : e.target.value,
              )
            }
            placeholder={field.placeholder}
          />
        ),
      )}
      <Button type="submit">Add Item</Button>
    </form>
  );
}
