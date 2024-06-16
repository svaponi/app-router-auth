'use server';

import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from '@/app/auth/definitions';
import { findUserByEmail, insertUser } from '@/lib/db';
import { signIn } from '@/auth';

let bcrypt = {
  hash: async (text: string, len: number) => text,
  compare: async (text: string, encrypted: string | null) => text === encrypted,
};


export async function signup(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;

  // 3. Check if the user's email already exists
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return {
      message: 'Email already exists, please use a different email or login.',
    };
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Provider's API
  const user = await insertUser({
    name,
    email,
    hashedPassword,
  });

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  await signIn('credentials', formData);

  return undefined;
}

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {

  if (!formData.get('email')) {
    console.log('login early return');
    return {
      message: "login with " + formData.get('email'),
    };
  } else {
    console.log('login formData', formData);
  }

  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Query the database for the user with the given email
  const user = await findUserByEmail(validatedFields.data.email);

  console.log('user', user);

  // If user is not found, return early
  if (!user || !user.hashedPassword) {
    return { message: 'Invalid login credentials.' };
  }

  // 3. Compare the user's password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(
    validatedFields.data.password,
    user.hashedPassword,
  );

  // If the password does not match, return early
  if (!passwordMatch) {
    return { message: 'Invalid login credentials.' };
  }

  console.log('signIn', user, formData);

  await signIn('credentials', formData);

  // 4. If login successful, create a session for the user and redirect
  // return undefined;
}
