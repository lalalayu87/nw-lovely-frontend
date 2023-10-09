import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'
import {
    apiGetOrgList,
    apiCreateOrg,
    apiDeleteOrg,
//   apiDeleteSalesOrders,
} from '@/services/SalesService'
import type { TableQueries } from '@/@types/common'
import ApiService from '@/services/ApiService'
import async from 'react-select/dist/declarations/src/async/index'


type Order = {
    orgSeq: string
    orgName: string
    orgBiznum: string
    orgContact: string
    orgEnable: boolean
    orgAddress: string
    // create_at: string
}

type Orders = Order[]

type GetSalesOrdersResponse = {
    content: Orders
    totalElements: number
}

type Page = {
    // page=0&size=5&sort=id&sort=desc
    page: number
    size: number
    sort: {
        sorted: string
        unsorted: string
    }
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

export const getOrders = createAsyncThunk(
    SLICE_NAME + '/getOrders',
    async (data: TableQueries) => {
        console.log("api확인")
        const response = await apiGetOrgList<
            GetSalesOrdersResponse,
            TableQueries
        >()
        return response.data
    }
)


export const deleteOrders = async (data: { id: string | string[] }) => {
    const response = await apiDeleteOrg<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}

const initialState: SalesOrderListState = {
    loading: false,
    orderList: [],
    tableData: {
        sort: {
            sorted: false,
            unsorted: false
        },
        page: 0,
        size: 0
    },
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
                state.tableData.page = action.payload.totalElements
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
