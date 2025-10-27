import Link from 'next/link';
import MuiLink from '@mui/material/Link';
import { SxProps, Theme } from '@mui/material';

/**
 * Reusable Material UI link combined with Next.js Link
 *
 * @param key React key
 * @param href Hypertext reference
 * @param children React node
 * @returns {JSX.Element}
 */
export default function NextLink({
  href,
  sx = undefined,
  children,
}: {
  href: string;
  sx?: SxProps<Theme> | undefined;
  children: React.ReactNode;
}) {
  return (
    <MuiLink href={href} component={Link} sx={sx}>
      {children}
    </MuiLink>
  );
}
