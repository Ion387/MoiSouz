import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import s from './hero.module.scss';
import { HeartIcon } from '@/styles/icons';
import Link from 'next/link';

const Hero = () => {
  return (
    <Box component="section" className={s.wrapper}>
      <Typography variant="h1" className={s.title}>
        <span>Мой</span> Союз
      </Typography>
      <Typography className={s.subtitle}>
        комплексное решение для <span>автоматизации</span> деятельности
        <span> профсоюзов</span>
      </Typography>
      <Link href="/signin">
        <Button variant="contained" className={s.btn}>
          <HeartIcon />
          Попробовать бесплатно
        </Button>
      </Link>
    </Box>
  );
};

export default Hero;
