'use client';

import { getSession } from 'next-auth/react';
interface PropsGetHeaders {
  Authorization: string;
}

export const getHeaders = async (): Promise<PropsGetHeaders> => {
  const session = await getSession();

  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const tokenFromCookie = getCookie('token');
  const token = session?.user?.token || tokenFromCookie;

  return { Authorization: `Bearer ${token}` };
};
