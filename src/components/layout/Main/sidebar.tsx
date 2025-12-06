'use client';

import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { MainSidebarCard } from './sidebar-card';
import { Icon } from '@/components/ui';
import Link from 'next/link';
import { globalTheme } from '@/styles/theme';
import { useFetchProfile } from '@/hooks/useFetchProfile';

export const MainSidebar: FC = () => {
  const { info } = useFetchProfile();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <MainSidebarCard
        title="Достижения"
        subTitle="Название достижения"
        link={{
          to: '/main',
        }}
        soon
      >
        <Icon name="star" color="#FFD56D" />
      </MainSidebarCard>
      <MainSidebarCard
        title="Блок проекта"
        subTitle="Новинки в сервисе"
        description="29.07.2024"
        soon
      >
        <Icon name="stats-diagram-ring" />
        <Typography
          sx={{ position: 'absolute', fontSize: 18, fontWeight: 700 }}
        >
          Часы
        </Typography>
      </MainSidebarCard>

      {info?.hasTradeunionMember && (
        <Link href={'/appeal'} style={{ width: '100%', margin: '0 auto' }}>
          <Button
            variant="contained"
            disabled
            sx={{
              padding: '15px',
              fontSize: '16px',
              lineHeight: '20px',

              width: '100%',
              '&.Mui-disabled': {
                backgroundColor: `${globalTheme.palette.primary.main} !important`,
                color: 'white !important',
              },
            }}
          >
            Обращение в профсоюз
          </Button>
        </Link>
      )}
    </Box>
  );
};
