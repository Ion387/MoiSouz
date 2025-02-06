'use client';

import { createRef, FC, ReactNode, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Button, FormHelperText } from '@mui/material';

import { Icon } from '@/components/ui/Icon';
import { PropsWithSX } from '@/models/Props';
import { getBackendUrl } from '@/constants/url';

interface Props {
  name: string;
  label?: ReactNode;
  mw?: string;
}

export const InputFile: FC<PropsWithSX & Props> = ({ sx, name, label, mw }) => {
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
        const formData = new FormData();
        formData.append('file', value);
        setPreview(value.name);
        break;

      case 'string':
        setPreview(`${getBackendUrl}${value}`);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            ...(sx || {}),
          }}
        >
          <input
            style={{ display: 'none' }}
            ref={ref}
            type="file"
            accept=".pdf"
            id={name}
            name={name}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              width: '50%',
              minWidth: mw || 320,
              flex: 1,
              border: '1px dotted rgb(226, 226, 226)',
              margin: '0 auto',

              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.87)',
              },
            }}
            variant="outlined"
            onClick={handleOpen}
          >
            {preview == null ? (
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'12px'}
                justifyContent={'space-around'}
                width={'100%'}
              >
                <Icon name="cloud" color="rgb(166, 166, 166)" />
                {label}
              </Box>
            ) : (
              <Box display={'flex'} alignItems={'center'} gap={'12px'}>
                <Icon name="pdf" />
                {preview}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview(null);
                  }}
                >
                  <Icon name="close" color="#000" />
                </span>
              </Box>
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
