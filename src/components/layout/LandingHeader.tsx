'use client';

import { Box, Button, IconButton, List, ListItem, Slide } from '@mui/material';
import React, { useState } from 'react';
import s from './layout.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import useMobile from '@/hooks/UseMobile';
import { BookIcon, CrossIcon, NavIcon, WomanIcon } from '@/styles/icons';
import clsx from 'clsx';

const LandingHeader = () => {
  const mobile = useMobile();
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Box
        component={'header'}
        className={clsx(s.landingHeader, !open && s.shadow)}
      >
        <Image width={93} height={15} alt="Logo image" src="/images/Logo.svg" />
        {!mobile && (
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
        )}
        {mobile && (
          <>
            <IconButton onClick={handleChange} className={s.navBtn}>
              {!open ? <NavIcon /> : <CrossIcon />}
            </IconButton>
          </>
        )}
      </Box>
      <Slide direction="down" className={s.slide} in={open}>
        <List className={s.navMob}>
          <ListItem>
            <Link href="/signin">
              <Button variant="text">
                <WomanIcon /> Вход
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/registration">
              <Button variant="text">
                <BookIcon /> Регистрация
              </Button>
            </Link>
          </ListItem>
        </List>
      </Slide>
    </>
  );
};

export default LandingHeader;
