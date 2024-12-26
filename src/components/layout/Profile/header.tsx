'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Container, IconButton } from '@mui/material';
import clsx from 'clsx';

import { ButtonNotify, UserNav } from '@/components/entities/profile';
import styles from './header.module.scss';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';
import { Icon } from '@/components/ui';
import { signOut } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import { useFetchProfile } from '@/hooks/useFetchProfile';

export const ProfileHeader = () => {
  const { profileInfo } = useGetProfileInfo();
  const router = useRouter();
  const [profileData, setProfileData] = useState(profileInfo);

  const info = useFetchProfile();

  useEffect(() => {
    if (info) setProfileData(info);
  }, [info]);

  return (
    <Box component={'header'} className={clsx(styles.wrapper, styles.shadow)}>
      <Container className={clsx(styles.content)}>
        <Image width={93} height={15} alt="Logo image" src="/images/Logo.svg" />

        <Box>
          <ButtonNotify count={0} />
          <UserNav
            role={
              profileData?.ROLES && profileData?.ROLES.length
                ? profileData?.ROLES.includes('ROLE_TRADEUNION')
                  ? 'Владелец профсоюза'
                  : 'Пользователь'
                : undefined
            }
            name={profileData?.name || ''}
            avatar={profileData?.avatar}
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
