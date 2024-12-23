import React, { FC } from 'react';
import { Grid2, LinearProgress, Paper, Typography } from '@mui/material';

interface IProps {
  steps: number;
  maxSteps: number;
}

const ProgressBar: FC<IProps> = ({ steps, maxSteps }) => {
  return (
    <Paper sx={{ p: 2.4, mt: 8 }}>
      <Typography variant="h3" marginBottom={1.2}>
        Статус заявления
      </Typography>
      <Grid2 container spacing={1.2}>
        <Grid2 size={maxSteps > 3 ? 3 : 4}>
          <LinearProgress
            variant="determinate"
            value={steps > 1 ? 100 : steps === 1 ? 10 : 0}
          />
        </Grid2>
        <Grid2 size={maxSteps > 3 ? 3 : 4}>
          <LinearProgress
            variant="determinate"
            value={steps > 2 ? 100 : steps === 2 ? 10 : 0}
          />
        </Grid2>
        <Grid2 size={maxSteps > 3 ? 3 : 4}>
          <LinearProgress
            variant="determinate"
            value={steps > 3 ? 100 : steps === 3 ? 10 : 0}
          />
        </Grid2>
        {maxSteps > 3 && (
          <Grid2 size={maxSteps > 3 ? 3 : 4}>
            <LinearProgress
              variant="determinate"
              value={steps > 4 ? 100 : steps === 4 ? 10 : 0}
            />
          </Grid2>
        )}
      </Grid2>
      <Typography variant="body1" marginTop={1.2}>
        {steps <= 1
          ? 'Анкета пользователя'
          : steps <= 2 && maxSteps == 3
            ? 'Форма заявления'
            : steps <= 2 && maxSteps == 4
              ? 'Форма регистрации'
              : steps <= 3 && maxSteps == 3
                ? 'Заявление на рассмотрении'
                : steps <= 3 && maxSteps == 4
                  ? 'Выбор тарифа'
                  : 'Регистрация на рассмотрении'}
      </Typography>
    </Paper>
  );
};

export default ProgressBar;
