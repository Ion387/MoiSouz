import { IProfile } from '@/models/Profile';
import { ITradeUnion } from '@/models/TradeUnion';
import { Box, Divider, Grid2, Paper, Typography } from '@mui/material';
import { FC } from 'react';

interface ITableProps {
  users: IProfile[] | undefined;
  tradeunion?: ITradeUnion | null;
}

export const Table: FC<ITableProps> = ({ users, tradeunion }) => {
  const groupedData = users;

  return (
    <Paper sx={{ p: 0, pb: 1.6 }}>
      <Grid2 container sx={{ p: 1.6 }}>
        <Grid2 size={2.5}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
          >
            ФИО
          </Typography>
        </Grid2>
        <Grid2 size={2.5}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
          >
            Организация
          </Typography>
        </Grid2>
        <Grid2 size={2.5}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
          >
            Должность
          </Typography>
        </Grid2>
        <Grid2 size={4.5}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
          >
            Предпочитаемый способ связи
          </Typography>
        </Grid2>
      </Grid2>
      <Divider></Divider>
      {groupedData && !!groupedData.length ? (
        groupedData.map((el, index, arr) => (
          <Box key={el.id}>
            <Grid2 container sx={{ p: 1.6 }}>
              <Grid2 size={2.5}>
                <Typography variant="body2" fontWeight={600} pt={2.4}>
                  {el.name}
                </Typography>
              </Grid2>
              <Grid2 size={2.5}>
                <Typography variant="body2" fontWeight={600} pt={2.4}>
                  {tradeunion?.title}
                </Typography>
              </Grid2>
              <Grid2 size={2.5}>
                <Typography variant="body2" fontWeight={600} pt={2.4}>
                  {el.position && el.position[0]}
                </Typography>
              </Grid2>
              <Grid2 size={4.5}>
                <Typography variant="body2" fontWeight={600} pt={2.4}>
                  {el.phone || el.email}
                </Typography>
              </Grid2>
            </Grid2>
            {index !== arr.length - 1 && <Divider></Divider>}
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1.2,
          }}
        >
          <Typography variant="h3">Здесь пока пусто</Typography>
        </Box>
      )}
    </Paper>
  );
};
