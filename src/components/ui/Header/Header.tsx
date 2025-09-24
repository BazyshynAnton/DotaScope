'use client';

import Link from 'next/link';
import MuiLink from '@mui/material/Link';
import Navigation from './Navigation';

import { HeaderContainer, HeaderContent } from '@/styles/header';

/**
 * React component
 *
 * Implementation of the main application header
 *
 * @returns {JSX.Element}
 */
export default function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <MuiLink href="/" component={Link}>
          DOTASCOPE
        </MuiLink>
        <Navigation />
      </HeaderContent>
    </HeaderContainer>
  );
}
