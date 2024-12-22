'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';
import NewProfileDialog from '@/components/entities/profile/newProfileDialog';

const DocumentPage = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" marginBottom={2}>
        Документы
      </Typography>
      <NewProfileDialog open={true} />
    </Box>
  );
};

export default DocumentPage;
