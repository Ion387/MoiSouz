import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import clsx from 'clsx';

import { ButtonNotify, UserNav } from '@/components/entities/profile';

import styles from './header.module.scss';

export const ProfileHeader = () => {
  return (
    <Box component={'header'} className={clsx(styles.content, styles.shadow)}>
      <Image width={93} height={15} alt="Logo image" src="/images/Logo.svg" />

      <Box>
        <ButtonNotify count={9} />
        <UserNav sx={{ ml: 1 }} />
      </Box>
    </Box>
  );
};
