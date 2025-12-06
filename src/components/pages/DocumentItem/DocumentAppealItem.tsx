'use client';

import ScanAppealBlock from '@/components/entities/scanBlock/scanAppealBlock';
import ProgressBar from '@/components/ui/progressBar';
import { type IDocAppeal } from '@/models/Doc';
import { getDoc } from '@/services/getDocs';
import { stepTransformationAp } from '@/utils/stepTransformation';
import { Box, CircularProgress, Grid2, Paper, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

const DocumentAppealItem = () => {
  const path = usePathname();
  const number = path.split('/')[3];
  const queryClient = useQueryClient();

  const { data: doc, isLoading } = useQuery({
    queryKey: ['doc', number],
    enabled: !!number,
    refetchOnMount: true,
    queryFn: () => getDoc<IDocAppeal>(number),
  });

  useEffect(() => {
    queryClient.setQueryData(['doc'], null);
    queryClient.invalidateQueries({ queryKey: ['doc'] });
  }, [number, queryClient]);

  return (
    <Grid2 container sx={{ p: 2 }} spacing={2.4}>
      {doc && !isLoading ? (
        <>
          <Grid2 size={8}>
            <Paper
              sx={{ height: '100%', maxHeight: '850px', overflow: 'hidden' }}
            >
              <Grid2 container sx={{ p: 4 }} spacing={2}>
                <Grid2 size={6} display={'flex'} flexDirection={'column'}>
                  <Typography
                    variant="body1"
                    color="rgba(32, 34, 36, 1)"
                    fontWeight={600}
                    marginBottom={'11px'}
                  >
                    Тип обращения
                  </Typography>
                  <Typography color="rgba(166, 166, 166, 1)">
                    {doc.data.type}
                  </Typography>
                </Grid2>
                <Grid2 size={6} display={'flex'} flexDirection={'column'}>
                  <Typography
                    variant="body1"
                    color="rgba(32, 34, 36, 1)"
                    fontWeight={600}
                    marginBottom={'11px'}
                  >
                    Дата обращения
                  </Typography>
                  <Typography color="rgba(166, 166, 166, 1)">
                    {doc.documentDate}
                  </Typography>
                </Grid2>
                <Grid2 size={12} display={'flex'} flexDirection={'column'}>
                  <Typography
                    variant="body1"
                    color="rgba(32, 34, 36, 1)"
                    fontWeight={600}
                    marginBottom={'11px'}
                  >
                    ФИО сотрудника
                  </Typography>
                  <Typography color="rgba(166, 166, 166, 1)">{`${
                    doc.user.lastName
                  } ${doc.user.firstName} ${String(
                    doc.user.middleName,
                  )}`}</Typography>
                </Grid2>
                <Grid2 size={12} display={'flex'} flexDirection={'column'}>
                  <Typography
                    variant="body1"
                    color="rgba(32, 34, 36, 1)"
                    fontWeight={600}
                    marginBottom={'11px'}
                  >
                    Текст обращения
                  </Typography>
                  <Typography color="rgba(166, 166, 166, 1)">
                    {doc.data.text}
                  </Typography>
                </Grid2>
                {doc.data.answer && (
                  <Grid2 size={12} display={'flex'} flexDirection={'column'}>
                    <Typography
                      variant="body1"
                      color="rgba(32, 34, 36, 1)"
                      fontWeight={600}
                      marginBottom={'11px'}
                    >
                      {`Ответ - ${doc.step}`}
                    </Typography>
                    <Typography color="rgba(166, 166, 166, 1)">
                      {doc.data.answer}
                    </Typography>
                  </Grid2>
                )}
              </Grid2>
            </Paper>
          </Grid2>
          <Grid2 size={4} display={'flex'} flexDirection={'column'}>
            <ProgressBar
              initialSteps={
                doc?.step === 'Отклонено'
                  ? ['Обращение зарегистрировано', 'В работе', 'Отказ']
                  : [
                      'Обращение зарегистрировано',
                      'В работе',
                      'Обращение решено',
                    ]
              }
              decision={doc?.step === 'Отклонено'}
              steps={stepTransformationAp(doc.step)}
            />

            <Box paddingTop={2.4} sx={{ flex: '1 1 100%' }}>
              <ScanAppealBlock number={doc.guid} />
            </Box>
          </Grid2>
        </>
      ) : (
        <Grid2 size={8}>
          <CircularProgress />
        </Grid2>
      )}
    </Grid2>
  );
};

export default DocumentAppealItem;
