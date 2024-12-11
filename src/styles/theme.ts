import { ruRU } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';

export default createTheme(
  {
    palette: {},
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
      fontFamily: ['"DMSans"', '"Arial"', '"sans-serif"'].join(','),
      h1: {
        fontSize: '70px',
        lineHeight: '84px',
        fontWeight: '700',
        color: '#020227',
        '@media (max-width: 980px)': {
          fontSize: '35px',
          lineHeight: '38.5px',
        },
      },
      h2: {
        fontSize: '50px',
        lineHeight: '60px',
        fontWeight: '700',
        color: '#020227',
        '@media(max-width: 980px)': {
          fontSize: '30px',
          lineHeight: '36px',
        },
      },
      h3: {
        fontSize: '30px',
        lineHeight: '36px',
        fontWeight: '700',
        color: '#020227',
        '@media(max-width: 980px)': {
          fontSize: '20px',
          lineHeight: '24px',
        },
      },
      h4: {
        fontSize: '24px',
        lineHeight: '28.8px',
        fontWeight: '400',
        color: '#020227',
        '@media(max-width: 980px)': {
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '25.2px',
        },
      },
      body1: {
        fontSize: '20px',
        lineHeight: '28px',
        fontWeight: '400',
        color: '#020227',
        '@media(max-width: 980px)': {
          fontSize: '14.8px',
          lineHeight: '20px',
        },
      },
      body2: {
        fontSize: '16px',
        lineHeight: '22.4px',
        fontWeight: '400',
        color: '#020227',
        '@media(max-width: 980px)': {
          fontSize: '14.8px',
          lineHeight: '20px',
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
      // MuiFilledInput: {
      //   styleOverrides: {
      //     root: {
      //       transition: 'ease .3s all',
      //
      //       '& svg': {},
      //       '&:hover': {},
      //       '&.Mui-error': {},
      //       '&.Mui-focused': {},
      //       '&::before, &::after': {
      //         display: 'none',
      //       },
      //     },
      //     input: {
      //       '&::placeholder': {},
      //     },
      //   },
      // },
      MuiTextField: {
        styleOverrides: {
          root: {
            width: '100%',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {},
      },
      MuiOutlinedInput: {
        styleOverrides: {},
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 2px)',
            whiteSpace: 'nowrap',
            '&.Mui-error': {},
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
        styleOverrides: {},
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
