'use client';

import TradeUnionRegistrationForm from '@/components/forms/TradeUnionRegistrationForm';
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import ProfilePage from '../Profile/Profile';
import ProgressBar from '@/components/ui/progressBar';

const TradeUnionRegistrationPage = () => {
  const [steps, setSteps] = useState<number>(1);
  const { data: session } = useSession();

  useEffect(() => {
    if (!!session?.user?.phone) {
      setSteps(2);
    }
  }, [session]);

  return (
    <Box sx={{ p: 2 }}>
      <ProgressBar steps={steps} />
      {steps === 1 ? (
        <ProfilePage setSteps={setSteps} />
      ) : (
        <>
          <Typography variant="h3" marginBottom={2} pt={3}>
            Форма регистрации
          </Typography>
          <TradeUnionRegistrationForm />
        </>
      )}
    </Box>
  );
};

export default TradeUnionRegistrationPage;
