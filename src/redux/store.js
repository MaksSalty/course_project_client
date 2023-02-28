import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import collectSlice from './collectSlice'
import commentSlice from './commentSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    collect: collectSlice,
    comment: commentSlice,
  },
})
