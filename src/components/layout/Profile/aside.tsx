'use client';

import React from 'react';
import { List } from '@mui/material';

import { ListItem } from '@/components/ui';

import styles from './aside.module.scss';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';

export const ProfileAside = () => {
  const { profileInfo: info } = useGetProfileInfo();
  return (
    <List className={styles.wrapper}>
      <List className={styles.content}>
        <ListItem label="Главная" icon="time" disabled />
        <ListItem label="Уведомления" icon="notify" disabled />
        <ListItem label="Задачи" icon="tasks" disabled />
        <ListItem
          label="Документы"
          icon="document"
          to="/documents?incoming"
          openAlways
        >
          <ListItem label="Входящие" to="/documents?incoming" />
          <ListItem label="Исходящие" to="/documents?outgoing" />
          <ListItem label="Черновики" to="/documents?drafts" />
          <ListItem
            label="Внутренние"
            to="/documents?inside"
            hidden={!info?.ROLES?.includes('ROLE_TRADEUNION')}
          />
        </ListItem>
        <ListItem label="Мои организации" icon="square-2x2" disabled />
        <ListItem label="Коллеги" icon="peoples" to="/colleagues" />

        <ListItem label="Деньги" icon="money" disabled />
        <ListItem label="Скидки, льготы" icon="gift" to="/benefits" />
        <ListItem label="Магазин" icon="square-3x3" disabled />
        <ListItem label="Информация" icon="info" disabled />
      </List>
    </List>
  );
};
