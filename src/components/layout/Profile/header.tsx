'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Container, IconButton } from '@mui/material';
import clsx from 'clsx';

import {
  ButtonHelp,
  ButtonNotify,
  UserNav,
} from '@/components/entities/profile';
import styles from './header.module.scss';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';
import { Icon } from '@/components/ui';
import { signOut } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import { getMyTU } from '@/services/getMyTU';
import { useQuery } from '@tanstack/react-query';

export const ProfileHeader = () => {
  const { profileInfo } = useGetProfileInfo();
  const router = useRouter();
  const [profileData, setProfileData] = useState(profileInfo);

  const { data: myTradeUnion } = useQuery({
    queryKey: ['myTradeUnion'],
    queryFn: getMyTU,
    select: (data) => data.data,
  });

  const info = useFetchProfile();

  useEffect(() => {
    if (info) setProfileData(info);
  }, [info]);

  return (
    <Box component={'header'} className={clsx(styles.wrapper, styles.shadow)}>
      <Container className={clsx(styles.content)}>
        <Image width={93} height={15} alt="Logo image" src="/images/Logo.svg" />

        <Box>
          <ButtonHelp sx={{ mr: 0.5 }} />
          <ButtonNotify count={0} />
          <UserNav
            role={
              profileData?.ROLES && profileData?.ROLES.length
                ? profileData?.ROLES.includes('ROLE_TRADEUNION')
                  ? 'Владелец профсоюза'
                  : 'Пользователь'
                : undefined
            }
            name={
              profileData?.name && profileData?.name !== ' .'
                ? profileData?.name
                : myTradeUnion?.title || ''
            }
            avatar={
              profileData?.ROLES && profileData?.ROLES.length
                ? profileData?.ROLES.includes('ROLE_TRADEUNION')
                  ? myTradeUnion?.logo
                  : profileData?.avatar
                : undefined
            }
            sx={{ ml: 1 }}
          />
          <IconButton
            onClick={async () => {
              await signOut({ redirect: false });
              router.push('/signin');
            }}
          >
            <Icon color="primary" name="logout" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};
