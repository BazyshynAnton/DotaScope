import { Box, useTheme } from '@mui/material';
import { pxToRem } from '@/utils/px-to-rem';
import MatchSearch from '@/components/ui/MatchSearch/MatchSearch';

/**
 * React component
 *
 * Implementation of the introduction to the application
 * @returns {JSX.Element}
 */
export default function Introduction() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingTop: `${pxToRem(50)}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.text1,
      }}
    >
      <MatchSearch />
    </Box>
  );
}
