import React from 'react';
import { Box, Button, Dialog, Typography } from '@mui/material';
import Link from 'next/link';

const NewProfileDialog = ({ open }: { open: boolean }) => {
  return (
    <Dialog open={open} onClose={() => {}}>
      <Box
        sx={{
          p: 5,
          maxWidth: '387px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" marginBottom={2} textAlign={'center'}>
          Для просмотра раздела выберите действие
        </Typography>
        <Link href="/trade_union_member" style={{ marginBottom: '20px' }}>
          <Button variant="contained" sx={{ px: 2.6, py: 1.6, width: '228px' }}>
            Вступить в профсоюз
          </Button>
        </Link>
        <Link href="/trade_union_registration">
          <Button variant="contained" sx={{ px: 2.6, py: 1.6, width: '228px' }}>
            Создать профсоюз
          </Button>
        </Link>

        {/*<Button
          variant="contained"
          sx={{ px: 2.6, py: 1.6, width: '228px' }}
          onClick={() => setOpenDialog(false)}
        >
          Я уже в профсоюзе
        </Button>*/}
      </Box>
    </Dialog>
  );
};

export default NewProfileDialog;
