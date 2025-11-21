'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { setCookie, deleteCookie } from 'cookies-next';

interface UseTokenFromQueryOptions {
  cookieName?: string;
  redirectPath?: string;
  onSuccess?: (token: string) => void;
  onError?: (error: Error) => void;
}

export const useTokenFromQuery = (options: UseTokenFromQueryOptions = {}) => {
  const {
    cookieName = 'token',
    redirectPath = '/',
    onSuccess,
    onError,
  } = options;

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const processToken = async () => {
      const token = searchParams.get('token');

      if (!token) {
        return;
      }

      setIsProcessing(true);

      try {
        setCookie(cookieName, token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          secure: false,
          sameSite: 'lax',
        });

        setHasToken(true);

        onSuccess?.(token);

        if (redirectPath) {
          router.replace(redirectPath);
        }
      } catch (error) {
        console.error('Error setting token cookie:', error);
        onError?.(error as Error);
      } finally {
        setIsProcessing(false);
      }
    };

    processToken();
  }, [searchParams, router, cookieName, redirectPath, onSuccess, onError]);

  const clearToken = () => {
    deleteCookie(cookieName);
    setHasToken(false);
  };

  return {
    isProcessing,
    hasToken,
    clearToken,
  };
};
