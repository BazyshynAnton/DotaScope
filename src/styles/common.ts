'use client';

import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { pxToRem } from '@/utils/px-to-rem';

export const applicationContainer = {
  margin: '0 auto',
  maxWidth: pxToRem(1400),
  width: '100%',
};

export const ApplicationContainer = styled('div')(({ theme }) => ({
  ...applicationContainer,

  a: {
    color: theme.palette.text2,
  },
}));

export const CommonInput = styled(TextField)(({ theme }) => ({
  '.MuiFormLabel-root': {
    maxWidth: 'min-content',
    width: '100%',
    height: '100%',
    color: theme.palette.text2,

    ...theme.typography['Body/Medium/MD15'],

    '&.Mui-error, &.Mui-focused': {
      width: '100%',
      height: '100%',
      color: theme.palette.text2,
    },
  },

  '.MuiInputBase-root': {
    background: 'none',

    '&:hover': {
      '&::before': {
        borderColor: `${theme.palette.border2} !important`,
      },
    },

    '&::before': {
      borderColor: theme.palette.border2,
    },

    '&::after': {
      borderColor: theme.palette.border1,
    },

    input: {
      height: pxToRem(18),
      color: theme.palette.text2,

      '&:focus': {
        color: theme.palette.text1,
      },

      '&::placeholder': {
        color: theme.palette.text2,
        opacity: 1,
      },
    },
  },
}));

export const CommonButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  color: theme.palette.text2,
  borderColor: theme.palette.border2,

  '&:hover': {
    color: theme.palette.text1,
    borderColor: theme.palette.border1,
  },
}));
