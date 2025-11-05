import { styled } from '@mui/material/styles';
import { pxToRem } from '@/utils/px-to-rem';
import { borderWithShadow } from '@/styles/common';

export const MatchHeaderContainer = styled('section')(({ theme }) => ({
  marginTop: pxToRem(96),
  padding: pxToRem(10),
  display: 'flex',
  justifyContent: 'space-between',
  background: `linear-gradient(to left, ${theme.palette.bg2}, ${theme.palette.bg4})`,
  border: `${pxToRem(1)} solid ${theme.palette.border2}`,
  color: theme.palette.text1,
  ...borderWithShadow,

  [theme.breakpoints.down(680)]: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const MatchIdAndReplayContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: pxToRem(8),
  flexDirection: 'column',

  [theme.breakpoints.down(680)]: {
    marginBottom: pxToRem(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const MatchInfoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: pxToRem(11.2),

  [theme.breakpoints.down(680)]: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

export const MatchDetailsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  color: theme.palette.text2,

  [theme.breakpoints.down(680)]: {
    alignItems: 'center',
    gap: pxToRem(8),
  },
}));
