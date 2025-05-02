'use client';

import React, { Suspense, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { Icon } from '@/components/ui';
import { NewsForm } from '@/components/forms/NewsForm';

import { useFetchProfile } from '@/hooks/useFetchProfile';
import { useFetchNewsOne, useForm } from '@/hooks/useNews';

const NewsEditWrapper = () => {
  const params = useParams();
  const pathname = usePathname();
  const isCreate = pathname.endsWith('/create');

  const info = useFetchProfile();

  const {
    data: newsOne,
    isLoading: isLoadingNewsOne,
    clear: clearNewsOne,
  } = useFetchNewsOne({ code: (params.code as string) || '' });

  const { onCancel, onSubmit, isLoading: isLoadingForm } = useForm();

  useEffect(() => {
    if (isCreate) return;
    return () => clearNewsOne();
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={1.5}>
      <Link href="/news/edit">
        <Button
          variant="text"
          sx={{
            width: 'fit-content',
            gap: 0.5,
            textDecoration: 'underline',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          <Icon name="arrow-back" color="black" />
          назад к списку новостей
        </Button>
      </Link>

      {info != null && (isCreate == true || isLoadingNewsOne == false) ? (
        <>
          {info?.hasTradeunionOwner == true ? (
            <NewsForm
              onCancel={onCancel}
              onSubmit={onSubmit}
              defaultValues={newsOne}
              loading={isLoadingForm}
            />
          ) : (
            <Typography fontSize={14} textAlign="center">
              Не удалось выполнить операцию
            </Typography>
          )}
        </>
      ) : (
        <Box display={'flex'} justifyContent={'center'} width={'100%'}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

const NewsEditPage = () => {
  return (
    <Suspense>
      <NewsEditWrapper />
    </Suspense>
  );
};

export default NewsEditPage;
