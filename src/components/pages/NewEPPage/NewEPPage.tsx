'use client';

import EPForm from '@/components/forms/EPForm';
import ProgressBar from '@/components/ui/progressBar';
import { type IEPDoc } from '@/models/EPDoc';
import { type INewProtocol } from '@/models/Protocol';
import { getDoc } from '@/services/getDocs';
import { stepTransformationAg } from '@/utils/stepTransformation';
import { Box, Grid2, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const NewEPPageWrapper = () => {
  const path = usePathname();
  const number = path.split('/')[3];
  const params = useSearchParams();

  const { data: doc } = useQuery({
    queryKey: ['doc'],
    queryFn: () => getDoc<IEPDoc>(number),
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
          <Typography variant="h3">Постановление</Typography>
        </Box>
      </Grid2>
      <Grid2 size={8}>
        <EPForm doc={doc} protocol={protocol} />
      </Grid2>

      <Grid2 size={4}>
        <ProgressBar
          initialSteps={
            doc?.step === 'Отказ' || doc?.step === 'Отклонено'
              ? ['Черновик', 'На согласовании', 'Отклонено']
              : ['Черновик', 'На согласовании', 'Утверждено']
          }
          steps={stepTransformationAg(String(doc?.step))}
        />
      </Grid2>
    </Grid2>
  );
};

const NewEPPage = () => {
  return (
    <Suspense>
      <NewEPPageWrapper />
    </Suspense>
  );
};

export default NewEPPage;
