'use client';

import NextLink from '@/components/ui/NextLink/NextLink';
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
        <NextLink href="/">DOTASCOPE</NextLink>
        <Navigation />
      </HeaderContent>
    </HeaderContainer>
  );
}
