'use client';

import React from 'react';
import { TreeTable } from './Table';
import { useFetchTree } from '@/hooks/UseTree';
import { CircularProgress } from '@mui/material';

const StructurePage = () => {
  const {
    data: { data: data, isFetching: isLoading },
  } = useFetchTree({
    type: 'arr',
    perPage: 1000,
  });

  if (isLoading) return <CircularProgress></CircularProgress>;

  return <TreeTable data={data} />;
};

export default StructurePage;
