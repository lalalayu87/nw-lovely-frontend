import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    // avatar?: string
    // userName?: string
    // email?: string
    // authority?: string
    userId?: string
    userName?: string
    userRole: {
        roleSeq?: string
        roleName?: string
    }
    accessToken?: string

}

const initialState: UserState = {
    // avatar: '',
    // userName: '',
    // email: '',
    // authority: '',
    userId: '',
    userName: '',
    userRole: {
        roleSeq: 'ROLE_ADMIN',
        roleName: '',
    },
    accessToken: '',
}

const userSlice = createSlice(
    {
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            console.log('action : ', typeof(action.payload.userRole.roleSeq))
            console.log('state : ', state.userRole)
            // state.avatar = action.payload?.avatar
            // state.email = action.payload?.email
            // state.userName = action.payload?.userName
            // state.authority = action.payload?.authority
            state.userId = action.payload?.userId
            state.userName = action.payload?.userName
            // state.userRole.roleSeq = action.payload?.userRole?.roleSeq
            // state.userRole.roleName = action.payload?.userRole?.roleName
            state.userRole = action.payload.userRole
            state.accessToken = action.payload?.accessToken
        },
        },
    }
)

export const { setUser } = userSlice.actions
export default userSlice.reducer
