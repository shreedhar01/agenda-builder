import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IAgendaItems {
    id: number | null,
    title: string | null,
    agenda_id: number | null,
    start_time: number | null,
    end_time: number | null
}

export interface AgendaState {
    agendaItem: IAgendaItems[];
}

const initialState: AgendaState = {
    agendaItem: []
}

export const agendaItemSlice = createSlice({
    name: 'agendaItem',
    initialState,
    reducers: {
        addAgendaItem: (state, action: PayloadAction<IAgendaItems>) => {
            if (!action.payload) {
                return
            }
            if (action.payload.id === null || action.payload.id === undefined) {
                return
            }

            const isAgendaExist = state.agendaItem
            .find(agenda=> agenda.id === action.payload.id)
            if (!isAgendaExist) {
                state.agendaItem.unshift(action.payload)
            }
        },
        removeAgendaItem: (state, action: PayloadAction<{ id: number }>) => {
            state.agendaItem = state.agendaItem.filter(agenda => agenda.id !== action.payload.id)
        }
    },
})


export const { addAgendaItem, removeAgendaItem } = agendaItemSlice.actions
export default agendaItemSlice.reducer