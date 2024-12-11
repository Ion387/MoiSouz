'use client';

import { Box, Paper, TextField, Typography, Button } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './signin.module.scss';
import { type ISignin } from '@/models/Signin';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loginFn } from '@/services/login';

const Signin = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ISignin>({
    mode: 'onChange',
  });

  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginFn,
  });

  const onSubmit: SubmitHandler<ISignin> = async (data) => {
    mutate(data);
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
      </Paper>
    </Box>
  );
};

export default Signin;
