'use client';
import { useEffect, useState } from "react";
import { Icons } from "../icons";
import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { signIn, signOut } from 'next-auth/react';
import { CredentialsForm } from "../auth/CredentialsForm";
import { CredentialsSignInButton, GithubSignInButton, SignOut } from "../auth/AuthButtons";

interface LoginLinkProps {
    user: any;
}

export default function LoginLink({ user }: LoginLinkProps) {
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
            <CredentialsForm />
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger className='flex w-full items-center justify-between'>
                    <div className='flex grow items-center gap-2'>
                        <Icons.code className="mr-2" />
                        <span className="">cmd + k</span>
                    </div>
                    <Badge variant="secondary" className='justify-end'>Login</Badge>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <GithubSignInButton />
                            <span className="ring-opacity-5/5 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black focus:outline-none">
                                {user ? (
                                    <button
                                        className={`${'flex w-full px-4 py-2 text-sm text-gray-700'
                                            }`}
                                        onClick={() => signOut()}
                                    >
                                        Sign out
                                    </button>
                                ) : (
                                    <button
                                        className={`${'flex w-full px-4 py-2 text-sm text-gray-700'
                                            }`}
                                        onClick={() => signIn('github')}
                                    >
                                        Sign in
                                    </button>
                                )}
                                <button onClick={SignOut}>sign out</button>
                            </span>
                            <CredentialsSignInButton />
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
