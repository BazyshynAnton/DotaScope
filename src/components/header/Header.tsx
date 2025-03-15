'use client';
import HeaderSmallScreen from './HeaderSmallScreen';
import HeaderBigScreen from './HeaderBigScreen';

import { useEffect, useState } from '@/shared/react-imports';

import styles from '@/styles/header/header.module.scss';

export default function Header() {
  const [smallHeader, setSmallHeader] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSmallHeader(window.innerWidth <= 550);

      const handleResizeEvent = () => {
        setSmallHeader(window.innerWidth <= 550);
      };

      window.addEventListener('resize', handleResizeEvent);
      return () => {
        window.removeEventListener('resize', handleResizeEvent);
      };
    }
  }, []);

  return (
    <header className={styles.headerWrapper}>
      <section className={styles.headerContainer}>
        <h1 style={{ color: '#ffffffde' }}>DOTASCOPE</h1>
        {!smallHeader ? <HeaderBigScreen /> : <HeaderSmallScreen />}
      </section>
    </header>
  );
}
