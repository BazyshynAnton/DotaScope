'use client';

import { TextField, Button, TableContainer, TableHead, TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';
import { pxToRem } from '@/utils/px-to-rem';

export const applicationContainer = {
  margin: '0 auto',
  padding: '0 20px',
  maxWidth: pxToRem(1400),
  width: '100%',
};

export const borderWithShadow = {
  borderRadius: pxToRem(8),
  boxShadow: '0 2px 4px #00000014, 0 4px 8px #00000014, 0 6px 12px #00000014',
};

export const ApplicationContainer = styled('div')(({ theme }) => ({
  ...applicationContainer,

  a: {
    color: theme.palette.text2,
  },
}));

export const MainContainer = styled('main')(() => ({
  paddingTop: `${pxToRem(50)}`,
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

export const CommonTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: pxToRem(50),
  background: theme.palette.bg2,
  color: theme.palette.text1,
  ...borderWithShadow,
}));

export const CommonTableHead = styled(TableHead)(({ theme }) => ({
  background: `linear-gradient(270deg,${theme.palette.bg2},${theme.palette.bg4})`,
}));

export const CommonTableHeadCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text1,
  ...theme.typography['Body/Medium/MD12'],
  fontWeight: '700',
}));
