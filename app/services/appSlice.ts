import { createSlice } from '@reduxjs/toolkit'

type State = {
  darkTheme: boolean
  deletionAlert: {
    isActive: boolean
    title: string
  }
}

const initialState = {
  darkTheme: false,
  deletionAlert: {
    isActive: false,
    title: '',
  },
} as State

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      state.darkTheme = action.payload ? true : false
    },
    setDeletionAlert: (state, action) => {
      state.deletionAlert = action.payload
    },
  },
})

export const { setDarkTheme, setDeletionAlert } = appSlice.actions

export default appSlice.reducer
