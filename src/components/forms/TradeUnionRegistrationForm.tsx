/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import s from './forms.module.scss';
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ITradeUnion } from '@/models/TradeUnion';
import { useRouter } from 'next/navigation';
import { InputImage } from '../ui/form/input-image';
import { InputCheckbox, InputDate } from '../ui/form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers/locales';
import { registration, saveAvatar } from '@/hooks/UseFormTUReg';
import { getAddress } from '@/services/getAddress';
import { getInn } from '@/services/getInn';
import { getApplications } from '@/services/getApplications';

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
    bank: yup.object({
      bank: yup.string().required('Обязательное поле'),
      rs: yup.string().required('Обязательное поле'),
      bik: yup.string().required('Обязательное поле'),
      ks: yup.string().required('Обязательное поле'),
    }),
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
    setValue: setFormValue,
  } = methods;

  const router = useRouter();

  const [addressString, setAddressString] = useState<string>('');
  const [innString, setInnString] = useState<string>('');
  const [addressOptions, setAddressOptions] = useState<any[]>([]);
  const [innOptions, setInnOptions] = useState<any[]>([]);
  const [valueInn, setValueInn] = useState<any | null>(null);
  const [value, setValue] = useState<any | null>(null);
  const [inn, setInn] = useState<boolean>(false);

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (data: ITradeUnion) => {
      registration(data);
      saveAvatar(data.avatar);
    },
  });

  const { mutate: mutateAddress } = useMutation({
    mutationFn: async (address: string) => {
      return await getAddress(address);
    },
    onSuccess: (data) => {
      setAddressOptions(data.data);
    },
  });

  const { mutate: mutateInn } = useMutation({
    mutationFn: async (inn: string) => {
      return await getInn(inn);
    },
    onSuccess: (data) => {
      setInnOptions(data.data);
    },
  });

  const { data: tradeUnions } = useQuery({
    queryKey: ['tradeUnions'],
    queryFn: getApplications,
    select: (data) => data.data,
  });

  useEffect(() => {
    console.log('tradeUnions', tradeUnions);
  }, [tradeUnions]);

  const onSubmit: SubmitHandler<ITradeUnion> = async (data) => {
    mutate(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressString(e.target.value);
  };

  const handleChangeInn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInnString(e.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/tariffs');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (addressString) {
      const timer = setTimeout(() => {
        mutateAddress(addressString);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [addressString, mutateAddress]);

  useEffect(() => {
    if (innString) {
      const timer = setTimeout(() => {
        mutateInn(innString);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [innString, mutateInn]);

  useEffect(() => {
    if (value) {
      setFormValue('address.area', value?.area);
      setFormValue('address.city', value?.settlement);
      setFormValue('address.region', value?.region);
      setFormValue('address.postcode', value?.postalCode);
      setFormValue('address.street', value?.street);
    }
  }, [value]);

  useEffect(() => {
    if (valueInn) {
      setFormValue('inn', valueInn?.inn);
      setFormValue('kpp', valueInn?.kpp);
      setFormValue('ogrn', valueInn?.ogrn);
      setFormValue('okato', valueInn?.okato);
      setFormValue('oktmo', valueInn?.oktmo);
      setFormValue('title', valueInn?.name?.full);
      setFormValue('address.area', valueInn?.address?.area);
      setFormValue('address.city', valueInn?.address?.settlement);
      setFormValue('address.region', valueInn?.address?.region);
      setFormValue('address.postcode', valueInn?.address?.postalCode);
      setFormValue('address.street', valueInn?.address?.street);
    }
  }, [valueInn]);

  useEffect(() => {
    console.log('inn', inn);
  }, [inn]);

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
              <Grid2 size={12}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={inn}
                    onClick={() => setInn((prev) => !prev)}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Организация без ИНН"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid2>
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
                <Grid2 size={12}>
                  <InputLabel>Дата образования</InputLabel>
                  <InputDate name="creationDate" />
                </Grid2>
              </Grid2>
              <Grid2 size={3}>
                <InputImage
                  sx={{ width: '100%', height: 'calc(100% - 40px)', mt: 4 }}
                  name="avatar"
                  label="Добавить логотип"
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel
                  sx={{ color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000' }}
                >
                  ИНН
                </InputLabel>
                <Autocomplete
                  options={innOptions}
                  getOptionLabel={(option) => option.inn}
                  value={valueInn}
                  disabled={inn}
                  onChange={(event: any, newValue: any) => {
                    setValueInn(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register('inn')}
                      placeholder="11211231313131"
                      onChange={handleChangeInn}
                      error={!!errors.inn?.message}
                      helperText={errors.inn?.message || ''}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel
                  sx={{ color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000' }}
                >
                  КПП
                </InputLabel>
                <TextField
                  {...register('kpp')}
                  placeholder="11211231313131"
                  error={!!errors.kpp?.message}
                  helperText={errors.kpp?.message || ''}
                  disabled={inn}
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel
                  sx={{ color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000' }}
                >
                  ОГРН
                </InputLabel>
                <TextField
                  {...register('ogrn')}
                  placeholder="11211231313131"
                  error={!!errors.ogrn?.message}
                  helperText={errors.ogrn?.message || ''}
                  disabled={inn}
                />
              </Grid2>
              <Grid2 size={12}>
                <InputLabel sx={{ marginBottom: 0 }}>Адрес</InputLabel>
              </Grid2>
              <Grid2 size={12}>
                <Autocomplete
                  options={addressOptions}
                  getOptionLabel={(option) => option.value}
                  value={value}
                  onChange={(event: any, newValue: any) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      placeholder="Начните вводить адрес"
                      {...params}
                      value={addressString}
                      onChange={handleChange}
                    />
                  )}
                />
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
                <InputLabel
                  sx={{ color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000' }}
                >
                  Дата пост. на учет
                </InputLabel>
                <InputDate dis={inn} name="registrationDate" />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel
                  sx={{ color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000' }}
                >
                  ОКАТО
                </InputLabel>
                <TextField
                  {...register('okato')}
                  placeholder="11211231313131"
                  disabled={inn}
                  error={!!errors.okato?.message}
                  helperText={errors.okato?.message || ''}
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel
                  sx={{ color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000' }}
                >
                  ОКТМО
                </InputLabel>
                <TextField
                  {...register('oktmo')}
                  disabled={inn}
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
                <InputLabel
                  sx={{
                    marginBottom: 0,
                    color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000',
                  }}
                >
                  Банковские реквизиты
                </InputLabel>
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  {...register('bank.bank')}
                  placeholder="Банк"
                  disabled={inn}
                  error={!!errors.bank?.bank?.message}
                  helperText={errors.bank?.bank?.message || ''}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  {...register('bank.rs')}
                  placeholder="Р/с"
                  disabled={inn}
                  error={!!errors.bank?.rs?.message}
                  helperText={errors.bank?.rs?.message || ''}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  {...register('bank.bik')}
                  placeholder="БИК"
                  disabled={inn}
                  error={!!errors.bank?.bik?.message}
                  helperText={errors.bank?.bik?.message || ''}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  {...register('bank.ks')}
                  placeholder="к/с"
                  disabled={inn}
                  error={!!errors.bank?.ks?.message}
                  helperText={errors.bank?.ks?.message || ''}
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
                <InputLabel>Вышестоящая организация</InputLabel>
                <Select fullWidth sx={{ padding: 1.6 }}></Select>
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
