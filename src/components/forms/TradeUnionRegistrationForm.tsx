import React, { useEffect } from 'react';
import s from './forms.module.scss';
import { Button, Grid2, InputLabel, Paper, TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ITradeUnion } from '@/models/TradeUnion';
import { useRouter } from 'next/navigation';
import { InputImage } from '../ui/form/input-image';
import { InputCheckbox, InputDate } from '../ui/form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers/locales';
import { registration, saveAvatar } from '@/hooks/UseFormTUReg';

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
    address: yup.object({
      postcode: yup.string().required('Укажите индекс'),
      region: yup.string().required('Укажите регион'),
      area: yup.string(),
      city: yup.string().required('Укажите населенный пункт'),
      street: yup.string().required('Укажите улицу'),
      house: yup.string().required('Укажите дом/здание'),
      flat: yup.string(),
    }),
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
    chairman: yup.object({
      firstName: yup.string().required('Обязательное поле'),
      lastName: yup.string().required('Обязательное поле'),
      middleName: yup.string().required('Обязательное поле'),
      inn: yup.string().required('Обязательное поле'),
    }),
    isActive: yup
      .bool()
      .oneOf([true], 'Необходимо принять согласие')
      .required('Необходимо принять согласие'),
    avatar: yup.mixed(),
  })
  .required();

const TradeUnionRegistrationForm = () => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const router = useRouter();

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (data: ITradeUnion) => {
      registration(data);
      saveAvatar(data.avatar);
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
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ru"
        localeText={
          ruRU.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              <Grid2 size={9} container>
                <Grid2 size={12}>
                  <InputLabel>Наименование</InputLabel>
                  <TextField
                    {...register('title')}
                    placeholder="Профсоюз"
                    error={!!errors.title?.message}
                    helperText={errors.title?.message || ''}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <InputLabel>Дата образования</InputLabel>
                  <InputDate name="creationDate" />
                </Grid2>
                <Grid2 size={6}>
                  <InputLabel>ОГРН</InputLabel>
                  <TextField
                    {...register('ogrn')}
                    placeholder="11211231313131"
                    error={!!errors.ogrn?.message}
                    helperText={errors.ogrn?.message || ''}
                  />
                </Grid2>
              </Grid2>
              <Grid2 size={3}>
                <InputImage
                  sx={{ width: '100%', height: 'calc(100% - 40px)', mt: 4 }}
                  name="avatar"
                  label="Добавить фото"
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
                <TextField
                  {...register('address.postcode')}
                  placeholder="Индекс"
                  error={!!errors.address?.postcode?.message}
                  helperText={errors.address?.postcode?.message || ''}
                />
              </Grid2>
              <Grid2 size={8}>
                <TextField
                  {...register('address.region')}
                  placeholder="Регион"
                  error={!!errors.address?.region?.message}
                  helperText={errors.address?.region?.message || ''}
                />
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
                  error={!!errors.address?.city?.message}
                  helperText={errors.address?.city?.message || ''}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  {...register('address.street')}
                  placeholder="Улица"
                  error={!!errors.address?.street?.message}
                  helperText={errors.address?.street?.message || ''}
                />
              </Grid2>
              <Grid2 size={3}>
                <TextField
                  {...register('address.house')}
                  placeholder="Здание"
                  error={!!errors.address?.house?.message}
                  helperText={errors.address?.house?.message || ''}
                />
              </Grid2>
              <Grid2 size={3}>
                <TextField {...register('address.flat')} placeholder="Пом." />
              </Grid2>

              <Grid2 size={4}>
                <InputLabel>Дата пост. на учет</InputLabel>
                <InputDate name="registrationDate" />
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
                <TextField
                  {...register('chairman.firstName')}
                  placeholder="Имя"
                  error={!!errors.chairman?.firstName?.message}
                  helperText={errors.chairman?.firstName?.message || ''}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  {...register('chairman.lastName')}
                  placeholder="Фамилия"
                  error={!!errors.chairman?.lastName?.message}
                  helperText={errors.chairman?.lastName?.message || ''}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  {...register('chairman.middleName')}
                  placeholder="Отчество"
                  error={!!errors.chairman?.middleName?.message}
                  helperText={errors.chairman?.middleName?.message || ''}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  {...register('chairman.inn')}
                  placeholder="ИНН"
                  error={!!errors.chairman?.inn?.message}
                  helperText={errors.chairman?.inn?.message || ''}
                />
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
              <Grid2 size={12}>
                <InputCheckbox
                  sx={{ justifyContent: 'center' }}
                  name="isActive"
                  label={`Я соглашаюсь на обработку персональных данных \r\nСогласие с политикой обработки персональных данных`}
                />
              </Grid2>
              <Grid2 size={6}>
                <Button
                  variant="outlined"
                  sx={{ width: '100%' }}
                  onClick={() => router.push('/main')}
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
        </FormProvider>
      </LocalizationProvider>
    </Paper>
  );
};

export default TradeUnionRegistrationForm;
