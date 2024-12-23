'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Container, IconButton } from '@mui/material';
import clsx from 'clsx';

import { ButtonNotify, UserNav } from '@/components/entities/profile';
import { useQuery } from '@tanstack/react-query';
import styles from './header.module.scss';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';
import { Icon } from '@/components/ui';
import { signOut } from 'next-auth/react';
import axios from 'axios';
import { getBackendUrl } from '@/constants/url';
import { getHeaders } from '@/utils/axios';

export const ProfileHeader = () => {
  const { profileInfo } = useGetProfileInfo();

  const [profileData, setProfileData] = useState(profileInfo);

  const { data: info } = useQuery({
    queryKey: ['profile'],
    queryFn: async () =>
      axios.get(`${getBackendUrl}/api/private/profile`, {
        headers: {
          ...(await getHeaders()),
        },
      }),
    select: (data) => data.data,
  });

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
                ? profileData?.ROLES[0].includes('USER')
                  ? 'Пользователь'
                  : 'Администратор'
                : undefined
            }
            name={profileData?.name || ''}
            avatar={profileData?.avatar}
            sx={{ ml: 1 }}
          />
          <IconButton
            onClick={() =>
              signOut({ redirectTo: `${process.env.NEXT_PUBLIC_URL}/signin` })
            }
          >
            <Icon color="primary" name="logout" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};
