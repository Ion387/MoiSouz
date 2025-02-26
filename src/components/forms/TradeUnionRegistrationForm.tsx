/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import s from './forms.module.scss';
import {
  Autocomplete,
  Button,
  Checkbox,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ITradeUnion } from '@/models/TradeUnion';
import { useRouter } from 'next/navigation';
import { InputImage } from '../ui/form/input-image';
import { InputCheckbox, InputDate } from '../ui/form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers/locales';
import { registration } from '@/hooks/UseFormTUReg';
import { getAddress } from '@/services/getAddress';
import { getApplications } from '@/services/getApplications';
import {
  ValidateKsOrRs,
  ValidateOktmo,
  validateBik,
  validateInn,
  validateKpp,
  validateOgrn,
} from '@/utils/validateDocs';
import { InputFile } from '../ui/form/input-file';
import { TextFieldCustom } from '../ui/form/entities/input-textfield';
import { saveFormTULogo, saveFormTUScan } from '@/services/postLogoandFile';
import { getMyTU } from '@/services/getMyTU';
import { convertSizeToBites } from '@/utils/convertStringToB';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Обязательное поле')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        'Некорректный адрес электронной почты',
      ),
    phone: yup
      .string()
      .required('Обязательное поле')
      .matches(
        /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        'Некорректный номер телефона',
      ),
    title: yup.string().required('Обязательное поле'),
    creationDate: yup.string().required('Обязательное поле'),
    ogrn: yup
      .string()
      .required('Обязательное поле')
      .test(
        'ogrn',
        (params) => validateOgrn(params.value),
        (value) => !validateOgrn(String(value)),
      ),
    inn: yup
      .string()
      .required('Обязательное поле')
      .test(
        'inn',
        (params) => validateInn(params.value),
        (value) => !validateInn(String(value)),
      ),
    kpp: yup
      .string()
      .required('Обязательное поле')
      .test(
        'kpp',
        (params) => validateKpp(params.value),
        (value) => !validateKpp(String(value)),
      ),
    registrationDate: yup.string().required('Обязательное поле'),
    okato: yup
      .string()
      .required('Обязательное поле')
      .max(11, 'ОКАТО состоит макс. из 11 цифр'),
    oktmo: yup
      .string()
      .required('Обязательное поле')
      .test(
        'oktmo',
        (params) => ValidateOktmo(params.value),
        (value) => !ValidateOktmo(String(value)),
      ),
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
    chairmanPhone: yup
      .string()
      .required('Обязательное поле')
      .matches(
        /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        'Некорректный номер телефона',
      ),
    bank: yup.object({
      bank: yup.string().required('Обязательное поле'),
      rs: yup
        .string()
        .required('Обязательное поле')
        .test(
          'rs',
          (params) => ValidateKsOrRs(params.value),
          (value) => !ValidateKsOrRs(String(value)),
        ),
      bik: yup
        .string()
        .required('Обязательное поле')
        .test(
          'bik',
          (params) => validateBik(params.value),
          (value) => !validateBik(String(value)),
        ),
      ks: yup
        .string()
        .required('Обязательное поле')
        .test(
          'ks',
          (params) => ValidateKsOrRs(params.value),
          (value) => !ValidateKsOrRs(String(value)),
        ),
    }),
    chairman: yup.object({
      firstName: yup.string().required('Обязательное поле'),
      lastName: yup.string().required('Обязательное поле'),
      middleName: yup.string().required('Обязательное поле'),
      inn: yup
        .string()
        .required('Обязательное поле')
        .max(12, 'Число символов не должно превышать 12'),
    }),
    percents: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? 0 : value))
      .min(0, 'Взнос должен быть больше 0')
      .max(100, 'Взнос должен быть не больше 100')
      .required('Обязательное поле'),
    isActive: yup
      .bool()
      .oneOf([true], 'Необходимо принять согласие')
      .required('Необходимо принять согласие'),
    logo: yup
      .mixed()
      .nullable()
      .test('fileSize', 'Максимальный размер - 1 МБ', (value) => {
        if (!value || typeof value === 'string') return true;
        //@ts-expect-error none
        return convertSizeToBites(value.size) <= 1048576;
      }),
    scan: yup
      .mixed()
      .required('Обязательное поле')
      .test('fileSize', 'Максимальный размер - 1 МБ', (value) => {
        if (!value || typeof value === 'string') return true;
        //@ts-expect-error none
        return convertSizeToBites(value.size) <= 1048576;
      }),
    parent: yup.string().nullable(),
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
    reset,
    formState: { errors },
    setValue: setFormValue,
    setError,
  } = methods;

  const router = useRouter();

  const [addressString, setAddressString] = useState<string>('');
  const [addressOptions, setAddressOptions] = useState<any[]>([]);
  const [value, setValue] = useState<any | null>(null);
  const [inn, setInn] = useState<boolean>(false);
  const [percents, setPercents] = useState<number>();
  const [chosenUnion, setChoosenUnion] = useState<ITradeUnion>();

  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (data: ITradeUnion) => {
      registration(data);
      saveFormTULogo(data.logo);
      saveFormTUScan(data.scan);
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

  const { data: tradeUnions } = useQuery({
    queryKey: ['tradeUnions'],
    queryFn: getApplications,
    select: (data) => data.data.data,
  });

  const { data: myTradeUnion } = useQuery({
    queryKey: ['myTradeUnion'],
    queryFn: getMyTU,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (myTradeUnion) {
      reset(myTradeUnion);
      if (myTradeUnion.parent.guid && tradeUnions) {
        setChoosenUnion(
          tradeUnions.find(
            (el: ITradeUnion) => el.guid === myTradeUnion?.parent.guid,
          ),
        );
        setInn(true);
      }
    }
  }, [myTradeUnion, tradeUnions]);

  const onSubmit: SubmitHandler<ITradeUnion> = async (data) => {
    data.percents = Number(data.percents);
    mutate(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressString(e.target.value);
  };

  const handleOrgChange = (e: SelectChangeEvent) => {
    const elem = e.target.value.split('/');

    const union = tradeUnions.find(
      (el: ITradeUnion) => el.inn === elem[0] && el.title === elem[1],
    );

    setChoosenUnion(union);
  };

  useEffect(() => {
    if (isSuccess && !myTradeUnion?.tariff?.id) {
      router.push('/tariffs');
    } else if (isSuccess) {
      router.push('/main');
    }
    queryClient.invalidateQueries({ queryKey: ['myTradeUnion'] });
  }, [isSuccess, myTradeUnion]);

  useEffect(() => {
    if (!inn) {
      setChoosenUnion(undefined);
      setFormValue('parent', null);
    }
  }, [inn]);

  useEffect(() => {
    if (addressString) {
      const timer = setTimeout(() => {
        mutateAddress(addressString);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [addressString, mutateAddress]);

  useEffect(() => {
    if (value) {
      setFormValue('address.area', value?.area);
      setFormValue('address.city', value?.city || value?.settlement);
      setFormValue('address.region', value?.region);
      setFormValue('address.postcode', value?.postalCode);
      setFormValue('address.street', value?.street);
      setFormValue(
        'address.house',
        `${value?.houseType || ''} ${value?.house || ''} ${
          value?.blockType || ''
        } ${value?.block || ''}`,
      );
    }
  }, [value]);

  useEffect(() => {
    if (chosenUnion) {
      setFormValue('inn', chosenUnion?.inn);
      setFormValue('kpp', chosenUnion?.kpp);
      setFormValue('ogrn', chosenUnion?.ogrn);
      setFormValue('registrationDate', chosenUnion?.registrationDate);
      setFormValue('okato', chosenUnion?.okato);
      setFormValue('oktmo', chosenUnion?.oktmo);
      setFormValue('bank.bank', chosenUnion?.bank?.bank);
      setFormValue('bank.rs', chosenUnion?.bank?.rs);
      setFormValue('bank.bik', chosenUnion?.bank?.bik);
      setFormValue('bank.ks', chosenUnion?.bank?.ks);
      setFormValue('parent', chosenUnion?.guid);
      setError('inn', {});
      setError('kpp', {});
      setError('ogrn', {});
      setError('okato', {});
      setError('oktmo', {});
      setError('bank.rs', {});
      setError('bank.ks', {});
      setError('bank.bik', {});
      setError('registrationDate', {});
    }
  }, [chosenUnion]);

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
                <Checkbox
                  checked={inn}
                  value={inn}
                  onClick={() => setInn((prev) => !prev)}
                />
                <Typography
                  component={'span'}
                  variant="body1"
                  fontWeight={600}
                  pt={0.2}
                >
                  Организация без ИНН
                </Typography>
              </Grid2>
              {inn && (
                <Grid2 size={12}>
                  <InputLabel>Вышестоящая организация</InputLabel>
                  <Select
                    fullWidth
                    sx={{ padding: 1.6 }}
                    onChange={handleOrgChange}
                    value={
                      chosenUnion
                        ? chosenUnion?.inn + '/' + chosenUnion?.title
                        : ''
                    }
                  >
                    {tradeUnions &&
                      tradeUnions.map((el: ITradeUnion) => {
                        if (el.title !== myTradeUnion?.title)
                          return (
                            <MenuItem
                              key={el.title + el.inn}
                              value={el.inn + '/' + el.title}
                            >
                              {el.inn + ' - ' + el.title}
                            </MenuItem>
                          );
                      })}
                  </Select>
                </Grid2>
              )}
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
                  name="logo"
                  label="Добавить логотип"
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel
                  sx={{ color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000' }}
                >
                  ИНН
                </InputLabel>
                <TextFieldCustom
                  register={register('inn')}
                  placeholder="111111111111"
                  error={errors.inn?.message}
                  disabled={inn}
                  maxL={12}
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel
                  sx={{ color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000' }}
                >
                  КПП
                </InputLabel>
                <TextFieldCustom
                  register={register('kpp')}
                  placeholder="111111111"
                  error={errors.kpp?.message}
                  disabled={inn}
                  maxL={9}
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel
                  sx={{ color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000' }}
                >
                  ОГРН
                </InputLabel>
                <TextFieldCustom
                  register={register('ogrn')}
                  placeholder="1111111111111"
                  error={errors.ogrn?.message}
                  disabled={inn}
                  maxL={13}
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel
                  sx={{ color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000' }}
                >
                  Дата пост. на учет
                </InputLabel>
                {!inn ? (
                  <InputDate name="registrationDate" />
                ) : (
                  <TextField
                    {...register('registrationDate')}
                    disabled
                    error={!!errors.registrationDate?.message}
                    helperText={errors.registrationDate?.message || ''}
                  />
                )}
              </Grid2>
              <Grid2 size={4}>
                <InputLabel
                  sx={{ color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000' }}
                >
                  ОКАТО
                </InputLabel>
                <TextFieldCustom
                  register={register('okato')}
                  placeholder="11111111111"
                  disabled={inn}
                  error={errors.okato?.message}
                  maxL={11}
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel
                  sx={{ color: inn ? 'rgba(0, 0, 0, 0.38)' : '#000' }}
                >
                  ОКТМО
                </InputLabel>

                <TextFieldCustom
                  register={register('oktmo')}
                  disabled={inn}
                  placeholder="11111111111"
                  error={errors.oktmo?.message}
                  maxL={11}
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
                <TextFieldCustom
                  register={register('address.postcode')}
                  placeholder="Индекс"
                  error={errors.address?.postcode?.message}
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
                <TextFieldCustom
                  register={register('chairman.inn')}
                  placeholder="ИНН"
                  error={errors.chairman?.inn?.message}
                  maxL={12}
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
                <TextFieldCustom
                  register={register('chairmanPhone')}
                  placeholder="+79999999999"
                  error={errors.chairmanPhone?.message}
                  maxL={12}
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
                <TextFieldCustom
                  register={register('bank.rs')}
                  placeholder="Р/с"
                  disabled={inn}
                  error={errors.bank?.rs?.message}
                  maxL={20}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextFieldCustom
                  register={register('bank.bik')}
                  placeholder="БИК"
                  disabled={inn}
                  error={errors.bank?.bik?.message}
                  maxL={9}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextFieldCustom
                  register={register('bank.ks')}
                  placeholder="К/с"
                  disabled={inn}
                  error={errors.bank?.ks?.message}
                  maxL={20}
                />
              </Grid2>
              <Grid2 size={6}>
                <InputLabel>Телефон организации</InputLabel>
                <TextFieldCustom
                  register={register('phone')}
                  placeholder="+79999999999"
                  error={errors.phone?.message}
                  maxL={12}
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
                <InputLabel>Размер взносов (%)</InputLabel>
                <TextField
                  {...register('percents')}
                  error={!!errors.percents?.message}
                  helperText={errors.percents?.message || ''}
                  onChange={(e) => {
                    if (!/^\d+$/.test(e.target.value))
                      setPercents(chosenUnion?.percents || 0);
                    else
                      setPercents(
                        Math.min(100, Math.max(0, Number(e.target.value))),
                      );
                  }}
                  value={percents}
                />
              </Grid2>
              <Grid2 size={12}>
                <InputFile
                  name="scan"
                  label={
                    <span>
                      Прикрепить Устав профсоюзной организации <br />
                      (документ в формате pdf)
                    </span>
                  }
                  accept=".pdf"
                  imageSelect="pdf"
                  type="secondary"
                />
              </Grid2>
              <Grid2 size={12}>
                <InputFile
                  name="participants"
                  label="Загрузить участников"
                  accept=".xls,.xlsx"
                  imageInit="upload"
                  type="primary"
                />
              </Grid2>
              <Grid2 size={12}>
                <InputCheckbox
                  sx={{ justifyContent: 'center' }}
                  name="isActive"
                  link={'/politics.pdf'}
                  label={`Я соглашаюсь с политикой обработки персональных данных `}
                />
              </Grid2>
              <Grid2 size={6}>
                <Button
                  variant="outlined"
                  sx={{ width: '100%', fontSize: '20px', lineHeight: '27px' }}
                  onClick={() => router.push('/main')}
                >
                  Отменить
                </Button>
              </Grid2>
              <Grid2 size={6}>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    padding: '16px 25px',
                    fontSize: '20px',
                    lineHeight: '27px',
                  }}
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
