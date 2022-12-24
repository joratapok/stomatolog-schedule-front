import '@mui/material/styles/createPalette';
declare module '@mui/material/styles' {
  interface PaletteOptions {
    button: PaletteColorOptions;
    suggestions: PaletteColorOptions;
    borders: PaletteColorOptions;
  }
  interface TypographyVariants {
    reverse: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    reverse?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    reverse: true;
  }
}
