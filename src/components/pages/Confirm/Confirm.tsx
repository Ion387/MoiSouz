'use client';

import React, { useEffect } from 'react';
import s from './confirm.module.scss';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import useMobile from '@/hooks/UseMobile';
import { getBackendUrl } from '@/constants/url';
import { globalTheme } from '@/styles/theme';
import { ButtonFeedback } from '@/components/entities/profile';
import { Icon } from '@/components/ui';

const Confirm = () => {
  const guid = usePathname().split('email/')[1];
  const router = useRouter();
  const { mutate, data, error } = useMutation({
    mutationFn: (guid: string) => {
      return axios.post(`${getBackendUrl}/api/confirm/email/${guid}`);
    },
    onSuccess: () => router.push('/signin'),
  });

  const mobile = useMobile();

  useEffect(() => {
    mutate(guid);
  }, [guid, mutate]);

  return (
    <Box className={s.container}>
      {error ? (
        <Paper className={s.paper}>
          <ButtonFeedback className={s.help} withEmail />
          <Link href={'/'} className={s.cross}>
            <IconButton>
              <Icon name="close" />
            </IconButton>
          </Link>
          <Typography variant="h3" textAlign={'center'} marginBottom={2.4}>
            {
              //@ts-expect-error none
              data?.data.status === 'error'
                ? //@ts-expect-error none
                  data?.data.description
                : 'Что-то пошло не так, пожалуйста, обратитесь в поддержку'
            }
          </Typography>
          <Link href="/" style={{ width: '100%' }}>
            <Button
              variant="contained"
              sx={{
                padding: '15px 100px',
                fontSize: '20px',
                lineHeight: '27px',
                width: '100%',
                '&.Mui-disabled': {
                  backgroundColor: `${globalTheme.palette.primary.main} !important`,
                  color: 'white !important',
                },
              }}
            >
              {mobile ? 'Главная' : 'Перейти на стартовую страницу'}
            </Button>
          </Link>
        </Paper>
      ) : (
        <CircularProgress />
      )}

      {/* <Typography variant="h3" textAlign={'center'}>
          {data?.data.status === 'error'
            ? data?.data.description
            : 'Мы отправили на Ваш адрес электронной почты ссылку для подтверждения регистрации!'}
        </Typography>
        <Link href="/" style={{ width: '100%' }}>
          <Button
            variant="contained"
            sx={{
              padding: '15px 100px',
              fontSize: '20px',
              lineHeight: '27px',
              width: '100%',
              '&.Mui-disabled': {
                backgroundColor: `${globalTheme.palette.primary.main} !important`,
                color: 'white !important',
              },
            }}
          >
            {mobile ? 'Главная' : 'Перейти на стартовую страницу'}
          </Button>
        </Link>
        <Link href="/signin" style={{ width: '100%' }}>
          <Button
            variant="contained"
            sx={{
              padding: '15px 100px',
              fontSize: '20px',
              mt: '24px',
              width: '100%',
              lineHeight: '27px',
              '&.Mui-disabled': {
                backgroundColor: `${globalTheme.palette.primary.main} !important`,
                color: 'white !important',
              },
            }}
          >
            {mobile ? 'Войти' : 'Войти в личный кабинет'}
          </Button>
        </Link> */}
    </Box>
  );
};

export default Confirm;
