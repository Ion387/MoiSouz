import { Palette, PaletteOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    red: Palette['red'];
  }

  interface PaletteOptions {
    red?: PaletteOptions['red'];
  }
}
