'use client';

import { ListItem } from '@/components/ui';
import { InputFile } from '@/components/ui/form/input-file';
import { postDoc, saveFormTU2Scan } from '@/services/postLogoandFile';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Grid2, Paper } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { globalTheme } from '@/styles/theme';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';

const schema = yup
  .object({
    upload: yup
      .mixed()
      .required('Для отправки прикрепите скан документа с подписью'),
  })
  .required();

const ScanBlock = ({ number }: { number: string }) => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isSuccess } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      saveFormTU2Scan(data.upload, number);
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
  const { profileInfo: info } = useGetProfileInfo();

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
      {!info?.ROLES?.includes('ROLE_TRADEUNION') && (
        <Box pb={2.4}>
          <ListItem
            label="Редактировать"
            to={`/documents/drafts/${number}`}
            icon="edit"
          />
          <ListItem label="Создать такой же" icon="plus" to={`/documents/`} />
        </Box>
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2.4}>
            <Grid2 size={12}>
              <InputFile
                mw={'100%'}
                name="upload"
                label="Прикрепить скан (pdf)"
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
