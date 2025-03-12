/* eslint-disable @typescript-eslint/no-unused-expressions */
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
    select: (data) => data,
  });

  useEffect(() => {
    if (isSuccess) {
      router.push(`/documents?incoming`);
    }
    if (isSuccess2 && !info?.ROLES?.includes('ROLE_TRADEUNION'))
      router.push(`/documents?outgoing`);
    /*if (isSuccess2 && info?.ROLES?.includes('ROLE_TRADEUNION'))
      router.push(`/documents?incoming`);*/
  }, [isSuccess, isSuccess2]);

  useEffect(() => {
    if (file && file.files) {
      const scan = file?.files.findLast(
        (el) => el.type === 'AM_scan' || el.type === 'AM_signed',
      );
      setValue('upload', scan);
    }
  }, [file]);

  useEffect(() => {
    if (
      info?.ROLES?.includes('ROLE_TRADEUNION') &&
      file?.step !== 'На согласовании' &&
      file?.step !== 'Утверждено'
    ) {
      mutate2({
        step:
          file?.documentType === 'AM'
            ? 'На проверке профсоюзом'
            : 'На согласовании',
      });
    }
  }, []);

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
        {!info?.ROLES?.includes('ROLE_TRADEUNION') ||
          (file?.documentType !== 'AM' && (
            <ListItem
              label="Создать такой же"
              icon="plus"
              to={
                file?.documentType !== 'AM'
                  ? `/new_document`
                  : `/trade_union_member`
              }
            />
          ))}
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ height: 'calc(100% - 208px)' }}
        >
          <Grid2 container position={'relative'} height={'100%'}>
            {info?.ROLES?.includes('ROLE_TRADEUNION') && (
              <>
                <Grid2 size={12}>
                  <InputFile
                    sx={{
                      border: 'dotted 1px rgb(72, 128, 255)',
                      borderRadius: '10px',
                    }}
                    mw={'100%'}
                    name="upload"
                    label="Прикрепить скан (pdf)"
                    accept=".pdf"
                    imageSelect="pdf"
                    type="secondary"
                  />
                </Grid2>
              </>
            )}

            <Grid2 size={12} display={'flex'} alignItems={'end'}>
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
                type={
                  info?.ROLES?.includes('ROLE_TRADEUNION') ? 'submit' : 'button'
                }
                onClick={() => {
                  if (
                    file?.documentType === 'AM' &&
                    !info?.ROLES?.includes('ROLE_TRADEUNION')
                  )
                    mutate2({ step: 'Отправлено в профсоюз' });
                  else {
                    file?.documentType !== 'AM';
                  }
                  mutate2({ step: 'Утверждено' });
                }}
              >
                {file?.documentType === 'AM' &&
                !info?.ROLES?.includes('ROLE_TRADEUNION')
                  ? 'Отправить в профсоюз'
                  : file?.documentType === 'AM'
                    ? 'Загрузить документы'
                    : 'Утвердить'}
              </Button>
              {/*info?.ROLES?.includes('ROLE_TRADEUNION') && (
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
              )*/}
            </Grid2>
          </Grid2>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default ScanBlock;
