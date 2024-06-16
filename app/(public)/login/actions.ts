'use server';

import { signIn } from '@/auth';
import { FormState } from '@/app/auth/definitions';

export async function loginWithGoogle() {
  await signIn('google', { redirectTo: '/dashboard', redirect: true });
}

export async function loginWithGithub() {
  await signIn('github', { redirectTo: '/dashboard', redirect: true });
}

export async function loginTest(prevState: any, formData: FormData): Promise<FormState> {
  console.log('loginTest', prevState, formData);
  return {
    message: 'Please enter a valid email',
  }
}
