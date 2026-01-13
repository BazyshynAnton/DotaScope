import Image from 'next/image';
import { Box } from '@mui/material';
import { useMatchPageSelector } from '@/features/matchPage';
import { findPlayerDetails } from '@/features/matchPage/utils/find-player-details';
import { pxToRem } from '@/utils/px-to-rem';
import type { MatchPageSlice, Player } from '@/features/matchPage/types';

export default function RankAndAvatar({ player }: { player: Player }) {
  const { playerProfiles } = useMatchPageSelector<MatchPageSlice>((store) => store.matchPageSlice);

  const { profileInfo, leaderboardRank } = findPlayerDetails(player, playerProfiles);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: pxToRem(8),
        zIndex: '2',
      }}
    >
      <Box sx={{ position: 'relative', width: '40px', height: '40px' }}>
        <Image src={profileInfo.rankIcon} alt={'Rank'} width={40} height={40} />
        {leaderboardRank && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,.412)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
            }}
          >
            {leaderboardRank}
          </Box>
        )}
      </Box>
      <Box sx={{ width: '24px', height: '24px' }}>
        <Image src={profileInfo.avatar} alt={'Avatar'} width={24} height={24} />
      </Box>
    </Box>
  );
}
