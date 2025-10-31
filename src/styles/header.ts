import { styled } from '@mui/material/styles';
import { applicationContainer } from '@/styles/common';
import { pxToRem } from '@/utils/px-to-rem';

export const HeaderContainer = styled('header')(({ theme }) => ({
  margin: '0 auto',
  padding: `0 ${pxToRem(20)}`,
  width: '100%',
  height: 'max-content',
  background: `linear-gradient(270deg,${theme.palette.bg2},${theme.palette.bg4})`,
  borderBottom: `${pxToRem(1)} solid ${theme.palette.border2}`,

  [theme.breakpoints.down('sm')]: {
    padding: `${pxToRem(10)} ${pxToRem(20)}`,
  },
}));

export const HeaderContent = styled('section')(({ theme }) => ({
  ...applicationContainer,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  a: {
    textDecoration: 'none',
    ...theme.typography['Body/Medium/MD17'],
  },

  '& > a': {
    color: theme.palette.text1,
    ...theme.typography['Body/Bold/MD20'],
  },
}));

export const HeaderNavigation = styled('nav')(({ theme }) => ({
  position: 'relative',

  a: {
    padding: pxToRem(10),
    display: 'inline-block',
  },

  [theme.breakpoints.down('sm')]: {
    paddingBottom: pxToRem(5),
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    display: 'flex',
    gap: pxToRem(15),
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(270deg,${theme.palette.bg2},${theme.palette.bg4})`,
    borderTop: `${pxToRem(1)} solid ${theme.palette.border2}`,
  },
}));
