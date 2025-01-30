'use client';

import { Box, Button, Grid2, List, Typography } from '@mui/material';
import React from 'react';
import s from './tarrifs.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { items } from '@/constants/tarrifs';
import CardItem from './Card/Card';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTariffs, sendTariffs } from '@/services/getTariffs';
import { ITarrif } from '@/models/Tarrif';

const Tariffs = ({
  noTitle,
  isActive,
}: {
  noTitle?: boolean;
  isActive?: boolean;
}) => {
  const { data } = useQuery({
    queryKey: ['tariffs'],
    queryFn: getTariffs,
    select: (data) => data.data.data,
  });

  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationFn: (id: number | undefined) => sendTariffs(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const handleSubmit = (id: number | undefined) => mutate(id);

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
            <Typography className={s.price}>9,9 рублей</Typography>
            <Typography
              className={s.desc}
              sx={{ marginBottom: '8px !important' }}
            >
              за пользователя в месяц *
            </Typography>
            <Typography className={s.price}>4,9 рублей</Typography>
            <Typography className={s.desc}>при оплате за год</Typography>
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
        {!isActive ? (
          <Link href={'/registration'}>
            <Button
              variant="contained"
              sx={{ padding: '12px 17px', width: '180px' }}
            >
              Подключить
            </Button>
          </Link>
        ) : (
          <Button
            variant="contained"
            sx={{ padding: '12px 17px' }}
            onClick={() =>
              handleSubmit(
                data
                  ? data.find(
                      (el: ITarrif) => el.title === 'Тариф «Элементарный»',
                    ).id
                  : undefined,
              )
            }
          >
            Подключить
          </Button>
        )}
      </Box>
      <Grid2 container spacing={2.5}>
        {items.map((item) => (
          <Grid2 key={item.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <CardItem
              id={
                data
                  ? data.find(
                      (el: ITarrif) => el.title.split(' ')[2] === item.title,
                    ).id
                  : undefined
              }
              isActive={isActive}
              title={item.title}
              price={item.price}
              priceDesc={item.priceDesc}
              price1={item.price1}
              priceDesc1={item.priceDesc1}
              list={item.list}
              desc={item.desc}
              main={item.main}
              handleSubmit={handleSubmit}
              isSuccess={isSuccess}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Tariffs;
