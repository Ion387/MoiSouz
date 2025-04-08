'use client';

import { FC, useState } from 'react';
import { IconButton } from '@mui/material';

import { Icon } from '@/components/ui';
import { FeedbackDialog } from './dialogs';

import { PropsWithClassName, PropsWithSX } from '@/models/Props';

export const ButtonFeedback: FC<PropsWithClassName & PropsWithSX> = ({
  className,
  sx,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton className={className} sx={sx} onClick={() => setOpen(true)}>
        <Icon name="help" />
      </IconButton>
      <FeedbackDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};
