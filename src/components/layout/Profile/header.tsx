'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Container, IconButton } from '@mui/material';
import clsx from 'clsx';

import { ButtonNotify, UserNav } from '@/components/entities/profile';

import styles from './header.module.scss';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';
import { Icon } from '@/components/ui';
import { signOut } from 'next-auth/react';

export const ProfileHeader = () => {
  const { profileInfo } = useGetProfileInfo();

  return (
    <Box component={'header'} className={clsx(styles.wrapper, styles.shadow)}>
      <Container className={clsx(styles.content)}>
        <Image width={93} height={15} alt="Logo image" src="/images/Logo.svg" />

        <Box>
          <ButtonNotify count={0} />
          <UserNav
            role={
              profileInfo?.ROLES && profileInfo?.ROLES.length
                ? profileInfo?.ROLES[0]
                : undefined
            }
            name={profileInfo?.name}
            avatar={profileInfo?.avatar}
            sx={{ ml: 1 }}
          />
          <IconButton onClick={() => signOut()}>
            <Icon color="primary" name="logout" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};
