import NextLink from '@/components/ui/NextLink/NextLink';

import { Box, useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';

import { HeaderNavigation } from '@/styles/header';

const initialMovableBgState = {
  isRender: false,
  width: 0,
  offsetTop: 0,
  offsetLeft: 0,
};

/**
 * React component
 *
 * Implementation of the Header navigation
 *
 * @returns {JSX.Element}
 */
export default function Navigation() {
  const [movableBg, setMovableBg] = useState(initialMovableBgState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const pathname = usePathname();
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMouseEnterLink = (idx: number) => () => {
    // retrieve reference of element in array
    const ref = linkRefs.current[idx];

    if (ref && !isMobile) {
      setMovableBg((prevState) => ({
        ...prevState,
        isRender: true,
        width: ref.offsetWidth,
        offsetTop: ref.offsetTop,
        offsetLeft: ref.offsetLeft,
      }));
    }
  };

  const handleMouseLeaveLink = () => {
    if (!isMobile) {
      setMovableBg(initialMovableBgState);
    }
  };

  return (
    <HeaderNavigation>
      <Box
        sx={{
          position: 'absolute',
          top: 1,
          zIndex: 1,
          width: `${movableBg.width}px`,
          height: '100%',
          display: movableBg.isRender ? 'block' : 'none',
          background: '#ffffff14',
          transition: 'all 0.2s ease-in-out',
          transform: `translate(${movableBg.offsetLeft}px,${movableBg.offsetTop - 1}px)`,
          pointerEvents: 'none',
        }}
      />
      {[
        ['Home', '/'],
        ['Matches', '/matches'],
        ['Meta', '/meta'],
      ].map(([name, path], idx) => (
        <NextLink
          key={name}
          href={path}
          sx={{ color: pathname === path ? theme.palette.text1 : theme.palette.text2 }}
          ref={(el) => {
            linkRefs.current[idx] = el;
          }}
          onMouseEnter={handleMouseEnterLink(idx)}
          onMouseLeave={handleMouseLeaveLink}
        >
          {name}
        </NextLink>
      ))}
    </HeaderNavigation>
  );
}
