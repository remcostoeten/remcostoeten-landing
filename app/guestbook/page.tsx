import { Suspense } from 'react';

import GuestbookEntry from './components/guestbook-entry';
import GuestbookForm from './components/guestbook-form';
import { queryBuilder } from '@/core/lib/planetscale';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/dist/types/server';

async function getGuestbook() {
    const { isAuthenticated } = getKindeServerSession();
    const sessiom = await isAuthenticated();
    const data = await queryBuilder
        .selectFrom('guestbook')
        .select(['id', 'body', 'email', 'created_by', 'updated_at'])
        .orderBy('updated_at', 'desc')
        .limit(100)
        .execute();

    return data.map((entry) => {
        return { ...entry, updated_at: entry.updated_at.toISOString() };
    });
}

const GuestbookPage = () => {
    return (
        <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
            <Suspense>
                <GuestbookFormWrapper />
                <GuestbookEntries />
            </Suspense>
        </div>
    );
};

async function GuestbookEntries() {
    const [entries, session] = await Promise.all([
        getGuestbook(),
        auth(),
    ]);

    return (
        <div className="mt-4 space-y-8">
            {entries?.map((entry) => (
                <GuestbookEntry
                    key={entry.id.toString()}
                    entry={entry}
                    session={session}
                />
            ))}
        </div>
    );
}

async function GuestbookFormWrapper() {
    const session = await auth();
    return <GuestbookForm session={session} />;
}

export default GuestbookPage;