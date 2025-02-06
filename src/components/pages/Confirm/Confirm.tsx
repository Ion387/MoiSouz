'use client';

import React, { useEffect } from 'react';
import s from './confirm.module.scss';
import { Box, Button, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import useMobile from '@/hooks/UseMobile';
import { getBackendUrl } from '@/constants/url';
import { globalTheme } from '@/styles/theme';

const Confirm = () => {
  const guid = usePathname().split('email/')[1];
  const { mutate, data } = useMutation({
    mutationFn: (guid: string) => {
      return axios.post(`${getBackendUrl}/api/confirm/email/${guid}`);
    },
  });

  const mobile = useMobile();

  useEffect(() => {
    mutate(guid);
  }, [guid, mutate]);

  return (
    <Box className={s.container}>
      <Paper className={s.paper}>
        <Typography variant="h3" textAlign={'center'}>
          {data?.data.status === 'error'
            ? data?.data.description
            : 'Поздравляем, Вы зарегистрированы в сервисе МойСоюз!'}
        </Typography>
        <Link href="/">
          <Button
            variant="contained"
            sx={{
              padding: '15px 100px',
              fontSize: '20px',
              lineHeight: '27px',
              '&.Mui-disabled': {
                backgroundColor: `${globalTheme.palette.primary.main} !important`,
                color: 'white !important',
              },
            }}
          >
            {mobile ? 'Главная' : 'Перейти на стартовую страницу'}
          </Button>
        </Link>
        <Link href="/signin">
          <Button
            variant="contained"
            sx={{
              padding: '15px 100px',
              fontSize: '20px',
              lineHeight: '27px',
              '&.Mui-disabled': {
                backgroundColor: `${globalTheme.palette.primary.main} !important`,
                color: 'white !important',
              },
            }}
          >
            {mobile ? 'Войти' : 'Войти в личный кабинет'}
          </Button>
        </Link>
      </Paper>
    </Box>
  );
};

export default Confirm;
