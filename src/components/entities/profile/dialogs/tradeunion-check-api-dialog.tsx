'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { TradeunionCheckDialog } from '@/components/entities/profile';

import { useFetchProfile } from '@/hooks/useFetchProfile';
import { getDocs } from '@/services/getDocs';

export const TradeunionCheckApiDialog = () => {
  const { data: docs, isLoading } = useQuery({
    queryKey: ['docs'],
    queryFn: getDocs,
    select: (data) => data.data,
  });

  const info = useFetchProfile();

  return (
    <TradeunionCheckDialog
      open={
        !info?.ROLES?.includes('ROLE_TRADEUNION') &&
        docs &&
        !docs.length &&
        !isLoading
      }
    />
  );
};
