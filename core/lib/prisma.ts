// import { PrismaClient } from "@prisma/client";

// // @ts-ignore
// interface CustomNodeJsGlobal extends NodeJS.Global {
//     prisma: PrismaClient;
// }

// // Prevent multiple instances of Prisma Client in development
// declare const global: CustomNodeJsGlobal;

// const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV === "development") global.prisma = prisma;

// export default prisma;


import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;