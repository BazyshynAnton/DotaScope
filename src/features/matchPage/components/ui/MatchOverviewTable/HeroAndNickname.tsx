// import { Box } from '@mui/material';
import { type MatchPageSlice, Player } from '@/features/matchPage/types';
import { findPlayerHero } from '@/features/matchPage/utils/find-player-hero';
import { useMatchPageSelector } from '@/features/matchPage';

export default function HeroAndNickname({ player }: { player: Player }) {
  const { constants } = useMatchPageSelector<MatchPageSlice>((store) => store.matchPageSlice);

  if (!constants) {
    return null;
  }

  const playerHero = findPlayerHero(player, constants.heroes, constants.heroAbilities);
  console.log(playerHero);

  return null;
  // <Box>
  //   <Box>
  //     <Box
  //       sx={{
  //         borderRight: `3px solid ${playerHero.playerColor}`,
  //       }}
  //     >
  //       <Image
  //         src={`${process.env.NEXT_PUBLIC_HERO_ICON_URL}${playerHero.name}.png`}
  //         alt={playerHero.localizedName}
  //         width={54}
  //         height={30}
  //       />
  //       {player.leaver_status !== 0 && (
  //         <Image
  //           src={process.env.NEXT_PUBLIC_DISCONNECT_ICON_URL as string}
  //           alt="Disconnect"
  //           width={51}
  //           height={14.9}
  //           style={{ position: 'absolute', top: 0, left: 0 }}
  //         />
  //       )}
  //     </Box>
  //     <Box>{player.level}</Box>
  //     <HeroFacet playerHero={playerHero} />
  //   </Box>
  //   <Box>
  //     <Box>{player.personaname ? 'Player' : 'Anonymous'}</Box>
  //   </Box>
  // </Box>
}
