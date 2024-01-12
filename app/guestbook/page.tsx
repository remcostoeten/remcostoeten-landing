'use client';

import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query, orderBy, Unsubscribe, Timestamp } from "firebase/firestore";
import { auth, firestore } from "@/core/lib/firebase";
import { Button } from "@c/ui/button";
import Image from "next/image";
import { useAuthState, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GuestbookComments from "./components/GuestBookComments";



interface GuestbookEntry {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: Date;
}

const Guestbook = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

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

  const handleNewEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const comments = [
    {
      id: '1',
      userAvatar: 'https://dribbble.com/',
      userName: 'User 1',
      text: 'This is a comment from User 1.',
      date: '2022-01-01',
    },
    {
      id: '2',
      userAvatar: 'https://dribbble.com/',
      userName: 'User 2',
      text: 'This is a comment from User 2.',
      date: '2022-01-02',
    },
  ];
  const photoURL = user?.user?.photoURL;
  const displayName = user?.user?.displayName;

  const avatarFallback = () => {
    if (!photoURL) {
      return displayName ? displayName[0] : 'U';
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-4 text-3xl font-bold">Guestbook</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {user ? (
            <form onSubmit={handleNewEntrySubmit}>
              <textarea
                value={newEntry}
                onChange={handleNewEntryChange}
                placeholder="Leave a message"
                className="mb-3 w-full rounded border border-gray-300 p-2"
              />
              <Button type="submit">Post Entry</Button>
            </form>
          ) : (
            <Button onClick={() => signInWithGoogle()}>Sign In</Button>
          )}
          {entries.map((entry) => (
            <GuestbookComments avatarSrc={entry.avatar} nameHandle={entry.user} message={entry.text} date={entry.timestamp.toDate().toLocaleString()} avatarFallback={avatarFallback()} />
            // < key={entry.id} className="mt-4">
            // <Image src={entry.avatar} alt={entry.user} className="h-8 w-8 rounded-full" />
            // <p className="font-bold">{entry.user}</p>
            // <p>{entry.text}</p>
            // <p className="text-sm text-gray-500">{entry.timestamp.toD ate().toLocaleString()}</p>
          ))}
        </>
      )}
    </div>
  );
}

export default Guestbook;