import NextLink from '@/components/ui/NextLink/NextLink';

import { useTheme } from '@mui/material/styles';

import { HeaderNavigation } from '@/styles/header';
import { usePathname } from 'next/navigation';

/**
 * React component
 *
 * Implementation of the Header navigation
 *
 * @returns {JSX.Element}
 */
export default function Navigation() {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <HeaderNavigation>
      {[
        ['Home', '/'],
        ['Matches', '/matches'],
        ['Meta', '/meta'],
      ].map(([name, path]) => (
        <NextLink
          key={name}
          href={path}
          sx={{ color: pathname === path ? theme.palette.text1 : theme.palette.text2 }}
        >
          {name}
        </NextLink>
      ))}
    </HeaderNavigation>
  );
}
