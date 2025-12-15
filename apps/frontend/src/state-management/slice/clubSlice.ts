import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Club {
    id: number | null,
    name: string | null
}

export interface ClubsState {
    clubs: Club[];
}

const initialState: ClubsState = {
    clubs: []
}

export const clubSlice = createSlice({
    name: 'club',
    initialState,
    reducers: {
        joinClub: (state, action: PayloadAction<Club>) => {
            if (!action.payload) {
                return
            }
            if (action.payload.id === null || action.payload.id === undefined) {
                return
            }

            const isClubExist = state.clubs.find(club => club.id === action.payload.id)
            if (!isClubExist) {
                state.clubs.push(action.payload)
            }
        },
        leaveClub: (state, action: PayloadAction<{ id: number }>) => {
            state.clubs = state.clubs.filter(club => club.id !== action.payload.id)
        }
    },
})


export const { joinClub, leaveClub } = clubSlice.actions
export default clubSlice.reducer