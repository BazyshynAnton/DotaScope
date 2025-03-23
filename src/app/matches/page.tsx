import Matches from '@/components/Matches/Matches';

import { fetchMatchesPageData } from '@/utils/matches-page';

export default async function MatchesPage() {
  const matchesPageData = await fetchMatchesPageData();

  return <Matches matchesPageData={matchesPageData} />;
}
