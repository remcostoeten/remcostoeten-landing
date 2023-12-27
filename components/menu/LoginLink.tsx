'use client';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { CredentialsForm } from "../auth/CredentialsForm";
import { CredentialsSignInButton, GithubSignInButton, SignOut } from "../auth/AuthButtons";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Icons } from '../icons';
import { Badge } from '../ui/badge';
import CreateAccountShell from '../auth/CreateAccountShell';

export default function LoginLink() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

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
                        <Icons.code className="mr-2" />
                        <span className="">cmd + k</span>
                    </div>
                    <Badge variant="secondary" className='justify-end'>Login</Badge>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <CreateAccountShell />
                    <AlertDialogHeader>
                        <AlertDialogTitle>Login</AlertDialogTitle>
                        <AlertDialogDescription>
                            <GithubSignInButton />
                            <CredentialsSignInButton />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {session ? (
                            <AlertDialogAction
                                onClick={() => signOut()}
                            >
                                Sign out
                            </AlertDialogAction>
                        ) : (
                            <AlertDialogAction
                                onClick={() => signIn('github')}
                            >
                                Sign in
                            </AlertDialogAction>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
            <div className="mb-6 flex items-center justify-start"></div>
        </>
    );
}