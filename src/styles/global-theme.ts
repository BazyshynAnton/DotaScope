import { createTheme } from '@mui/material/styles';
import { Exo_2 } from 'next/font/google';
import { pxToRem } from '@/utils/px-to-rem';

const exo2 = Exo_2({
  weight: ['400', '500', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
});

export const globalTheme = createTheme({
  palette: {
    text1: '#ffffffde',
    text2: '#ffffffb0',
    text3: '#ffab40',

    textRadiant: '#59ce8f',
    textDire: '#df2e38',

    bg1: '#1c242d',
    bg2: '#242f39',
    bg3: '#ffffffde',
    bg4: '#3b4b5e',
    bg5: '#c9af1d',
    bg6: '#ffffff14', // for hovering/opacity
    bg7: '#533814',
    bg8: '#152128',
    bg9: '#283441',

    border1: '#ffffff1a',
    border2: '#ffffffde',
    border3: '#27292b',
    border4: '#283441',
  },

  typography: {
    /**
     * Global font family imported from a local font module.
     */
    fontFamily: exo2.style.fontFamily,
    /**
     * Font sizes and styles for various text elements.
     *
     * Each key corresponds to a specific typography variant.
     */
    'Body/Bold/MD20': {
      fontSize: pxToRem(20),
      fontWeight: 600,
      lineHeight: '100%',
    },
    'Body/Medium/MD14': {
      fontSize: pxToRem(14),
      fontWeight: 400,
      lineHeight: '100%',
    },
    // 'Heading/Medium/MD45': {
    //   fontSize: 45,
    //   fontWeight: 500,
    //   lineHeight: '100%',
    // },
    // 'Heading/Medium/SM30': {
    //   fontSize: 30,
    //   fontWeight: 500,
    //   lineHeight: '100%',
    // },
    // 'Body/Medium/SM24': {
    //   fontSize: 24,
    //   fontWeight: 500,
    //   lineHeight: '100%',
    // },
    // 'Body/Medium/SM20': {
    //   fontSize: 20,
    //   fontWeight: 500,
    //   lineHeight: '143%',
    // },
    // 'Body/Medium/SM16': {
    //   fontSize: 16,
    //   fontWeight: 500,
    //   lineHeight: '100%',
    // },
    // 'Body/Medium/SM15': {
    //   fontSize: 15,
    //   fontWeight: 500,
    //   lineHeight: '100%',
    // },
    // 'Body/Medium/SM12': {
    //   fontSize: 12,
    //   fontWeight: 500,
    //   lineHeight: '143%',
    // },
    // 'Body/Light/SM15': {
    //   fontSize: 15,
    //   fontWeight: 300,
    //   lineHeight: '100%',
    // },
    // 'Body/Light/SM12': {
    //   fontSize: 12,
    //   fontWeight: 300,
    //   lineHeight: '143%',
    // },
  },
});
