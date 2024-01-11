import { configureStore } from '@reduxjs/toolkit'

import { postApi } from '~/services/post-api'

const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postApi.middleware),
})

export default store
