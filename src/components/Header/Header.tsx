'use client';

import { Link } from '@/shared/nextjs-imports';
import { useRef, useState, useEffect } from '@/shared/react-imports';

import styles from '@/styles/header.module.scss';

export default function Header() {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [isBgAppear, setIsBgAppear] = useState(false);
  const [movableBgStyles, setMovableBgStyles] = useState<MovableBgStyles>(initialMovableBgStyles);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth) setWindowWidth(window.innerWidth);
  }, []);

  const handleMouseEnterLink = (idx: number) => () => {
    // retrieve reference of element in array
    const ref = linkRefs.current[idx];

    if (ref && windowWidth && windowWidth > 400) {
      setMovableBgStyles({
        width: ref.offsetWidth,
        offsetTop: ref.offsetTop,
        offsetLeft: ref.offsetLeft,
      } as MovableBgStyles);

      setIsBgAppear(true);
    }
  };

  const handleMouseLeaveLink = () => {
    if (windowWidth && windowWidth > 400) {
      setIsBgAppear(false);
      setMovableBgStyles(initialMovableBgStyles);
    }
  };

  const handleClickBurger = () => setIsBurgerOpened(!isBurgerOpened);

  return (
    <header className={styles.header}>
      <section className={styles.header__content}>
        <Link href="/" className={styles.header__heading}>
          DOTASCOPE
        </Link>

        <div
          className={`${styles.header__burger} ${isBurgerOpened && styles.header__burger_opened}`}
          onClick={handleClickBurger}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={styles.header__navigation}>
          <div
            className={styles.header__movableBg}
            style={{
              position: 'absolute',
              top: 1,
              zIndex: 1,

              width: `${movableBgStyles.width || 0}px`,
              height: '100%',

              display: isBgAppear ? 'block' : 'none',

              background: '#ffffff14',

              transition: 'all 0.2s ease-in-out',
              transform: `translate(${movableBgStyles.offsetLeft || 0}px,${(movableBgStyles.offsetTop || 0) - 1}px)`,
            }}
          ></div>
          <ul
            className={`${styles.header__linksList} ${!isBurgerOpened && styles.header__linksList_closed}`}
          >
            {['/', '/matches', 'meta'].map((href, idx) => {
              return (
                <li key={href}>
                  <Link
                    className={styles.header__link}
                    href={href}
                    ref={(el) => {
                      linkRefs.current[idx] = el;
                    }}
                    onMouseEnter={handleMouseEnterLink(idx)}
                    onMouseLeave={handleMouseLeaveLink}
                  >
                    {
                      // use "home" string if href is empty string after replacing
                      href.replace('/', '') || 'home'
                    }
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
    </header>
  );
}

interface MovableBgStyles {
  width: number | null;
  offsetTop: number | null;
  offsetLeft: number | null;
}

const initialMovableBgStyles: MovableBgStyles = {
  width: null,
  offsetTop: null,
  offsetLeft: null,
};
