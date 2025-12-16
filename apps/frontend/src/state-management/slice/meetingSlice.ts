import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IMeeting {
    id: number | null,
    theme: string | null,
    meeting_title: string | null,
    club_id: number | null,
    start_time: number | null,
    end_time: number | null
}

export interface AgendaState {
    meetings: IMeeting[];
}

const initialState: AgendaState = {
    meetings: []
}

export const meetingsSlice = createSlice({
    name: 'meetings',
    initialState,
    reducers: {
        addMeeting: (state, action: PayloadAction<IMeeting>) => {
            if (!action.payload) {
                return
            }
            if (action.payload.id === null || action.payload.id === undefined) {
                return
            }

            const isMeetingExist = state.meetings.find(meeting=> meeting.id === action.payload.id)
            if (!isMeetingExist) {
                state.meetings.unshift(action.payload)
            }
        },
        removeMeeting: (state, action: PayloadAction<{ id: number }>) => {
            state.meetings = state.meetings.filter(agenda => agenda.id !== action.payload.id)
        }
    },
})


export const { addMeeting, removeMeeting } = meetingsSlice.actions
export default meetingsSlice.reducer