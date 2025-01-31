import { createSlice } from '@/shared/reduxImports'

import type { InitialMetaState } from '@/types/redux/metaSlice'

const initialState: InitialMetaState = {
  metaData: null,

  error: null,
}

export const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setMetaData: (state, action) => {
      if (typeof action.payload !== 'string') {
        state.metaData = action.payload
        console.log(state.metaData)
      } else {
        state.error = action.payload
      }
    },
  },
})

export const { setMetaData } = metaSlice.actions

export default metaSlice.reducer
