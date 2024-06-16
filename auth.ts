import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';
import prisma from '@/lib/prisma';

const adapter: Adapter = PrismaAdapter(prisma);
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  providers: [Google, GitHub],
  pages: {
    signIn: '/login',
  },
});
