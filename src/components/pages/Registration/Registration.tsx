'use client';

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  InputLabel,
  IconButton,
  InputAdornment,
  CircularProgress,
  Dialog,
} from '@mui/material';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './reg.module.scss';
import Link from 'next/link';
import { type IReg } from '@/models/Reg';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CrossIcon, RiEyeCloseLine, RiEyeLine } from '@/styles/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Обязательное поле')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        'Некорректный адрес электронной почты',
      ),
    password: yup
      .string()
      .required('Введите пароль')
      .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
      .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
      .min(8, 'Пароль должен содержать как минимум 8 символов'),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Пароли должны совпадать')
      .required('Введите пароль'),
    name: yup.string().required('Обязательное поле'),
    surname: yup.string().required('Обязательное поле'),
    patronymic: yup.string().nullable(),
  })
  .required();

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReg>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordRepeat: false,
  });
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const env = process.env.NODE_ENV;

  const {
    mutate,
    data: resData,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: IReg) => {
      return axios.post(
        `${
          env == 'development' ? process.env.NEXT_PUBLIC_BACKEND_URL : ''
        }/api/registration`,
        data,
      );
    },
  });

  const onSubmit: SubmitHandler<IReg> = async (data) => {
    mutate(data);
    handleOpen();
  };

  return (
    <Box className={s.container}>
      <Paper className={s.paper}>
        <Link href={'/'} className={s.cross}>
          <IconButton>
            <CrossIcon />
          </IconButton>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography className={s.title}>Регистрация</Typography>
          <InputLabel>Адрес электронной почты:</InputLabel>
          <TextField
            {...register('email')}
            placeholder="example@mail.ru"
            error={!!errors.email?.message}
            helperText={errors.email?.message || ''}
          />
          <InputLabel>Имя</InputLabel>
          <TextField
            {...register('name')}
            placeholder="Иван"
            error={!!errors.name?.message}
            helperText={errors.name?.message || ''}
          />
          <InputLabel>Фамилия</InputLabel>
          <TextField
            {...register('surname')}
            placeholder="Иванов"
            error={!!errors.surname?.message}
            helperText={errors.surname?.message || ''}
          />
          <InputLabel>Отчество</InputLabel>
          <TextField
            {...register('patronymic')}
            placeholder="Иванович"
            error={!!errors.patronymic?.message}
            helperText={errors.patronymic?.message || ''}
          />
          <InputLabel>Придумайте пароль</InputLabel>
          <TextField
            {...register('password')}
            type={showPassword.password ? 'text' : 'password'}
            error={!!errors.password?.message}
            helperText={errors.password?.message || ''}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                      edge="end"
                    >
                      {!showPassword.password ? (
                        <RiEyeLine />
                      ) : (
                        <RiEyeCloseLine />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <InputLabel>Повторите пароль</InputLabel>
          <TextField
            {...register('passwordRepeat')}
            type={showPassword.passwordRepeat ? 'text' : 'password'}
            error={!!errors.passwordRepeat?.message}
            helperText={errors.passwordRepeat?.message || ''}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          passwordRepeat: !prev.passwordRepeat,
                        }))
                      }
                      edge="end"
                    >
                      {!showPassword.passwordRepeat ? (
                        <RiEyeLine />
                      ) : (
                        <RiEyeCloseLine />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              padding: '15px 75px',
              margin: '0 auto',
              fontSize: '20px',
              lineHeight: '27px',
              minWidth: '271px',
            }}
          >
            {isPending && !isSuccess ? (
              <CircularProgress color="secondary" size="27px" />
            ) : (
              'Регистрация'
            )}
          </Button>
          <Typography variant="body1" className={s.bottomText}>
            Уже есть аккаунт?
            <Link href={'/signin'} className={s.link}>
              Войти
            </Link>
          </Typography>
        </form>
      </Paper>
      <Dialog
        open={open && !!resData?.data.description}
        onClose={handleClose}
        className={s.dialog}
        fullWidth
      >
        <IconButton
          onClick={handleClose}
          className={s.crossDialog}
          sx={{ alignSelf: 'end' }}
        >
          <CrossIcon />
        </IconButton>
        {/*resData?.data.status === 'error' ? (
          <ErrorFormIcon />
        ) : (
          <SuccessFormIcon />
        )*/}
        <Typography variant="h3">{resData?.data.description}</Typography>
        <Link href="/">
          <Button
            variant="contained"
            sx={{
              padding: '15px 75px',
              margin: '20px auto 0',
              fontSize: '20px',
              lineHeight: '27px',
              minWidth: '271px',
            }}
          >
            Перейти на стартовую страницу
          </Button>
        </Link>
      </Dialog>
    </Box>
  );
};

export default Registration;
