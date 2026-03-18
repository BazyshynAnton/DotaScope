import CommonTable from '@/components/ui/CommonTable/CommonTable';
import RankAndAvatar from '@/features/matchPage/components/ui/MatchOverviewTable/RankAndAvatar';
import HeroAndNickname from '@/features/matchPage/components/ui/MatchOverviewTable/HeroAndNickname';
import PlayerStatistic from '@/features/matchPage/components/ui/MatchOverviewTable/PlayerStatistic';
import ItemSlots from '@/features/matchPage/components/ui/MatchOverviewTable/ItemSlots';
import { TableRow, TableCell, Box } from '@mui/material';
import { type MatchPageSlice, useMatchPageSelector } from '@/features/matchPage';

/**
 * React component
 *
 * Implementation of the match overview table
 *
 * @param isRadiant Bool value that indicates side
 * @returns {JSX.Element|null}
 */
export default function MatchOverviewTable({ isRadiant }: { isRadiant: boolean }) {
  const { matchPageData } = useMatchPageSelector<MatchPageSlice>((store) => store.matchPageSlice);

  const players = isRadiant
    ? matchPageData.playersByTeam?.radiant
    : matchPageData.playersByTeam?.dire;

  if (!players) {
    return null;
  }

  return (
    <CommonTable
      titles={[
        'PLAYER',
        'K/Hero kills',
        'D/Hero deaths',
        'A/Hero assists',
        'LH/Number of creeps killed by hero',
        'DN/Number of creeps denied by hero',
        'NET/Net worth',
        'GPM/Gold per minute',
        'XPM/Experience per minute',
        'HD/Damage dealt to heroes',
        'TD/Damage dealt to buildings',
        'HH/Health restored to heroes',
        'ITEMS & BUFFS/Items built and hero buffs',
      ]}
    >
      {players.map((player) => {
        return (
          <TableRow key={player.hero_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <HeroAndNickname player={player} />
                <RankAndAvatar player={player} />
              </Box>
            </TableCell>
            <PlayerStatistic player={player} />
            <ItemSlots player={player} />
          </TableRow>
        );
      })}
    </CommonTable>
  );
}
