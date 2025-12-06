/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

import { Icon, ListItem } from '@/components/ui';
import { postDoc } from '@/services/postLogoandFile';
import * as yup from 'yup';
import {
  Box,
  Button,
  Dialog,
  Grid2,
  IconButton,
  InputLabel,
  Paper,
  TextField,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { globalTheme } from '@/styles/theme';
import { getDoc } from '@/services/getDocs';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getBackendUrl } from '@/constants/url';
import axios from 'axios';
import { getHeaders } from '@/utils/axios';
import { type IDocAppeal } from '@/models/Doc';

const schema = yup
  .object({
    answer: yup.string().required('Введите ответ'),
  })
  .required();

const ScanAppealBlock = ({ number }: { number: string }) => {
  const { info } = useFetchProfile();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<'decline' | 'success' | null>(null);
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { handleSubmit, register } = methods;

  const { data: file } = useQuery({
    queryKey: ['doc', number],
    queryFn: () => getDoc(number),
    select: (data) => data,
  });

  const { mutate } = useMutation({
    mutationFn: async ({
      doc,
      answer,
    }: {
      doc: IDocAppeal;
      answer: string;
    }) => {
      const data = {
        data: { ...doc.data },
        documentDate: doc.documentDate,
        documentNumber: doc.documentNumber,
        tradeunion: doc.tradeunion.id,
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

  const onSubmit: SubmitHandler<{ answer: string }> = async (data) => {
    const answer = data.answer;
    mutate({ answer: answer, doc: file as IDocAppeal });
    if (open == 'decline') mutate2({ step: 'Отклонено' });
    if (open == 'success') mutate2({ step: 'Обращение решено' });
  };

  return (
    <Paper>
      {!info?.ROLES?.includes('ROLE_TRADEUNION') && (
        <Box>
          <ListItem
            label="Редактировать"
            to={`/documents/drafts/${number}`}
            icon="edit"
          />
        </Box>
      )}
      <Box style={{ height: 'calc(100% - 208px)' }}>
        <Grid2 container position={'relative'} height={'100%'}>
          {info?.ROLES?.includes('ROLE_TRADEUNION') && (
            <Grid2
              size={12}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'end'}
            >
              <Grid2 size={12}>
                <Button
                  variant="outlined"
                  sx={{
                    padding: '15px 15px',
                    fontSize: '20px',
                    lineHeight: '27px',
                    width: '100%',

                    '&.Mui-disabled': {
                      backgroundColor: `${globalTheme.palette.primary.main} !important`,
                      color: 'white !important',
                    },
                  }}
                  type={'button'}
                  onClick={() => {
                    setOpen('decline');
                  }}
                >
                  {file?.step === 'В работе'
                    ? 'Перенаправить вышестоящей организации'
                    : 'Отклонить'}
                </Button>
              </Grid2>

              {info?.ROLES?.includes('ROLE_TRADEUNION') && (
                <Grid2 size={12}>
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
                    onClick={() => {
                      if (file?.step === 'Обращение зарегистрировано')
                        mutate2({ step: 'В работе' });
                      else setOpen('success');
                    }}
                  >
                    {file?.step === 'В работе'
                      ? 'Направить ответ по обращению'
                      : 'Взять в работу'}
                  </Button>
                </Grid2>
              )}
            </Grid2>
          )}
        </Grid2>
      </Box>
      {!!open && (
        <Dialog open={!!open} fullWidth>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ height: 'calc(100% - 208px)' }}
            >
              <Grid2 container spacing={2}>
                <Grid2 size={12}>
                  <InputLabel>
                    {open == 'success'
                      ? 'Ответ на обращение'
                      : 'Причина отклонения'}
                  </InputLabel>
                  <IconButton
                    sx={{ position: 'absolute', right: 10, top: 10 }}
                    onClick={() => setOpen(null)}
                  >
                    <Icon name="close" />
                  </IconButton>
                </Grid2>
                <Grid2 size={12}>
                  <TextField
                    {...register('answer')}
                    multiline
                    placeholder="Введите ответ"
                    rows={6}
                  ></TextField>
                </Grid2>
                <Grid2 size={12}>
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
        </Dialog>
      )}
    </Paper>
  );
};

export default ScanAppealBlock;
