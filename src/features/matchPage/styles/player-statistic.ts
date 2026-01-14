import { TableCell, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PlayerStatisticTableCell = styled(TableCell)(() => ({
  position: 'relative',
}));

export const PlayerStatisticBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text2,

  ...theme.typography['Body/Medium/MD12'],
}));
