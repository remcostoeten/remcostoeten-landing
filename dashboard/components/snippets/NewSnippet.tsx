'use client';

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

type NewSnippetProps = {
    trigger: React.ReactNode | string;
    title?: string;
    children: React.ReactNode;
}

export default function NewSnippet({ trigger, title, children }: NewSnippetProps) {
    return (
        <>
            <Dialog>
                <DialogTrigger>{trigger}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {children}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog >
        </ >
    )
}
