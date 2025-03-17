import { MatchDetailsUtility } from '@/utils/statistic/match-details-utility';
import { useAppSelector } from '@/shared/redux-imports';
import { useEffect, useState } from '@/shared/react-imports';

import type { MatchResult } from '@/types/statistic/match-details';

import styles from '@/styles/statistic/match-details.module.scss';

export default function ResultOfMatch() {
  const { matchDetails, heroList } = useAppSelector((store) => store.statisticSlice);

  const [resultOfMatch, setResultOfMatch] = useState<MatchResult>();

  useEffect(() => {
    if (matchDetails && heroList) {
      const uMatchDetails = MatchDetailsUtility.getInstance();
      setResultOfMatch(uMatchDetails.findMatchResult(matchDetails));
    }
  }, [heroList, matchDetails]);

  const side = resultOfMatch?.resultOfMatch ? 'RADIANT' : 'DIRE';
  const sideColor = resultOfMatch?.resultOfMatch ? '#59ce8f' : '#df2e38';

  let teamName;
  switch (side) {
    case 'RADIANT': {
      teamName = matchDetails?.radiant_name ? `"${matchDetails.radiant_name}"` : side;
      break;
    }
    case 'DIRE': {
      teamName = matchDetails?.dire_name ? `"${matchDetails.dire_name}"` : side;
      break;
    }
  }

  if (teamName === '') teamName = `"TBD"`;

  return (
    <>
      <section className={styles.match__result}>
        <h1
          style={{
            color: sideColor,
          }}
        >
          TEAM {teamName} {'W0N'}
        </h1>
        <div className={styles.match__scoreAndTime}>
          <p className={styles.match__radiantScore}>{resultOfMatch?.radiantScore}</p>
          <p className={styles.match__duration}>{resultOfMatch?.matchDuration}</p>
          <p className={styles.match__direScore}>{resultOfMatch?.direScore}</p>
        </div>
      </section>
    </>
  );
}
