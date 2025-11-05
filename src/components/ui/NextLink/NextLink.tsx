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
  sx,
  ref,
  target,
  variant,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  href: string;
  sx?: SxProps<Theme> | undefined;
  ref?: React.Ref<HTMLAnchorElement> | undefined;
  target?: React.HTMLAttributeAnchorTarget | undefined;
  variant?: string | undefined;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  children: React.ReactNode;
}) {
  return (
    <MuiLink
      ref={ref}
      href={href}
      component={Link}
      sx={sx}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      target={target}
      variant={variant}
    >
      {children}
    </MuiLink>
  );
}
