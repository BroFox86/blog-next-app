import { createSlice } from "@reduxjs/toolkit"

const initialState = false

const darkThemeSlice = createSlice({
  name: "darkTheme",
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      return state = action.payload ? true : false 
    }
  },
})

export const { setDarkTheme } = darkThemeSlice.actions

export default darkThemeSlice.reducer
