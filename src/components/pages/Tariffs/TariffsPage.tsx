'use client';

import Tariffs from '@/components/sections/Home/Tariffs/Tariffs';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const TariffsPage = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" marginBottom={2}>
        Тарифы
      </Typography>
      <Paper>
        <Tariffs />
      </Paper>
    </Box>
  );
};

export default TariffsPage;
