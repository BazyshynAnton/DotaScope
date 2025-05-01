import { Image, Link } from '@/shared/nextjs-imports';
import { useAppSelector } from '@/hooks/use-app-selector';
import { timeDuration } from '@/utils/common';
import { findLogoUrl } from '@/utils/matches-page';

import { GiTrophy } from 'react-icons/gi';

import styles from '@/styles/matches-table-content.module.scss';

export default function ProMatchesTableContent() {
  const { proMatches, teams } = useAppSelector(
    (store) => store.matchesPageSlice as MatchesPageSlice
  );

  return (
    <>
      {proMatches &&
        teams &&
        proMatches.map((match) => {
          const duration = timeDuration(match.duration);
          const radiantLogoUrl = findLogoUrl(match.radiant_team_id, teams);
          const direLogoUrl = findLogoUrl(match.dire_team_id, teams);

          return (
            <tr key={match.match_id} className={styles.table__bodyRow}>
              <td className={styles.table__bodyCell}>{match.league_name}</td>
              <td className={styles.table__bodyCell}>
                <Link href={`/matches/match?id=${match.match_id}`} className={styles.matchLink}>
                  {match.match_id}
                </Link>
              </td>
              <td className={styles.table__bodyCell}>{duration}</td>
              <td className={styles.table__bodyCell}>
                <TeamSection
                  teamLogoUrl={radiantLogoUrl}
                  teamName={match.radiant_name}
                  isTeamWin={match.radiant_win ? true : false}
                />
              </td>
              <td className={styles.table__bodyCell}>
                <TeamSection
                  teamLogoUrl={direLogoUrl}
                  teamName={match.dire_name}
                  isTeamWin={match.radiant_win ? false : true}
                />
              </td>
            </tr>
          );
        })}
    </>
  );
}

function TeamSection({
  teamLogoUrl,
  teamName,
  isTeamWin,
}: {
  teamLogoUrl: string;
  teamName: string;
  isTeamWin: boolean;
}) {
  return (
    <>
      <div className={styles.logoAndName}>
        <Image
          src={teamLogoUrl || '/pictures/dota-scope-icons/tbd.png'}
          alt={'Logo'}
          width={teamLogoUrl ? 32 : 19}
          height={19}
        />
        <p>{teamName || 'TBD'}</p>
        <Trophy isTeamWin={isTeamWin} />
      </div>
    </>
  );
}

function Trophy({ isTeamWin }: { isTeamWin: boolean }) {
  return <>{isTeamWin && <GiTrophy className={styles.trophy} />}</>;
}
