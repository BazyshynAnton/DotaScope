'use client';

import { styled } from '@mui/material/styles';
import { pxToRem } from '@/utils/px-to-rem';
import { type CSSObject } from '@mui/material';

const commonItemTimingStyles: CSSObject = {
  fontSize: pxToRem(10),
  pointerEvents: 'none',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  width: '100%',
  textAlign: 'center',
};

export const MainSlotsItemTiming = styled('span')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  color: theme.palette.text1,
  ...commonItemTimingStyles,
}));

export const BackpackSlotsItemTiming = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text1,
  ...commonItemTimingStyles,
}));
