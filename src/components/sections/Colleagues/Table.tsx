import { IProfile } from '@/models/Profile';
import { ITradeUnion } from '@/models/TradeUnion';
import {
  Box,
  ButtonBase,
  Divider,
  Grid2,
  Paper,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

interface IRowProps {
  user: IProfile;
  owner?: boolean;
}

const Row: FC<PropsWithChildren & IRowProps> = ({ children, user, owner }) => {
  if (owner) {
    return (
      <Link href={`/colleagues/${user.guid}`} style={{ width: '100%' }}>
        <ButtonBase style={{ width: '100%' }} disabled={!owner}>
          {children}
        </ButtonBase>
      </Link>
    );
  }
  return children;
};

interface ITableProps {
  users: IProfile[] | undefined;
  tradeunion?: ITradeUnion | null;
  owner?: boolean;
}

export const Table: FC<ITableProps> = ({ users, tradeunion, owner }) => {
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
        <Grid2 size={3.5}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
          >
            Должность
          </Typography>
        </Grid2>
        <Grid2 size={3.5}>
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
            <Row user={el} owner={owner}>
              <Grid2
                container
                sx={{
                  p: 1.6,
                  width: '100%',
                  textAlign: 'left',
                  userSelect: owner ? 'none' : 'all',
                }}
              >
                <Grid2 size={2.5}>
                  <Typography variant="body2" fontWeight={600} py={1}>
                    {el.name}
                  </Typography>
                </Grid2>
                <Grid2 size={2.5}>
                  <Typography variant="body2" fontWeight={600} py={1}>
                    {tradeunion?.title}
                  </Typography>
                </Grid2>
                <Grid2 size={3.5}>
                  <Typography variant="body2" fontWeight={600} py={1}>
                    {el.position && el.position[0]}
                  </Typography>
                </Grid2>
                <Grid2 size={3.5}>
                  <Typography variant="body2" fontWeight={600} py={1}>
                    {el.phone || el.email}
                  </Typography>
                </Grid2>
              </Grid2>
            </Row>
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
