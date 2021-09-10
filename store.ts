import { configureStore } from "@reduxjs/toolkit"
import postsReducer from "./components/posts/postsSlice"
import darkThemeReducer from "./components/header/darkThemeSlice"
// import { loadState, saveState } from "./utilities/localStorage"

// const persistedState = loadState()

const store = configureStore({
  reducer: {
    posts: postsReducer,
    darkTheme: darkThemeReducer,
  },
  // preloadedState: persistedState,
})

// store.subscribe(() => {
//   saveState({
//     darkTheme: store.getState().darkTheme
//   })
// })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
