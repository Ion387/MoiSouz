'use client';

import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import ProgressBar from '@/components/ui/progressBar';
import { usePathname } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getDoc } from '@/services/getDocs';
import {
  stepTransformation,
  stepTransformationAg,
} from '@/utils/stepTransformation';
import ScanBlock from '@/components/entities/scanBlock/scanBlock';
import { getBackendUrl } from '@/constants/url';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { IDoc } from '@/models/Doc';
import { nameOfDoc } from '@/utils/nameOfDoc';
import { Icon } from '@/components/ui';

GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const DocumentItem = () => {
  const path = usePathname();
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: () => <></>,
    sidebarTabs: () => [],
  });
  const number = path.split('/')[2];
  const queryClient = useQueryClient();
  const { data: doc, isLoading } = useQuery({
    queryKey: ['doc', number],
    enabled: !!number,
    refetchOnMount: true,
    queryFn: () => getDoc<IDoc>(number),
  });
  useEffect(() => {
    queryClient.setQueryData(['doc'], null);
    queryClient.invalidateQueries({ queryKey: ['doc'] });
  }, [number, queryClient]);

  return (
    <Grid2 container sx={{ p: 2 }} spacing={2.4}>
      {doc && (
        <Grid2
          size={12}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography variant="h3" marginBottom={2} pt={3}>
            {nameOfDoc(doc.documentType)}
            {doc.documentNumber}
          </Typography>{' '}
          {doc.documentType === 'AG' && (
            <Link href={`/new_protocol?agenda=${doc.guid}`}>
              <Button variant="contained">
                <Icon
                  name={'newDoc'}
                  color="#ffffff"
                  sx={{ marginRight: '6px' }}
                ></Icon>
                Создать протокол
              </Button>
            </Link>
          )}
        </Grid2>
      )}
      {doc ? (
        <Grid2 size={8}>
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
        <Grid2 size={8}>
          <CircularProgress />
        </Grid2>
      )}

      {doc && !isLoading && (
        <Grid2 size={4} display={'flex'} flexDirection={'column'}>
          <ProgressBar
            initialSteps={
              doc.documentType !== 'AM'
                ? ['Черновик', 'На согласовании', 'Утверждено']
                : undefined
            }
            steps={
              doc.documentType === 'AM'
                ? stepTransformation(doc.step)
                : stepTransformationAg(doc.step)
            }
          />
          <Box paddingTop={2.4} sx={{ flex: '1 1 100%' }}>
            <ScanBlock number={doc.guid} />
          </Box>
        </Grid2>
      )}
    </Grid2>
  );
};

export default DocumentItem;
