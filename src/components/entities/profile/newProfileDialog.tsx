import React from 'react';
import { Box, Button, Dialog, Grid2, Typography } from '@mui/material';
import Link from 'next/link';

const NewProfileDialog = ({ open }: { open: boolean }) => {
  return (
    <Dialog open={open} onClose={() => {}}>
      <Box sx={{ p: 2.4 }}>
        <Typography variant="h3" marginBottom={2}>
          Для просмотра раздела выберите действие
        </Typography>
        <Grid2 container justifyContent="space-around">
          <Grid2>
            <Link href="/trade_union_member">
              <Button variant="contained" sx={{ p: 0.8 }}>
                Стать участником профсоюза
              </Button>
            </Link>
          </Grid2>
          <Grid2>
            <Link href="/trade_union_registration">
              <Button variant="contained" sx={{ p: 0.8 }}>
                Зарегистрировать профсоюз
              </Button>
            </Link>
          </Grid2>
        </Grid2>
      </Box>
    </Dialog>
  );
};

export default NewProfileDialog;
