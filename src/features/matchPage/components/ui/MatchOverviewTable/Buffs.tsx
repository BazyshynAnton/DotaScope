import Image from 'next/image';

import { Box, Typography } from '@mui/material';
import { findBuffs } from '@/features/matchPage/utils/find-buffs';
import { useMatchPageSelector } from '@/features/matchPage';
import { envHelper } from '@/utils/env-helper';
import { pxToRem } from '@/utils/px-to-rem';
import { BuffsContainer } from '@/features/matchPage/styles/buffs';

import type { MatchPageSlice, Player } from '@/features/matchPage/types';

/**
 * React component
 *
 * Implementation of player permanent buffs
 *
 * @param player Player
 * @returns {JSX.Element|null}
 */
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
          let buffImgSrc = '';

          switch (buff.name) {
            case 'moon_shard':
            case 'ultimate_scepter':
            case 'aghanims_shard':
            case 'tome_of_knowledge': {
              buffImgSrc = `${envHelper(process.env.NEXT_PUBLIC_ITEM_ICON_URL)}/${buff.name}.png`;
              break;
            }
            default:
              buffImgSrc = `${envHelper(process.env.NEXT_PUBLIC_HERO_ABILITY_ICON_URL)}/${buff.name}.png`;
          }

          return (
            <Box
              key={buff.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: pxToRem(3),
                color: 'hsla(0, 0%, 100%, .871)',
                backgroundColor: 'rgba(0, 0, 0, .745)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Image
                src={buffImgSrc}
                alt={buff.name}
                width={27}
                height={20}
                style={{
                  width: '100%',
                }}
              />
              {buff.stackCount !== 0 && (
                <Typography
                  variant="Body/Medium/MD12"
                  component={'p'}
                  sx={{ paddingRight: pxToRem(3) }}
                >
                  {buff.stackCount}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </BuffsContainer>
  );
}
