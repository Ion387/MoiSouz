import { Box, Button, Grid2, List, Typography } from '@mui/material';
import React from 'react';
import s from './tarrifs.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { items } from '@/constants/tarrifs';
import CardItem from './Card/Card';

const Tariffs = () => {
  return (
    <Box component={'section'} className={s.wrapper}>
      <Typography variant="h2" textTransform="uppercase" marginBottom={4.3}>
        Тарифы
      </Typography>
      <Box className={s.infoBox}>
        <Box className={s.textBox}>
          <Image
            width={148}
            height={125}
            alt="Truck"
            src="/images/free-shipping--e-commerce-free-shipping.svg"
          />
          <Box>
            <Typography variant="h3" textTransform="uppercase">
              БЕСПЛАТНО
            </Typography>
            <Typography variant="body1">
              базовый функционал
              <br />
              навсегда
            </Typography>
          </Box>
        </Box>
        <List>
          <Typography>
            - Учет участников Профсоюза и Единый цифровой паспорт участника
          </Typography>
          <Typography>
            - Формирование и ведение учетной карточки члена Профсоюза
          </Typography>
          <Typography>
            - Возможность работы в одном ЛК по нескольким организациям
          </Typography>
          <Typography>- Защита персональных данных</Typography>
          <Typography>- Реклама от партнеров</Typography>
        </List>
        <Link href={'/signin'}>
          <Button variant="contained" sx={{ padding: '12px 17px' }}>
            Попробовать бесплатно
          </Button>
        </Link>
      </Box>
      <Grid2 container spacing={2.5}>
        {items.map((item) => (
          <Grid2 key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <CardItem
              title={item.title}
              price={item.price}
              priceDesc={item.priceDesc}
              list={item.list}
              desc={item.desc}
              main={item.main}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Tariffs;
