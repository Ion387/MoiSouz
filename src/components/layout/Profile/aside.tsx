'use client';

import React from 'react';
import { Divider, List } from '@mui/material';

import { ListItem } from '@/components/ui';

import styles from './aside.module.scss';

export const ProfileAside = () => {
  return (
    <List className={styles.content}>
      <ListItem label="Главная" icon="time" to="/main" />
      <ListItem label="Уведомления" icon="notify" disabled />
      <ListItem label="Задачи" icon="tasks" disabled />
      <ListItem
        label="Документы"
        icon="document"
        to="/documents" /*openAlways*/
      >
        <ListItem label="Входящие" disabled />
        <ListItem label="Исходящие" disabled />
        <ListItem label="Черновики" disabled />
      </ListItem>
      <ListItem label="Мои организации" icon="square-2x2" disabled />
      <ListItem label="Коллеги" icon="peoples" disabled />

      <Divider sx={{ my: 1.5 }} />

      <ListItem label="Деньги" icon="money" disabled />
      <ListItem label="Скидки, льготы" icon="gift" disabled />
      <ListItem label="Магазин" icon="square-3x3" disabled />
      <ListItem label="Информация" icon="info" disabled />
    </List>
  );
};
