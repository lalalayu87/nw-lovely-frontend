import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, QSheetDataListState } from './UserQSheetSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    // useAppSelector는 커스텀 훅으로, React 컴포넌트에서 Redux 스토어의 상태에 접근하기 위해 사용
    // TypedUseSelectorHook을 사용하여 RootState와 슬라이스 이름을 지정한 형태로 정의
    // 이 훅을 사용하면 스토어의 일부 상태에 쉽게 접근 가능
    RootState & {
        [SLICE_NAME]: {
            data: QSheetDataListState
        }
    }
> = useSelector

export * from './UserQSheetSlice'
// projectListSlice에서 내보낸 모든 내용을 외부로 내보냅니다.
//  이것은 다른 파일에서 projectListSlice의 내용을 가져올 때 사용됩니다.
export { useAppDispatch } from '@/store'
// useAppDispatch를 외부로 내보냅니다. 이것은 Redux 스토어의 dispatch 함수에 접근할 때 사용됩니다.
export default reducer
// reducer 변수를 기본 내보내기로 내보냅니다. 이것은 Redux 스토어의 루트 리듀서로 사용됩니다.
