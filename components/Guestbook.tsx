'use client';
import React, { useEffect, useState } from "react";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    Unsubscribe,
} from "firebase/firestore";
import {
    useAuthState,
    useSignInWithGithub,
    useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { auth, firestore } from "@/core/lib/firebase";
import { Button } from "./ui/button";
import Spinner, { MiniSpinner } from "./effects/Spinner";

interface GuestbookEntry {
    id: string;
    user: string;
    avatar: string;
    text: string;
    timestamp: Date;
}

const Guestbook: React.FC = () => {
    const [signInWithGitHub, userCredential, loading, error] = useSignInWithGithub(auth);
    const [entries, setEntries] = useState<GuestbookEntry[]>([]);
    const [newEntry, setNewEntry] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (userCredential) {
        const user = userCredential.user;
        return (
            <div>
                <p>Signed In User: {user.email}</p>
            </div>
        );
    }

    useEffect(() => {
        let unsubscribe: Unsubscribe;
        const entriesRef = collection(firestore, 'guestbook');
        const orderedEntriesQuery = query(entriesRef, orderBy('timestamp', 'desc'));

        unsubscribe = onSnapshot(orderedEntriesQuery, (snapshot) => {
            const fetchedEntries: GuestbookEntry[] = [];
            snapshot.forEach((doc) => {
                const entry = doc.data() as GuestbookEntry;
                fetchedEntries.push(entry);
            });

            setEntries(fetchedEntries);
        });

        return () => unsubscribe && unsubscribe();
    }, []);

    const handleNewEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewEntry(event.target.value);
    };

    const handleNewEntrySubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (newEntry.trim() === '') {
            return;
        }

        const entriesRef = collection(firestore, 'guestbook');
        const newEntryData: GuestbookEntry = {
            id: '',
            user: user?.displayName || '',
            avatar: user?.photoURL || '',
            text: newEntry,
            timestamp: new Date(),
        };

        await addDoc(entriesRef, newEntryData);

        setNewEntry('');
    };

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    if (loading) {
        return <MiniSpinner />;
    }

    if (userCredential) {
        const user = userCredential.user; // Extract the User from UserCredential

        return (
            <div>
                <p>Signed In User: {user.email}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="App">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={() => signInWithGitHub()}>Sign In</Button>
            </div>
            {!userCredential ? (
                <div>d</div>
            ) : (
                <div>
                    <form onSubmit={handleNewEntrySubmit}>
                        <input type="text" value={newEntry} onChange={handleNewEntryChange} />
                        <button type="submit">Add Entry</button>
                    </form>
                    {entries.map((entry) => (
                        <div key={entry.id}>
                            <img src={entry.avatar} alt={entry.user} />
                            <p>
                                {entry.user}: {entry.text}
                            </p>
                            <p>{entry.timestamp.toString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Guestbook;
