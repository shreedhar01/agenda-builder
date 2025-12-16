import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IAgenda {
    id: number | null,
    title: string | null,
    club_id:number | null,
    meeting_id: number | null
}

export interface AgendaState {
    agendas: IAgenda[];
}

const initialState: AgendaState = {
    agendas: []
}

export const agendaSlice = createSlice({
    name: 'agenda',
    initialState,
    reducers: {
        addAgenda: (state, action: PayloadAction<IAgenda>) => {
            if (!action.payload) {
                return
            }
            if (action.payload.id === null || action.payload.id === undefined) {
                return
            }

            const isAgendaExist = state.agendas.find(agenda=> agenda.id === action.payload.id)
            if (!isAgendaExist) {
                state.agendas.unshift(action.payload)
            }
        },
        removeAgenda: (state, action: PayloadAction<{ id: number }>) => {
            state.agendas = state.agendas.filter(agenda => agenda.id !== action.payload.id)
        }
    },
})


export const { addAgenda, removeAgenda } = agendaSlice.actions
export default agendaSlice.reducer