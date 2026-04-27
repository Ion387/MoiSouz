'use client';

import React, { useState } from 'react';
import s from './home.module.scss';
import { Box } from '@mui/material';
import Benefits from '@/components/sections/Home/Benefits';
import Features from '@/components/sections/Home/Features';
import FAQ from '@/components/sections/Home/FAQ';
import Pricing from '@/components/sections/Home/Pricing';
import Navbar from '@/components/sections/Home/Navbar';
import Footer from '@/components/sections/Home/Footer';
import Steps from '@/components/sections/Home/Steps';
import Hero from '@/components/sections/Home/Hero';
import { useRouter } from 'next/navigation';
import { FeedbackDialog } from '@/components/entities/profile';

const HomePage = () => {
  const router = useRouter();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const openContactModal = () => setIsContactModalOpen(true);
  const openLoginModal = () => router.push('/signin');
  return (
    <Box component={'main'} className={s.wrapper}>
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary-200 selection:text-primary-900">
        <Navbar onOpenLogin={openLoginModal} />
        <main>
          <Hero onOpenContact={openContactModal} onOpenLogin={openLoginModal} />
          <Features />
          <Steps />
          <Benefits />
          <Pricing onOpenContact={openContactModal} />
          <FAQ />
        </main>
        <Footer onOpenContact={openContactModal} />

        <FeedbackDialog
          open={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          withEmail
        />
      </div>
    </Box>
  );
};

export default HomePage;
