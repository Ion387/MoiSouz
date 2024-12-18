'use client';

import { createRef, FC, ReactNode, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Button, FormHelperText } from '@mui/material';

import { Icon } from '@/components/ui/Icon';

import { PropsWithSX } from '@/models/Props';

interface Props {
  name: string;
  label?: ReactNode;
}

export const InputImage: FC<PropsWithSX & Props> = ({ sx, name, label }) => {
  const { control, getValues } = useFormContext();
  const ref = createRef<HTMLInputElement>();

  const [input, setInput] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const value = getValues(name) || input;

  useEffect(() => {
    if (value == null) {
      setPreview(null);
      return;
    }
    switch (typeof value) {
      case 'object':
        const urlImage = URL.createObjectURL(value);
        const formData = new FormData();
        formData.append('avatar', value);
        setPreview(urlImage);
        break;

      case 'string':
        setPreview(`${process.env.REACT_APP_SERVER_PATH}${value}`);
        break;

      default:
        break;
    }
  }, [value]);

  const handleOpen = () => {
    ref.current?.click();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ...(sx || {}),
          }}
        >
          <input
            style={{ display: 'none' }}
            ref={ref}
            type="file"
            accept="image/*"
            id={name}
            name={name}
            onChange={(event: any) => {
              const file = event.target.files[0];
              if (file == null) return;
              onChange(file);
              setInput(file);
            }}
          />
          <Button
            name={name}
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: 150,
              flex: 1,
              mb: 2.5,
              backgroundColor: 'rgb(241, 244, 249)',
              borderColor: error ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)',
              color: 'rgb(166, 166, 166)',
              backgroundImage: preview && `url( ${preview} )`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',

              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.87)',
              },
            }}
            variant="outlined"
            onClick={handleOpen}
          >
            {preview == null && (
              <>
                {label}
                <Icon name="file-add" color="rgb(166, 166, 166)" />
              </>
            )}
            <FormHelperText id={`${name}-helper`} error={true}>
              {error && error?.message}
            </FormHelperText>
          </Button>
        </Box>
      )}
    />
  );
};
