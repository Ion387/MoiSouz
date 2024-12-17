'use client';

import { Box, Button, IconButton, List, ListItem, Slide } from '@mui/material';
import React, { useState } from 'react';
import s from './layout.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import useMobile from '@/hooks/UseMobile';
import {
  BookIcon,
  CrossIcon,
  LogoutIcon,
  NavIcon,
  WomanIcon,
} from '@/styles/icons';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const LandingHeader = () => {
  const mobile = useMobile();
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  const { data: session } = useSession();

  return (
    <>
      <Box
        component={'header'}
        className={clsx(s.landingHeader, !open && s.shadow)}
      >
        <Image width={93} height={15} alt="Logo image" src="/images/Logo.svg" />
        {!mobile && !session?.user?.token && (
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
        {mobile && !session?.user?.token && (
          <>
            <IconButton onClick={handleChange} className={s.navBtn}>
              {!open ? <NavIcon /> : <CrossIcon />}
            </IconButton>
          </>
        )}
        {session?.user?.token && (
          <IconButton onClick={() => signOut({ redirect: false })}>
            <LogoutIcon />
          </IconButton>
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
