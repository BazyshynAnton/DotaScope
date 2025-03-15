import Abilities from './Abilities';

import { Player } from '@/types/statistic/match-data';
import { PlayerRowDetailsUtility } from '@/utils/statistic/player-row-details-utility';
import { useAppSelector } from '@/shared/redux-imports';
import { Image } from '@/shared/nextjs-imports';

import styles from '@/styles/statistic/table-abilities.module.scss';

export default function Hero({ playersTeam }: { playersTeam: Player[] }) {
  const { heroList, playersProfiles, heroAbilities } = useAppSelector(
    (store) => store.statisticSlice
  );

  if (!heroList || !playersProfiles) return;

  const uRowDetails = new PlayerRowDetailsUtility();

  return (
    <>
      {playersTeam.map((player) => {
        const heroDetails = uRowDetails.findAppropriateHero(player, heroList, heroAbilities);

        return (
          <tr key={player.hero_id} className={styles.tableBodyRow}>
            <td>
              <div className={styles.heroDataCell}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_HERO_ICON_URL}${heroDetails.name}.png`}
                  alt={heroDetails.localizedName}
                  width={51}
                  height={30}
                />
              </div>
            </td>
            <Abilities player={player} />
          </tr>
        );
      })}
    </>
  );
}
