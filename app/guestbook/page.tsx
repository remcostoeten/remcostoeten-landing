'use client';

import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase, { auth, firestore } from "@/core/lib/firebase";
import { Button } from "@c/ui/button";
import Image from "next/image";




interface GuestbookEntry {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: Date;
}

const Guestbook = () => {
  const [user, loading, error] = useAuthState(auth);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');



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

  const handleNewEntrySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get the current user
    const currentUser = auth.currentUser;

    // Create a new entry
    const newEntry = {
      text: newEntry,
      user: currentUser.displayName, // Store the user's display name
      avatar: currentUser.photoURL,  // Store the user's avatar URL
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Store the current time
    };

    // Add the new entry to the database
    await firebase.firestore().collection('entries').add(newEntry);

    // Clear the new entry text
    setNewEntry(''); // Use setNewEntry instead of setNewEntryText
  };
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
            <Button onClick={() => signInWithGithub()}>Sign In</Button>
          )}

          {entries.map((entry) => (
            <div key={entry.id} className="mt-4">
              <Image src={entry.avatar} alt={entry.user} className="h-8 w-8 rounded-full" />
              <p className="font-bold">{entry.user}</p>
              <p>{entry.text}</p>
              <p className="text-sm text-gray-500">{entry.timestamp.toDate().toLocaleString()}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Guestbook;