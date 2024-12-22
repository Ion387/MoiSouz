import React from 'react';
import { Grid2, LinearProgress } from '@mui/material';

const ProgressBar = ({ steps }: { steps: number }) => {
  return (
    <Grid2 container spacing={1.2}>
      <Grid2 size={6}>
        <LinearProgress variant="determinate" value={steps > 1 ? 100 : 0} />
      </Grid2>
      <Grid2 size={6}>
        <LinearProgress variant="determinate" value={0} />
      </Grid2>
    </Grid2>
  );
};

export default ProgressBar;
