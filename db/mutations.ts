import { revalidatePath } from "next/cache";

function getKindeServerSession() {
    if (process.env.NODE_ENV === 'development') {
        // Return a fake user in development environment
        return {
            getUser: () => Promise.resolve({
                email: "test@example.com",
                given_name: "Test User",
            }),
        };
    } else {
        // Import the real getKindeServerSession function in other environments
        const { getKindeServerSession } = require("@kinde-oss/kinde-auth-nextjs/server");
        return getKindeServerSession();
    }
}

export async function saveGuestbookEntry(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const session = await getUser();
    const name = session?.given_name?.[0];

    let email = session?.email as string;
    let created_by = name || email;

    if (!session) {
        throw new Error('Unauthorized');
    }

    let entry = formData.get('entry')?.toString() || '';
    let body = entry.slice(0, 500);

    await prisma.guestbook.create({
        data: {
            email: email,
            body: body,
            created_by: created_by,
            created_at: new Date(),
        },
    });

    revalidatePath('/guestbook');
}