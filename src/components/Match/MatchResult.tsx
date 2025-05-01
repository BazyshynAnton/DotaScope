import { useAppSelector } from '@/hooks/use-app-selector';
import { MatchOverview } from '@/utils/match-overview';

import styles from '@/styles/match-result.module.scss';

export default function MatchResult() {
  const { matchData } = useAppSelector((store) => store.matchPageSlice as MatchPageSlice);

  if (!matchData) {
    return;
  }

  const matchOverview = MatchOverview.getInstance();

  const matchResult = matchOverview.findMatchResult(matchData.match);

  const side = matchResult.result ? 'RADIANT' : 'DIRE';
  let teamName = null;
  switch (side) {
    case 'RADIANT':
      teamName = matchData.match.radiant_name ? `"${matchData.match.radiant_name}"` : side;
      break;

    case 'DIRE':
      teamName = matchData.match.dire_name ? `"${matchData.match.dire_name}"` : side;
      break;
  }

  return (
    <section className={styles.match__result}>
      <h1
        className={`${styles.teamHeader} ${matchResult.result ? styles.teamHeader_radiant : styles.teamHeader_dire}`}
      >
        TEAM {teamName} W0N
      </h1>
      <div className={styles.scoreAndTime}>
        <p className={styles.radiantScore}>{matchResult.radiantScore}</p>
        <p className={styles.duration}>{matchResult.duration}</p>
        <p className={styles.direScore}>{matchResult.direScore}</p>
      </div>
    </section>
  );
}
