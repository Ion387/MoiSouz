'use client';

import NewProfileDialog from '@/components/entities/profile/newProfileDialog';
import Table from '@/components/sections/Docs/Table';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';
import { getDocs } from '@/services/getDocs';

import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

const DocumentsPage = () => {
  const { data: docs } = useQuery({
    queryKey: ['docs'],
    queryFn: getDocs,
    select: (data) => data.data,
  });

  const { profileInfo: info } = useGetProfileInfo();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" marginBottom={2}>
        Документы
      </Typography>
      <Table docs={docs} />
      <NewProfileDialog
        open={!info?.ROLES?.includes('ROLE_TRADEUNION') && docs && !docs.length}
      ></NewProfileDialog>
    </Box>
  );
};

export default DocumentsPage;
