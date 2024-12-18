'use client';

import { Box, Button, Dialog, Typography } from '@mui/material';
import styles from './Documents.module.scss';
import Link from 'next/link';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';
import NewProfileDialog from '@/components/entities/profile/newProfileDialog';

const DocumentsPage = () => {
  const { profileInfo } = useGetProfileInfo();
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" marginBottom={2}>
        Документы
      </Typography>
      <NewProfileDialog open={!profileInfo?.hasTradeunionOwner} />
    </Box>
  );
};

export default DocumentsPage;
