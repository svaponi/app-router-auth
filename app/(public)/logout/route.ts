import { signOut } from '@/auth';

export async function GET() {
  await signOut();
  return { status: 302, headers: { location: '/' } };
}
