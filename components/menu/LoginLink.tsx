'use client';
import { useState, useEffect } from 'react';
import { Icons } from "../icons";
import { Badge } from "../ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../ui/alert-dialog";
import AuthForm from '@/auth/AuthForm';

export default function LoginLink() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                setIsOpen(prevIsOpen => !prevIsOpen);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger className='flex w-full items-center justify-between'>
                    <div className='flex grow items-center gap-2'>
                        <Icons.shortcut className="mr-2" />
                        <span className="">cmd + k</span>
                    </div>
                    <Badge variant="secondary" className='justify-end'>Login</Badge>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <AuthForm type='login' />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="mb-6 flex items-center justify-start"></div>
        </>
    );
}
