'use client';

import React from 'react';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Grid2, Paper } from '@mui/material';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Viewer } from '@react-pdf-viewer/core';

GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

const Policy = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: () => <></>,
    sidebarTabs: () => [],
  });
  return (
    <Grid2 size={12}>
      <Paper>
        <Viewer
          fileUrl={'/politics.pdf'}
          plugins={[defaultLayoutPluginInstance]}
        />
      </Paper>
    </Grid2>
  );
};

export default Policy;
