import { Box, Typography } from '@mui/material';
import { pxToRem } from '@/utils/px-to-rem';
import { CommonInput, CommonButton } from '@/styles/common';
import { useState } from 'react';
import { matchSearchInputSchema } from '@/schemas/match-search-input-schema';
import Image from 'next/image';

/**
 * React component
 *
 * Implementation of the match search input
 *
 * @returns {JSX.Element}
 */
export default function MatchSearch() {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    const result = matchSearchInputSchema.safeParse(value);

    setInputError(!result.success && value ? result.error.issues[0].message : '');
    setInputValue(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        gap: pxToRem(15),
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: pxToRem(15),
      }}
    >
      <Typography variant="Body/Medium/MD17">Search Dota 2 match by ID</Typography>
      <CommonInput
        id="matchID"
        label="Match ID"
        value={inputValue}
        type="text"
        variant="filled"
        error={Boolean(inputError)}
        helperText={inputError}
        onChange={handleInputValueChange}
      />
      {inputValue && !inputError && (
        <CommonButton variant="outlined" sx={{ display: 'inline-flex', gap: pxToRem(5) }}>
          Search
          <Image src="/images/gem-search.gif" alt="" width={20} height={20} />
        </CommonButton>
      )}
    </Box>
  );
}
