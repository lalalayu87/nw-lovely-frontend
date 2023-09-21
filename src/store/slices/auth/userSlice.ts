import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    userId?: string
    userName?: string
    // email?: string
    authority?: string
}

const initialState: UserState = {
    userId: '',
    userName: '',
    // email: '',
    authority: '',
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.userId = action.payload?.userId
            state.userName = action.payload?.userName
            // state.userName = action.payload?.userName
            state.authority = 'admin'
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
