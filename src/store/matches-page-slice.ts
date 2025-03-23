import { createSlice } from '@/shared/redux-imports';

import type { MatchesPageSlice } from '@/types/matches-page';

const initialState: MatchesPageSlice = {
  proMatches: null,
  teams: null,

  error: null,
};

export const matchesPageSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    setMatchesPageData: (state, action) => {
      if (typeof action.payload !== 'string') {
        state.proMatches = action.payload.proMatches;
        state.teams = action.payload.teams;
      } else {
        state.error = action.payload;
      }
    },
  },
});

export const { setMatchesPageData } = matchesPageSlice.actions;

export default matchesPageSlice.reducer;
