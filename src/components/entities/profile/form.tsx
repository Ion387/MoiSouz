'use client';

import { FC, PropsWithChildren } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers/locales';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import 'dayjs/locale/ru';

interface Props {
  title: string;
  buttonCancel?: string;
  buttonSubmit?: string;
  loading?: boolean;
  onCancel?: () => void;
  onSubmit: (data: any | undefined) => void;

  /** for FormProvider */
  methods: UseFormReturn<any, any, undefined>;
  defaultValues?: any;
}

export const Form: FC<PropsWithChildren & Props> = ({
  children,
  title,
  loading,
  buttonCancel = 'Отмена',
  buttonSubmit = 'Сохранить',
  onCancel,
  onSubmit,
  methods,
}) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="ru"
      localeText={
        ruRU.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <Box sx={{ pt: 3 }}>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Typography variant="h3">{title}</Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: 3,
                p: 2,
                backgroundColor: 'white',
                borderRadius: 6,
              }}
            >
              <fieldset
                style={{
                  border: 'none',
                }}
                disabled={loading}
              >
                {children}
              </fieldset>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                  gap: 2,
                }}
              >
                {buttonCancel && (
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{
                      padding: '15px 100px',
                      fontSize: '20px',
                      lineHeight: '27px',
                    }}
                    disabled={loading}
                    onClick={onCancel}
                  >
                    {buttonCancel}
                  </Button>
                )}

                {buttonSubmit && (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      padding: '15px 100px',
                      fontSize: '20px',
                      lineHeight: '27px',
                    }}
                  >
                    {loading ? (
                      <CircularProgress color="secondary" size="27px" />
                    ) : (
                      buttonSubmit
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </LocalizationProvider>
  );
};
