import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import clubReducer from "../slice/clubSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer,
    club:clubReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch