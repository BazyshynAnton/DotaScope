'use client';

import { styled } from '@mui/material/styles';
import { pxToRem } from '@/utils/px-to-rem';

export const BuffsContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  color: theme.palette.text2,

  span: {
    position: 'absolute',
    top: pxToRem(-13.5),
  },
}));
