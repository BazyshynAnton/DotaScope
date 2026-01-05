'use client';

import MatchReplayButton from '@/features/matchPage/components/ui/MatchHeader/MatchReplayButton';
import { Typography } from '@mui/material';
import {
  MatchHeaderContainer,
  MatchIdAndReplayContainer,
  MatchInfoContainer,
  MatchDetailsContainer,
} from '@/features/matchPage/styles/match-header';
import { useMatchPageSelector } from '@/features/matchPage/hooks/useMatchPageSelector';
import { findGameMode } from '@/features/matchPage/utils/find-game-mode';
import { findLeague } from '@/features/matchPage/utils/find-league';
import { findRegion } from '@/features/matchPage/utils/find-region';
import { timeAgo } from '@/utils/time-ago';
import { pxToRem } from '@/utils/px-to-rem';
import type { MatchPageSlice } from '@/features/matchPage/types';

/**
 * React component
 *
 * Implementation of the match header
 *
 * @returns {JSX.Element|null}
 */
export default function MatchHeader() {
  const { matchPageData, constants } = useMatchPageSelector<MatchPageSlice>( // TODO: Maybe make it global hook
    (store) => store.matchPageSlice
  );

  // NOTE: At this point they cannot be null
  // this handles in the higher level component "MatchPageContent.tsx"
  if (!matchPageData.match || !constants) {
    return null;
  }

  const { match } = matchPageData;
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
    <MatchHeaderContainer>
      {match.match_id && (
        <MatchIdAndReplayContainer>
          <Typography variant="Body/Medium/MD15">Match ID: {match.match_id}</Typography>
          <MatchReplayButton matchReplay={matchReplay} />
        </MatchIdAndReplayContainer>
      )}
      <MatchInfoContainer>
        {[
          [matchMode, 'GAME MODE'],
          [matchLeague, 'LEAGUE'],
          [matchRegion, 'REGION'],
          [matchDuration, 'DURATION'],
          [timePast, 'MATCH ENDED'],
        ].map(
          ([data, section]) =>
            data && (
              <MatchDetailsContainer key={section}>
                <Typography variant="Body/Medium/MD15">{data}</Typography>
                <Typography
                  variant="Body/Medium/MD15"
                  sx={{ padding: `${pxToRem(6)} ${pxToRem(0)}` }}
                >
                  {section}
                </Typography>
              </MatchDetailsContainer>
            )
        )}
      </MatchInfoContainer>
    </MatchHeaderContainer>
  );
}
