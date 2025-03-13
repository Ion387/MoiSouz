'use client';

import React, { Suspense, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { Icon } from '@/components/ui';
import { ColleagueCard, ColleagueForm } from '@/components/sections/Colleagues';

import { useFetchProfile } from '@/hooks/useFetchProfile';
import {
  useFetchColleagueProfile,
  useForm,
} from '@/hooks/UseFormColleagueProfile';

const ColleagueWrapper = () => {
  const params = useParams();
  const isCreate = (params.guid as string) == 'create';

  const info = useFetchProfile();

  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: refetchUser,
    clear: clearUser,
  } = useFetchColleagueProfile((params.guid as string) || '');

  const { onCancel, onSubmit, isLoading: isLoadingForm } = useForm();

  useEffect(() => {
    if (isCreate) return;
    refetchUser();
    return () => clearUser();
  }, []);

  //if (info) info.hasTradeunionOwner = false;

  return (
    <Box display="flex" flexDirection="column" gap={1.5}>
      <Link href="/colleagues">
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
          назад к списку коллег
        </Button>
      </Link>

      {info != null && isLoadingUser == false ? (
        <>
          {info?.hasTradeunionOwner == true ? (
            <ColleagueForm
              onCancel={onCancel}
              onSubmit={onSubmit}
              defaultValues={user}
              loading={isLoadingForm}
            />
          ) : user ? (
            <>
              <Typography variant="h3" marginBottom={2}>
                Карточка контакта
              </Typography>
              <ColleagueCard user={user} />
            </>
          ) : (
            <Typography fontSize={14} textAlign="center">
              Пользователь не найден
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

const ColleaguePage = () => {
  return (
    <Suspense>
      <ColleagueWrapper />
    </Suspense>
  );
};

export default ColleaguePage;
