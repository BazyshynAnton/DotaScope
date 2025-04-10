import { useAppSelector } from '@/hooks/use-app-selector';
import { timeAgo } from '@/utils/common';
import { MatchDetails } from '@/utils/match-details';
import { ReactTooltip } from '@/shared/react-imports';

import { IoMdDownload } from 'react-icons/io';
import { IoMdWarning } from 'react-icons/io';

import styles from '@/styles/match.module.scss';

export default function MatchHeader() {
  const { matchData, constants } = useAppSelector((store) => store.matchPageSlice);

  if (!matchData || !constants) {
    return;
  }

  const { match } = matchData;
  const { gameMode, leagues, region } = constants;

  const matchDetails = MatchDetails.getInstance();
  const matchMode = matchDetails.findGameMode(match, gameMode);
  const matchLeague = matchDetails.findLeague(match, leagues);
  const matchRegion = matchDetails.findRegion(match, region);
  const matchReplay = match.replay_url ? match.replay_url : '';

  // time
  const matchDuration = `${Math.floor(match.duration / 60)}:${(match.duration % 60).toString().padStart(2, '0')}`;
  const matchEndTime = match.start_time + match.duration;
  const currentTime = Math.floor(Date.now() / 1000);
  const timePast = currentTime - matchEndTime;

  return (
    <section className={styles.match__header}>
      <div className={styles.match__title}>
        {match.match_id && (
          <div className="">
            <p>Match ID: {match.match_id}</p>
            <button
              className={
                matchReplay ? styles.match__replayBtn_available : styles.match__replayBtn_warning
              }
            >
              {matchReplay ? (
                <>
                  <IoMdDownload />
                  <a href={matchReplay} target="_blank">
                    replay
                  </a>
                </>
              ) : (
                <>
                  <IoMdWarning />
                  <p data-tooltip-id="warning">replay</p>
                  <ReactTooltip
                    id="warning"
                    place="right"
                    content="Replay is not available"
                    style={{
                      textTransform: 'none',
                      fontWeight: 'bold',
                      color: '#ffab40',
                      background: '#533814',
                    }}
                  />
                </>
              )}
            </button>
          </div>
        )}
      </div>
      <div className={styles.match__info}>
        <>
          {Object.entries({ matchMode, matchLeague, matchRegion, matchDuration, timePast }).map(
            (el) => {
              <div className="">
                <p>{el[0] !== 'timePast' ? el[1] : timeAgo(el[1] as number)}</p>
                <span></span>
              </div>;
            }
          )}
        </>
        {/* {mode && (
          <div>
            <p>{mode}</p>
            <span>game mode</span>
          </div>
        )}
        {league && (
          <div>
            <p>{league}</p>
            <span>league</span>
          </div>
        )}
        {reg && (
          <div>
            <p>{reg}</p>
            <span>region</span>
          </div>
        )}
        {duration && (
          <div>
            <p>{duration}</p>
            <span>duration</span>
          </div>
        )}
        {diffInSeconds && (
          <div>
            <p>{timeAgo(diffInSeconds)}</p>
            <span>match ended</span>
          </div>
        )} */}
      </div>
    </section>
  );
}
