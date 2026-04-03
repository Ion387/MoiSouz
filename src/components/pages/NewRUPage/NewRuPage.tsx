'use client';

import RuForm from '@/components/forms/RuForm';
import ProgressBar from '@/components/ui/progressBar';
import { type IRuDoc } from '@/models/EPDoc';
import { type INewProtocol } from '@/models/Protocol';
import { getDoc } from '@/services/getDocs';
import { stepTransformation } from '@/utils/stepTransformation';
import { Box, Grid2, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const NewRuPageWrapper = () => {
  const path = usePathname();
  const number = path.split('/')[3];
  const params = useSearchParams();

  const { data: doc } = useQuery({
    queryKey: ['doc'],
    queryFn: () => getDoc<IRuDoc>(number),
  });

  const { data: protocol } = useQuery({
    queryKey: ['protocol'],
    queryFn: () => getDoc<INewProtocol>(params?.get('protocol') || undefined),
  });

  return (
    <Grid2 container sx={{ p: 2 }} spacing={1.2}>
      <Grid2 size={12}>
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
        >
          <Typography variant="h3">Выписка</Typography>
        </Box>
      </Grid2>
      <Grid2 size={8}>
        <RuForm doc={doc} protocol={protocol} />
      </Grid2>

      <Grid2 size={4}>
        <ProgressBar
          initialSteps={['На согласовании', 'Утверждено']}
          steps={stepTransformation(String(doc?.step))}
        />
      </Grid2>
    </Grid2>
  );
};

const NewRuPage = () => {
  return (
    <Suspense>
      <NewRuPageWrapper />
    </Suspense>
  );
};

export default NewRuPage;
