import { combineReducers } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'
import reducers, { FinaltemplListState, SLICE_NAME } from './FinaltemplSlice'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: FinaltemplListState
        }
    }
> = useSelector

export * from './FinaltemplSlice'
export { useAppDispatch } from '@/store'
export default reducer
