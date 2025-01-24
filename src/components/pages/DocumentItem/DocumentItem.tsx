'use client';

import { Grid2, Paper, Typography } from '@mui/material';
import React from 'react';
import DocViewer from '@cyntler/react-doc-viewer';
import ProgressBar from '@/components/ui/progressBar';
import { usePathname } from 'next/navigation';

const DocumentItem = () => {
  const path = usePathname();

  return (
    <Grid2 container sx={{ p: 2 }} spacing={1.2}>
      <Grid2 size={8}>
        <Typography variant="h3" marginBottom={2} pt={3}>
          Заявление о вступлении №{path.split('/')[2]}
        </Typography>
        <Paper sx={{ maxHeight: 1100, overflow: 'hidden' }}>
          <DocViewer
            documents={[{ uri: '/document1.pdf' }]}
            config={{
              header: {
                disableFileName: true,
                disableHeader: true,
                retainURLParams: true,
              },
            }}
          />
        </Paper>
      </Grid2>

      <Grid2 size={4}>
        <ProgressBar steps={2} />
      </Grid2>
    </Grid2>
  );
};

export default DocumentItem;
