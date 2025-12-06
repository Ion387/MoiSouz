'use client';
import { CircularProgress, Grid2, Typography } from '@mui/material';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getDoc } from '@/services/getDocs';
import { type IDocAppeal } from '@/models/Doc';
import AppealForm from '@/components/forms/AppealForm';

const AppealPage = () => {
  const path = usePathname();
  const number = path.split('/')[3];

  const { data: doc, isLoading } = useQuery({
    queryKey: ['doc'],
    queryFn: () => getDoc<IDocAppeal>(number),
    select: (data) => data,
  });

  return (
    <Grid2 container spacing={1.2}>
      <Grid2 size={8}>
        <Typography variant="h3" marginBottom={2} pt={3}>
          Обращение
        </Typography>
        {isLoading ? (
          <CircularProgress></CircularProgress>
        ) : (
          <AppealForm doc={doc} />
        )}
      </Grid2>
    </Grid2>
  );
};

export default AppealPage;
