import React, { useEffect, useState } from 'react';
import s from './forms.module.scss';
import {
  Button,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ITradeUnionMember } from '@/models/TradeUnionMember';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { InputDate } from '../ui/form/input-date';
import dayjs from 'dayjs';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getApplications } from '@/services/getApplications';
import { ITradeUnion } from '@/models/TradeUnion';
import { InputCheckbox } from '../ui/form/input-checkbox';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { getBackendUrl } from '@/constants/url';

const schema = yup
  .object({
    documentDate: yup.string(),
    documentNumber: yup.string(),
    data: yup.object({
      inviteDate: yup.string().required('Обязательное поле'),
      lastName: yup.string().required('Обязательное поле'),
      firstName: yup.string().required('Обязательное поле'),
      middleName: yup.string().nullable(),
      position: yup.string().required('Обязательное поле'),
      percents: yup
        .number()
        .min(0, 'Взнос должен быть больше 0')
        .max(100, 'Взнос должен быть не больше 100')
        .required('Обязательное поле'),
      isActive: yup
        .bool()
        .oneOf([true], 'Необходимо принять согласие')
        .required('Необходимо принять согласие'),
    }),
    tradeunion: yup.number().required('Обязательное поле'),
  })
  .required();

const TradeUnionMemberForm = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSteps,
}: {
  setSteps: (step: number) => void;
}) => {
  const [chosenUnion, setChoosenUnion] = useState<ITradeUnion>();
  const [percents, setPercents] = useState<number>();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue: setFormValue,
    getValues,
  } = methods;

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (data: ITradeUnionMember) => {
      const session = await getSession();

      return axios.post(`${getBackendUrl}/api/private/document`, data, {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      });
    },
  });

  const onSubmit: SubmitHandler<ITradeUnionMember> = async (data) => {
    data.data.percents = Number(data.data.percents);
    mutate(data);
  };

  const info = useFetchProfile();

  const { data: tradeUnions } = useQuery({
    queryKey: ['tradeUnions'],
    queryFn: getApplications,
    select: (data) => data.data.data,
  });

  useEffect(() => {
    if (info) {
      reset({
        data: {
          middleName: info.middleName,
          firstName: info.firstName,
          lastName: info.lastName,
          position: !!info.position?.length ? info.position[0] : '',
        },
      });
      setFormValue('documentNumber', 'AMXXXXX');
      setFormValue('documentDate', dayjs().format('DD.MM.YYYY'));
    }
  }, [info]);

  useEffect(() => {
    if (isSuccess) {
      setSteps(3);
    }
  }, [isSuccess]);

  const handleOrgChange = (e: SelectChangeEvent) => {
    const union = tradeUnions.find(
      (el: ITradeUnion) => el.inn === e.target.value,
    );
    reset({ data: { percents: union.percents || 0 } });
    setPercents(union.percents || 0);
    setChoosenUnion(union);
    setFormValue('documentNumber', 'AMXXXXX');
    setFormValue('documentDate', dayjs().format('DD.MM.YYYY'));
  };

  useEffect(() => {
    if (chosenUnion && chosenUnion.id) {
      setFormValue('tradeunion', chosenUnion.id);
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
              <Grid2 size={8}>
                <InputLabel>Номер документа</InputLabel>
                <TextField
                  {...register('documentNumber')}
                  disabled
                  error={!!errors.documentNumber?.message}
                  helperText={errors.documentNumber?.message || ''}
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel>Дата документа</InputLabel>
                <TextField
                  {...register('documentDate')}
                  disabled
                  error={!!errors.documentDate?.message}
                  helperText={errors.documentDate?.message || ''}
                />
              </Grid2>
              <Grid2 size={12}>
                <InputLabel>Имя</InputLabel>
                <TextField
                  {...register('data.firstName')}
                  placeholder="Иван"
                  error={!!errors.data?.firstName?.message}
                  helperText={errors.data?.firstName?.message || ''}
                />
              </Grid2>
              <Grid2 size={12}>
                <InputLabel>Фамилия</InputLabel>
                <TextField
                  {...register('data.lastName')}
                  placeholder="Иванов"
                  error={!!errors.data?.lastName?.message}
                  helperText={errors.data?.lastName?.message || ''}
                />
              </Grid2>
              <Grid2 size={12}>
                <InputLabel>Отчество</InputLabel>
                <TextField
                  {...register('data.middleName')}
                  placeholder="Иванович"
                  error={!!errors.data?.middleName?.message}
                  helperText={errors.data?.middleName?.message || ''}
                />
              </Grid2>
              <Grid2 size={12}>
                <InputLabel>Должность</InputLabel>
                <TextField
                  {...register('data.position')}
                  placeholder="Бухгалтер"
                  error={!!errors.data?.position?.message}
                  helperText={errors.data?.position?.message || ''}
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel>Дата вступления</InputLabel>
                <InputDate name="data.inviteDate" />
              </Grid2>
              <Grid2 size={8}>
                <InputLabel>Наименования профсоюза</InputLabel>
                <Select
                  fullWidth
                  sx={{ padding: 1.6 }}
                  onChange={handleOrgChange}
                  value={chosenUnion?.inn || ''}
                >
                  {tradeUnions &&
                    tradeUnions.map((el: ITradeUnion) => (
                      <MenuItem key={el.inn} value={el.inn}>
                        {el.title}
                      </MenuItem>
                    ))}
                </Select>
              </Grid2>
              {chosenUnion && (
                <Grid2 size={12}>
                  <InputLabel>
                    Минимальный размер взносов в профсоюз (%)
                  </InputLabel>
                  <TextField
                    {...register('data.percents')}
                    error={!!errors.data?.percents?.message}
                    helperText={errors.data?.percents?.message || ''}
                    onChange={(e) => {
                      if (!/^\d+$/.test(e.target.value))
                        setPercents(chosenUnion?.percents || 0);
                      else
                        setPercents(
                          Math.min(
                            100,
                            Math.max(
                              chosenUnion?.percents || 0,
                              Number(e.target.value),
                            ),
                          ),
                        );
                    }}
                    value={percents}
                  />
                </Grid2>
              )}
              <Grid2 size={12}>
                <InputCheckbox
                  sx={{ justifyContent: 'center' }}
                  name="data.isActive"
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
                  onClick={() => {
                    console.log(getValues());
                  }}
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

export default TradeUnionMemberForm;
