import clientPromise from '@/lib/mongodb';
import { User } from 'next-auth';

export async function getDb() {
  const client = await clientPromise;
  return client.db();
}

export async function getProducts(query?: any) {
  const db = await getDb();
  const collection = db.collection('products');
  const filter: any = {};
  const { q } = query ?? {};
  if (q && q.length) {
    filter.title = { $regex: q, $options: 'i' };
  }
  return await collection.find(filter).toArray();
}

interface DUser extends User {
  id?: string;
  email: string;
  name?: string;
  image?: string;
  hashedPassword?: string;
}

export async function insertUser(user: DUser): Promise<DUser> {
  const db = await getDb();
  const collection = db.collection('users');
  const result = await collection.insertOne(user);
  console.log('insertUser', user, result);
  return { ...user, id: result.insertedId.toString() };
}

export async function updateUser(user: DUser): Promise<DUser> {
  const db = await getDb();
  const collection = db.collection('users');
  const result = await collection.replaceOne({ email: user.email }, user);
  console.log('updateUser', user, result);
  return user;
}

export async function findUserByEmail(email: string): Promise<DUser | null> {
  const db = await getDb();
  const collection = db.collection('users');
  const user = await collection.findOne<DUser>({ email });
  console.log('findUserByEmail', email, user);
  return user;
}

export async function findUserByCredentials(
  email: string,
  hashedPassword: string,
): Promise<DUser | null> {
  const db = await getDb();
  const collection = db.collection('users');
  const user = await collection.findOne<DUser>({ email, hashedPassword });
  console.log('findUserByCredentials', email, hashedPassword, user);
  return user;
}
