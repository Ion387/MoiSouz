'use client';

import TradeUnionRegistrationForm from '@/components/forms/TradeUnionRegistrationForm';
import { Button, Grid2, Link, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfilePage from '../Profile/Profile';
import ProgressBar from '@/components/ui/progressBar';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import Tariffs from '@/components/sections/Home/Tariffs/Tariffs';

const TradeUnionRegistrationPage = () => {
  const [steps, setSteps] = useState<number>(1);
  const info = useFetchProfile();

  useEffect(() => {
    if (!!info?.phone) {
      setSteps(2);
    }
    if (info?.hasTradeunionOwner) {
      setSteps(3);
    }
  }, [info]);

  return (
    <Grid2 container sx={{ p: 2 }} spacing={1.2}>
      {steps === 1 ? (
        <Grid2 size={8}>
          <ProfilePage />
        </Grid2>
      ) : steps === 2 ? (
        <Grid2 size={8}>
          <Typography variant="h3" marginBottom={2} pt={3}>
            Форма регистрации
          </Typography>
          <TradeUnionRegistrationForm setSteps={setSteps} />
        </Grid2>
      ) : steps === 3 ? (
        <Grid2 size={12}>
          <Paper>
            <Tariffs noTitle setSteps={setSteps} />
          </Paper>
        </Grid2>
      ) : (
        <Grid2 size={8}>
          <Typography variant="h3" marginBottom={2} pt={3}>
            Регистрация на рассмотрении
          </Typography>
          <Paper sx={{ mt: 2 }}>
            <Grid2 container sx={{ p: 2 }} spacing={1.2}>
              <Grid2 size={12}>
                <Typography variant="body1" textAlign={'center'}>
                  Вы направили заявление на регистрацию профсоюза, дождитесь
                  результата рассмотрения заявления чтобы воспользоваться всеми
                  функциями системы
                </Typography>
              </Grid2>
              <Grid2 size={12} display={'flex'} justifyContent={'center'}>
                <Link href="/main">
                  <Button
                    variant={'contained'}
                    sx={{
                      minWidth: '228px',
                      color: '#fff',
                      padding: '14px 17px',
                      width: '100%',
                      border: '0px',
                    }}
                  >
                    Закрыть
                  </Button>
                </Link>
              </Grid2>
            </Grid2>
          </Paper>
        </Grid2>
      )}
      {steps !== 3 && (
        <Grid2 size={4}>
          <ProgressBar steps={steps} maxSteps={4} />
        </Grid2>
      )}
    </Grid2>
  );
};

export default TradeUnionRegistrationPage;
