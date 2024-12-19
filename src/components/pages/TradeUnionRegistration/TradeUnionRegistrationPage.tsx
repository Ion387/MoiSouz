'use client';

import TradeUnionRegistrationForm from '@/components/forms/TradeUnionRegistrationForm';
import { Box, Typography } from '@mui/material';
import React from 'react';

const TradeUnionRegistrationPage = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" marginBottom={2}>
        Форма регистрации
      </Typography>
      <TradeUnionRegistrationForm />
    </Box>
  );
};

export default TradeUnionRegistrationPage;
