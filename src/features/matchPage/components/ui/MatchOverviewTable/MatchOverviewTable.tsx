import CommonTable from '@/components/ui/CommonTable/CommonTable';

export default function MatchOverviewTable() {
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
    ></CommonTable>
  );
}
