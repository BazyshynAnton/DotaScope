'use client';

import { Box, Typography, useTheme } from '@mui/material';
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
import { timeAgo } from '@/utils/timeAgo';
import type { MatchPageSlice } from '@/features/matchPage/types';
import { CommonButton } from '@/styles/common';
import NextLink from '@/components/ui/NextLink/NextLink';

export default function MatchHeader() {
  const { matchData, constants } = useMatchPageSelector<MatchPageSlice>( // Maybe make it global hook
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
    <MatchHeaderContainer>
      <Box>
        {match.match_id && (
          <MatchIdAndReplayContainer>
            <Typography variant="Body/Medium/MD15">Match ID: {match.match_id}</Typography>
            <MatchReplayButton matchReplay={matchReplay} />
          </MatchIdAndReplayContainer>
        )}
      </Box>
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
                <Typography variant="Body/Medium/MD15">{section}</Typography>
              </MatchDetailsContainer>
            )
        )}
      </MatchInfoContainer>
    </MatchHeaderContainer>
  );
}

function MatchReplayButton({ matchReplay }: { matchReplay: string }) {
  const theme = useTheme();

  return (
    <CommonButton
      variant="outlined"
      disabled={!matchReplay}
      sx={{
        padding: '2px 4px',
        width: 'min-content',
        '&:hover': {
          a: {
            color: theme.palette.text1,
          },
        },
      }}
    >
      {matchReplay ? (
        <NextLink
          href={matchReplay}
          target="_blank"
          variant="Body/Medium/MD15"
          sx={{ textDecoration: 'none' }}
        >
          REPLAY
        </NextLink>
      ) : (
        <Typography variant="Body/Medium/MD15">REPLAY</Typography>
      )}
    </CommonButton>
  );
}
