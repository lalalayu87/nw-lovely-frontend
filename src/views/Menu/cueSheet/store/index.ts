import { combineReducers } from '@reduxjs/toolkit'
import reducers, {
    SLICE_NAME,
    SalesProductListState,
} from './CueSheetListSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: SalesProductListState
        }
    }
> = useSelector //useSelector는 store의 상태값을 반환해주는 역할

export * from './CueSheetListSlice'
export { useAppDispatch } from '@/store'
export default reducer
