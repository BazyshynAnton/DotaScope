import HeroAndNickname from './HeroAndNickname';
import RankAndAvatar from './RankAndAvatar';
import PlayerStatistic from './PlayerStatistic';
import PlayerItems from './PlayerItems';

import { useAppSelector } from '@/shared/redux-imports';
import { PlayerRowDetailsUtility } from '@/utils/statistic/player-row-details-utility';

import type { Player } from '@/types/statistic/match-data';
import type { HeroDetails, PlayerDetails, ItemDetails } from '@/types/statistic/player-row';

import styles from '@/styles/statistic/player-row.module.scss';

export default function PlayerRow({ playersTeam }: { playersTeam: Player[] }) {
  const { heroList, playersProfiles, heroAbilities, items } = useAppSelector(
    (store) => store.statisticSlice
  );

  if (!heroList || !playersProfiles || !items) return;

  return (
    <>
      {playersTeam.map((player) => {
        //
        // Initialize helper class
        const uRowDetails = new PlayerRowDetailsUtility();

        // Find details about hero
        const heroDetails: HeroDetails = uRowDetails.findAppropriateHero(
          player,
          heroList,
          heroAbilities
        );

        // Find details about player
        const playerDetails: PlayerDetails = uRowDetails.findAppropriatePlayer(
          player,
          playersProfiles
        );

        // Find details about items
        const itemDetails: ItemDetails | null = uRowDetails.findAppropriateItems(player, items);

        return (
          <tr key={player.hero_id} className={styles.playerRow}>
            <td className={styles.playerRow__playerDataCell}>
              <div className={styles.playerRow__inCell}>
                <HeroAndNickname heroDetails={heroDetails} player={player} />
                <RankAndAvatar playerDetails={playerDetails} uRowDetails={uRowDetails} />
              </div>
            </td>
            <PlayerStatistic player={player} />
            <PlayerItems itemDetails={itemDetails} player={player} />
          </tr>
        );
      })}
    </>
  );
}
