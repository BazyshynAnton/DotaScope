import '@mui/material/styles';

declare module '@mui/material/styles' {
  // Add custom palette into MUI theme. Safe to ignore warning.
  // eslint-disable-next-line
  interface Palette extends CustomPalette {}

  // Add custom palette options into MUI theme. Safe to ignore warning.
  // eslint-disable-next-line
  interface PaletteOptions extends CustomPalette {}

  // Add custom typography into MUI theme. Safe to ignore warning.
  // eslint-disable-next-line
  interface TypographyVariants extends CustomTypography {}

  // Add custom typography options into MUI theme. Safe to ignore warning.
  // eslint-disable-next-line
  interface TypographyVariantsOptions extends CustomTypography {}
}

declare module '@mui/material/Typography' {
  /**
   * NOTE
   * Potentially lead to implicit(silent) errors due to possible typos in naming
   *
   * Old version(as an example):
   * Strongly typed interface, won't allow to use keys don't exist
   *
   * interface TypographyPropsVariantOverrides {
   *  'Heading/Medium/MD45': true;
   *  'Heading/Medium/SM30': true;
   *  'Body/Medium/SM20': true;
   *  'Body/Medium/SM16': true;
   *  'Body/Medium/SM15': true;
   *  'Body/Medium/SM12': true;
   *  'Body/Light/SM15': true;
   * }
   */
  interface TypographyPropsVariantOverrides {
    [key: string]: true;
  }
}

interface CustomPalette {
  text1: '#ffffffde';
  text2: '#ffffffb0';
  text3: '#ffab40';

  textRadiant: '#59ce8f';
  textDire: '#df2e38';

  bg1: '#1c242d';
  bg2: '#242f39';
  bg3: '#ffffffde';
  bg4: '#3b4b5e';
  bg5: '#c9af1d';
  bg6: '#ffffff14';
  bg7: '#533814';
  bg8: '#152128';
  bg9: '#283441';

  border1: '#ffffff1a';
  border2: '#ffffffde';
  border3: '#27292b';
  border4: '#283441';
}

interface CustomTypography {
  'Body/Bold/MD20': TypographyContent;
  'Body/Medium/MD14': TypographyContent;
}

interface TypographyContent {
  fontSize: number | string;
  fontWeight: number | string;
  lineHeight: number | string;
}
