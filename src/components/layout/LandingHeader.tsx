'use client';

import { Box, Button, List, ListItem } from '@mui/material';
import React from 'react';
import s from './layout.module.scss';
import { useMedia } from 'use-media';
import Image from 'next/image';
import Link from 'next/link';

const LandingHeader = () => {
  const mobile = useMedia({ minWidth: '744px' });
  return (
    <Box component={'header'} className={s.landingHeader}>
      <Image width={93} height={15} alt="Logo image" src="/images/Logo.svg" />
      <List className={s.nav}>
        <ListItem>
          <Link href="/signin">
            <Button variant="contained">Вход</Button>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/registration">
            <Button variant="text">Регистрация</Button>
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default LandingHeader;
