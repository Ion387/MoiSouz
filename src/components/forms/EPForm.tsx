'use client';

import { type IEPDoc } from '@/models/EPDoc';
import { type IQuestion, type INewProt } from '@/models/Protocol';
import { Button, Grid2, Paper } from '@mui/material';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import EPQuestions from '../sections/Docs/EPQuestions';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getBackendUrl } from '@/constants/url';
import axios from 'axios';
import { getHeaders } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { IEP } from '@/models/EP';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { useFetchTUOwner } from '@/hooks/useTU';

const schema = yup
  .object({
    documentDate: yup.string(),
    documentNumber: yup.string(),
    data: yup.object({
      parent: yup.string().nullable(),
      parentGuid: yup.string().required('Обязательное поле'),
      question: yup.string().required('Выберите вопрос'),
      resolution: yup.string().required('Обязательное поле'),
    }),
    tradeunion: yup.number().required('Обязательное поле'),
    id: yup.number().nullable(),
  })
  .required();

const EPForm = ({
  doc,
  protocol,
}: {
  doc?: IEPDoc | null;
  protocol?: INewProt | null;
}) => {
  const [question, setQuestion] = useState<null | IQuestion>(null);
  const [questions, setQuestions] = useState<undefined | IQuestion[]>(
    protocol?.data?.questions?.filter((el, index) => index > 3),
  );
  const router = useRouter();

  const info = useFetchTUOwner();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async (data: IEP) => {
      return axios.post(`${getBackendUrl}/api/private/document`, data, {
        headers: {
          ...(await getHeaders()),
        },
      });
    },
  });

  const { mutate: mutateByGuid, isSuccess: isSuccessByGuid } = useMutation({
    mutationFn: async (data: IEP) => {
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

  const {
    setValue: setFormValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  useEffect(() => {
    if (protocol)
      setQuestions(protocol?.data?.questions?.filter((_, index) => index > 3));
    if (protocol?.guid) setFormValue('data.parentGuid', protocol?.guid);
  }, [protocol]);

  useEffect(() => {
    setFormValue('documentNumber', 'EPXXXXX');
    setFormValue('documentDate', dayjs().format('DD.MM.YYYY'));
  }, []);

  useEffect(() => {
    if (question) {
      setFormValue('data.question', question.question);
      setFormValue('data.resolution', question.decided);
    }
  }, [question]);
  useEffect(() => {
    if (info) {
      setFormValue('data.parent', info.parent?.guid);
      setFormValue('tradeunion', Number(info.id));
    }
  }, [info]);

  useEffect(() => {
    if (doc) {
      setFormValue('documentNumber', doc.documentNumber);
      setFormValue('documentDate', doc.documentDate);
      setFormValue('data.question', doc.data.question);
      setFormValue('data.resolution', doc.data.resolution);
      setFormValue('data.parentGuid', doc.data.parentGuid);
      setFormValue('data.parent', doc.data.parent);
      setFormValue('id', doc.id ? doc.id : null);
      setFormValue('tradeunion', Number(doc.tradeunion.id));
      setQuestion(
        questions
          ? questions.find((el) => el.question === doc.data.question) || null
          : null,
      );
    }
  }, [doc]);

  useEffect(() => {
    const fn = async () => {
      if (isSuccess) {
        router.push(`/documents/ep/${data?.data.guid}`);
      }
      if (isSuccessByGuid && doc) {
        router.push(`/documents/ep/${doc.guid}`);
      }
    };
    fn();
  }, [isSuccess, data, doc, isSuccessByGuid]);

  const onSubmit: SubmitHandler<IEP> = async (data) => {
    if (!doc) mutate(data);
    else mutateByGuid(data);
  };

  return (
    <Paper>
      <EPQuestions
        question={question}
        questions={questions}
        setQuestion={setQuestion}
        errors={errors}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {' '}
          <Grid2 container spacing={2} mt={1.2}>
            <Grid2 size={6}>
              <Button
                variant="outlined"
                sx={{ width: '100%', fontSize: '20px', lineHeight: '27px' }}
                onClick={() => router.push('/documents?inside')}
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
                onClick={() => {
                  if (!question)
                    setError('data.question', { message: 'Выберите вопрос' });
                }}
                type={question ? 'submit' : 'button'}
              >
                Далее
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default EPForm;
