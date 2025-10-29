import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { pxToRem } from '@/utils/px-to-rem';
import { Input } from '@/styles/common';

export default function MatchSearch() {
  const { register } = useForm();

  return (
    <Box component="form" sx={{ paddingTop: pxToRem(15) }}>
      <Input
        id="matchID"
        label="Search Dota 2 match by ID"
        variant="filled"
        {...register('matchID')}
      />
      {/*<Button variant="outlined">Search</Button>*/}
    </Box>
  );
}
