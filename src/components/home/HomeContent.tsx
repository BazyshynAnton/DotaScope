import About from './About';
import InteractiveList from './InteractiveList';

import styles from '@/styles/home/home.module.scss';

export default function HomeContent() {
  return (
    <div className={styles.content}>
      <div className={styles.content__info}>
        <About />
        <InteractiveList type="newsList" listHeader="Dota News" />
      </div>
      <InteractiveList type="matchesList" listHeader="Professional Matches" />
    </div>
  );
}
