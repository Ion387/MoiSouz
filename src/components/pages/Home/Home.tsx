import React from 'react';
import s from './home.module.scss';
import { Box, Container } from '@mui/material';
import LandingFooter from '@/components/layout/LandingFooter';
import LandingHeader from '@/components/layout/LandingHeader';
import ScrollButton from '@/components/ui/NavBtn';
import Hero from '@/components/sections/Hero/Hero';
import InfoSection from '@/components/sections/Info/InfoSection';
import Circle from '@/components/sections/Circle/Circle';
import Steps from '@/components/sections/Steps/Steps';
import Plus from '@/components/sections/Plus/Plus';
import Benefits from '@/components/sections/Benefits/Benefits';
import Tariffs from '@/components/sections/Tariffs/Tariffs';

const HomePage = () => {
  return (
    <Box component={'main'} className={s.wrapper}>
      <Container>
        <LandingHeader />
        <Hero />
        <InfoSection />
        <Circle />
        <Steps />
        <Plus />
        <Benefits />
        <Tariffs />
      </Container>
      <LandingFooter />
      <ScrollButton />
    </Box>
  );
};

export default HomePage;
