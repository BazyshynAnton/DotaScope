import { Image } from '@/shared/nextjs-imports';

import styles from '@/styles/match-overview-table-content.module.scss';

export default function HeroIcon({
  player,
  playerHero,
}: {
  player: Player;
  playerHero: PlayerHero;
}) {
  return (
    <div
      className={styles.heroIcon}
      style={{
        borderRight: `3px solid ${playerHero.playerColor}`,
      }}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_HERO_ICON_URL}${playerHero.name}.png`}
        alt={playerHero.localizedName}
        width={54}
        height={30}
      />
      {player.leaver_status !== 0 && (
        <Image
          src={process.env.NEXT_PUBLIC_DISCONNECT_ICON_URL as string}
          alt="Disconnect"
          width={51}
          height={14.9}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
    </div>
  );
}
