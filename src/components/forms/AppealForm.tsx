'use client';

import { getBackendUrl } from '@/constants/url';
import { type IDocAppeal } from '@/models/Doc';
import { type ITradeUnion } from '@/models/TradeUnion';
import { type IAppeal } from '@/models/Appeal';
import { getHeaders } from '@/utils/axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import s from './forms.module.scss';
import {
  Button,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { InputCheckbox, InputDate, InputFile } from '../ui/form';
import { convertSizeToBites } from '@/utils/convertStringToB';
import { type Filetype } from '@/models/File';

const OPTIONS = ['Обращение', 'Жалоба'] as const;

const schema = yup
  .object({
    documentDate: yup.string(),
    documentNumber: yup.string(),
    data: yup.object({
      upload: yup
        .mixed<Filetype>()
        .test('fileSize', 'Максимальный размер - 2 МБ', (value) => {
          if (!value || typeof value === 'string') return true;
          return convertSizeToBites(value.size) <= 2 * 1048576;
        }),
      type: yup.string().required('Выберите тип обращения'),
      text: yup.string().required('Введите текст обращения'),
      isActive: yup
        .bool()
        .oneOf([true], 'Необходимо принять согласие')
        .required('Необходимо принять согласие'),
    }),
    tradeunion: yup.number().required('Обязательное поле'),
    id: yup.number().nullable(),
  })
  .required();

const AppealForm = ({ doc }: { doc?: IDocAppeal | null }) => {
  const [chosenUnion, setChoosenUnion] = useState<ITradeUnion>();
  const [chosenType, setChosenType] = useState<string>('Обращение');
  const router = useRouter();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setFormValue,
    getValues,
  } = methods;

  const { data: infoUT } = useQuery({
    queryKey: ['user-tradeunions'],
    queryFn: async () =>
      axios.get<ITradeUnion[]>(
        `${getBackendUrl}/api/private/user-tradeunions`,
        {
          headers: {
            ...(await getHeaders()),
          },
        },
      ),
    select: (data) => data.data,
    refetchOnMount: 'always',
  });

  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async (data: IAppeal) => {
      return axios.post(`${getBackendUrl}/api/private/document`, data, {
        headers: {
          ...(await getHeaders()),
        },
      });
    },
  });

  const { mutate: mutateByGuid, isSuccess: isSuccessByGuid } = useMutation({
    mutationFn: async (data: IAppeal) => {
      if (doc)
        return axios.post(
          `${getBackendUrl}/api/private/document`,
          { ...data, guid: doc.guid },
          {
            headers: {
              ...(await getHeaders()),
            },
          },
        );
    },
  });

  const onSubmit: SubmitHandler<IAppeal> = async (data) => {
    if (!doc) mutate(data);
    else mutateByGuid(data);
  };

  useEffect(() => {
    setFormValue('documentNumber', 'APXXXXX');
    setFormValue('documentDate', dayjs().format('DD.MM.YYYY'));
    setFormValue('data.type', OPTIONS[0]);
  }, []);

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  useEffect(() => {
    if (infoUT && Array.isArray(infoUT) && infoUT[0])
      setChoosenUnion(infoUT[0]);
  }, [infoUT]);

  useEffect(() => {
    if (isSuccess) {
      router.push(`/documents/appeal/${data?.data.guid}`);
    }
    if (isSuccessByGuid && doc) {
      router.push(`/documents/appeal/${doc.guid}`);
    }
  }, [isSuccess, data, doc, isSuccessByGuid]);

  useEffect(() => {
    if (doc) {
      setFormValue('documentNumber', doc.documentNumber);
      setFormValue('documentDate', doc.documentDate);
      setFormValue('data.text', doc.data.text);
      setFormValue('data.type', doc.data.type);
      setFormValue('data.isActive', doc.data.isActive);
      setFormValue('id', doc.id ? doc.id : null);
      setChoosenUnion(doc.tradeunion);
    }
  }, [doc]);

  useEffect(() => {
    if (chosenUnion && chosenUnion.id) {
      console.log(chosenUnion);
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
              {doc && (
                <>
                  <Grid2 size={6}>
                    <InputLabel>Номер документа</InputLabel>
                    <TextField {...register('documentNumber')} disabled />
                  </Grid2>
                  <Grid2 size={6}>
                    <InputLabel>Дата документа</InputLabel>
                    <InputDate name="documentDate" dis />
                  </Grid2>
                </>
              )}
              <Grid2 size={12} sx={{ position: 'relative' }}>
                <InputLabel>Тип обращения</InputLabel>
                <Select
                  fullWidth
                  sx={{ padding: 1.6 }}
                  onChange={(e) => setChosenType(e.target.value)}
                  value={chosenType}
                  error={!!errors.data?.type}
                >
                  {OPTIONS.map((el: string) => (
                    <MenuItem key={el} value={el}>
                      {el}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors.tradeunion?.message && (
                  <Typography className={s.errorText}>
                    {errors.tradeunion?.message}
                  </Typography>
                )}
              </Grid2>
              <Grid2 size={12}>
                <InputLabel>Текст обращения</InputLabel>
                <TextField
                  {...register('data.text')}
                  multiline
                  placeholder="Введите текст обращения"
                  rows={6}
                ></TextField>
              </Grid2>

              <Grid2 size={12}>
                <InputFile
                  mw={'100%'}
                  name="upload"
                  label="Прикрепить скан (pdf)"
                  accept=".pdf"
                  imageSelect="pdf"
                  type="secondary"
                />
              </Grid2>

              <Grid2 size={12}>
                <InputCheckbox
                  sx={{ justifyContent: 'center' }}
                  name="data.isActive"
                  label={`Соглашаюсь на обработку персональных данных`}
                />
              </Grid2>

              <Grid2 size={4}>
                <Button
                  variant="outlined"
                  sx={{ width: '100%', fontSize: '20px', lineHeight: '27px' }}
                  onClick={() => router.push('/documents?incoming')}
                >
                  Отменить
                </Button>
              </Grid2>
              <Grid2 size={4}>
                <Button
                  variant="outlined"
                  sx={{
                    width: '100%',
                    padding: '16px 25px',
                    fontSize: '20px',
                    lineHeight: '27px',
                  }}
                  onClick={async () => {
                    await onSubmit(getValues());
                    router.push('/documents?drafts');
                  }}
                >
                  В черновик
                </Button>
              </Grid2>
              <Grid2 size={4}>
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
                  Далее
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </FormProvider>
      </LocalizationProvider>
    </Paper>
  );
};

export default AppealForm;
