import { Link } from '@/shared/nextjs-imports';
import { useAppDispatch } from '@/shared/redux-imports';
import { setIsTableDataExist, setMatchData } from '@/store/statistic-slice';
import { fetchMatchData } from '@/utils/statistic/match-data-utility';
import { timeAgo } from '@/utils/shared-utils';

import type { ProMatch } from '@/types/home/home-data';

import styles from '@/styles/home/home.module.scss';

export default function ProMatchCard({ proMatch }: { proMatch: ProMatch }) {
  const dispatch = useAppDispatch();

  const endTime = proMatch.start_time + proMatch.duration;
  const now = Math.floor(Date.now() / 1000);
  const diffInSeconds = now - endTime;
  const matchDurationMinutes = Math.floor(proMatch.duration / 60);
  const matchDurationSeconds = proMatch.duration % 60;

  const handleOverviewClick = async () => {
    dispatch(setIsTableDataExist(true));
    const mID = proMatch.match_id;
    const matchData = await fetchMatchData(mID);
    dispatch(setMatchData(matchData));
  };

  let formattedLeagueName =
    proMatch.league_name.length > 25
      ? proMatch.league_name.substring(0, 24) + '...'
      : proMatch.league_name;
  const radiantName = proMatch.radiant_name ? proMatch.radiant_name : 'TBD';
  const direName = proMatch.dire_name ? proMatch.dire_name : 'TBD';

  return (
    <div className={styles.proMatchCard}>
      <section className={styles.proMatch__nameAndTeams}>
        <h1>{formattedLeagueName}</h1>
        <div className={styles.teams}>
          <div>
            <span style={{ color: '#59ce8f' }}>Radiant: </span>
            <span>{radiantName}</span>
          </div>
          <div>
            <span style={{ color: '#df2e38' }}>Dire: </span>
            <span>{direName}</span>
          </div>
        </div>
      </section>
      <div className={styles.proMatch__info}>
        <p>ID: {proMatch.match_id}</p>
        <p>
          Duration: {`${matchDurationMinutes}:${matchDurationSeconds.toString().padStart(2, '0')}`}
        </p>
        <p>{timeAgo(diffInSeconds)}</p>
        <Link href={`/statistic/match?id=${proMatch.match_id}`} onClick={handleOverviewClick}>
          overview
        </Link>
      </div>
    </div>
  );
}
