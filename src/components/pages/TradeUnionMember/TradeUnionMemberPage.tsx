'use client';
import TradeUnionMemberForm from '@/components/forms/TradeUnionMemberForm';
import { Button, Grid2, Link, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfilePage from '../Profile/Profile';
import ProgressBar from '@/components/ui/progressBar';
import { useFetchProfile } from '@/hooks/useFetchProfile';

const TradeUnionMemberPage = () => {
  const [steps, setSteps] = useState<number>(1);
  const info = useFetchProfile();

  useEffect(() => {
    if (!!info?.phone) {
      setSteps(2);
    }
  }, [info]);
  return (
    <Grid2 container sx={{ p: 2 }} spacing={1.2}>
      {steps === 1 ? (
        <Grid2 size={8}>
          <ProfilePage setSteps={setSteps} />
        </Grid2>
      ) : steps === 2 ? (
        <Grid2 size={8}>
          <Typography variant="h3" marginBottom={2} pt={3}>
            Форма заявления на вступление в профсоюз
          </Typography>
          <TradeUnionMemberForm setSteps={setSteps} />
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
                  Вы направили заявление на вступление в профсоюз, дождитесь
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
      <Grid2 size={4}>
        <ProgressBar steps={steps} maxSteps={3} />
      </Grid2>
    </Grid2>
  );
};

export default TradeUnionMemberPage;
