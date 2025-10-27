import { styled } from '@mui/material/styles';
import { applicationContainer } from '@/styles/common';

export const HeaderContainer = styled('header')(() => ({
  margin: '0 auto',
  padding: '0 20px',
  width: '100%',
  height: 'max-content',
}));

export const HeaderContent = styled('section')(({ theme }) => ({
  ...applicationContainer,

  a: {
    textDecoration: 'none',

    '&:first-child': {
      color: theme.palette.text1,
    },
  },
}));

export const HeaderNavigation = styled('nav')(() => ({}));
