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
  Checkbox,
  FormControl,
  FormHelperText,
  Tabs,
  Tab,
} from '@mui/material';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useMobile from '@/hooks/UseMobile';
import { getBackendUrl } from '@/constants/url';
import { Icon } from '@/components/ui';
import { type IReg } from '@/models/Reg';
import s from './reg.module.scss';

const Registration = () => {
  const [tabs, setTabs] = useState<number>(0);
  const schema = yup
    .object({
      inn: !!tabs ? yup.string().required('Обязательное поле') : yup.string(),
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
        .matches(
          /[A-Z]/,
          'Пароль должен содержать хотя бы одну заглавную букву',
        )
        .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
        .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
        .min(8, 'Пароль должен содержать как минимум 8 символов'),
      passwordRepeat: yup
        .string()
        .oneOf([yup.ref('password'), ''], 'Пароли должны совпадать')
        .required('Введите пароль'),
      personalData: yup.boolean().isTrue('Необходимо согласие').required(),
    })
    .required();
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

  const mobile = useMobile();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabs(newValue);
  };
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const {
    mutate,
    data: resData,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: IReg) => {
      return axios.post(`${getBackendUrl}/api/registration`, data);
    },
  });

  const onSubmit: SubmitHandler<IReg> = async (data) => {
    if (tabs) mutate(data);
    else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const withoutInnData = (({ inn, ...data }) => data)(data);
      mutate(withoutInnData);
    }
    handleOpen();
  };

  return (
    <Box className={s.container}>
      <Paper className={s.paper}>
        <Link href={'/'} className={s.cross}>
          <IconButton>
            <Icon name="cross" />
          </IconButton>
        </Link>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography className={s.title}>Регистрация</Typography>
          <Tabs value={tabs} onChange={handleChange} sx={{ mb: 1.2 }}>
            <Tab value={0} label={'Частное лицо'} />
            <Tab value={1} label={'Юридическое лицо'} />
          </Tabs>
          {!!tabs && (
            <>
              <InputLabel>ИНН</InputLabel>
              <TextField
                sx={{ marginBottom: '20px' }}
                {...register('inn')}
                placeholder="ИНН"
                error={!!errors.inn?.message}
                helperText={errors.inn?.message || ''}
              />
            </>
          )}
          <InputLabel>Адрес электронной почты:</InputLabel>
          <TextField
            sx={{ marginBottom: '20px' }}
            {...register('email')}
            placeholder="example@mail.ru"
            error={!!errors.email?.message}
            helperText={errors.email?.message || ''}
          />
          <InputLabel>Придумайте пароль</InputLabel>
          <TextField
            {...register('password')}
            type={showPassword.password ? 'text' : 'password'}
            error={!!errors.password?.message}
            helperText={errors.password?.message || ''}
            sx={{ marginBottom: !!errors.password?.message ? 4.4 : 2 }}
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
                        <Icon name="eye-on" color="gray" />
                      ) : (
                        <Icon name="eye-off" color="gray" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
              formHelperText: { style: { whiteSpace: 'wrap' } },
            }}
          />
          <InputLabel>Повторите пароль</InputLabel>
          <TextField
            sx={{ marginBottom: '20px' }}
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
          <Box alignSelf={'start'}>
            <FormControl error={!!errors.personalData?.message}>
              <Box display={'flex'} alignItems={'center'}>
                <Checkbox {...register('personalData')} />
                <Typography component={'span'} variant="body1" fontWeight={600}>
                  Я соглашаюсь на обработку персональных данных
                </Typography>
              </Box>
              <FormHelperText>
                {errors.personalData?.message || ''}
              </FormHelperText>
            </FormControl>
          </Box>
          {!!errors.personalData?.message}
          <Button
            type="submit"
            variant="contained"
            sx={{
              padding: '15px 75px',
              margin: '0 auto',
              fontSize: '20px',
              lineHeight: '27px',
              maxWidth: '270px',
              width: '100%',
              marginTop: '24px',
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
          <Typography variant="body1" className={s.bottomText}>
            Регистрируясь в сервисе, вы принимаете условия
            <span> лицензионного договора,</span> соглашаетесь на
            <span> обработку персональных данных</span> и получение
            информационных сообщений от группы компаний Мой Союз.
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
          <Icon name="cross" />
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
              padding: '15px 15px',
              margin: '20px auto 0',
              fontSize: '20px',
              lineHeight: '27px',
              minWidth: mobile ? '0px' : '271px',
              width: '100%',
            }}
          >
            {mobile ? 'Главная' : 'Перейти на стартовую страницу'}
          </Button>
        </Link>
      </Dialog>
    </Box>
  );
};

export default Registration;
