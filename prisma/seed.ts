import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.guestbook.create({
    data: {
      email: "test1@example.com",
      body: "Test body 1",
      created_by: "Test User 1",
    },
  });

  await prisma.guestbook.create({
    data: {
      email: "test2@example.com",
      body: "Test body 2",
      created_by: "Test User 2",
    },
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
