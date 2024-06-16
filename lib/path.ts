import 'server-only';
import { headers } from 'next/headers';

export function getPathname() {
  const heads = headers();
  return heads.get('next-url-pathname');
}
