import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'
import {
    apiGetQSheetList,
    apiDeleteQSheetCardList,
} from '@/services/QSheetService'
import type { TableQueries } from '@/@types/common'
import ApiService from '@/services/ApiService'
import async from 'react-select/dist/declarations/src/async/index'

type Order = {
    qsheetSeq: string
    name: string
    userSeq: User
    orgSeq: Org
    data: DataItem[]
    created_at: string
}

type User = {
    userSeq: string
    userId: string
    userName: string
    userEmail: string
    userRole: {
        roleSeq: string
        roleName: string
    }
    userType: string
    userEnabled: boolean
    created_at: string
}

type Org = {
    orgSeq: string
    orgName: string
    orgBiznum: string
    orgContact: string
    orgEnabled: boolean
    created_at: string
    orgAddress: string
}

type DataItem = {
    orderIndex: number
    process: string
    content: string
    actor: string
    note: string
    filePath: string
}

type Orders = Order[]

type GetSalesOrdersResponse = {
    content: Orders
    totalElements: number
    totalPages: number
    size: number
    number: number
}

type Params = {
    // page=0&size=5&sort=id&sort=desc
    page: number
    size: number
    // sort: string
}

export type SalesOrderListState = {
    loading: boolean
    orderList: Orders
    tableData: TableQueries
    deleteMode: 'single' | 'batch' | ''
    selectedRows: string[]
    selectedRow: string
}

export const SLICE_NAME = 'salesOrderList'

//TODO: 17일 오전 파리미터 확인 및 일괄 다운로드 진행, 일괄 삭제 진행

export const getOrders = createAsyncThunk(
    SLICE_NAME + '/getOrders',
    // async (data: TableQueries) => {
    async (data: Params) => {
        console.log('api확인')
        const response = await apiGetQSheetList<
            GetSalesOrdersResponse,
            Params
        >(data)
        console.log('response : ', JSON.stringify(response.data))
        return response.data
    }
)

export const deleteOrders = async (data: { id: string | string[] }) => {
    const response = await apiDeleteQSheetCardList<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 0,
    pageSize: 10,
    query: "",
    sort: {
        order: '',
        key: '',
    },
}

const initialState: SalesOrderListState = {
    loading: false,
    orderList: [],
    tableData: initialTableData,
    selectedRows: [],
    selectedRow: '',
    deleteMode: '',
}

const OrganizationSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        // setPageList: (state, action) => {
        //     state. = action.payload
        // },
        // setOffset: (state, action) => {
        //     state.pageable = action.payload
        // },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        addRowItem: (state, { payload }) => {
            const currentState = current(state)
            if (!currentState.selectedRows.includes(payload)) {
                state.selectedRows = [...currentState.selectedRows, ...payload]
            }
        },
        removeRowItem: (state, { payload }: PayloadAction<string>) => {
            const currentState = current(state)
            if (currentState.selectedRows.includes(payload)) {
                state.selectedRows = currentState.selectedRows.filter(
                    (id) => id !== payload
                )
            }
        },
        setDeleteMode: (state, action) => {
            state.deleteMode = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                console.log(action)
                state.orderList = action.payload.content
                state.tableData.total = action.payload.totalElements
                state.loading = false
            })
            .addCase(getOrders.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setOrderList,
    setTableData,
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    // setPageList
} = OrganizationSlice.actions

export default OrganizationSlice.reducer
