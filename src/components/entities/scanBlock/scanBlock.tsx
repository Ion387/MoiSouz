'use client';

import { Icon, ListItem } from '@/components/ui';
import { InputFile } from '@/components/ui/form/input-file';
import { postDoc, saveFormTU2Scan } from '@/services/postLogoandFile';
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { globalTheme } from '@/styles/theme';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';
import { getDoc } from '@/services/getDocs';
import { type Filetype } from '@/models/File';
import { convertSizeToBites } from '@/utils/convertStringToB';

const schema = yup
  .object({
    upload: yup
      .mixed<Filetype>()
      .required('Для отправки прикрепите файл')
      .test('fileSize', 'Максимальный размер - 1 МБ', (value) => {
        console.log('value', value);
        if (!value || typeof value === 'string') return true;
        return convertSizeToBites(value.size) <= 1048576;
      }),
  })
  .required();

const schemaForUsers = yup
  .object({
    upload: yup
      .mixed<Filetype>()
      .test('fileSize', 'Максимальный размер - 1 МБ', (value) => {
        if (!value || typeof value === 'string') return true;
        return convertSizeToBites(value.size) <= 1048576;
      }),
  })
  .required();

const ScanBlock = ({ number }: { number: string }) => {
  const { profileInfo: info } = useGetProfileInfo();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(
      info?.ROLES?.includes('ROLE_TRADEUNION') ? schema : schemaForUsers,
    ),
  });
  const { handleSubmit, setValue } = methods;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isSuccess } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      saveFormTU2Scan(data.upload, number);
    },
  });

  const { mutate: mutate2, isSuccess: isSuccess2 } = useMutation({
    mutationFn: async (data: { step: string }) => {
      postDoc(data, number);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doc'] });
    },
  });

  const { data: file } = useQuery({
    queryKey: ['doc'],
    queryFn: () => getDoc(number),
    select: (data) => data?.data,
  });

  useEffect(() => {
    if (isSuccess) {
      router.push(`/documents?incoming`);
    }
    if (isSuccess2 && !info?.ROLES?.includes('ROLE_TRADEUNION'))
      router.push(`/documents?outgoing`);
    if (isSuccess2 && info?.ROLES?.includes('ROLE_TRADEUNION'))
      router.push(`/documents?incoming`);
  }, [isSuccess, isSuccess2]);

  useEffect(() => {
    if (file && file.files) {
      const scan = file?.files.find((el) => el.type === 'AM_scan');
      setValue('upload', scan);
    }
  }, [file]);

  const onSubmit: SubmitHandler<object> = async (data) => {
    mutate(data);
  };
  return (
    <Paper>
      <Box pb={2.4}>
        <a href={file?.file} target="_blank" style={{ width: '100%' }}>
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
        <a download href={file?.file} style={{ width: '100%' }}>
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
            {info?.ROLES?.includes('ROLE_TRADEUNION') && (
              <>
                {' '}
                <Grid2 size={12}>
                  <InputFile
                    mw={'100%'}
                    name="upload"
                    label="Заявление на вступление в профсоюзную организацию (pdf)"
                  />
                </Grid2>
              </>
            )}

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
                type={
                  info?.ROLES?.includes('ROLE_TRADEUNION') ? 'submit' : 'button'
                }
                onClick={() => {
                  if (!info?.ROLES?.includes('ROLE_TRADEUNION'))
                    mutate2({ step: 'Отправлено в профсоюз' });
                }}
              >
                {!info?.ROLES?.includes('ROLE_TRADEUNION')
                  ? 'Отправить в профсоюз'
                  : 'Загрузить документы'}
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
