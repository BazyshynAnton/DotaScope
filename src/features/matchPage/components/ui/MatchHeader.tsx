// import { Box } from '@mui/material';
import { useMatchPageSelector } from '@/features/matchPage/hooks/useMatchPageSelector';
import { findGameMode } from '@/features/matchPage/utils/find-game-mode';
import { findLeague } from '@/features/matchPage/utils/find-league';
import { findRegion } from '@/features/matchPage/utils/find-region';
import { timeAgo } from '@/utils/timeAgo';
import type { MatchPageSlice } from '@/features/matchPage/types';

export default function MatchHeader() {
  const { matchData, constants } = useMatchPageSelector<MatchPageSlice>(
    (store) => store.matchPageSlice
  );

  // NOTE: At this point they cannot be null
  // this handles in the higher level component "MatchPageContent.tsx"
  if (!matchData.match || !constants) {
    return null;
  }

  const { match } = matchData;
  const { gameMode, leagues, region } = constants;

  const matchMode = findGameMode(match, gameMode);
  const matchLeague = findLeague(match, leagues);
  const matchRegion = findRegion(match, region);
  const matchReplay = match.replay_url ? match.replay_url : '';

  // time
  const matchDuration = `${Math.floor(match.duration / 60)}:${(match.duration % 60).toString().padStart(2, '0')}`;
  const matchEndTime = match.start_time + match.duration;
  const currentTime = Math.floor(Date.now() / 1000);
  const timePastInSeconds = currentTime - matchEndTime;
  const timePast = timeAgo(timePastInSeconds);

  return (
    <section>
      <div>
        {match.match_id && (
          <div>
            <p>Match ID: {match.match_id}</p>
            <MatchReplayButton matchReplay={matchReplay} />
          </div>
        )}
      </div>
      <div>
        {[
          [matchMode, 'GAME MODE'],
          [matchLeague, 'LEAGUE'],
          [matchRegion, 'REGION'],
          [matchDuration, 'DURATION'],
          [timePast, 'MATCH ENDED'],
        ].map(
          ([data, section]) =>
            data && (
              <div key={section}>
                <p>{data}</p>
                <span>{section}</span>
              </div>
            )
        )}
      </div>
    </section>
  );
}

function MatchReplayButton({ matchReplay }: { matchReplay: string }) {
  return (
    <button data-tooltip-id={!matchReplay ? 'warning' : ''}>
      {matchReplay ? (
        <>
          {/*<IoMdDownload className={styles.replay__download} />*/}
          <a href={matchReplay} target="_blank">
            replay
          </a>
        </>
      ) : (
        <>
          {/*<IoMdWarning className={styles.replay__download} />*/}
          <p>replay</p>
          {/*<ReactTooltip*/}
          {/*  id="warning"*/}
          {/*  place="right"*/}
          {/*  content="Replay is not available"*/}
          {/*  className={styles.replay__tooltip}*/}
          {/*/>*/}
        </>
      )}
    </button>
  );
}
