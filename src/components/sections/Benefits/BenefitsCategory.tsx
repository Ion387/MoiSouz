import React, { FC } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { IBenefitsCategory } from '@/models/Benefits';
import { PropsWithSX } from '@/models/Props';

interface IProps {
  data: IBenefitsCategory;
  onClick?: (data: IBenefitsCategory) => void;
  active?: boolean;
}

export const BenefitsCategory: FC<PropsWithSX & IProps> = ({
  sx,
  data,
  onClick,
  active,
}) => {
  return (
    <ButtonBase
      sx={{
        width: 'fit-content',
        minWidth: 'fit-content',
        borderRadius: '14px',
        overflow: 'hidden',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: active ? 'primary.main' : 'transparent',
        ...(sx || {}),
      }}
      onClick={() => onClick && onClick(data)}
    >
      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        justifyContent="space-between"
        bgcolor="white"
        p={1.5}
        gap={1.5}
        width="100%"
        height="auto"
      >
        <Typography fontSize={16} fontWeight={600} whiteSpace="nowrap">
          {data.name}
        </Typography>
      </Box>
    </ButtonBase>
  );
};
