import { ruRU } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';

export default createTheme(
  {
    palette: {
      primary: { main: 'rgb(72, 128, 255)' },
      secondary: { main: 'rgb(243, 244, 248)' },
    },
    spacing: 10,
    breakpoints: {
      values: {
        xs: 320,
        sm: 744,
        md: 980,
        lg: 1240,
        xl: 1620,
      },
    },
    typography: {
      fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
      h1: {
        fontSize: '155px',
        lineHeight: '178px',
        fontWeight: '800',
        color: 'rgb(32, 34, 36)',
        '@media (max-width: 744px)': {
          fontSize: '60px !important',
          lineHeight: '72px !important',
        },
      },
      h2: {
        fontSize: '40px',
        lineHeight: '52px',
        fontWeight: '200',
        textAlign: 'center',
        color: 'rgb(32, 34, 36)',
        '@media(max-width: 744px)': {
          fontSize: '36px',
          lineHeight: '48px',
        },
      },
      h3: {
        fontSize: '22px',
        lineHeight: '30px',
        fontWeight: '800',
        color: '#000',
        '@media(max-width: 744px)': {
          fontSize: '18px',
          lineHeight: '24px',
        },
      },
      h4: {
        fontSize: '16px',
        lineHeight: '22px',
        fontWeight: '300',
        color: '#000',
        '@media(max-width: 744px)': {
          fontSize: '14.8px',
          lineHeight: '20px',
        },
      },
      body1: {
        fontSize: '16px',
        lineHeight: '22px',
        fontWeight: '300',
        color: '#000',
        '@media(max-width: 744px)': {
          fontSize: '14.8px',
          lineHeight: '20px',
        },
      },
      body2: {
        fontSize: '14px',
        lineHeight: '19px',
        fontWeight: '400',
        color: '#000',
        '@media(max-width: 980px)': {
          fontSize: '12.8px',
          lineHeight: '16px',
        },
      },
    },
    components: {
      MuiTableContainer: {
        styleOverrides: {
          root: {
            '&::-webkit-scrollbar': {},
            '&::-webkit-scrollbar-track': {},
            '&::-webkit-scrollbar-thumb': {},
            '&::-webkit-scrollbar-thumb:hover': {},
          },
        },
      },
      MuiTabs: {
        styleOverrides: {},
      },
      MuiTab: {
        styleOverrides: {
          root: {},
        },
      },
      MuiFormLabel: {
        styleOverrides: {},
      },
      MuiAccordion: {
        styleOverrides: {},
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {},
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {},
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {},
          message: {},
          icon: {},
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {},
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            '@media(max-width: 480px)': {
              '&.MuiDialog-paper': {
                margin: '0',
              },
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            maxWidth: '1620px',
            '@media (max-width: 980px)': {
              padding: '0 52px 0 52px',
            },
            '@media (max-width: 480px)': {
              padding: '0 16px 0 16px',
            },
          },
          maxWidthLg: {
            maxWidth: '1620px !important',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {},
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            width: '100%',
            marginBottom: '25px',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: '18px',
            fontWeight: '600',
            lineHeight: '25px',
            fontFamily: 'Nunito Sans',
            marginBottom: '15px',
            width: '100%',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            backgroundColor: 'rgb(241, 244, 249)',
            fontSize: '18px',
            lineHeight: '25px',
            fontWeight: '600',
            fontFamily: 'Nunito Sans',
            '&.Mui-error': {
              borderColor: '#FF4949',
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            margin: 0,
            position: 'absolute',
            right: 'auto',
            left: 0,
            top: 'calc(100% - 2px)',
            fontSize: '13px',
            fontWeight: 600,
            padding: '4px 16px',
            whiteSpace: 'nowrap',
            '&.Mui-error': {
              color: '#FF4949',
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            '&.Mui-error': {},
          },
        },
      },
      MuiRadio: {
        styleOverrides: {},
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {},
          colorPrimary: {},
          colorSecondary: {},
        },
      },

      MuiMenu: {
        styleOverrides: {
          paper: {
            '&:hover': {},
          },
        },
      },
      MuiMenuList: {
        styleOverrides: {
          root: {},
        },
      },
      MuiList: {
        styleOverrides: {
          root: {},
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            padding: '8px 3px',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whitespace: 'nowrap',
            '&.Mui-selected': {
              '&:hover': {},
            },
            '&:hover': {},
          },
        },
      },
      MuiPopover: {
        defaultProps: {},
        styleOverrides: {
          paper: {},
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {},
          select: {
            height: 'auto',
            padding: 0,
            minHeight: 0,
          },
          nativeInput: {
            display: 'none',
          },
          icon: {},
        },
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          root: {},
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {},
        },
      },
      MuiAccordionActions: {
        styleOverrides: {
          root: {
            '&.Mui-expanded': {
              margin: '0',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            variants: [
              {
                props: { variant: 'contained' },
                style: {
                  borderRadius: '12px',
                  backgroundColor: 'rgb(72, 128, 255)',
                  padding: '7px 12px',
                  fontFamily: ['Nunito Sans'],
                  textTransform: 'none',
                  fontWeight: '600',
                  boxShadow: 'none',
                },
              },
              {
                props: { variant: 'outlined' },
                style: {
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  padding: '16px 25px',
                  fontFamily: ['Nunito Sans'],
                  textTransform: 'none',
                  fontWeight: '600',
                  boxShadow: 'none',
                  color: '#000',
                },
              },
              {
                props: { variant: 'text' },
                style: {
                  borderRadius: '12px',
                  padding: '7px 12px',
                  fontFamily: ['Nunito Sans'],
                  textTransform: 'none',
                  fontWeight: '600',
                  boxShadow: 'none',
                  color: '#000',
                },
              },
            ],
          },
        },
      },
      MuiDialog: {
        styleOverrides: {},
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {},
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {},
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          paper: {},
          listbox: {},
        },
      },
    },
  },
  ruRU,
);
