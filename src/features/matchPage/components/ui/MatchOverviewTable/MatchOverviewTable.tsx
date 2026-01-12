import CommonTable from '@/components/ui/CommonTable/CommonTable';
import HeroAndNickname from '@/features/matchPage/components/ui/MatchOverviewTable/HeroAndNickname';
import { type MatchPageSlice, useMatchPageSelector } from '@/features/matchPage';
import { TableRow } from '@mui/material';

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
        'ITEMS/Items built',
      ]}
    >
      {players.map((player) => {
        return (
          <TableRow key={player.account_id}>
            <HeroAndNickname player={player} />
          </TableRow>
        );
      })}
    </CommonTable>
  );
}
