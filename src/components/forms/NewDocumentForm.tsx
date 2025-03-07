import React, { useEffect } from 'react';
import s from './forms.module.scss';
import {
  Box,
  Button,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { InputDate } from '../ui/form/input-date';
import dayjs from 'dayjs';
import { type INewDoc } from '@/models/Doc';
import { InputArrayOfObjects } from '../ui/form/input-array-of-objects';

const itemSchema = yup.object().shape({
  person: yup.string().required('Обязательное поле'),
  place: yup.string().required('Обязательное поле'),
  article: yup.string().required('Обязательное поле'),
});

const schema = yup
  .object({
    documentDate: yup.string(),
    documentNumber: yup.string(),
    data: yup.array().of(itemSchema),
  })
  .required();

const NewDocumentForm = ({ doc }: { doc?: INewDoc | null }) => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const {
    register,
    formState: { errors },
    setValue: setFormValue,
  } = methods;

  /*const { mutate, isSuccess, data } = useMutation({
    mutationFn: async (data: ITradeUnionMember) => {
      const session = await getSession();

      return axios.post(`${getBackendUrl}/api/private/document`, data, {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      });
    },
  });*/

  /* const { mutate: mutateByGuid, isSuccess: isSuccessByGuid } = useMutation({
    mutationFn: async (data: ITradeUnionMember) => {
      const session = await getSession();
      if (doc)
        return axios.post(
          `${getBackendUrl}/api/private/document`,
          { ...data, guid: doc.guid },
          {
            headers: { Authorization: `Bearer ${session?.user?.token}` },
          },
        );
    },
  });*/

  /*const onSubmit: SubmitHandler<INewDocument> = async () => {
    router.push(`/documents?inside`);
  };*/

  /*useEffect(() => {
    if (isSuccess) {
      router.push(`/documents/${data?.data.guid}`);
    }
    if (isSuccessByGuid && doc) {
      router.push(`/documents/${doc.guid}`);
    }
  }, [isSuccess, data, doc, isSuccessByGuid]);*/

  useEffect(() => {
    setFormValue('documentNumber', 'BMXXXXX');
    setFormValue('documentDate', dayjs().format('DD.MM.YYYY'));
  }, []);

  useEffect(() => {
    if (doc) {
      setFormValue('documentNumber', doc.documentNumber);
      setFormValue('documentDate', doc.documentDate);
      if (doc.data.length) {
        doc.data.forEach((el, id) => {
          setFormValue(`data.${id}.person`, doc.data[id].person);
          setFormValue(`data.${id}.place`, doc.data[id].place);
          setFormValue(`data.${id}.article`, doc.data[id].article);
        });
      }
    }
  }, [doc]);

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
          <form onSubmit={() => {}}>
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <InputLabel>Номер документа</InputLabel>
                <TextField
                  {...register('documentNumber')}
                  disabled
                  error={!!errors.documentNumber?.message}
                  helperText={errors.documentNumber?.message || ''}
                />
              </Grid2>
              <Grid2 size={6}>
                <InputLabel>Дата документа</InputLabel>
                <InputDate name="documentDate" isFutureAccess />
              </Grid2>
              <Grid2 size={12}>
                <InputArrayOfObjects
                  name="data"
                  desc="Добавить вопрос"
                  render={(name, index, register, errors) => (
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      width={'100%'}
                      gap={1.6}
                    >
                      <InputLabel sx={{ marginBottom: '0' }}>
                        Место проведения
                      </InputLabel>
                      <TextField
                        {...register(`${name}.${index}.place`)}
                        placeholder="Место проведения"
                        error={!!errors?.message}
                        helperText={errors?.message || ''}
                      />
                      <InputLabel sx={{ marginBottom: '0' }}>{`Вопрос №${
                        index + 1
                      }`}</InputLabel>
                      <TextField
                        {...register(`${name}.${index}.article`)}
                        multiline
                        rows={3}
                        placeholder="Место проведения"
                        error={!!errors?.message}
                        helperText={errors?.message || ''}
                      />
                      <InputLabel sx={{ marginBottom: '0' }}>
                        Докладчик
                      </InputLabel>
                      <Select
                        fullWidth
                        sx={{ padding: 1.6 }}
                        onChange={() => {}}
                        error={!!errors?.message}
                      >
                        <MenuItem key={0} value={'Докладчик'}>
                          Докладчик
                        </MenuItem>
                      </Select>
                    </Box>
                  )}
                  defaultValue=""
                  preadd
                />
              </Grid2>

              <Grid2 size={4}>
                <Button
                  variant="outlined"
                  sx={{ width: '100%', fontSize: '20px', lineHeight: '27px' }}
                  onClick={() => router.push('/main')}
                >
                  Отменить
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
                  onClick={async () => {
                    router.push('/documents?drafts');
                  }}
                >
                  В черновик
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

export default NewDocumentForm;
