import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { useState } from 'react'

export type UserState = {
    userSeq: string
    userId?: string
    userName?: string
    userRole: string
    info: {
        roleSeq?: string
        userSeq?: string
    }
    accessToken?: string
}

const initialState: UserState = {
    userSeq: '',
    userId: '',
    userName: '',
    userRole: '',
    info: {
        roleSeq: '',
        userSeq: '',
    },
    accessToken: ''
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.userSeq = action.payload?.userSeq
            state.userId = action.payload?.userId
            state.userName = action.payload?.userName
            state.userRole = action.payload.userRole
            state.accessToken = action.payload?.accessToken
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
