'use client';

import Search from './Search';

import styles from '@/styles/matches.module.scss';

export default function Matches() {
  return (
    <section className={styles.matches}>
      <Search />
    </section>
  );
}
