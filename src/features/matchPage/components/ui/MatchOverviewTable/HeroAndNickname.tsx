import Image from 'next/image';
import { Box, useTheme } from '@mui/material';
import { findPlayerHero } from '@/features/matchPage/utils/find-player-hero';
import { useMatchPageSelector } from '@/features/matchPage';
import { envHelper } from '@/utils/env-helper';
import { pxToRem } from '@/utils/px-to-rem';
import type { MatchPageSlice, Player } from '@/features/matchPage/types';

/**
 * React component
 *
 * Implementation of the hero and nickname component
 *
 * @param player Player
 * @returns {JSX.Element|null}
 */
export default function HeroAndNickname({ player }: { player: Player }) {
  const theme = useTheme();
  const { constants } = useMatchPageSelector<MatchPageSlice>((store) => store.matchPageSlice);

  if (!constants) {
    return null;
  }

  const playerHero = findPlayerHero(player, constants.heroes, constants.heroAbilities);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: pxToRem(10) }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'relative',
            width: 'min-content',
            height: '30px',
            borderRight: `3px solid ${playerHero.playerColor}`,
          }}
        >
          <Image
            src={`${envHelper(process.env.NEXT_PUBLIC_HERO_ICON_URL)}${playerHero.name}.png`}
            alt={playerHero.localizedName}
            width={54}
            height={30}
          />
          {player.leaver_status !== 0 && (
            <Image
              src={envHelper(process.env.NEXT_PUBLIC_DISCONNECT_ICON_URL)}
              alt="Disconnect"
              width={51}
              height={14.9}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: pxToRem(15),
            height: pxToRem(15),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: pxToRem(10),
            color: 'hsla(0, 0%, 100%, .871)',
            backgroundColor: 'rgba(0, 0, 0, .745)',
            cursor: 'default',
          }}
        >
          {player.level}
        </Box>
        {/*<HeroFacet playerHero={playerHero} />*/}
      </Box>
      <Box sx={{ color: theme.palette.text1 }}>
        <Box>
          {player.name ? player.name : player.personaname ? player.personaname : 'Anonymous'}
        </Box>
      </Box>
    </Box>
  );
}
