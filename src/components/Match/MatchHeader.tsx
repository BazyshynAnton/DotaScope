import { useAppSelector } from '@/hooks/use-app-selector';
import { ReactTooltip } from '@/shared/react-imports';
import { timeAgo } from '@/utils/common';
import { MatchOverview } from '@/utils/match-overview';

import { IoMdDownload } from 'react-icons/io';
import { IoMdWarning } from 'react-icons/io';

import styles from '@/styles/match-header.module.scss';

export default function MatchHeader() {
  const { matchData, constants } = useAppSelector(
    (store) => store.matchPageSlice as MatchPageSlice
  );

  if (!matchData || !constants) {
    return;
  }

  const { match } = matchData;
  const { gameMode, leagues, region } = constants;

  const matchDetails = MatchOverview.getInstance();
  const matchMode = matchDetails.findGameMode(match, gameMode);
  const matchLeague = matchDetails.findLeague(match, leagues);
  const matchRegion = matchDetails.findRegion(match, region);
  const matchReplay = match.replay_url ? match.replay_url : '';

  // time
  const matchDuration = `${Math.floor(match.duration / 60)}:${(match.duration % 60).toString().padStart(2, '0')}`;
  const matchEndTime = match.start_time + match.duration;
  const currentTime = Math.floor(Date.now() / 1000);
  const timePastInSeconds = currentTime - matchEndTime;
  const timePast = timeAgo(timePastInSeconds);

  return (
    <section className={styles.match__header}>
      <div className={styles.match__title}>
        {match.match_id && (
          <div className={styles.match__idAndReplay}>
            <p className={styles.matchId}>Match ID: {match.match_id}</p>
            <MatchReplayButton matchReplay={matchReplay} />
          </div>
        )}
      </div>
      <div className={styles.match__info}>
        {[
          [matchMode, 'GAME MODE'],
          [matchLeague, 'LEAGUE'],
          [matchRegion, 'REGION'],
          [matchDuration, 'DURATION'],
          [timePast, 'MATCH ENDED'],
        ].map(
          ([data, section]) =>
            data && (
              <div key={section} className={styles.details}>
                <p className={styles.details__data}>{data}</p>
                <span className={styles.details__section}>{section}</span>
              </div>
            )
        )}
      </div>
    </section>
  );
}

function MatchReplayButton({ matchReplay }: { matchReplay: string }) {
  return (
    <button
      data-tooltip-id={!matchReplay ? 'warning' : ''}
      className={`${styles.replay} ${matchReplay ? styles.replay_available : styles.replay_warning}`}
    >
      {matchReplay ? (
        <>
          <IoMdDownload className={styles.replay__download} />
          <a href={matchReplay} target="_blank" className={styles.replay__link}>
            replay
          </a>
        </>
      ) : (
        <>
          <IoMdWarning className={styles.replay__download} />
          <p className={styles.replay__link}>replay</p>
          <ReactTooltip
            id="warning"
            place="right"
            content="Replay is not available"
            className={styles.replay__tooltip}
          />
        </>
      )}
    </button>
  );
}
