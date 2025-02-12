'use client';

import { Box, CircularProgress, Grid2, Paper, Typography } from '@mui/material';
import React from 'react';
import ProgressBar from '@/components/ui/progressBar';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getDoc } from '@/services/getDocs';
import { getBackendUrl } from '@/constants/url';

import { stepTransformation } from '@/utils/stepTransformation';
import ScanBlock from '@/components/entities/scanBlock/scanBlock';

const DocumentItem = () => {
  const path = usePathname();
  const number = path.split('/')[2];
  const { data: doc } = useQuery({
    queryKey: ['doc'],
    queryFn: () => getDoc(number),
    select: (data) => data?.data,
  });

  return (
    <Grid2 container sx={{ p: 2 }} spacing={2.4}>
      {doc && (
        <Grid2 size={12}>
          <Typography variant="h3" marginBottom={2} pt={3}>
            Заявление о вступлении в профсоюзную организацию №
            {doc.documentNumber}
          </Typography>{' '}
        </Grid2>
      )}
      {doc ? (
        <Grid2 size={8}>
          <Paper sx={{ maxHeight: 1100, overflow: 'hidden' }}>
            {doc?.file && (
              <iframe
                src={getBackendUrl + doc.file + `#toolbar=0&zoom=95`}
                width={'100%'}
                style={{ aspectRatio: '210 / 269' }}
              ></iframe>
            )}
          </Paper>
        </Grid2>
      ) : (
        <Grid2 size={8}>
          <CircularProgress />
        </Grid2>
      )}

      {doc && (
        <Grid2 size={4}>
          <ProgressBar steps={doc?.step ? stepTransformation(doc.step) : 0} />
          <Box paddingTop={2.4}>
            <ScanBlock number={number} file={doc.file} />
          </Box>
        </Grid2>
      )}
    </Grid2>
  );
};

export default DocumentItem;
