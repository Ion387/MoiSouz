import React, { FC } from 'react';

import { Box, ButtonBase, Typography } from '@mui/material';

import { Icon } from '@/components/ui';

import { IOrganization } from '@/models/Colleagues';
import { numberToStringEnd } from '@/utils/string';

interface IProps {
  data: IOrganization;
  onClick?: (data: IOrganization) => void;
  active?: boolean;
}

export const OrganizationCard: FC<IProps> = ({ data, onClick, active }) => {
  return (
    <ButtonBase
      sx={{
        width: 'fit-content',
        borderRadius: '14px',
        overflow: 'hidden',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: active ? 'primary.main' : 'transparent',
      }}
      onClick={() => onClick && onClick(data)}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        bgcolor="white"
        p={1.5}
        gap={1.5}
        width={300}
        height={110}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography fontSize={16}>{data.name}</Typography>
          <Box display="flex" gap={0.5}>
            <Typography fontSize={25} fontWeight="bold">
              {data.count}
            </Typography>
            <Typography fontSize={16} marginTop={0.25}>
              {numberToStringEnd(data.count, 'человек', 'человека', 'человек')}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="primary.main"
          width={70}
          height={70}
          borderRadius={5.5}
        >
          <Icon sx={{ scale: 1.5 }} name="info" color="secondary.main" />
        </Box>
      </Box>
    </ButtonBase>
  );
};
