'use client';

import { Box, Grid2, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProgressBar from '@/components/ui/progressBar';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getDocs } from '@/services/getDocs';
import { getBackendUrl } from '@/constants/url';
import { IDoc } from '@/models/Doc';
import { stepTransformation } from '@/utils/stepTransformation';
import ScanBlock from '@/components/entities/scanBlock/scanBlock';

const DocumentItem = () => {
  const path = usePathname();
  const number = path.split('/')[2];
  const [doc, setDoc] = useState<IDoc | null>();
  const { data: docs } = useQuery({
    queryKey: ['docs'],
    queryFn: getDocs,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (docs) {
      setDoc(docs.find((el: IDoc) => el.documentNumber === number));
    }
  }, [docs, number]);

  return (
    <Grid2 container sx={{ p: 2 }} spacing={2.4}>
      <Grid2 size={8}>
        <Typography variant="h3" marginBottom={2} pt={3}>
          Заявление о вступлении в профсоюзную организацию №{number}
        </Typography>
        <Paper sx={{ maxHeight: 1100, overflow: 'hidden' }}>
          {doc?.file && (
            <iframe
              src={getBackendUrl + doc.file}
              width={'100%'}
              style={{ aspectRatio: '210 / 277' }}
            ></iframe>
          )}
        </Paper>
      </Grid2>

      <Grid2 size={4}>
        <ProgressBar steps={doc?.step ? stepTransformation(doc.step) : 0} />
        <Box paddingTop={2.4}>
          <ScanBlock number={number} />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default DocumentItem;
