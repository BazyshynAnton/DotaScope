'use client';

import { Link } from '@/shared/nextjs-imports';

import styles from '@/styles/home.module.scss';

export default function Home() {
  return (
    <section className={styles.home}>
      <h1 className={styles.home__heading}>DOTASCOPE</h1>
      <p className={styles.home__explanation}>Distraction free Dota 2 data platform</p>
      <Link className={styles.home__navigationLink} href="#">
        Search for a specific match
      </Link>
    </section>
  );
}
