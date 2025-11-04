import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { filterPlayersByTeam } from '@/features/matchPage/utils/find-players-by-team';
import { type Match, type MatchPageSlice } from '@/features/matchPage/types';

const initialState: MatchPageSlice = {
  matchData: {
    match: null,
    playerProfiles: null,
  },
  constants: null,

  error: null,
};

const matchPageSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setMatchPageData: (state: MatchPageSlice, action: PayloadAction<Match>) => {
      if (state.matchData.match?.match_id !== action.payload.match_id) {
        state.error = action.payload.patch < 55 ? 'Unsupported Dota 2 version' : null;

        if (state.error) {
          return;
        }

        state.matchData.match = action.payload;
        state.matchData.playersByTeam = filterPlayersByTeam(state.matchData.match);
      }
    },
    // setDotaConstants: (state, action) => {
    //   if (typeof action.payload !== 'string') {
    //     state.constants = action.payload;
    //   } else {
    //     state.error = action.payload;
    //   }
    // },
  },
});

export const { setMatchPageData } = matchPageSlice.actions;

export default matchPageSlice.reducer;
