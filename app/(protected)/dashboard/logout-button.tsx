import { LogOutIcon } from '@/components/ui/icons';
import Link from 'next/link';

export default function LogoutButton() {
  return (
    <Link href={'/logout'}>
      <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:text-gray-900">
        <LogOutIcon className="h-4 w-4" />
        Logout
      </button>
    </Link>
  );
}
