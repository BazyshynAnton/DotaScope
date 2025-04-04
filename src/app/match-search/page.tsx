import MatchSearch from '@/components/MatchSearch/MatchSearch';

import styles from '@/styles/matches.module.scss';

export default function MatchSearchPage() {
  return (
    <section className={styles.matches}>
      <MatchSearch />
    </section>
  );
}
