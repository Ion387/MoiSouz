'use client';

import React, { Suspense, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { Icon } from '@/components/ui';
import { ColleagueCard, ColleagueForm } from '@/components/sections/Colleagues';

import { useFetchProfile } from '@/hooks/useFetchProfile';
import { useFetchTUUsers } from '@/hooks/useTU';
import { useForm } from '@/hooks/UseFormColleagueProfile';

import { IProfile } from '@/models/Profile';

const ColleagueWrapper = () => {
  const params = useParams();

  const info = useFetchProfile();
  const { data: tuUsers, loading: loadingTUUsers } = useFetchTUUsers();

  const user: IProfile | undefined = useMemo(() => {
    const id = parseInt((params.id as string) || '-1');
    return tuUsers?.find((el) => el.id == id);
  }, [params, tuUsers]);

  const { onCancel, onSubmit } = useForm();

  if (info?.hasTradeunionOwner == false) return null;

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

      {loadingTUUsers == false ? (
        user ? (
          info?.hasTradeunionOwner == true ? (
            <ColleagueForm
              onCancel={onCancel}
              onSubmit={onSubmit}
              defaultValues={user}
            />
          ) : (
            <>
              <Typography variant="h3" marginBottom={2}>
                Карточка контакта
              </Typography>
              <ColleagueCard user={user} />
            </>
          )
        ) : (
          <Typography fontSize={14} textAlign="center">
            Пользователь не найден
          </Typography>
        )
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
