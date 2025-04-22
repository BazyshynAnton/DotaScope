import HeroAndNickname from './HeroAndNickname';
import RankAndAvatar from './RankAndAvatar';

import { useAppSelector } from '@/hooks/use-app-selector';
import { MatchOverviewPlayerRow } from '@/utils/match-overview-player-row';

import styles from '@/styles/match-overview-table-content.module.scss';

export default function MatchOverviewTableContent({
  matchOverviewTableData,
}: {
  matchOverviewTableData?: {
    isRadiant: boolean;
  };
}) {
  const { matchData, constants } = useAppSelector((store) => store.matchPageSlice);

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
            constants.abilities
          );
          // const playerItems = matchOverviewPlayerRow.findAppropriateItems(player, constants.items);
          const playerDetails = matchOverviewPlayerRow.findAppropriatePlayer(
            player,
            matchData.playerProfiles
          );

          return (
            <tr key={player.account_id} className={styles.table__bodyRow}>
              <td className={styles.table__bodyCell}>
                <HeroAndNickname player={player} playerHero={playerHero} />
                <RankAndAvatar playerDetails={playerDetails} />
              </td>
            </tr>
          );
        })}
    </>
  );
}
