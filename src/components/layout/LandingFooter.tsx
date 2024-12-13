import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import s from './layout.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const LandingFooter = () => {
  return (
    <Box component="footer" className={s.footer}>
      <Container>
        <Box className={s.footerBox}>
          <Box className={s.footerList}>
            <Typography
              component="a"
              href={`tel:+7 945 777 33 33`}
              variant="body2"
            >
              +7 945 777 33 33
            </Typography>
            <Typography
              component="a"
              href={`mailto:info@moisouz.ru`}
              variant="body2"
            >
              info@moisouz.ru
            </Typography>
          </Box>
          <Box>
            <Image
              width={93}
              height={15}
              alt="Logo image"
              src="/images/Logo.svg"
            />
          </Box>
          <Box className={s.footerList}>
            <Link href={`/`}>
              <Typography variant="body2" sx={{ textDecoration: 'underline' }}>
                Сотрудничество
              </Typography>
            </Link>
            <Link href={`/`}>
              <Typography variant="body2" sx={{ textDecoration: 'underline' }}>
                Работа
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingFooter;
