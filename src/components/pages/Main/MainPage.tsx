'use client';

import React from 'react';
import NewProfileDialog from '@/components/entities/profile/newProfileDialog';
import { getDocs } from '@/services/getDocs';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

const Main = () => {
  const { data: docs } = useQuery({
    queryKey: ['docs'],
    queryFn: getDocs,
    select: (data) => data.data,
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" marginBottom={2}>
        Этот раздел пока пуст
      </Typography>
      <NewProfileDialog open={docs && !docs.length}></NewProfileDialog>
    </Box>
  );
};

export default Main;
