'use client'
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../core/lib/firebase';
import { collection, orderBy } from 'firebase/firestore';

interface GuestbookEntry {
    id: string;
    user: string;
    text: string;
    timestamp: Date;
}

const Guestbook = () => {
    const [user] = useAuthState(auth); // Added user state
    const entriesRef = collection(firestore, 'guestbook');
    const orderedEntriesQuery = orderBy(entriesRef, 'timestamp', 'desc');

    const [entries, loading, error] = useCollectionData<GuestbookEntry>(orderedEntriesQuery, {
        idField: 'id', // Optional: Rename the id field to 'id'
        snapshotListenOptions: { includeMetadataChanges: true },
        transform: (doc) => {
            // Optional: Transform data if needed (e.g., converting timestamp to Date)
            return {
                id: doc.id,
                user: doc.user,
                text: doc.text,
                timestamp: doc.timestamp.toDate(), // Assuming 'timestamp' is a Firestore Timestamp
            };
        },
    });

    const [newEntry, setNewEntry] = useState('');

    useEffect(() => {
        // Additional logic, if needed
    }, []);

    const addEntry = async () => {
        if (!user || !newEntry.trim()) return;

        await firestore.collection('guestbook').add({
            user: user.displayName,
            text: newEntry,
            timestamp: new Date(),
        });

        setNewEntry('');
    };

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.displayName}!</p>
                    {error && <strong>Error: {JSON.stringify(error)}</strong>}
                    {loading && <span>Collection: Loading...</span>}
                    {entries && (
                        <div>
                            <ul>
                                {entries.map((entry) => (
                                    <li key={entry.id}>
                                        <strong>{entry.user}:</strong> {entry.text}
                                    </li>
                                ))}
                            </ul>
                            <textarea value={newEntry} onChange={(e) => setNewEntry(e.target.value)} />
                            <button onClick={addEntry}>Add Entry</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Please sign in to leave a guestbook response.</p>
            )}
        </div>
    );
};

export default Guestbook;