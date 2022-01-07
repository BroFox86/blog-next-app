import { configureStore } from '@reduxjs/toolkit'

import { postApi } from '~/app/services/postApi'

import appReducer from './services/appSlice'

const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
