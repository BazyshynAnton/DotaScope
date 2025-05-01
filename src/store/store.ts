import matchesPageSlice from './matches-page-slice';
import matchPageSlice from './match-page-slice';

import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: { matchesPageSlice, matchPageSlice },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({ serializableCheck: false }),
  });
};
