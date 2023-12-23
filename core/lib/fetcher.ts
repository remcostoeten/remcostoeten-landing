// @ts-nocheck
import { unstable_cache } from "next/cache";
import prisma from "@/core/lib/prisma";

export const getViews = async (slug: string) => {
    return await unstable_cache(
        async () => {
            const views = await prisma.views.findUnique({ where: { slug } });

            return views?.count.toString();
        },
        [slug],
        {
            revalidate: 1,
            tags: [slug],
        },
    )();
};
