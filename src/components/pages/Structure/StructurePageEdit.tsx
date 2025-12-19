'use client';

import StructureCreateForm from '@/components/forms/StructrureCreateForm';
import { getStructure } from '@/hooks/UseFormTUReg';
import { type ITradeUnion } from '@/models/TradeUnion';
import { useQuery } from '@tanstack/react-query';

import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

const StructurePageCreateContent = () => {
  const searchParams = useSearchParams();
  const guid = searchParams.get('guid') || undefined;
  const [node, setNode] = useState<ITradeUnion | null>(null);

  const { data: info } = useQuery({
    queryKey: ['tradeunionTree'],
    queryFn: async () => {
      return await getStructure(String(guid));
    },
    select: (data) => data.data,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (info && guid) {
      setNode(info);
    }
  }, [info, guid]);

  return <StructureCreateForm tu={node} />;
};

const StructurePageCreate = () => {
  return (
    <Suspense>
      <StructurePageCreateContent />
    </Suspense>
  );
};

export default StructurePageCreate;
