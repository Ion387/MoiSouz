'use client';

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  InputLabel,
} from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './reg.module.scss';
import Link from 'next/link';
import { type IReg } from '@/models/Reg';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const Registration = () => {
  const { register, handleSubmit } = useForm<IReg>({
    mode: 'onChange',
  });

  const { mutate, data: resData } = useMutation({
    mutationFn: (data: IReg) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/registration`,
        data,
      );
    },
  });

  const onSubmit: SubmitHandler<IReg> = async (data) => {
    mutate(data);
    console.log(resData);
  };

  return (
    <Box className={s.container}>
      <Paper className={s.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography className={s.title}>Регистрация</Typography>
          <InputLabel>Адрес электронной почты:</InputLabel>
          <TextField
            {...register('email')}
            placeholder="example@mail.ru"
          ></TextField>
          <InputLabel>Имя</InputLabel>
          <TextField {...register('name')} placeholder="Иван"></TextField>
          <InputLabel>Фамилия</InputLabel>
          <TextField {...register('surname')} placeholder="Иванов"></TextField>
          <InputLabel>Отчество</InputLabel>
          <TextField
            {...register('patronymic')}
            placeholder="Иванович"
          ></TextField>
          <InputLabel>Придумайте пароль</InputLabel>
          <TextField {...register('password')} type="password"></TextField>
          <InputLabel>Повторите пароль</InputLabel>
          <TextField
            {...register('passwordRepeat')}
            type="password"
          ></TextField>
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
            Уже есть аккаунт?
            <Link href={'/signin'} className={s.link}>
              Уже есть аккаунт?
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Registration;
