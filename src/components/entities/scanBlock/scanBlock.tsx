'use client';

import { Icon, ListItem } from '@/components/ui';
import { InputFile } from '@/components/ui/form/input-file';
import {
  postDoc,
  saveFormTU2Scan,
  saveFormTUAmount,
  saveFormTUPersonal,
} from '@/services/postLogoandFile';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Grid2,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { globalTheme } from '@/styles/theme';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';
import { getBackendUrl } from '@/constants/url';
import { IDoc } from '@/models/Doc';

const schema = yup
  .object({
    upload: yup.mixed().required('Для отправки прикрепите файл'),
    amount: yup.mixed().required('Для отправки прикрепите файл'),
    personal: yup.mixed().required('Для отправки прикрепите файл'),
  })
  .required();

const schemaForUsers = yup
  .object({
    upload: yup.mixed(),
    amount: yup.mixed(),
    personal: yup.mixed(),
  })
  .required();

const ScanBlock = ({ number, file }: { number: string; file: IDoc }) => {
  const { profileInfo: info } = useGetProfileInfo();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(
      info?.ROLES?.includes('ROLE_TRADEUNION') ? schema : schemaForUsers,
    ),
  });
  const { handleSubmit } = methods;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isSuccess } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      saveFormTU2Scan(data.upload, number);
      saveFormTUAmount(data.amount, number);
      saveFormTUPersonal(data.personal, number);
    },
  });

  const { mutate: mutate2 } = useMutation({
    mutationFn: async (data: { step: string }) => {
      postDoc(data, number);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doc'] });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.push(`/documents`);
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<object> = async (data) => {
    mutate(data);
  };
  return (
    <Paper>
      <Box pb={2.4}>
        <a
          href={getBackendUrl ? getBackendUrl + file : ''}
          target="_blank"
          style={{ width: '100%' }}
        >
          <ListItemButton
            sx={{
              borderRadius: '6px',
            }}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <Icon name={'print'} />
            </ListItemIcon>

            <ListItemText primary={'Распечатать'} />
          </ListItemButton>
        </a>
        <ListItem
          label="Редактировать"
          to={`/documents/drafts/${number}`}
          icon="edit"
        />
        {!info?.ROLES?.includes('ROLE_TRADEUNION') && (
          <ListItem
            label="Создать такой же"
            icon="plus"
            to={`/trade_union_member`}
          />
        )}
        <a
          download
          href={getBackendUrl ? getBackendUrl + file : ''}
          style={{ width: '100%' }}
        >
          <ListItemButton
            sx={{
              borderRadius: '6px',
            }}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <Icon name={'repo'} />
            </ListItemIcon>

            <ListItemText primary={'Скачать заявление'} />
          </ListItemButton>
        </a>
      </Box>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2.4}>
            <Grid2 size={12}>
              <InputFile
                mw={'100%'}
                name="upload"
                label="Заявление на вступление в профсоюзную организацию (pdf)"
              />
            </Grid2>
            <Grid2 size={12}>
              <InputFile
                mw={'100%'}
                name="amount"
                label="Заявление на перечисление суммы взносов (pdf)"
              />
            </Grid2>
            <Grid2 size={12}>
              <InputFile
                mw={'100%'}
                name="personal"
                label="Согласие на обработку персональных данных (pdf)"
              />
            </Grid2>

            <Grid2 size={12}>
              <Button
                variant="contained"
                sx={{
                  padding: '15px 15px',
                  fontSize: '16px',
                  lineHeight: '27px',
                  width: '100%',
                  '&.Mui-disabled': {
                    backgroundColor: `${globalTheme.palette.primary.main} !important`,
                    color: 'white !important',
                  },
                }}
                type="submit"
              >
                Отправить в профсоюз
              </Button>

              {info?.ROLES?.includes('ROLE_TRADEUNION') && (
                <Button
                  variant="contained"
                  sx={{
                    padding: '15px 15px',
                    fontSize: '16px',
                    lineHeight: '27px',
                    width: '100%',
                    mt: '24px',
                    '&.Mui-disabled': {
                      backgroundColor: `${globalTheme.palette.primary.main} !important`,
                      color: 'white !important',
                    },
                  }}
                  onClick={() => {
                    mutate2({ step: 'На проверке Профсоюзом' });
                  }}
                >
                  На проверке Профсоюзом
                </Button>
              )}
            </Grid2>
          </Grid2>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default ScanBlock;
