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
  AlertDialogHeader, AlertDialogTrigger
} from "../ui/alert-dialog";
i

export default function LoginLink() {mport { SignIn } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
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
          <SignedOut>
            <Badge variant="secondary" className='justify-end'>Login</Badge>
          </SignedOut>
          <SignedIn>
            <Badge variant="secondary" className='justify-end'>     <SignOutButton /></Badge>
          </SignedIn>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              <SignIn />
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
