import { Image, Link } from '@/shared/nextjs-imports';
import { useAppSelector } from '@/hooks/use-app-selector';
import { timeDuration } from '@/utils/common';
import { findLogoUrl } from '@/utils/matches-page';

import { GiTrophy } from 'react-icons/gi';

import styles from '@/styles/matches-table-content.module.scss';

export function MatchesPageTableContent() {
  const { proMatches, teams } = useAppSelector((store) => store.matchesPageSlice);

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
                <div className={styles.logoAndName}>
                  <Image
                    src={radiantLogoUrl || '/pictures/dota-scope-icons/tbd.png'}
                    alt="Logo"
                    width={radiantLogoUrl ? 32 : 19}
                    height={19}
                  />
                  {match.radiant_name || 'TBD'}
                  <GiTrophy className={styles.trophy} />
                </div>
                <div className={styles.radiantDraft}></div>
              </td>
              <td className={styles.table__bodyCell}>
                <div className={styles.logoAndName}>
                  <Image
                    src={direLogoUrl || '/pictures/dota-scope-icons/tbd.png'}
                    alt="Logo"
                    width={direLogoUrl ? 32 : 19}
                    height={19}
                  />
                  {match.dire_name || 'TBD'}
                </div>
                <div className={styles.direDraft}></div>
              </td>
            </tr>
          );
        })}
    </>
  );
}
