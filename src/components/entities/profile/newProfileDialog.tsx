import React, { FC } from 'react';
import { Box, Button, Dialog, Typography } from '@mui/material';
import Link from 'next/link';
import { globalTheme } from '@/styles/theme';

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
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box
        sx={{
          p: 2.4,

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m: '0 auto',
        }}
      >
        <Typography variant="h3" marginBottom={2} textAlign={'center'}>
          {title}
        </Typography>
        <Link href={link} style={{ width: '100%' }}>
          <Button
            variant="contained"
            sx={{
              padding: '15px 100px',
              fontSize: '20px',
              lineHeight: '27px',
              width: '100%',
              '&.Mui-disabled': {
                backgroundColor: `${globalTheme.palette.primary.main} !important`,
                color: 'white !important',
              },
            }}
          >
            {btn}
          </Button>
        </Link>
      </Box>
    </Dialog>
  );
};

export default NewProfileDialog;
