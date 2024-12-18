'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';
import NewProfileDialog from '@/components/entities/profile/newProfileDialog';

const Main = () => {
  const { profileInfo } = useGetProfileInfo();
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" marginBottom={2}>
        Главная
      </Typography>
      <NewProfileDialog open={!profileInfo?.hasTradeunionOwner} />
    </Box>
  );
};

export default Main;
