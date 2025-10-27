'use client';

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
