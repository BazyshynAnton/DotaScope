import TableDetails from './TableDetails/TableDetails';
import ResultOfMatch from './ResultOfMatch';
import PicksBans from './PicksBans';
import TableAbilities from './TableAbilities/TableAbilities';
import MapAndChart from './MapAndChart';

import { MatchDetailsUtility } from '@/utils/statistic/match-details-utility';
import { useEffect, useState } from '@/shared/react-imports';
import { useAppDispatch, useAppSelector } from '@/shared/redux-imports';
import { setTableLoading } from '@/store/statistic-slice';

import type { PlayersByTeam } from '@/types/statistic/match-details';

import styles from '@/styles/statistic/match-details.module.scss';

export default function MatchDetails() {
  const { matchDetails } = useAppSelector((store) => store.statisticSlice);
  const dispatch = useAppDispatch();

  const [playersByTeam, setPlayersByTeam] = useState<PlayersByTeam>();

  useEffect(() => {
    if (matchDetails) {
      const uMatchData = MatchDetailsUtility.getInstance();
      setPlayersByTeam(uMatchData.filterPlayersByTeam(matchDetails));
    }
  }, [matchDetails]);

  if (!playersByTeam) {
    dispatch(setTableLoading(true));
    return;
  } else {
    setTableLoading(false);
  }

  return (
    <div className={styles.match}>
      <div className={styles.match__header}>
        <ResultOfMatch />
      </div>
      <TableDetails playersTeam={playersByTeam?.playersRadiant} />
      <PicksBans side={'radiant'} />
      <TableDetails playersTeam={playersByTeam?.playersDire} />
      <PicksBans side={'dire'} />
      <TableAbilities playersTeam={playersByTeam?.playersRadiant} />
      <TableAbilities playersTeam={playersByTeam?.playersDire} />
      <MapAndChart />
    </div>
  );
}
