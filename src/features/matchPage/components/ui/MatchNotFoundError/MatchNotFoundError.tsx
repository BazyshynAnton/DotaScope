import MatchSearch from '@/components/ui/MatchSearch/MatchSearch';
import { Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { pxToRem } from '@/utils/px-to-rem';

/**
 * React component
 *
 * Implementation of the match not found error
 *
 * @returns {JSX.Element}
 */
export default function MatchNotFoundError() {
  const theme = useTheme();

  return (
    <>
      <MatchSearch />
      <Typography
        variant="Body/Medium/MD15"
        sx={{
          marginTop: pxToRem(50),
          display: 'flex',
          gap: pxToRem(5),
          alignItems: 'flex-end',
          justifyContent: 'center',
          color: theme.palette.text1,
        }}
      >
        Match not found.
        <Image src="/images/enigma-error.gif" alt="" width={20} height={20} />
      </Typography>
    </>
  );
}
