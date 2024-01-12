'use client';
import { useState, useEffect } from 'react';
import { Icons } from "../icons";
import { Badge } from "../ui/badge";
import {
  AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger
} from "../ui/alert-dialog";
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/core/lib/firebase';

export default function LoginLink() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

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
          <Badge variant="secondary" className='justify-end'>{isSignup ? 'Sign Up' : 'Login'}</Badge>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">{isSignup ? 'Create an account' : 'Sign in'}</CardTitle>
              <CardDescription>
                Enter your email and password below to {isSignup ? 'create your account' : 'sign in'}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-6">
                <Button variant="outline" onClick={useSignInWithGithub}>
                  <Button variant="outline" className="flex gap-2">
                    Google
                  </Button>
              </div>
              {isSignup && (
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your name" />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="test@test.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
            </CardContent>
            <CardFooter className=' flex flex-col items-start gap-2'>
              <Button className="w-full">{isSignup ? 'Create account' : 'Sign in'}</Button>
              <span onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? (
                  <>
                    <span>Already have an account? </span>
                    <span
                      onClick={() => setIsSignup(!isSignup)}
                      className="cursor-pointer underline"
                    >
                      Sign in
                    </span>
                  </>
                ) : (
                  <>
                    <span>Don&apos;t have an account? </span>
                    <span
                      onClick={() => setIsSignup(!isSignup)}
                      className="cursor-pointer underline"
                    >
                      Sign up
                    </span>
                  </>
                )}
              </span>
            </CardFooter>
          </Card>

        </AlertDialogContent>
      </AlertDialog >
    </>
  );
}
