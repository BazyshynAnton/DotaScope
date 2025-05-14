import PlayerTableData from './PlayerTableData';

import { useAppSelector } from '@/hooks/use-app-selector';
import { MatchOverviewPlayerRow } from '@/utils/match-overview-player-row';

import styles from '@/styles/match-overview-table-content.module.scss';
import PlayerStatisticTableData from './PlayerStatisticTableData';
import PlayerItemsTableData from './PlayerItemsTableData';

export default function MatchOverviewTableContent({
  matchOverviewTableData,
}: {
  matchOverviewTableData?: {
    isRadiant: boolean;
  };
}) {
  const { matchData, constants } = useAppSelector(
    (store) => store.matchPageSlice as MatchPageSlice
  );

  if (!matchOverviewTableData || !matchData?.playersByTeam || !constants) {
    return;
  }

  const teamPlayers = matchOverviewTableData.isRadiant
    ? matchData.playersByTeam.radiant
    : matchData.playersByTeam.dire;

  return (
    <>
      {teamPlayers &&
        teamPlayers.map((player) => {
          const matchOverviewPlayerRow = new MatchOverviewPlayerRow();

          const playerHero = matchOverviewPlayerRow.findAppropriateHero(
            player,
            constants.heroes,
            constants.heroAbilities
          );

          const playerDetails = matchOverviewPlayerRow.findAppropriatePlayer(
            player,
            matchData.playerProfiles
          );

          const playerItems = matchOverviewPlayerRow.findAppropriateItems(player, constants.items);

          return (
            <tr key={player.account_id} className={styles.table__bodyRow}>
              <PlayerTableData
                player={player}
                playerHero={playerHero}
                playerDetails={playerDetails}
              />
              <PlayerStatisticTableData player={player} />
              <PlayerItemsTableData player={player} playerItems={playerItems} />
            </tr>
          );
        })}
    </>
  );
}
