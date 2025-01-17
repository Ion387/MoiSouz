'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControlLabel,
  FormGroup,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

import { PropsWithSX } from '@/models/Props';

interface Props {
  name: string;
  label?: string;
  defaultValue?: 'female' | 'male';
}

export const InputGender: FC<PropsWithSX & Props> = ({ sx, name, label }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormGroup
          sx={{
            minWidth: 260,
            ...(sx || {}),
          }}
        >
          {label && <InputLabel error={error != null}>{label}</InputLabel>}
          <RadioGroup
            sx={{ gap: 2, mx: 'auto', mt: 1 }}
            row
            name={name}
            defaultValue={undefined}
            value={value}
            onChange={onChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio color="primary" />}
              label={
                <Typography color={value == 'female' ? 'primary' : undefined}>
                  Мужской
                </Typography>
              }
              labelPlacement="start"
            />
            <FormControlLabel
              value="male"
              control={<Radio color={'error'} />}
              label={
                <Typography color={value == 'male' ? 'red' : undefined}>
                  Женский
                </Typography>
              }
              labelPlacement="end"
            />
          </RadioGroup>
        </FormGroup>
      )}
    />
  );
};
