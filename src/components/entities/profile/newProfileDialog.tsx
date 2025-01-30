import React, { FC } from 'react';
import { Box, Button, Dialog, Typography } from '@mui/material';
import Link from 'next/link';

interface IDialogProps {
  open: boolean;
  title: string;
  link: string;
  btn?: string;
  onClose?: () => void;
}

const NewProfileDialog: FC<IDialogProps> = ({
  btn,
  open,
  title,
  link,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
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
          {title}
        </Typography>
        <Link href={link}>
          <Button variant="contained" sx={{ px: 2.6, py: 1.6, width: '228px' }}>
            {btn}
          </Button>
        </Link>
      </Box>
    </Dialog>
  );
};

export default NewProfileDialog;
