'use client';
import TradeUnionMemberForm from '@/components/forms/TradeUnionMemberForm';
import { Box, Typography } from '@mui/material';
import React from 'react';

const TradeUnionMemberPage = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" marginBottom={2}>
        Форма заявления на вступление в профсоюз
      </Typography>
      <TradeUnionMemberForm />
    </Box>
  );
};

export default TradeUnionMemberPage;
