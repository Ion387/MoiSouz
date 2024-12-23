import React, { FC } from 'react';
import s from './card.module.scss';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import { ITarrif } from '@/models/Tarrif';
import Link from 'next/link';

const CardItem: FC<ITarrif> = ({
  title,
  price,
  priceDesc,
  list,
  desc,
  main,
  setSteps,
}) => {
  return (
    <Box className={main ? s.mainItem : s.item}>
      <Box className={s.cardHeader}>
        <Typography className={main ? s.mainPrice : s.price}>Тариф</Typography>
        <Typography className={main ? s.mainTitle : s.title}>
          {title}
        </Typography>
        <Typography className={main ? s.mainPrice : s.price}>
          {price}
        </Typography>
        <Typography className={main ? s.mainDesc : s.desc}>
          {priceDesc}
        </Typography>
        <List className={s.list}>
          {list.map((item) => (
            <ListItem key={item} className={main ? s.mainL : s.l}>
              {item}
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className={s.cardFooter}>
        {desc && <Typography className={s.desc2}>{desc}</Typography>}
        {!setSteps ? (
          <Link href="/" className={s.btn}>
            <Button
              variant={main ? 'outlined' : 'contained'}
              sx={{
                color: main ? 'rgb(72, 128, 255)' : '#fff',
                padding: '14px 17px',
                width: '100%',
                border: '0px',
              }}
            >
              Оформить подписку
            </Button>
          </Link>
        ) : (
          <Button
            onClick={() => setSteps && setSteps(4)}
            variant={main ? 'outlined' : 'contained'}
            sx={{
              color: main ? 'rgb(72, 128, 255)' : '#fff',
              padding: '14px 17px',
              width: '100%',
              border: '0px',
            }}
          >
            Оформить подписку
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CardItem;
