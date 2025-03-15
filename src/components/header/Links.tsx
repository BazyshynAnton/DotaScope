import { Dispatch, SetStateAction } from 'react';

import { Link, usePathname } from '@/shared/nextjs-imports';
import { useRef } from '@/shared/react-imports';

import type { ComponentStyles } from './HeaderBigScreen';

import styles from '@/styles/header/header.module.scss';

export default function Links({
  setIsOpen,
  setComponentStyles,
  setIsBackground,
}: {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setComponentStyles?: Dispatch<SetStateAction<ComponentStyles>>;
  setIsBackground?: Dispatch<SetStateAction<boolean>>;
}) {
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();

  const handleOpenMenuClick = () => {
    setIsOpen && setIsOpen(false);
  };

  const handleMouseEnter = (idx: number) => () => {
    const ref = refs.current[idx];

    if (ref) {
      setComponentStyles &&
        setComponentStyles({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          offsetTop: ref.offsetTop,
          offsetLeft: ref.offsetLeft,
        });

      setIsBackground && setIsBackground(true);
    }
  };

  const handleMouseLeave = () => {
    setIsBackground && setIsBackground(false);
  };

  return (
    <>
      {['/', '/statistic', '/meta', '/players'].map((href, idx) => (
        <Link
          key={href}
          href={href}
          className={pathname === href ? styles.activeHeaderLink : styles.headerLink}
          onClick={handleOpenMenuClick}
          onMouseEnter={handleMouseEnter(idx)}
          onMouseLeave={handleMouseLeave}
          ref={(el) => {
            refs.current[idx] = el;
          }}
        >
          {href.replace('/', '') || 'home'}
        </Link>
      ))}
    </>
  );
}
