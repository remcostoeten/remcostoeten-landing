'use client';
import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Icons } from '../theme/icons';
import { Input } from '../ui/input';
import { useAuthState, useSignInWithEmailAndPassword, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/core/database/firebase';
import { toast } from 'sonner';
import { useGithubSignIn, useGoogleSignIn } from '@/hooks/signin-providers';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Auth, AuthError, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [signOut] = useSignOut(auth);
    const [user] = useAuthState(auth);
    const [wasLoggedIn, setWasLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<AuthError>();
    const [loggedInUser, setLoggedInUser] = useState<UserCredential>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const signInWithEmailAndPassword = useCallback(
        async (email: string, password: string) => {
            setLoading(true);
            setError(undefined);
            try {
                const user = await firebaseSignInWithEmailAndPassword(auth, email, password);
                setLoggedInUser(user);
                return user;
            } catch (err) {
                setError(err as AuthError);
            } finally {
                setLoading(false);
            }
        },
        [auth]
    );

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (user) {
            setWasLoggedIn(true);
            toast('Logged in successfully');
            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);
        } else {
            setWasLoggedIn(false);
            toast('Logged out successfully');
        }
    }, [user, isOpen, wasLoggedIn]);

    const [signInWithGoogle] = useGoogleSignIn();

    const signInWithGithub = () => {
        signInWithGithub();
        if (user) {
            toast('Logged in successfully');
            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);
        }
    }

    return (
        <>
            <Tooltip>
                <TooltipTrigger>
                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl">
                                {isSignup ? 'Create an account' : 'Sign in'}
                            </CardTitle>
                            <CardDescription>
                                Enter your email and password below to{' '}
                                {isSignup ? 'create your account' : 'sign in'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-6">
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" onClick={() => signInWithGithub()}>
                                        <Icons.gitHub className="size-4" />
                                    </Button>
                                    <Button variant="outline" onClick={() => signInWithGoogle()}>
                                        <Icons.google.color className="size-4" />
                                    </Button>
                                </div>

                                {isSignup && (
                                    <div className="grid gap-2">
                                        <Label>Name</Label>
                                        <Input disabled id="name" type="text" placeholder="Your name" />
                                    </div>
                                )}
                                <div className="grid gap-2">
                                    <Label>Email</Label>
                                    <Input disabled id="email" type="email" placeholder="test@test.com" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Password</Label>
                                    <Input disabled id="password" type="password" />
                                </div>
                                <TooltipContent>
                                    Sign in & register is currently disabled through email and password. <br /> Please use Github or Google to sign in.
                                </TooltipContent>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-2">
                            <Button className="w-full" disabled={loading}>
                                {loading ? 'Signing in...' : isSignup ? 'Create account' : 'Sign in'}
                            </Button>
                            <span onClick={() => setIsSignup(!isSignup)}>
                                {isSignup ? (
                                    <>
                                        <span>Already have an account? </span>
                                        <span onClick={() => setIsSignup(!isSignup)} className="cursor-pointer underline">
                                            Sign in
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span>Don&apos;t have an account? </span>
                                        <span onClick={() => setIsSignup(!isSignup)} className="cursor-pointer underline">
                                            Sign up
                                        </span>
                                    </>
                                )}
                            </span>
                        </CardFooter>
                    </Card>
                </TooltipTrigger>
            </Tooltip>
        </>
    );
}