import NextAuth, { User } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import prisma from '@/core/lib/prisma';

export async function authenticate(credentials: { email: string; password: string }) {
  // Use Prisma for email/password authentication
  if (credentials.email && credentials.password) {
    const dbUser = await prisma.user.findFirst({
      where: { email: credentials.email },
    });

    if (dbUser && dbUser.password === credentials.password) {
      const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
      return dbUserWithoutPassword as User;
    }
  }

  // Use Postgres for email/password authentication if Prisma doesn't match
  const response = await sql`
    SELECT * FROM users WHERE email=${credentials?.email}`;
  const user = response.rows[0];

  if (user) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  return null;
}

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.OAUTH_CLIENT_SECRET as string
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        return authenticate(credentials);
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };