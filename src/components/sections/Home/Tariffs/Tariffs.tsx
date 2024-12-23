import { Box, Button, Grid2, List, Typography } from '@mui/material';
import React from 'react';
import s from './tarrifs.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { items } from '@/constants/tarrifs';
import CardItem from './Card/Card';

const Tariffs = ({
  noTitle,
  setSteps,
}: {
  noTitle?: boolean;
  setSteps?: (step: number) => void;
}) => {
  return (
    <Box component={'section'} className={s.wrapper}>
      {!noTitle && (
        <Typography variant="h2" textTransform="uppercase" marginBottom={4.3}>
          Тарифы
        </Typography>
      )}
      <Box className={s.infoBox}>
        <Box className={s.textBox}>
          <Image
            width={148}
            height={125}
            alt="Truck"
            src="/images/free-shipping--e-commerce-free-shipping.svg"
          />
          <Box>
            <Typography className={s.price}>Тариф</Typography>
            <Typography variant="h3" textTransform="uppercase">
              «Элементарный»
            </Typography>
            <Typography className={s.price}>4,9 рублей</Typography>
            <Typography className={s.desc}>за пользователя в месяц</Typography>
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
        {!setSteps ? (
          <Link href={'/signin'}>
            <Button variant="contained" sx={{ padding: '12px 17px' }}>
              Подключить
            </Button>
          </Link>
        ) : (
          <Button
            variant="contained"
            sx={{ padding: '12px 17px' }}
            onClick={() => setSteps && setSteps(4)}
          >
            Подключить
          </Button>
        )}
      </Box>
      <Grid2 container spacing={2.5}>
        {items.map((item) => (
          <Grid2 key={item.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <CardItem
              title={item.title}
              price={item.price}
              priceDesc={item.priceDesc}
              list={item.list}
              desc={item.desc}
              main={item.main}
              setSteps={setSteps}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Tariffs;
