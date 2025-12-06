'use client';

import { getDoc } from '@/services/getDocs';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React from 'react';
import TradeUnionMemberPage from '../TradeUnionMember/TradeUnionMemberPage';
import NewDocumentPage from '@/app/(user)/new_document/page';
import NewProtocolPage from '@/app/(user)/new_protocol/page';
import { CircularProgress } from '@mui/material';
import AppealPage from '../Appeal/AppealPage';

const DraftPage = () => {
  const path = usePathname();
  const number = path.split('/')[3];
  const { data: doc, isLoading } = useQuery({
    queryKey: ['doc', number],
    queryFn: () => getDoc(number),
  });

  if (isLoading) return <CircularProgress />;
  if (doc?.documentNumber?.includes('AM')) return <TradeUnionMemberPage />;
  if (doc?.documentNumber?.includes('AG')) return <NewDocumentPage />;
  if (doc?.documentNumber?.includes('PR')) return <NewProtocolPage />;
  if (doc?.documentNumber?.includes('AP')) return <AppealPage />;
};

export default DraftPage;
