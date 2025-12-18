'use client';

import React from 'react';
import { TreeTable } from './Table';
import { useFetchTree } from '@/hooks/UseTree';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useFetchProfile } from '@/hooks/useFetchProfile';

const StructurePage = () => {
  const {
    data: { data: data, isFetching: isLoading },
  } = useFetchTree({
    type: 'arr',
    perPage: 1000,
  });
  const { info } = useFetchProfile();

  if (isLoading) return <CircularProgress></CircularProgress>;

  return (
    <Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginBottom={'12px'}
      >
        <Typography variant={'h3'} marginBottom={2}>
          Структура
        </Typography>
        {info?.isOrgstructure && (
          <Button
            variant="contained"
            component={'a'}
            href={`/structure/create`}
          >
            Создать организацию
          </Button>
        )}
      </Box>
      <TreeTable data={data} />
    </Box>
  );
};

export default StructurePage;
