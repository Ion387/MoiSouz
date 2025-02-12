import React, { FC } from 'react';
import { List, ListItem, Paper, Typography } from '@mui/material';
import style from './progressBar.module.scss';

interface IProps {
  steps: number;
}

const ProgressBar: FC<IProps> = ({ steps }) => {
  return (
    <Paper sx={{ p: 2.4 }}>
      <Typography variant="h3" marginBottom={1.2}>
        Статус документа
      </Typography>
      <List className={style.list}>
        <ListItem
          className={steps >= 1 ? style.listItemActive : style.listItem}
        >
          <Typography variant="body2">Ожидает отправки</Typography>
        </ListItem>
        <ListItem
          className={steps >= 2 ? style.listItemActive : style.listItem}
        >
          <Typography variant="body2">Отправлено в Профсоюз</Typography>
        </ListItem>
        <ListItem
          className={steps >= 3 ? style.listItemActive : style.listItem}
        >
          <Typography variant="body2">На проверке Профсоюзом </Typography>
        </ListItem>
        <ListItem
          className={steps >= 4 ? style.listItemActive : style.listItem}
        >
          <Typography variant="body2">
            Решение положительное, ожидает передачи оригинала в Профсоюз
          </Typography>
        </ListItem>
        <ListItem
          className={steps >= 5 ? style.listItemActive : style.listItem}
        >
          <Typography variant="body2">Оригинал получен</Typography>
        </ListItem>
      </List>
    </Paper>
  );
};

export default ProgressBar;
