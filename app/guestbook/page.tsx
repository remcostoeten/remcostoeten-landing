'use client';

import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from "@/core/lib/firebase";
import { Button } from "@c/ui/button";
import GuestbookComments from "./components/GuestBookComments";
import { ProfileSkeleton } from "@/components/effects/Skeleton";
import IntroShell from "@/components/layout/IntroShell";
import { Icons } from "@/components/icons";
import { useGithubSignIn, useGoogleSignIn } from "@/core/hooks/signin-providers";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { motion, AnimatePresence } from "framer-motion";

const MotionPagination = motion(Pagination);
const MotionPaginationContent = motion(PaginationContent);
const MotionPaginationEllipsis = motion(PaginationEllipsis);
const MotionPaginationItem = motion(PaginationItem);
export {
    MotionPagination as Pagination,
    MotionPaginationContent as PaginationContent,
    MotionPaginationEllipsis as PaginationEllipsis,
    MotionPaginationItem as PaginationItem,
    MotionPagination as PaginationLink,
    MotionPagination as PaginationNext,
    PaginationPrevious as PaginationPrevious,
};

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
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(1);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

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
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const previousTwoPages = currentPage - 2;
    const nextTwoPages = currentPage + 2;
    const totalPages = Math.ceil(entries.length / entriesPerPage);

    const totalPageArray = Array.from(Array(totalPages).keys());
    const pageArray = totalPageArray.slice(previousTwoPages, nextTwoPages);

    return (
        <>
            <IntroShell title="Guestbook" description="It's your time to shine. Say whatever you want to say." />

            {loadingGithub || loadingGoogle ? (
                <ProfileSkeleton />
            ) : (
                <AnimatePresence>
                    <motion.div
                        // ToDo: fix layout shift
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={currentPage} 
                    >
                        <div className="flex flex-col gap-2">
                            {currentEntries.map((entry) => (
                                <GuestbookComments
                                    key={entry.id}
                                    avatarSrc={entry.avatar}
                                    nameHandle={entry.user}
                                    message={entry.text}
                                    date={entry.timestamp ? entry.timestamp.toDate().toLocaleString() : ''}
                                    avatarFallback={"s"}
                                />
                            ))}
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
                            <div>
                                <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                                <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                                {isClient && (
                                    <Pagination>
                                        <PaginationContent>
                                            {currentPage !== 1 && (
                                                <PaginationItem>
                                                    <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                                                </PaginationItem>
                                            )}
                                            {totalPageArray.map((page) => {
                                                if (page + 1 >= currentPage - 3 && page + 1 <= currentPage + 3) {
                                                    return (
                                                        <PaginationItem key={page}>
                                                            <PaginationLink
                                                                onClick={() => setCurrentPage(page + 1)}
                                                                isActive={page + 1 === currentPage}
                                                            >
                                                                {page + 1}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    );
                                                } else if (page + 1 === currentPage - 4 || page + 1 === currentPage + 4) {
                                                    return <PaginationEllipsis key={`ellipsis-${page}`} />;
                                                } else {
                                                    return null;
                                                }
                                            })}
                                            {currentPage !== totalPageArray.length && (
                                                <PaginationItem>
                                                    <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                                                </PaginationItem>
                                            )}
                                        </PaginationContent>
                                    </Pagination>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    );
}
