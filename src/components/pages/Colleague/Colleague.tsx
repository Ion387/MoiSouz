'use client';

import React, { Suspense, useMemo } from 'react';
import { useParams } from 'next/navigation';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { useFetchProfile } from '@/hooks/useFetchProfile';
import { useFetchTUUsers } from '@/hooks/useTU';
import { IProfile } from '@/models/Profile';
import Image from 'next/image';
import { Icon } from '@/components/ui';
import Link from 'next/link';

const ColleagueWrapper = () => {
  const params = useParams();

  const info = useFetchProfile();
  const { data: tuUsers, loading: loadingTUUsers } = useFetchTUUsers();

  const user: IProfile | undefined = useMemo(() => {
    const id = parseInt((params.id as string) || '-1');
    return tuUsers?.find((el) => el.id == id);
  }, [params, tuUsers]);

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

      <Typography variant="h3" marginBottom={2}>
        Карточка контакта
      </Typography>

      {loadingTUUsers == false ? (
        user ? (
          <Box
            display="flex"
            bgcolor="white"
            borderRadius={4}
            overflow="hidden"
            height={250}
            boxShadow="5px 5px 30px rgba(0,0,0,0.2)"
          >
            {user.avatar && (
              <Box width={300}>
                <Image
                  src={user.avatar}
                  style={{
                    width: '100%',
                  }}
                  alt=""
                />
              </Box>
            )}
            <Box display="flex" flex={1}>
              <Box display="flex" flexDirection="column" flex={1} p={2}>
                <Typography fontSize={16} fontWeight={700}>
                  {[user?.lastName, user?.firstName, user?.middleName]
                    .filter((el) => el)
                    .join(' ')}
                </Typography>
                <Typography fontSize={14} color="gray">
                  {user?.position && user?.position[0]}
                </Typography>
                <Typography fontSize={14} color="gray">
                  {user?.profession && user?.profession[0]}
                </Typography>
                <Typography fontSize={14} color="gray">
                  {`Дата вступления: ${user?.birthdate}`}
                </Typography>
                <Box marginTop="auto" marginBottom="auto">
                  <Typography fontSize={14} color="gray">
                    {user?.email}
                  </Typography>
                  <Typography fontSize={14} color="gray">
                    {user?.phone}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    gap: 2,
                    paddingX: 2,
                    paddingY: 1,
                    width: 'fit-content',
                    borderRadius: 2,
                    borderColor: 'gray !important',
                  }}
                >
                  <Icon name="mail" color="gray" />
                  <Typography fontSize={14} fontWeight={700} color="gray">
                    Связаться
                  </Typography>
                </Button>
              </Box>
              <Box width="fit-content" p={2} textAlign="right">
                <Typography fontSize={14} color="gray">
                  {user.birthdate}
                </Typography>
                <Typography fontSize={14} color="gray">
                  {`id ${user.id}`}
                </Typography>
              </Box>
            </Box>
          </Box>
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
