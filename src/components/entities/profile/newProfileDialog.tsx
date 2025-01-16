import React from 'react';
import { Box, Button, Dialog, Typography } from '@mui/material';
import Link from 'next/link';

const NewProfileDialog = ({ open }: { open: boolean }) => {
  return (
    <Dialog open={open} onClose={() => {}}>
      <Box
        sx={{
          p: 2.4,
          maxWidth: '387px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" marginBottom={2} textAlign={'center'}>
          Для просмотра раздела необходимо стать участником профсоюза
        </Typography>
        <Link href="/trade_union_member">
          <Button variant="contained" sx={{ px: 2.6, py: 1.6, width: '228px' }}>
            Вступить в профсоюз
          </Button>
        </Link>
      </Box>
    </Dialog>
  );
};

export default NewProfileDialog;
