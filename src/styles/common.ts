'use client';

import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const applicationContainer = {
  margin: '0 auto',
  maxWidth: '1400px',
  width: '100%',
};

export const ApplicationContainer = styled('div')(({ theme }) => ({
  ...applicationContainer,

  a: {
    color: theme.palette.text2,
  },
}));

export const Input = styled(TextField)(({ theme }) => ({
  '.MuiFormLabel-root': {
    color: theme.palette.text2,

    '&.Mui-focused': {
      color: theme.palette.text2,
    },
  },

  '.MuiInputBase-root': {
    background: 'none',

    '&:hover': {
      '&::before': {
        borderColor: `${theme.palette.border1} !important`,
      },
    },

    '&::before': {
      borderColor: theme.palette.border1,
    },

    '&::after': {
      borderColor: theme.palette.border2,
    },

    input: {
      height: '24px',
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
