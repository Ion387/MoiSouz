'use client';

import { Box, Paper, TextField, Typography, Button } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './signin.module.scss';
import { type ISignin } from '@/models/Signin';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { signIn } from 'next-auth/react';

const Signin = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ISignin>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ISignin> = async (data) => {
    signIn('credentials', { ...data, redirect: false });
  };

  return (
    <Box className={s.container}>
      <Paper className={s.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography className={s.title}>Вход</Typography>
          <TextField {...register('email')}></TextField>
          <TextField {...register('password')}></TextField>
          <Button type="submit">Отправить</Button>
        </form>
        <Button onClick={() => signOut()}>Выйти</Button>
      </Paper>
    </Box>
  );
};

export default Signin;
