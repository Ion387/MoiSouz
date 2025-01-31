'use client';
import TradeUnionMemberForm from '@/components/forms/TradeUnionMemberForm';
import { Grid2, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfilePage from '../Profile/Profile';
import ProgressBar from '@/components/ui/progressBar';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import { usePathname } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { getDoc } from '@/services/getDocs';
import { stepTransformation } from '@/utils/stepTransformation';

const TradeUnionMemberPage = () => {
  const [steps, setSteps] = useState<number>(1);
  const info = useFetchProfile();
  const path = usePathname();
  const number = path.split('/')[3];

  const { data: doc } = useQuery({
    queryKey: ['doc'],
    queryFn: () => getDoc(number),
    select: (data) => data.data,
  });

  useEffect(() => {
    if (!!info?.phone) {
      setSteps(2);
    }
  }, [info]);
  return (
    <Grid2 container sx={{ p: 2 }} spacing={1.2}>
      {steps === 1 ? (
        <Grid2 size={8}>
          <ProfilePage />
        </Grid2>
      ) : (
        <Grid2 size={8}>
          <Typography variant="h3" marginBottom={2} pt={3}>
            Форма заявления на вступление в профсоюз
          </Typography>
          {doc && <TradeUnionMemberForm doc={doc} />}
        </Grid2>
      )}
      <Grid2 size={4}>
        <ProgressBar steps={stepTransformation(String(doc?.step))} />
      </Grid2>
    </Grid2>
  );
};

export default TradeUnionMemberPage;
