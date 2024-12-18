'use client';

import React, { useEffect } from 'react';
import s from './confirm.module.scss';
import { Box, Button, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import useMobile from '@/hooks/UseMobile';

const Confirm = () => {
  const guid = usePathname().split('email/')[1];
  const env = process.env.NODE_ENV;
  const { mutate, data } = useMutation({
    mutationFn: (guid: string) => {
      return axios.post(
        `${
          env == 'development' ? process.env.NEXT_PUBLIC_BACKEND_URL : ''
        }/api/confirm/email/${guid}`,
      );
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
              padding: '15px 75px',
              margin: '20px auto 0',
              fontSize: '20px',
              lineHeight: '27px',
              width: '100%',
            }}
          >
            {mobile ? 'Главная' : 'Перейти на стартовую страницу'}
          </Button>
        </Link>
        <Link href="/signin">
          <Button
            variant="contained"
            sx={{
              padding: '15px 75px',
              margin: '20px auto 0',
              fontSize: '20px',
              lineHeight: '27px',
              width: '100%',
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
