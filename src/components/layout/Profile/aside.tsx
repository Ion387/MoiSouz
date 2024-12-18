'use client';

import React from 'react';
import { Box, Button, Divider, List } from '@mui/material';

import { ListItem } from '@/components/ui';

import styles from './aside.module.scss';

export const ProfileAside = () => {
  return (
    <List className={styles.wrapper}>
      <List className={styles.content}>
        <ListItem label="Главная" icon="time" to="/profile" />
        <ListItem label="Уведомления" icon="notify" />
        <ListItem label="Задачи" icon="tasks" />
        <ListItem
          label="Документы"
          icon="document"
          to="/documents" /*openAlways*/
        >
          <ListItem label="Входящие" />
          <ListItem label="Исходящие" />
          <ListItem label="Черновики" />
        </ListItem>
        <ListItem label="Мои организации" icon="square-2x2" />
        <ListItem label="Коллеги" icon="peoples" />

        <Divider sx={{ my: 1.5 }} />

        <ListItem label="Деньги" icon="money" />
        <ListItem label="Скидки, льготы" icon="gift" />
        <ListItem label="Магазин" icon="square-3x3" />
        <ListItem label="Информация" icon="info" />

        {/*
      <Button variant="contained" className={styles.banner} sx={{ mt: 5 }}>
        Рекламный{'\r\n'}баннер
      </Button>
      */}
      </List>
    </List>
  );
};
