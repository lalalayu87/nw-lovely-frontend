import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { apiGetQSheetCardList } from '@/services/QSheetService'

type QSheetData = {
    content: [
        {
            created_at: Date
            data: [
                actor: string,
                content: string,
                filePath: string,
                note: string,
                orderIndex: number,
                process: string
            ]
            name: string
            orgSeq: {
                orgBiznum: string
                orgContact: string
                orgEnabled: boolean
                orgName: boolean
                orgSeq: boolean
            }
            qsheetSeq: string
            userSeq: {
                created_at: Date
                userEmail: string
                userEnabled: boolean
                userId: string
                userName: string
                userRole: {
                    roleName: string
                    roleSeq: string
                }
                userSeq: string
            }
        }
    ]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    pageable: {
        offset: number
        pageNumber: number
        pazeSize: number
        paged: boolean
        sort: {
            empty: boolean
            sorted: boolean
            unsorted: boolean
        }
        unpaged: boolean
    }
    size: number
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    }
    totalElements: number
    totalPages: number
}

type QSheetDataList = QSheetData[]

type GetQSheetDataResponse = {
    qSheetDataList: QSheetDataList
    content: []
}

export type QSheetDataListState = {
    loading: boolean
    qSheetDataList: QSheetDataList
    content: []
}

export const SLICE_NAME = 'qsheetDataList'
// getList는 Redux Toolkit의 createAsyncThunk 함수를 사용하여 생성된 비동기 액션 생성자
// 이 함수는 비동기적인 작업을 수행하고 해당 작업이 완료되면 Redux 스토어의 상태를 업데이트하는 데 사용
export const getList = createAsyncThunk(SLICE_NAME + '/getList', async () => {
    const response = await apiGetQSheetCardList<GetQSheetDataResponse>()
    return response.data
})

const initialState: QSheetDataListState = {
    loading: false,
    qSheetDataList: [],
    content: [],
}

const qSheetDataListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        // toggleSort: (state, action) => {
        //     state.query.sort = action.payload
        // },
        // setSearch: (state, action) => {
        //     state.query.search = action.payload
        // },
        // toggleNewProjectDialog: (state, action) => {
        //     state.newProjectDialog = action.payload
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getList.fulfilled, (state, action) => {
                state.qSheetDataList = action.payload.content
                state.loading = false
            })
            .addCase(getList.pending, (state) => {
                state.loading = true
            })
    },
})

// const projectDashboardSlice = createSlice({
//     name: `${SLICE_NAME}/state`,
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getProjectDashboardData.fulfilled, (state, action) => {
//                 state.dashboardData = action.payload
//                 state.loading = false
//             })
//             .addCase(getProjectDashboardData.pending, (state) => {
//                 state.loading = true
//             })
//     },
// })

// export const { toggleView, toggleSort, toggleNewProjectDialog, setSearch } =
// qSheetDataListSlice.actions
export default qSheetDataListSlice.reducer
