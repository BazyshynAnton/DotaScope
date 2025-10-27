import NextLink from '@/components/ui/NextLink/NextLink';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import { useRef, useState, useLayoutEffect } from 'react';

import { HeaderNavigation } from '@/styles/header';

/**
 * React component
 *
 * Implementation of the Header navigation
 *
 * @returns {JSX.Element}
 */
export default function Navigation() {
  const [movableBg, setMovableBg] = useState({
    isRender: false,
    width: 0,
    offsetTop: 0,
    offsetLeft: 0,
  });
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const pathname = usePathname();
  const theme = useTheme();
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    if (window && window.innerWidth) setWindowWidth(window.innerWidth);
  }, []);

  const handleMouseEnterLink = (idx: number) => () => {
    // retrieve reference of element in array
    const ref = linkRefs.current[idx];

    if (ref && windowWidth && windowWidth > 400) {
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
    if (windowWidth && windowWidth > 400) {
      setMovableBg((prevState) => ({
        ...prevState,
        isRender: true,
        width: 0,
        offsetTop: 0,
        offsetLeft: 0,
      }));
    }
  };

  return (
    <HeaderNavigation>
      <Box
        sx={{
          position: 'absolute',
          top: 1,
          zIndex: 1,
          width: `${movableBg.width || 0}px`,
          height: '100%',
          display: movableBg.isRender ? 'block' : 'none',
          background: '#ffffff14',
          transition: 'all 0.2s ease-in-out',
          transform: `translate(${movableBg.offsetLeft || 0}px,${(movableBg.offsetTop || 0) - 1}px)`,
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
