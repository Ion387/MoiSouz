import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

import { Icon } from '@/components/ui';

import { PropsWithSX } from '@/models/Props';
import { getBackendUrl } from '@/constants/url';
import Link from 'next/link';

interface Props {
  avatar?: string;
  role?: string;
  name?: string;
}

export const UserNav: FC<Props & PropsWithSX> = ({
  sx,
  avatar,
  name,
  role,
}) => {
  return (
    <Link href={'/profile'}>
      <Button sx={sx}>
        <Box
          sx={{
            borderRadius: '100%',
            overflow: 'hidden',
            width: '50px',
            aspectRatio: 1,
          }}
        >
          <Image
            src={avatar ? getBackendUrl + avatar : '/images/avatar-default.png'}
            width={50}
            height={50}
            alt="user-avatar"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyItems: 'center',
            ml: 1,
          }}
        >
          <Typography fontSize={14} lineHeight="19px" fontWeight={700}>
            {name}
          </Typography>
          <Typography fontSize={12} lineHeight="16px">
            {role}
          </Typography>
        </Box>

        <Icon sx={{ ml: 2.5 }} name="arrow-dropdown" color="red" />
      </Button>
    </Link>
  );
};
