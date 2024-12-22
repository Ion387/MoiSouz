import { IExpandedSession } from '@/models/CustomSession';
import { useSession } from 'next-auth/react';

export function useGetProfileInfo() {
  const { data } = useSession();
  const session = data as IExpandedSession;

  return session && session.user
    ? { profileInfo: session.user }
    : { profileInfo: null };
}
