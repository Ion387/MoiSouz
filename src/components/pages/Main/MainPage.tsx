'use client';

import { Box, Grid2, Paper, Typography } from '@mui/material';
import React from 'react';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';
import NewProfileDialog from '@/components/entities/profile/newProfileDialog';
import { useQuery } from '@tanstack/react-query';
import { getApplications } from '@/services/getApplications';
import Tariffs from '@/components/sections/Home/Tariffs/Tariffs';

const Main = () => {
  const { profileInfo } = useGetProfileInfo();
  const info = useQuery({
    queryKey: ['getApplications'],
    queryFn: getApplications,
    select: (data) => data.data,
  });
  console.log('info', info);
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" marginBottom={2}>
        Главная
      </Typography>
      <NewProfileDialog open={!profileInfo?.hasTradeunionOwner} />
      <Grid2 size={12}>
        <Paper>
          <Tariffs noTitle setSteps={() => {}} />
        </Paper>
      </Grid2>
    </Box>
  );
};

export default Main;
