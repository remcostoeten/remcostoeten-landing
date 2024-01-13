'use client';

import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from "@/core/lib/firebase";
import { Button } from "@c/ui/button";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GuestbookComments from "./components/GuestBookComments";
import { ProfileSkeleton, SkeletonBar } from "@/components/effects/Skeleton";
import IntroShell from "@/components/layout/IntroShell";
import { Icons } from "@/components/icons";
import { useGithubSignIn, useGoogleSignIn } from "@/core/hooks/signin-providers";

interface GuestbookEntry {
    id?: string;
    user?: string;
    avatar?: string;
    text?: string;
    timestamp?: any;
}

export default function GuestBookPage() {
    const [entries, setEntries] = useState<GuestbookEntry[]>([]);
    const [newEntry, setNewEntry] = useState('');
    const [signInWithGithub, userGithub, loadingGithub, errorGithub] = useGithubSignIn();
    const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useGoogleSignIn();
    const [isLoading, setIsLoading] = useState(false);
    const user = auth.currentUser;
    const photoURL = user?.photoURL;
    const displayName = user?.displayName;

    useEffect(() => {
        const entriesRef = collection(firestore, 'guestbook');
        const orderedEntriesQuery = query(entriesRef, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(orderedEntriesQuery, (snapshot) => {
            const fetchedEntries: GuestbookEntry[] = [];
            snapshot.forEach((doc) => {
                const entry = doc.data() as GuestbookEntry;
                entry.id = doc.id;
                fetchedEntries.push(entry);
            });

            setEntries(fetchedEntries);
        });

        return () => unsubscribe();
    }, []);

    const handleNewEntryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewEntry(event.target.value);
    };

    const handleNewEntrySubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (newEntry.trim() === '') {
            return;
        }
        const entriesRef = collection(firestore, 'guestbook');
        const newEntryData: Omit<GuestbookEntry, 'id'> = {
            user: user?.displayName || '',
            avatar: user?.photoURL || '',
            text: newEntry,
            timestamp: serverTimestamp(),
        };

        await addDoc(entriesRef, newEntryData);

        setNewEntry('');
    };

    const handleSignIn = async (provider: 'github' | 'google') => {
        setIsLoading(true);
        try {
            if (provider === 'github') {
                await signInWithGithub();
            } else if (provider === 'google') {
                await signInWithGoogle();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <IntroShell title="Guestbook" description="It's your time to shine. Say whatever you want to say." />

            {loadingGithub || loadingGoogle ? (
                <ProfileSkeleton />
            ) : (
                <div className="flex flex-col gap-2">
                    {entries.map((entry) => {
                        console.log(entry);
                        return (
                            <GuestbookComments
                                avatarSrc={entry.avatar}
                                nameHandle={entry.user}
                                message={entry.text}
                                date={entry.timestamp ? entry.timestamp.toDate().toLocaleString() : ''}
                                avatarFallback={"s"}
                            />
                        );
                    })}
                    {user ? (
                        <form className="flex flex-col items-start gap-2" onSubmit={handleNewEntrySubmit}>
                            <textarea
                                value={newEntry}
                                onChange={handleNewEntryChange}
                                placeholder="Leave a message"
                                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent p-4 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <Button type="submit">Post Entry</Button>
                        </form>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <h4 className="text-gray-400">Please login in order to leave a message</h4>
                            <div className="flex items-center gap-2">
                                <Button variant='outline' onClick={() => handleSignIn('github')}>
                                    <Icons.gitHub className="mr-2 h-4 w-4" />Sign In with Github
                                </Button>
                                <Button variant='outline' onClick={() => handleSignIn('google')}>
                                    <Icons.google.bnw className="mr-2 h-4 w-4" fill="white" />Sign in with Google
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
