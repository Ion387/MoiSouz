'use client';

import ProfileForm from '@/components/forms/ProfileForm';
import TradeUnionRegistrationForm from '@/components/forms/TradeUnionRegistrationForm';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';
import { Box, Typography } from '@mui/material';
import React from 'react';

const TradeUnionRegistrationPage = () => {
  const { profileInfo } = useGetProfileInfo();
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
