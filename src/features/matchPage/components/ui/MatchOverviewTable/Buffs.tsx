import Image from 'next/image';

import { Box, Typography } from '@mui/material';

import type { MatchPageSlice, Player } from '@/features/matchPage/types';
import { findBuffs } from '@/features/matchPage/utils/find-buffs';
import { useMatchPageSelector } from '@/features/matchPage';
import { envHelper } from '@/utils/env-helper';
import { BuffsContainer } from '@/features/matchPage/styles/buffs';
import { pxToRem } from '@/utils/px-to-rem';

export default function Buffs({ player }: { player: Player }) {
  const { constants } = useMatchPageSelector<MatchPageSlice>((store) => store.matchPageSlice);

  if (!player.permanent_buffs.length || !constants) {
    return null;
  }

  const buffs = findBuffs(player.permanent_buffs, constants.permanentBuffs);

  return (
    <BuffsContainer>
      <Typography variant="Body/Medium/MD12">Buffs:</Typography>
      <Box sx={{ display: 'flex', gap: pxToRem(3) }}>
        {buffs.map((buff) => {
          let imgSrc = '';

          switch (buff.name) {
            case 'moon_shard':
            case 'ultimate_scepter':
            case 'aghanims_shard':
            case 'tome_of_knowledge': {
              imgSrc = `${envHelper(process.env.NEXT_PUBLIC_ITEM_ICON_URL)}/${buff.name}.png`;
              break;
            }
            default:
              imgSrc = `${envHelper(process.env.NEXT_PUBLIC_HERO_ABILITY_ICON_URL)}/${buff.name}.png`;
          }

          return (
            <Box key={buff.name}>
              <Image
                src={imgSrc}
                alt={buff.name}
                width={27}
                height={20}
                style={{
                  width: '100%',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              {buff.stackCount !== 0 && (
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
                  {buff.stackCount}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </BuffsContainer>
  );
}
