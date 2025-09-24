import Link from 'next/link';
import MuiLink from '@mui/material/Link';

import { HeaderNavigation } from '@/styles/header';

/**
 * React component
 *
 * Implementation of the Header navigation
 *
 * @returns {JSX.Element}
 */
export default function Navigation() {
  return (
    <HeaderNavigation>
      {['Home', 'Matches', 'Meta'].map((page) => (
        <MuiLink key={page} href={`/${page.toLowerCase()}`} component={Link}>
          {page}
        </MuiLink>
      ))}
    </HeaderNavigation>
  );
}
