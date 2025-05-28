'use client';

import { BreadCrumbsText } from '@/components/ui';
import { getBenefitsProductPromos } from '@/services/benefits';
import { Box, CircularProgress, Grid2, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const PromosPage = () => {
  const { data: promos, isFetching } = useQuery({
    queryKey: ['benefit-item'],
    queryFn: () => getBenefitsProductPromos(),
    select: (data) => data?.data,
  });

  return (
    <Box display="flex" flexDirection="column" gap={1.5}>
      <BreadCrumbsText
        data={[{ text: 'Главная', link: '/main' }, { text: 'Промокоды' }]}
      />

      <Typography variant="h3" lineHeight={'57px'}>
        Мои скидки и льготы
      </Typography>
      {!isFetching ? (
        <Grid2 container spacing={2}>
          {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
          {promos.map((el: any) => (
            <Grid2 size={12} key={el.id}>
              <Paper
                sx={{
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '20px',
                  overflow: 'hidden',
                  height: '231px',
                }}
              >
                <Box>
                  <img
                    alt="promo"
                    src={el.image_url}
                    style={{
                      aspectRatio: '17 / 9',
                      height: '231px',
                      borderRadius: '24px 0 0 24px',
                      objectFit: 'cover',
                    }}
                  ></img>
                </Box>
                <Box padding={'20px'}>
                  <Typography
                    variant="h3"
                    fontSize={'16px'}
                    color="rgb(32, 34, 36)"
                  >
                    {el.name}
                  </Typography>
                  <Typography
                    variant="h3"
                    fontSize={'14px'}
                    color="rgb(166, 166, 166)"
                  >
                    Код:{' '}
                    <span style={{ color: 'rgb(32, 34, 36)' }}>
                      {el.promo.code}
                    </span>
                  </Typography>
                  <Typography
                    variant="h3"
                    fontSize={'14px'}
                    color="rgb(166, 166, 166)"
                  >
                    Действует до:{' '}
                    <span style={{ color: 'rgb(32, 34, 36)' }}>
                      {[
                        String(new Date(el.promo.end_date).getDate()).padStart(
                          2,
                          '0',
                        ),
                        String(
                          new Date(el.promo.end_date).getMonth() + 1,
                        ).padStart(2, '0'),
                        new Date(el.promo.end_date).getFullYear(),
                      ].join('.')}
                    </span>
                  </Typography>
                </Box>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </Box>
  );
};

export default PromosPage;
