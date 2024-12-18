import React, { useEffect } from 'react';
import s from './forms.module.scss';
import {
  Button,
  Grid2,
  IconButton,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { getBackendUrl } from '@/constants/url';
import axios from 'axios';
import { ITradeUnion } from '@/models/TradeUnion';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Обязательное поле')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        'Некорректный адрес электронной почты',
      ),
    phone: yup.string().required('Обязательное поле'),
    title: yup.string().required('Обязательное поле'),
    creationDate: yup.string().required('Обязательное поле'),
    ogrn: yup.string().required('Обязательное поле'),
    inn: yup.string().required('Обязательное поле'),
    kpp: yup.string().required('Обязательное поле'),
    registrationDate: yup.string().required('Обязательное поле'),
    okato: yup.string().required('Обязательное поле'),
    oktmo: yup.string().required('Обязательное поле'),
    chairmanEmail: yup
      .string()
      .required('Обязательное поле')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        'Некорректный адрес электронной почты',
      ),
    chairmanPhone: yup.string().required('Обязательное поле'),
    bank: yup.string().required('Обязательное поле'),
    rs: yup.string().required('Обязательное поле'),
    bik: yup.string().required('Обязательное поле'),
    ks: yup.string().required('Обязательное поле'),
    address: yup.mixed(),
    chairman: yup.mixed(),
  })
  .required();

const TradeUnionRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const {
    mutate,
    data: resData,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: ITradeUnion) => {
      const session = await getSession();

      return axios.post(`${getBackendUrl}/api/private/tradeunion-owner`, data, {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      });
    },
  });

  const onSubmit: SubmitHandler<ITradeUnion> = async (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/main');
    }
  }, [isSuccess]);

  return (
    <Paper className={s.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <InputLabel>Наименование</InputLabel>
            <TextField
              {...register('title')}
              placeholder="Профсоюз"
              error={!!errors.title?.message}
              helperText={errors.title?.message || ''}
            />
          </Grid2>
          <Grid2 size={4}>
            <InputLabel>Дата образования</InputLabel>
            <TextField
              {...register('creationDate')}
              placeholder="19.08.1980"
              error={!!errors.creationDate?.message}
              helperText={errors.creationDate?.message || ''}
            />
          </Grid2>
          <Grid2 size={8}>
            <InputLabel>ОГРН</InputLabel>
            <TextField
              {...register('ogrn')}
              placeholder="11211231313131"
              error={!!errors.ogrn?.message}
              helperText={errors.ogrn?.message || ''}
            />
          </Grid2>
          <Grid2 size={6}>
            <InputLabel>ИНН</InputLabel>
            <TextField
              {...register('inn')}
              placeholder="11211231313131"
              error={!!errors.inn?.message}
              helperText={errors.inn?.message || ''}
            />
          </Grid2>
          <Grid2 size={6}>
            <InputLabel>КПП</InputLabel>
            <TextField
              {...register('kpp')}
              placeholder="11211231313131"
              error={!!errors.kpp?.message}
              helperText={errors.kpp?.message || ''}
            />
          </Grid2>
          <Grid2 size={12}>
            <InputLabel sx={{ marginBottom: 0 }}>Адрес</InputLabel>
          </Grid2>
          <Grid2 size={4}>
            <TextField {...register('address.postcode')} placeholder="Индекс" />
          </Grid2>
          <Grid2 size={8}>
            <TextField {...register('address.region')} placeholder="Регион" />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              {...register('address.area')}
              placeholder="Муниципальное образование"
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              {...register('address.city')}
              placeholder="Населенный пункт"
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField {...register('address.street')} placeholder="Улица" />
          </Grid2>
          <Grid2 size={3}>
            <TextField {...register('address.house')} placeholder="Здание" />
          </Grid2>
          <Grid2 size={3}>
            <TextField {...register('address.flat')} placeholder="Пом." />
          </Grid2>
          <Grid2 size={4}>
            <InputLabel>Дата пост. на учет</InputLabel>
            <TextField
              {...register('registrationDate')}
              placeholder="19.08.1980"
              error={!!errors.registrationDate?.message}
              helperText={errors.registrationDate?.message || ''}
            />
          </Grid2>
          <Grid2 size={4}>
            <InputLabel>ОКАТО</InputLabel>
            <TextField
              {...register('okato')}
              placeholder="11211231313131"
              error={!!errors.okato?.message}
              helperText={errors.okato?.message || ''}
            />
          </Grid2>
          <Grid2 size={4}>
            <InputLabel>ОКТМО</InputLabel>
            <TextField
              {...register('oktmo')}
              placeholder="11211231313131"
              error={!!errors.oktmo?.message}
              helperText={errors.oktmo?.message || ''}
            />
          </Grid2>
          <Grid2 size={12}>
            <InputLabel sx={{ marginBottom: 0 }}>Председатель</InputLabel>
          </Grid2>
          <Grid2 size={6}>
            <TextField {...register('chairman.firstName')} placeholder="Имя" />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              {...register('chairman.lastName')}
              placeholder="Фамилия"
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              {...register('chairman.middleName')}
              placeholder="Отчество"
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField {...register('chairman.inn')} placeholder="ИНН" />
          </Grid2>
          <Grid2 size={6}>
            <InputLabel>E-mail</InputLabel>
            <TextField
              {...register('chairmanEmail')}
              placeholder="prov@mail.ru"
              error={!!errors.chairmanEmail?.message}
              helperText={errors.chairmanEmail?.message || ''}
            />
          </Grid2>
          <Grid2 size={6}>
            <InputLabel>Телефон</InputLabel>
            <TextField
              {...register('chairmanPhone')}
              placeholder="+78887777766"
              error={!!errors.chairmanPhone?.message}
              helperText={errors.chairmanPhone?.message || ''}
            />
          </Grid2>
          <Grid2 size={12}>
            <InputLabel sx={{ marginBottom: 0 }}>
              Банковские реквизиты
            </InputLabel>
          </Grid2>
          <Grid2 size={6}>
            <TextField
              {...register('bank')}
              placeholder="Банк"
              error={!!errors.bank?.message}
              helperText={errors.bank?.message || ''}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              {...register('rs')}
              placeholder="Р/с"
              error={!!errors.rs?.message}
              helperText={errors.rs?.message || ''}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              {...register('bik')}
              placeholder="БИК"
              error={!!errors.bik?.message}
              helperText={errors.bik?.message || ''}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              {...register('ks')}
              placeholder="к/с"
              error={!!errors.ks?.message}
              helperText={errors.ks?.message || ''}
            />
          </Grid2>
          <Grid2 size={6}>
            <InputLabel>Телефон организации</InputLabel>
            <TextField
              {...register('phone')}
              placeholder="+78887777766"
              error={!!errors.phone?.message}
              helperText={errors.phone?.message || ''}
            />
          </Grid2>
          <Grid2 size={6}>
            <InputLabel>Е-мейл организации</InputLabel>
            <TextField
              {...register('email')}
              placeholder="prov@mail.ru"
              error={!!errors.email?.message}
              helperText={errors.email?.message || ''}
            />
          </Grid2>
          <Grid2 size={6}>
            <Button
              variant="outlined"
              sx={{ width: '100%' }}
              onClick={() => reset()}
            >
              Отменить
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button
              variant="contained"
              sx={{ width: '100%', padding: '16px 25px' }}
              type="submit"
            >
              Сохранить
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  );
};

export default TradeUnionRegistrationForm;
