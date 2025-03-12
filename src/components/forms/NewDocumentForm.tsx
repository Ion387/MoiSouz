import React, { useEffect, useState } from 'react';
import s from './forms.module.scss';
import {
  Box,
  Button,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { InputDate } from '../ui/form/input-date';
import dayjs from 'dayjs';
import { IDoc, type INewDoc } from '@/models/Doc';
import { InputArrayOfObjects } from '../ui/form/input-array-of-objects';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { getBackendUrl } from '@/constants/url';
import { type INewDocument } from '@/models/NewDocument';
import { getDocs } from '@/services/getDocs';

const itemSchema = yup.object().shape({
  speaker: yup.string().required('Обязательное поле'),
  question: yup.string().required('Обязательное поле'),
});

const schema = yup
  .object({
    documentDate: yup.string(),
    documentNumber: yup.string(),
    address: yup.string().required('Обязательное поле'),
    questions: yup.array().of(itemSchema),
  })
  .required();

const NewDocumentForm = ({ doc }: { doc?: INewDoc | null }) => {
  const [articlesL, setArticlesL] = useState<number>(0);
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['doc'] });

  const { data: docs } = useQuery({
    queryKey: ['docs'],
    queryFn: getDocs,
    select: (data) => data.data,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue: setFormValue,
    getValues,
    reset,
  } = methods;

  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async (data: INewDocument) => {
      const session = await getSession();

      return axios.post(
        `${getBackendUrl}/api/private/document`,
        {
          documentDate: data.documentDate,
          documentNumber: data.documentNumber,
          data: { address: data.address, questions: data.questions },
        },
        {
          headers: { Authorization: `Bearer ${session?.user?.token}` },
        },
      );
    },
  });

  const { mutate: mutateByGuid, isSuccess: isSuccessByGuid } = useMutation({
    mutationFn: async (data: INewDocument) => {
      const session = await getSession();
      if (doc)
        return axios.post(
          `${getBackendUrl}/api/private/document`,
          {
            documentDate: data.documentDate,
            documentNumber: data.documentNumber,
            data: { address: data.address, questions: data.questions },
            guid: doc.guid,
          },
          {
            headers: { Authorization: `Bearer ${session?.user?.token}` },
          },
        );
    },
  });

  const onSubmit: SubmitHandler<INewDocument> = async (data) => {
    if (doc && doc.guid) mutateByGuid(data);
    else mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(`/documents/${data?.data.guid}`);
    }
    if (isSuccessByGuid && doc) {
      router.push(`/documents/${doc.guid}`);
    }
  }, [isSuccess, data, doc, isSuccessByGuid]);

  useEffect(() => {
    setFormValue('documentNumber', 'AGXXXXX');
    setFormValue('documentDate', dayjs().format('DD.MM.YYYY'));
  }, []);

  useEffect(() => {
    if (doc) {
      setFormValue('documentNumber', doc.documentNumber);
      setFormValue('documentDate', doc.documentDate);
      setFormValue(`address`, doc.data.address);
      if (doc.data?.questions && doc.data.questions?.length) {
        doc.data.questions?.forEach((el, id) => {
          setFormValue(
            `questions.${id}.speaker`,
            //@ts-expect-error none
            doc.data.questions[id].speaker,
          );
          setFormValue(
            `questions.${id}.question`,
            //@ts-expect-error none
            doc.data.questions[id].question,
          );
        });
      }
    } else {
      reset();
      setFormValue('documentNumber', 'AGXXXXX');
      setFormValue('documentDate', dayjs().format('DD.MM.YYYY'));
    }
  }, [doc]);

  useEffect(() => {
    if (docs && !doc) {
      const filteredDocs = docs.filter(
        (el: IDoc) =>
          el.documentType === 'AM' && el.step === 'На проверке профсоюзом',
      );
      if (filteredDocs && filteredDocs.length) {
        //@ts-expect-error none
        filteredDocs.forEach((el, id) => {
          setFormValue(`questions.${id}.speaker`, 'Докладчик');
          setFormValue(
            `questions.${id}.question`,
            `О включении в профсоюз нового участника на основании заявления\nФИО заявителя: ${el.user.name}\nДата рождения: ${el.user.birthdate}`,
          );
        });
      }
      setArticlesL(filteredDocs.length);
    }
  }, [docs, doc]);

  return (
    <Paper className={s.paper} style={{ paddingBottom: '55px' }}>
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
                {' '}
                <InputLabel sx={{ marginBottom: '0' }}>
                  Место проведения
                </InputLabel>
                <TextField
                  {...register(`address`)}
                  placeholder="Место проведения"
                  error={!!errors.address?.message}
                  helperText={errors.address?.message || ''}
                />
              </Grid2>
              <Grid2 size={12}>
                <InputArrayOfObjects
                  name="questions"
                  desc="Добавить вопрос"
                  render={(name, index, register, errors) => (
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      width={'100%'}
                      gap={1.6}
                    >
                      <InputLabel sx={{ marginBottom: '0' }}>{`Вопрос №${
                        index + 1
                      }`}</InputLabel>
                      <TextField
                        {...register(`${name}.${index}.question`)}
                        multiline
                        rows={3}
                        placeholder="Вопрос"
                        error={!!errors?.question?.message}
                        helperText={errors?.question?.message || ''}
                        disabled={index <= articlesL - 1}
                      />
                      <InputLabel sx={{ marginBottom: '0' }}>
                        Докладчик
                      </InputLabel>
                      <Select
                        fullWidth
                        sx={{ padding: 1.6 }}
                        name={`questions.${index}.speaker`}
                        value={getValues(`questions.${index}.speaker`)}
                        onChange={(e) => {
                          setFormValue(
                            `questions.${index}.speaker`,
                            String(e.target.value),
                          );
                        }}
                        error={!!errors?.speaker?.message}
                      >
                        <MenuItem key={0} value={'Докладчик'}>
                          Докладчик
                        </MenuItem>
                      </Select>
                      {!!errors?.speaker?.message && (
                        <FormHelperText sx={{ color: '#FF4949' }}>
                          {errors?.speaker?.message}
                        </FormHelperText>
                      )}
                    </Box>
                  )}
                  defaultValue=""
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
                    const values = getValues();
                    if (
                      values?.questions?.[values.questions.length - 1]
                        ?.question == '' ||
                      values?.questions?.[values.questions.length - 1]
                        ?.question == undefined
                    ) {
                      values?.questions?.pop();
                    }
                    await onSubmit(values);
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
