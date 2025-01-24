'use client';

import React from 'react';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const Main = () => {
  return (
    <Box
      sx={{
        height: '100%',
        background: 'rgba(255, 255, 255, 0.8)',
      }}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
    >
      <Image
        width={185}
        height={150}
        alt="indevImage"
        src={'/images/indev.svg'}
      />
      <Typography variant="h3" marginTop={2}>
        Раздел находится в разработке и скоро появится
      </Typography>
    </Box>
  );
};

export default Main;
