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
}) => {
  return (
    <Box className={main ? s.mainItem : s.item}>
      <Typography className={main ? s.mainTitle : s.title}>{title}</Typography>
      <Typography className={main ? s.mainPrice : s.price}>{price}</Typography>
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
      {desc && <Typography className={s.desc2}>{desc}</Typography>}
      <Link
        href="/"
        style={{
          width: 'calc(100% - 34px)',
          position: 'absolute',
          bottom: '20px',
        }}
      >
        <Button
          variant={main ? 'outlined' : 'contained'}
          sx={{
            color: main ? 'rgb(72, 128, 255)' : '#fff',
            padding: '16px 17px',
            width: '100%',
          }}
        >
          Оформить подписку
        </Button>
      </Link>
    </Box>
  );
};

export default CardItem;
