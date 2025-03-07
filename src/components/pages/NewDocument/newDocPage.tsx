'use client';

import NewDocumentForm from '@/components/forms/NewDocumentForm';
import { Icon } from '@/components/ui';
import ProgressBar from '@/components/ui/progressBar';
import { getDoc } from '@/services/getDocs';
import { stepTransformation } from '@/utils/stepTransformation';
import { Box, Button, Grid2, Link, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React from 'react';

const NewDocument = () => {
  const path = usePathname();
  const number = path.split('/')[3];

  const { data: doc } = useQuery({
    queryKey: ['doc'],
    queryFn: () => getDoc(number),
    select: (data) => data?.data,
  });

  return (
    <Grid2 container sx={{ p: 2 }} spacing={1.2}>
      <Grid2 size={12}>
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
        >
          <Typography variant="h3" marginBottom={2}>
            Повестка заседания Профкома
          </Typography>
          {/*<Link href={doc ? `/protocol/${doc.guid}` : `/protocol/test`}>
            <Button variant="contained">
              <Icon
                name={'newDoc'}
                color="#ffffff"
                sx={{ marginRight: '6px' }}
              ></Icon>
              Создать протокол
            </Button>
          </Link>*/}
        </Box>
      </Grid2>
      <Grid2 size={8}>
        <NewDocumentForm doc={doc} />
      </Grid2>

      <Grid2 size={4}>
        <ProgressBar
          initialSteps={['Черновик', 'На согласовании', 'Утверждено']}
          steps={stepTransformation(String(doc?.step))}
        />
      </Grid2>
    </Grid2>
  );
};

export default NewDocument;
