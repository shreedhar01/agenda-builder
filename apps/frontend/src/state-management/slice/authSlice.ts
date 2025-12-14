import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface authState {
  id: number | null,
  name: string | null
}

const initialState: authState = {
  id: null,
  name: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login:(state,action:PayloadAction<{id:number,name:string}>)=>{
        state.id = action.payload.id
        state.name = action.payload.name
    },
    logout:(state)=>{
        state.id = null
        state.name = null
    }
  },
})


export const { login, logout } = authSlice.actions
export default authSlice.reducer