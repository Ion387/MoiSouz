'use client';

import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, useColorScheme } from '@mui/material/styles';
import theme from '@/styles/theme';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { SessionProvider } from 'next-auth/react';

const Providers = ({ children }: PropsWithChildren) => {
  const { setMode } = useColorScheme();
  setMode('light');
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const cache = React.useMemo(() => {
    return createCache({ key: 'css', prepend: true });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
};

export default Providers;
