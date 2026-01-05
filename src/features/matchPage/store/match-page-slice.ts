import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { filterPlayersByTeam } from '@/features/matchPage/utils/find-players-by-team';
import { type DotaConstants, type Match, type MatchPageSlice } from '@/features/matchPage/types';

const initialState: MatchPageSlice = {
  matchPageData: {
    match: null,
    playerProfiles: null,
    playersByTeam: null,
  },
  constants: null,

  error: null,
};

const matchPageSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setMatchPageData: (state: MatchPageSlice, action: PayloadAction<Match>) => {
      if (state.matchPageData.match?.match_id !== action.payload.match_id) {
        state.error = action.payload.patch < 55 ? 'Unsupported Dota 2 version' : null;

        if (state.error) {
          return;
        }

        state.matchPageData.match = action.payload;
        state.matchPageData.playersByTeam = filterPlayersByTeam(state.matchPageData.match);
      }
    },
    setDotaConstants: (state, action: PayloadAction<DotaConstants>) => {
      state.constants = action.payload;
    },
  },
});

export const { setMatchPageData, setDotaConstants } = matchPageSlice.actions;

export default matchPageSlice.reducer;
