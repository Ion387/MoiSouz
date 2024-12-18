'use client';
import ProfileForm from '@/components/forms/ProfileForm';
import TradeUnionMemberForm from '@/components/forms/TradeUnionMemberForm';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';
import { Box, Typography } from '@mui/material';
import React from 'react';

const TradeUnionMemberPage = () => {
  const { profileInfo } = useGetProfileInfo();
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
