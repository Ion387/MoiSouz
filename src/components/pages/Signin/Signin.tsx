'use client';

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  InputLabel,
} from '@mui/material';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './signin.module.scss';
import { type ISignin } from '@/models/Signin';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signin = () => {
  const { register, handleSubmit } = useForm<ISignin>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ISignin> = async (data) => {
    signIn('credentials', { ...data, redirect: false });
  };

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.token) {
      router.push('/');
    }
  }, [session]);

  return (
    <Box className={s.container}>
      <Paper className={s.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography className={s.title}>Вход</Typography>
          <InputLabel>Адрес электронной почты:</InputLabel>
          <TextField
            {...register('email')}
            placeholder="example@mail.ru"
          ></TextField>
          <InputLabel>Пароль</InputLabel>
          <TextField {...register('password')} type="password"></TextField>
          <Button
            type="submit"
            variant="contained"
            sx={{
              padding: '15px 140px',
              margin: '0 auto',
              fontSize: '20px',
              lineHeight: '27px',
            }}
          >
            Войти
          </Button>
          <Typography variant="body1" className={s.bottomText}>
            Ещё нет аккаунта?
            <Link href={'/registration'} className={s.link}>
              Регистрация
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Signin;
