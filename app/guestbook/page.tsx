'use client';

import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query, orderBy, Unsubscribe, Timestamp, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from "@/core/lib/firebase";
import { Button } from "@c/ui/button";
import Image from "next/image";
import { useAuthState, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GuestbookComments from "./components/GuestBookComments";
import Spinner, { MiniSpinner } from "@/components/effects/Spinner";
import { toast } from "sonner";



interface GuestbookEntry {
  id?: string;
  user?: string;
  avatar?: string;
  text?: string;
  timestamp?: any;
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

  const handleNewEntryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewEntry(event.target.value);
  };

  const noAvatarAvailable = () => {
    if (user?.user?.displayName) {
      return user.user.displayName;
    } else if (user?.user?.email) {
      return user.user.email[0].toUpperCase();
    } else {
      return '🧙';
    }
  }

  console.log("user", user);
  console.log("noavatar", noAvatarAvailable());
  const photoURL = user?.user?.photoURL;
  const displayName = user?.user?.displayName;

  const handleNewEntrySubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newEntry.trim() === '') {
      return;
    }
    const photoURL = user?.user?.photoURL;
    const entriesRef = collection(firestore, 'guestbook');
    const newEntryData: Omit<GuestbookEntry, 'id'> = {
      user: user?.user?.displayName || '',
      text: newEntry,
      timestamp: serverTimestamp(),
    };
    await addDoc(entriesRef, newEntryData);

    setNewEntry('');
  };



  const avatarFallback = () => {
    if (!photoURL) {
      return displayName ? displayName[0] : 'U';
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-4 text-3xl font-bold">Guestbook</h1>

      {loading ? (
        <MiniSpinner />
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
            <Button onClick={() => signInWithGoogle()}>Sign In to Post Entry</Button>
          )}
          {entries.map((entry) => (
            <GuestbookComments
              avatarSrc={entry.avatar}
              nameHandle={entry.user}
              message={entry.text}
              date={entry.timestamp ? entry.timestamp.toDate().toLocaleString() : ''}
              avatarFallback={avatarFallback()}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Guestbook;