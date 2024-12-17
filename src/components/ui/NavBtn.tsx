'use client';

import { ArrowUpIcon } from '@/styles/icons';
import { Fab } from '@mui/material';
import React, { useState, useEffect } from 'react';
import s from './scrollbtn.module.scss';

const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  return (
    <Fab
      variant="extended"
      color="primary"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      sx={{
        display: showButton ? 'block' : 'none',
        opacity: showButton ? 1 : 0,
      }}
      className={s.btn}
    >
      <ArrowUpIcon />
    </Fab>
  );
};

export default ScrollButton;
