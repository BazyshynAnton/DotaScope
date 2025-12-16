import NextLink from '@/components/ui/NextLink/NextLink';
import { Typography, useTheme } from '@mui/material';
import { CommonButton } from '@/styles/common';
import { pxToRem } from '@/utils/px-to-rem';

/**
 * React component
 *
 * Implementation of the download replay button
 *
 * @returns {JSX.Element}
 */
export default function MatchReplayButton({ matchReplay }: { matchReplay: string }) {
  const theme = useTheme();

  return (
    <CommonButton
      variant="outlined"
      disabled={!matchReplay}
      sx={{
        padding: `${pxToRem(6)} ${pxToRem(4)}`,
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
