'use client';

import React, { FC } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { IProfile } from '@/models/Profile';
import Image from 'next/image';
import { Icon } from '@/components/ui';

interface Props {
  user: IProfile;
}

export const ColleagueCard: FC<Props> = ({ user }) => {
  if (user == null) return null;

  return (
    <Box
      display="flex"
      bgcolor="white"
      borderRadius={4}
      overflow="hidden"
      height={250}
      boxShadow="5px 5px 30px rgba(0,0,0,0.2)"
    >
      {user.avatar && (
        <Box width={300}>
          <Image
            src={user.avatar}
            style={{
              width: '100%',
            }}
            alt=""
          />
        </Box>
      )}
      <Box display="flex" flex={1}>
        <Box display="flex" flexDirection="column" flex={1} p={2}>
          <Typography fontSize={16} fontWeight={700}>
            {[user?.lastName, user?.firstName, user?.middleName]
              .filter((el) => el)
              .join(' ')}
          </Typography>
          <Typography fontSize={14} color="gray">
            {user?.position && user?.position[0]}
          </Typography>
          <Typography fontSize={14} color="gray">
            {user?.profession && user?.profession[0]}
          </Typography>
          <Typography fontSize={14} color="gray">
            {`Дата вступления: ${user?.birthdate}`}
          </Typography>
          <Box marginTop="auto" marginBottom="auto">
            <Typography fontSize={14} color="gray">
              {user?.email}
            </Typography>
            <Typography fontSize={14} color="gray">
              {user?.phone}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            sx={{
              gap: 2,
              paddingX: 2,
              paddingY: 1,
              width: 'fit-content',
              borderRadius: 2,
              borderColor: 'gray !important',
            }}
          >
            <Icon name="mail" color="gray" />
            <Typography fontSize={14} fontWeight={700} color="gray">
              Связаться
            </Typography>
          </Button>
        </Box>
        <Box width="fit-content" p={2} textAlign="right">
          <Typography fontSize={14} color="gray">
            {user.birthdate}
          </Typography>
          <Typography fontSize={14} color="gray">
            {`id ${user.id}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
