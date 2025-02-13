'use client';

import { Box, CircularProgress, Grid2, Paper, Typography } from '@mui/material';
import React from 'react';
import ProgressBar from '@/components/ui/progressBar';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getDoc } from '@/services/getDocs';
import { stepTransformation } from '@/utils/stepTransformation';
import ScanBlock from '@/components/entities/scanBlock/scanBlock';
import { getBackendUrl } from '@/constants/url';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const DocumentItem = () => {
  const path = usePathname();
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: () => <></>,
    sidebarTabs: () => [],
  });
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
        <Grid2 size={7}>
          <Paper
            sx={{ height: '100%', maxHeight: '850px', overflow: 'hidden' }}
          >
            {doc?.file && (
              <Viewer
                fileUrl={getBackendUrl + doc.file}
                plugins={[defaultLayoutPluginInstance]}
              />
            )}
          </Paper>
        </Grid2>
      ) : (
        <Grid2 size={7}>
          <CircularProgress />
        </Grid2>
      )}

      {doc && (
        <Grid2 size={5}>
          <ProgressBar steps={doc?.step ? stepTransformation(doc.step) : 0} />
          <Box paddingTop={2.4}>
            <ScanBlock number={number} />
          </Box>
        </Grid2>
      )}
    </Grid2>
  );
};

export default DocumentItem;
