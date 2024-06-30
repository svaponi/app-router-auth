import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { Adapter } from 'next-auth/adapters';
import clientPromise from '@/lib/mongodb';
import authConfig from '@/auth/auth.config';
import CredentialsProvider from '@/auth/auth.credentials';
import { findUserByCredentials } from '@/lib/db';

const adapter: Adapter = MongoDBAdapter(clientPromise);
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  ...authConfig,
  providers: [
    ...authConfig.providers,
    CredentialsProvider(findUserByCredentials),
  ],
});
