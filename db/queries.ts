import { PrismaClient } from "@prisma/client";
import {
    unstable_cache as cache,
    unstable_noStore as noStore,
} from 'next/cache';

const prisma = new PrismaClient();

export async function getGuestbookEntries() {
    noStore();
    let entries = await prisma?.guestbook?.findMany({
        select: {
            id: true,
            body: true,
            created_by: true,
            created_at: true,
        },
        orderBy: {
            created_at: 'desc',
        },
        take: 100,
    });
    return entries;
}