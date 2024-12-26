'use client';

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  InputLabel,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import { Icon } from '@/components/ui';
import { type ISignin } from '@/models/Signin';

import s from './signin.module.scss';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Обязательное поле')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        'Некорректный адрес электронной почты',
      ),
    password: yup.string().required('Введите пароль'),
  })
  .required();

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignin>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [signInError, setSignInError] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ISignin> = async (data) => {
    const res = await signIn('credentials', { ...data, redirect: false });
    if (res?.error === 'CredentialsSignin') {
      setSignInError(true);
    }
  };

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.token) {
      router.push('/profile');
    }
  }, [session, router]);

  return (
    <Box className={s.container}>
      <Paper className={s.paper}>
        <Link href={'/'} className={s.cross}>
          <IconButton>
            <Icon name="cross" />
          </IconButton>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography className={s.title}>Вход</Typography>
          <InputLabel>Адрес электронной почты:</InputLabel>
          <TextField
            {...register('email')}
            placeholder="example@mail.ru"
            error={!!errors.email?.message}
            helperText={errors.email?.message || ''}
            sx={{ marginBottom: '25px' }}
          />
          <InputLabel>Пароль</InputLabel>
          <TextField
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password?.message || signInError}
            sx={{ marginBottom: '25px' }}
            helperText={
              signInError ? 'Неверный пароль' : errors.password?.message || ''
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowPassword((prevShow: boolean) => !prevShow)
                      }
                      edge="end"
                    >
                      {!showPassword ? (
                        <Icon name="eye-on" color="gray" />
                      ) : (
                        <Icon name="eye-off" color="gray" />
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
              padding: '15px 100px',
              margin: '12px auto 0',
              fontSize: '20px',
              lineHeight: '27px',
            }}
          >
            {isSubmitting ? (
              <CircularProgress color="secondary" size="27px" />
            ) : (
              'Войти'
            )}
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
