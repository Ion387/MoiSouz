'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';
import NewProfileDialog from '@/components/entities/profile/newProfileDialog';

const Main = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" marginBottom={2}>
        Главная
      </Typography>
      <NewProfileDialog open={true} />
    </Box>
  );
};

export default Main;
