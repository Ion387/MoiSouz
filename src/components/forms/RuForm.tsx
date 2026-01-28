'use client';

import { type IRuDoc } from '@/models/EPDoc';
import { type IQuestion, type INewProt } from '@/models/Protocol';
import { Button, Grid2, Paper } from '@mui/material';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import RuQuestions from '../sections/Docs/RuQuestions';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getBackendUrl } from '@/constants/url';
import axios from 'axios';
import { getHeaders } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { type IRu } from '@/models/EP';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { useFetchTUOwner } from '@/hooks/useTU';
import { itemSchema } from './NewProtocolForm';

const schema = yup
  .object({
    documentDate: yup.string(),
    documentNumber: yup.string(),
    data: yup.object({
      parentGuid: yup.string().required('Обязательное поле'),
      questions: yup.array().of(itemSchema).required('Обязательное поле'),
    }),
    tradeunion: yup.number().required('Обязательное поле'),
    id: yup.number().nullable(),
  })
  .required();

const RuForm = ({
  doc,
  protocol,
}: {
  doc?: IRuDoc | null;
  protocol?: INewProt | null;
}) => {
  const [questions, setQuestions] = useState<undefined | IQuestion[]>(
    protocol?.data?.questions,
  );
  const router = useRouter();

  const info = useFetchTUOwner();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async (data: IRu) => {
      return axios.post(`${getBackendUrl}/api/private/document`, data, {
        headers: {
          ...(await getHeaders()),
        },
      });
    },
  });

  const { mutate: mutateByGuid, isSuccess: isSuccessByGuid } = useMutation({
    mutationFn: async (data: IRu) => {
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

  const { setValue: setFormValue, handleSubmit } = methods;

  useEffect(() => {
    const arr = protocol?.data?.questions || [];
    if (protocol && arr) setQuestions(arr);
    setFormValue('data.questions', arr);
    if (protocol?.guid) setFormValue('data.parentGuid', protocol?.guid);
  }, [protocol]);

  useEffect(() => {
    setFormValue('documentNumber', 'RUXXXXX');
    setFormValue('documentDate', dayjs().format('DD.MM.YYYY'));
  }, []);

  useEffect(() => {
    if (info) {
      setFormValue('tradeunion', Number(info.id));
    }
  }, [info]);

  useEffect(() => {
    if (doc) {
      setFormValue('documentNumber', doc.documentNumber);
      setFormValue('documentDate', doc.documentDate);
      setFormValue('data.questions', doc.data.questions);
      setFormValue('data.parentGuid', doc.data.parentGuid);
      setFormValue('id', doc.id ? doc.id : null);
      setFormValue('tradeunion', Number(doc.tradeunion.id));
    }
  }, [doc]);

  useEffect(() => {
    const fn = async () => {
      if (isSuccess) {
        router.push(`/documents/ru/${data?.data.guid}`);
      }
      if (isSuccessByGuid && doc) {
        router.push(`/documents/ru/${doc.guid}`);
      }
    };
    fn();
  }, [isSuccess, data, doc, isSuccessByGuid]);

  const onSubmit: SubmitHandler<IRu> = async (data) => {
    if (!doc) mutate(data);
    else mutateByGuid(data);
  };

  return (
    <Paper>
      <RuQuestions questions={questions} />
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
                type="submit"
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

export default RuForm;
