import React, { useEffect, useState } from 'react';
import s from './forms.module.scss';
import {
  Button,
  CircularProgress,
  Grid2,
  InputLabel,
  Paper,
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
import { getMembers } from '@/services/members';
import QuestionFields from '../ui/form/question';

const itemSchema = yup.object().shape({
  speaker: yup.string().required('Обязательное поле'),
  question: yup.string().required('Обязательное поле'),
  document: yup.string(),
});

const schema = yup
  .object({
    documentDate: yup.string(),
    documentNumber: yup.string(),
    address: yup.string().required('Обязательное поле'),
    questions: yup.array().of(itemSchema),
  })
  .required();

const NewDocumentForm = ({
  doc,
  guid,
}: {
  doc?: INewDoc | null;
  guid: string;
}) => {
  const [articlesL, setArticlesL] = useState<number>(0);
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: docs, isLoading } = useQuery({
    queryKey: ['docs'],
    queryFn: getDocs,
    select: (data) => data.data,
  });

  const { data: members, isLoading: isMembersLoading } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers,
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
    queryClient.invalidateQueries({ queryKey: ['doc'] });
  }, [guid]);

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
          setFormValue(`questions.${id}.document`, el.guid);
          setFormValue(
            `questions.${id}.question`,
            `О включении в профсоюз нового участника на основании заявления\nЗаявитель: ${el.user.name}\nДата рождения: ${el.user.birthdate}`,
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
                <InputLabel>Место проведения</InputLabel>
                <TextField
                  {...register(`address`)}
                  placeholder="Место проведения"
                  error={!!errors.address?.message}
                  helperText={errors.address?.message || ''}
                />
              </Grid2>
              {!isLoading ? (
                <Grid2 size={12}>
                  <InputArrayOfObjects
                    name="questions"
                    desc="Добавить вопрос"
                    render={(name, index, register, errors) => (
                      <QuestionFields
                        name={name}
                        index={index}
                        register={register}
                        errors={errors}
                        members={members}
                        isMembersLoading={isMembersLoading}
                        articlesL={articlesL}
                        getValues={getValues}
                        setFormValue={setFormValue}
                      />
                    )}
                    defaultValue=""
                  />
                </Grid2>
              ) : (
                <Grid2 size={12} display={'flex'} justifyContent={'center'}>
                  <CircularProgress />
                </Grid2>
              )}

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

export default NewDocumentForm;
