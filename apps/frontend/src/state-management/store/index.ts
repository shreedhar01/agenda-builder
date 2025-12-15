import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice'
import clubReducer from "../slice/clubSlice"
import agendaReducer from "../slice/agendaSlice"
import agendsItemReducer from "../slice/agendaItemSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clubs: clubReducer,
    agendas: agendaReducer,
    agendaItem: agendsItemReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch