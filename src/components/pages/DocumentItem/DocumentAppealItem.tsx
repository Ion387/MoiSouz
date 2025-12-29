'use client';

import ScanAppealBlock from '@/components/entities/scanBlock/scanAppealBlock';
import { InputFile } from '@/components/ui/form/input-file';
import ProgressBar from '@/components/ui/progressBar';
import { getBackendUrl } from '@/constants/url';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import { type IDocAppeal } from '@/models/Doc';
import { Filetype } from '@/models/File';
import { getDoc } from '@/services/getDocs';
import { postDoc, saveFormTU2Scan } from '@/services/postLogoandFile';
import { globalTheme } from '@/styles/theme';
import { getHeaders } from '@/utils/axios';
import { convertSizeToBites } from '@/utils/convertStringToB';
import { stepTransformationAp } from '@/utils/stepTransformation';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    answer: yup.string().required('Введите ответ'),
    upload: yup
      .mixed<Filetype>()
      .test('fileSize', 'Максимальный размер - 2 МБ', (value) => {
        if (!value || typeof value === 'string') return true;
        return convertSizeToBites(value.size) <= 2 * 1048576;
      })
      .nullable(),
  })
  .required();

const DocumentAppealItem = () => {
  const path = usePathname();
  const number = path.split('/')[3];
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<'decline' | 'success' | null>(null);
  const { info } = useFetchProfile();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const methods2 = useForm({});
  const { handleSubmit, register, getValues, setValue } = methods;
  const { setValue: setValue2 } = methods2;

  const { data: doc, isLoading } = useQuery({
    queryKey: ['doc', number],
    enabled: !!number,
    refetchOnMount: false,
    queryFn: () => getDoc<IDocAppeal>(number),
  });

  const { mutate } = useMutation({
    mutationFn: async ({
      doc,
      answer,
      id,
    }: {
      doc: IDocAppeal;
      answer?: string;
      id?: number | null;
    }) => {
      const data = {
        data: { ...doc.data },
        documentDate: doc.documentDate,
        documentNumber: doc.documentNumber,
        tradeunion: id ? id : doc.tradeunion.id,
        id: doc.id,
      };
      data.data.answer = answer;
      return axios.post(
        `${getBackendUrl}/api/private/document`,
        { ...data, data: { ...data.data }, guid: number },
        {
          headers: {
            ...(await getHeaders()),
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doc'] });
      queryClient.refetchQueries({ queryKey: ['docs'] });
    },
  });

  const { mutate: mutate2 } = useMutation({
    mutationFn: async (data: { step: string }) => {
      await postDoc(data, number);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doc'] });
      queryClient.refetchQueries({ queryKey: ['docs'] });
    },
  });

  const onSubmit: SubmitHandler<{
    answer: string;
    upload?: Filetype | null;
  }> = async (data) => {
    mutate({ answer: data.answer, doc: doc as IDocAppeal });
    if (data.upload && doc && doc.guid) {
      const fn = async () => {
        if (typeof getValues('upload') === 'object')
          await saveFormTU2Scan(getValues('upload'), doc?.guid, 'AP_answer');
      };
      fn();
    }
    if (open == 'decline') mutate2({ step: 'Отклонено' });
    if (open == 'success') mutate2({ step: 'Обращение решено' });
    setOpen(null);
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['doc'] });
  }, [number, queryClient]);

  useEffect(() => {
    if (doc && Array.isArray(doc.files)) {
      setValue2('upload', doc.files[0].source);
    }
    if (doc && doc.data.answer && info?.ROLES?.includes('ROLE_TRADEUNION')) {
      setValue('answer', doc.data.answer);
      if (
        doc.step === 'Отправлено в профсоюз' ||
        doc.step === 'Утверждено' ||
        doc.step === 'Ожидает отправки'
      )
        setOpen('decline');
      else if (doc.step === 'В работе') setOpen('success');
    }
  }, [doc, info]);

  const handleOpenDialog = (type: 'decline' | 'success') => {
    setOpen(type);
  };

  return (
    <Grid2 container sx={{ p: 2 }} spacing={2.4}>
      {doc && !isLoading ? (
        <>
          <Grid2 size={8}>
            <Paper
              sx={{ height: '100%', maxHeight: '850px', overflow: 'hidden' }}
            >
              <Grid2 container sx={{ p: 4 }} spacing={2}>
                <Grid2 size={6} display={'flex'} flexDirection={'column'}>
                  <Typography
                    variant="body1"
                    color="rgba(32, 34, 36, 1)"
                    fontWeight={600}
                    marginBottom={'11px'}
                  >
                    Тип обращения
                  </Typography>
                  <Typography color="rgba(166, 166, 166, 1)">
                    {doc.data.type}
                  </Typography>
                </Grid2>
                <Grid2 size={6} display={'flex'} flexDirection={'column'}>
                  <Typography
                    variant="body1"
                    color="rgba(32, 34, 36, 1)"
                    fontWeight={600}
                    marginBottom={'11px'}
                  >
                    Дата обращения
                  </Typography>
                  <Typography color="rgba(166, 166, 166, 1)">
                    {doc.documentDate}
                  </Typography>
                </Grid2>
                <Grid2 size={12} display={'flex'} flexDirection={'column'}>
                  <Typography
                    variant="body1"
                    color="rgba(32, 34, 36, 1)"
                    fontWeight={600}
                    marginBottom={'11px'}
                  >
                    ФИО сотрудника
                  </Typography>
                  <Typography color="rgba(166, 166, 166, 1)">{`${
                    doc.user.lastName
                  } ${doc.user.firstName} ${String(
                    doc.user.middleName,
                  )}`}</Typography>
                </Grid2>
                <Grid2 size={12} display={'flex'} flexDirection={'column'}>
                  <Typography
                    variant="body1"
                    color="rgba(32, 34, 36, 1)"
                    fontWeight={600}
                    marginBottom={'11px'}
                  >
                    Текст обращения
                  </Typography>
                  <Typography color="rgba(166, 166, 166, 1)">
                    {doc.data.text}
                  </Typography>
                </Grid2>
                {doc && !isLoading ? (
                  Array.isArray(doc.files) &&
                  doc.files.find((el) => el.type === 'AP') ? (
                    <Grid2 size={12}>
                      <FormProvider {...methods2}>
                        <form>
                          <InputFile
                            originalName={
                              doc.files.find((el) => el.type === 'AP')
                                ?.originalName
                            }
                            mw={'100%'}
                            name="upload"
                            label="Прикрепить скан (pdf)"
                            accept=".pdf"
                            imageSelect="pdf"
                            type="secondary"
                            defaultFile={
                              doc.files.find((el) => el.type === 'AP')?.source
                            }
                          />
                        </form>
                      </FormProvider>
                    </Grid2>
                  ) : null
                ) : (
                  <CircularProgress />
                )}
                {doc.data.answer &&
                  doc.step !== 'Отправлено в профсоюз' &&
                  doc.step !== 'Утверждено' &&
                  doc.step !== 'Ожидает отправки' &&
                  doc.step !== 'В работе' && (
                    <Grid2 size={12} display={'flex'} flexDirection={'column'}>
                      <Typography
                        variant="body1"
                        color="rgba(32, 34, 36, 1)"
                        fontWeight={600}
                        marginBottom={'11px'}
                      >
                        {`Ответ - ${doc.step}`}
                      </Typography>
                      <Typography color="rgba(166, 166, 166, 1)">
                        {doc.data.answer}
                      </Typography>
                      {doc.files.find((el) => el.type === 'AP_answer') && (
                        <FormProvider {...methods2}>
                          <form>
                            <InputFile
                              mw={'100%'}
                              originalName={
                                doc.files.find((el) => el.type === 'AP_answer')
                                  ?.originalName
                              }
                              name="upload"
                              label="Прикрепить скан (pdf)"
                              accept=".pdf"
                              imageSelect="pdf"
                              type="secondary"
                              defaultFile={
                                doc.files.find((el) => el.type === 'AP_answer')
                                  ?.source
                              }
                            />
                          </form>
                        </FormProvider>
                      )}
                    </Grid2>
                  )}
                {!!open && (
                  <FormProvider {...methods}>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      style={{ height: 'calc(100% - 208px)', width: '100%' }}
                    >
                      <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                          <TextField
                            {...register('answer')}
                            multiline
                            placeholder="Введите ответ"
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
                            defaultFile={doc.files[0].source}
                          />
                        </Grid2>
                        <Grid2 size={6}>
                          <Button
                            variant="outlined"
                            sx={{
                              padding: '15px 15px',
                              fontSize: '20px',
                              lineHeight: '27px',
                              width: '100%',
                              marginTop: '24px',
                              '&.Mui-disabled': {
                                backgroundColor: `${globalTheme.palette.primary.main} !important`,
                                color: 'white !important',
                              },
                            }}
                            type="button"
                            onClick={() => {
                              mutate({
                                answer: getValues().answer,
                                doc: doc as IDocAppeal,
                              });
                              if (open == 'success')
                                mutate2({ step: 'В работе' });
                              setOpen(null);
                            }}
                          >
                            В черновик
                          </Button>
                        </Grid2>
                        <Grid2 size={6}>
                          <Button
                            variant="contained"
                            sx={{
                              padding: '15px 15px',
                              fontSize: '20px',
                              lineHeight: '27px',
                              width: '100%',
                              marginTop: '24px',
                              '&.Mui-disabled': {
                                backgroundColor: `${globalTheme.palette.primary.main} !important`,
                                color: 'white !important',
                              },
                            }}
                            type="submit"
                          >
                            Отправить
                          </Button>
                        </Grid2>
                      </Grid2>
                    </form>
                  </FormProvider>
                )}
              </Grid2>
            </Paper>
          </Grid2>
          <Grid2 size={4} display={'flex'} flexDirection={'column'}>
            <ProgressBar
              initialSteps={
                doc?.step === 'Отклонено'
                  ? ['Отправлено в профсоюз', 'В работе', 'Отказ']
                  : ['Отправлено в профсоюз', 'В работе', 'Обращение решено']
              }
              decision={doc?.step === 'Отклонено'}
              steps={stepTransformationAp(doc.step)}
            />

            <Box paddingTop={2.4} sx={{ flex: '1 1 100%' }}>
              <ScanAppealBlock
                number={doc.guid}
                onOpenDialog={handleOpenDialog}
              />
            </Box>
          </Grid2>
        </>
      ) : (
        <Grid2 size={8}>
          <CircularProgress />
        </Grid2>
      )}
    </Grid2>
  );
};

export default DocumentAppealItem;
