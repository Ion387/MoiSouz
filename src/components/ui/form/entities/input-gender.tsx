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
            minWidth: 120,
            ...(sx || {}),
          }}
        >
          {label && <InputLabel error={error != null}>{label}</InputLabel>}
          <RadioGroup
            sx={{ mr: 'auto' }}
            name={name}
            defaultValue={undefined}
            value={value}
            onChange={onChange}
          >
            <FormControlLabel
              value="male"
              control={
                <Radio
                  color="primary"
                  style={{ height: '29px', width: '29px' }}
                />
              }
              label={
                <Typography color={value == 'male' ? 'primary' : undefined}>
                  Мужской
                </Typography>
              }
              labelPlacement="start"
            />
            <FormControlLabel
              value="female"
              control={
                <Radio
                  color={'error'}
                  style={{ height: '29px', width: '29px' }}
                />
              }
              label={
                <Typography color={value == 'female' ? 'red' : undefined}>
                  Женский
                </Typography>
              }
              labelPlacement="start"
            />
          </RadioGroup>
        </FormGroup>
      )}
    />
  );
};
