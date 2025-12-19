'use client';

import StructureCreateForm from '@/components/forms/StructrureCreateForm';
import { getNodeByGuid, useFetchTree } from '@/hooks/UseTree';
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@/components/ui';
import { globalTheme } from '@/styles/theme';
import { useMutation } from '@tanstack/react-query';
import { createStructureOwner } from '@/hooks/UseFormTUReg';

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
      .matches(
        /^[A-Za-z0-9]+$/,
        'Пароль должен содержать только латинские буквы и цифры',
      )
      .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
      .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
      .min(8, 'Пароль должен содержать как минимум 8 символов'),
  })
  .required();

const StructurePageCreateContent = () => {
  const searchParams = useSearchParams();
  const guid = searchParams.get('guid') || undefined;
  const [type, setType] = useState<number | null>(null);
  const [step, setStep] = useState<number>(1);
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return await createStructureOwner(data);
    },
  });

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    data,
  ) => {
    mutate(data);
  };

  const { data: tree } = useFetchTree({ type: 'arr' });

  useEffect(() => {
    if (tree && guid && tree.data) {
      const node = getNodeByGuid(tree.data, guid);
      setType(node?.type || null);
    }
  }, [tree, guid]);

  useEffect(() => {
    if (data && data.data.status === 'done') setStep(2);
  }, [data]);

  if (step === 1)
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h3" marginBottom={2}>
          Создайте профиль
        </Typography>
        <Paper>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid2 container spacing={2}>
                <Grid2 size={12}>
                  <InputLabel>Адрес электронной почты:</InputLabel>
                  <TextField
                    sx={{ marginBottom: '20px' }}
                    {...register('email')}
                    placeholder="example@mail.ru"
                    error={!!errors.email?.message}
                    helperText={errors.email?.message || ''}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <InputLabel>Придумайте пароль</InputLabel>
                  <TextField
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    error={!!errors.password?.message}
                    helperText={errors.password?.message || ''}
                    sx={{ marginBottom: !!errors.password?.message ? 2.4 : 0 }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword((prev) => !prev)}
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
                      formHelperText: { style: { whiteSpace: 'wrap' } },
                    }}
                  />
                  {data &&
                    data.data.status === 'error' &&
                    typeof data.data.description === 'string' && (
                      <Typography
                        variant="h4"
                        color={globalTheme.palette.red.main}
                      >
                        {data.data.description}
                      </Typography>
                    )}
                  <Grid2 size={12} display={'flex'} justifyContent={'center'}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        padding: '15px 100px',
                        fontSize: '20px',
                        lineHeight: '27px',
                        marginTop: '24px',
                        width: '320px',
                        '&.Mui-disabled': {
                          backgroundColor: `${globalTheme.palette.primary.main} !important`,
                          color: 'white !important',
                        },
                      }}
                    >
                      {isPending && !isSuccess ? (
                        <CircularProgress color="secondary" size="27px" />
                      ) : (
                        'Создать'
                      )}
                    </Button>
                  </Grid2>
                </Grid2>
              </Grid2>
            </form>
          </FormProvider>
        </Paper>
      </Box>
    );

  if (typeof data?.data.description === 'object' && data?.data.description.guid)
    return (
      <StructureCreateForm
        owner={data?.data.description.guid}
        guid={guid}
        parentType={type}
      />
    );
};

const StructurePageCreate = () => {
  return (
    <Suspense>
      <StructurePageCreateContent />
    </Suspense>
  );
};

export default StructurePageCreate;
