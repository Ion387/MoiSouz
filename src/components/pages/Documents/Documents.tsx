'use client';

import NewProfileDialog from '@/components/entities/profile/newProfileDialog';
import { getDocs } from '@/services/getDocs';

import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const DocumentsPage = () => {
  const { data: docs } = useQuery({
    queryKey: ['docs'],
    queryFn: getDocs,
    select: (data) => data.data,
  });

  useEffect(() => {
    console.log('docs', docs);
  }, [docs]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" marginBottom={2}>
        Этот раздел пока пуст
      </Typography>
      <NewProfileDialog open={!docs.length}></NewProfileDialog>
    </Box>
  );
};

export default DocumentsPage;
