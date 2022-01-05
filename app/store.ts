import { configureStore } from '@reduxjs/toolkit'

import { postApi } from '~/app/services/postApi'

import darkThemeReducer from './services/darkThemeSlice'

const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    darkTheme: darkThemeReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
