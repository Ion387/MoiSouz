'use client';

import { ListItem } from '@/components/ui';
import { InputFile } from '@/components/ui/form/input-file';
import { saveFormTU2Scan } from '@/services/postLogoandFile';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid2, Paper } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

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
  const { mutate, isSuccess } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      saveFormTU2Scan(data.upload, number);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.push(`/documents/}`);
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<object> = async (data) => {
    mutate(data);
  };
  return (
    <Paper>
      <ListItem
        label="Редактировать"
        to={`/documents/drafts/${number}`}
        icon="edit"
      />
      <ListItem label="Создать такой же" icon="plus" to={`/documents/`} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2.4} pt={2.4}>
            <Grid2 size={12}>
              <InputFile name="upload" label="Прикрепить скан (pdf)" />
            </Grid2>
            <Grid2 size={12}>
              <Button
                variant="contained"
                sx={{ width: '100%', padding: '16px 25px' }}
                type="submit"
              >
                Отправить в Профсоюз
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default ScanBlock;
