import { combineReducers } from '@reduxjs/toolkit'
import reducers, {
    SLICE_NAME,
    SalesProductListState,
} from './CueSheetListSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

// combineReducers 함수를 사용하여 여러 개의 리듀서(CueSheetListSlice.ts에서 가져온 reducers)를 하나로 합칩니다.
const reducer = combineReducers({
    data: reducers,
})

// TypedUseSelectorHook을 사용하여 useAppSelector를 정의합니다.
// 이 훅은 타입 안정성을 가진 useSelector를 사용할 수 있도록 해줍니다.
// RootState와 슬라이스의 상태 타입(SalesProductListState)을 조합하여 타입을 명시적으로 지정합니다.

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: SalesProductListState
        }
    }
> = useSelector //useSelector는 store의 상태값을 반환해주는 역할

// export * from './CueSheetListSlice';는 슬라이스 관련 내용을 모두 내보내기 위한 구문입니다.
// export { useAppDispatch } from '@/store';는 Redux 스토어에서 useDispatch 훅을 내보내기 위한 구문입니다.
// export default reducer;는 합친 리듀서를 기본 내보내기(default export)로 설정합니다.

export * from './CueSheetListSlice'
export { useAppDispatch } from '@/store'
export default reducer
