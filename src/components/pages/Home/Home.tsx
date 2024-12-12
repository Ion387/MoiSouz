import React from 'react';
import s from './home.module.scss';
import { Box, Container } from '@mui/material';
import LandingFooter from '@/components/layout/LandingFooter';
import LandingHeader from '@/components/layout/LandingHeader';

const HomePage = () => {
  return (
    <Box component={'main'}>
      <Container className={s.wrapper}>
        <LandingHeader />
        <LandingFooter />
      </Container>
    </Box>
  );
};

export default HomePage;
