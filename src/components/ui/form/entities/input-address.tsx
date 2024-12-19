'use client';

import { FC, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Box,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import { PropsWithSX } from '@/models/Props';

interface Props {
  name: string;
  label?: string;
  errors?: any;
}

export const InputAddress: FC<PropsWithSX & Props> = ({
  sx,
  name,
  label,
  errors,
}) => {
  const { register } = useFormContext();

  return (
    <FormGroup
      sx={{
        minWidth: 260,
        ...(sx || {}),
      }}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            {...register(`${name}.index`)}
            sx={{ flex: 1 }}
            placeholder="Индекс"
            error={errors && !!errors[name]?.index?.message}
            helperText={(errors && errors[name]?.index?.message) || ''}
          />
          <TextField
            {...register(`${name}.region`)}
            sx={{ flex: 3 }}
            placeholder="Регион"
            error={errors && !!errors[name]?.region?.message}
            helperText={(errors && errors[name]?.region?.message) || ''}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            {...register(`${name}.municipal`)}
            placeholder="Муниципальное образование"
            error={errors && !!errors[name]?.municipal?.message}
            helperText={(errors && errors[name]?.municipal?.message) || ''}
          />
          <TextField
            {...register(`${name}.locality`)}
            placeholder="Населенный пункт"
            error={errors && !!errors[name]?.locality?.message}
            helperText={(errors && errors[name]?.locality?.message) || ''}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            {...register(`${name}.street`)}
            sx={{ flex: 1 }}
            placeholder="Улица"
            error={errors && !!errors[name]?.street?.message}
            helperText={(errors && errors[name]?.street?.message) || ''}
          />
          <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
            <TextField
              {...register(`${name}.house`)}
              placeholder="Дом/Здание"
              error={errors && !!errors[name]?.house?.message}
              helperText={(errors && errors[name]?.house?.message) || ''}
            />
            <TextField
              {...register(`${name}.flat`)}
              placeholder="Квартира"
              error={errors && !!errors[name]?.flat?.message}
              helperText={(errors && errors[name]?.flat?.message) || ''}
            />
          </Box>
        </Box>
      </Box>
    </FormGroup>
  );
};
