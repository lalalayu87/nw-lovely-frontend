import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    // avatar?: string
    // userName?: string
    // email?: string
    // authority?: string
    userId: string
    userName: string
    userRole: {
        roleSeq: string
        roleName: string
    }
}

const initialState: UserState = {
    // avatar: '',
    // userName: '',
    // email: '',
    // authority: '',
    userId: '',
    userName: '',
    userRole: {
        roleSeq: '',
        roleName: '',
    },
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            // state.avatar = action.payload?.avatar
            // state.email = action.payload?.email
            // state.userName = action.payload?.userName
            // state.authority = action.payload?.authority
            state.userId = action.payload?.userId
            state.userName = action.payload?.userName
            state.userRole.roleSeq = action.payload?.userRole.roleSeq
            state.userRole.roleName = action.payload?.userRole.roleName
            console.log('action : ', action)
            console.log('state : ', state)
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
