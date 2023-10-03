import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'
import {
  apiGetOrgList,
//   apiDeleteSalesOrders,
} from '@/services/SalesService'
import type { TableQueries } from '@/@types/common'
import ApiService from '@/services/ApiService'

// export async function apiGetSalesOrders<T, U extends Record<string, unknown>>(
//     params: U
// ) {
//     return ApiService.fetchData<T>({
//         url: '/api/v1/org',
//         method: 'get',
//         params,
//     })
// }

export async function apiDeleteSalesOrders<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

type Order = {
    orgSeq: string
        orgName: string
        orgBiznum: string
        orgContact: string
        orgEnable: boolean
        created_at: string
}

type OrgContent = {
    // content: {
    //     orgSeq: string
    //     orgName: string
    //     orgBiznum: string
    //     orgContact: string
    //     orgEnable: boolean
    //     created_at: string
    // }
    pageable: {
        sort: {
            empty: boolean
            sorted: boolean
            unsorted: boolean
        }
        offset: number
        pageNumber: number
        pageSize: number
    }
}

type Orders = Order[]
type OrgContents = OrgContent[]


type GetSalesOrdersResponse = {
    data: Orders
    total: number
}

type Page = {
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    }
    offset: number
    pageNumber: number
    pageSize: number
}

export type SalesOrderListState = {
    loading: boolean
    // orderList: Contents
    orderList: Orders
    tableData: TableQueries
    deleteMode: 'single' | 'batch' | ''
    selectedRows: string[]
    selectedRow: string
    // content: {
    //     orgSeq: string
    //     orgName: string
    //     orgBiznum: string
    //     orgContact: string
    //     orgEnable: boolean
    //     created_at: string
    // }
    // pageable: {
    //     sort: {
    //         empty: boolean
    //         sorted: boolean
    //         unsorted: boolean
    //     }
    //     offset: number
    //     pageNumber: number
    //     pageSize: number
    // }
}

export const SLICE_NAME = 'salesOrderList'

export const getOrders = createAsyncThunk(
    SLICE_NAME + '/getOrders',
    async (data: TableQueries) => {
        const response = await apiGetOrgList<
            GetSalesOrdersResponse,
            TableQueries
        >(data)
        return response.data
    }
)

export const deleteOrders = async (data: { id: string | string[] }) => {
    const response = await apiDeleteSalesOrders<
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
            empty: false,
            sorted: false,
            unsorted: false
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 0
        // total: 0,
        // pageIndex: 1,
        // pageSize: 10,
        // query: '',
        // sort: {
        //     order: '',
        //     key: '',
        // },
    },
    selectedRows: [],
    selectedRow: '',
    deleteMode: '',
    // content: {
    //     orgSeq: '',
    //     orgName: '',
    //     orgBiznum: '',
    //     orgContact: '',
    //     orgEnable: true,
    //     created_at: '',
    // },
    // pageable: {
    //     sort: {
    //     empty: false,
    //     sorted: true,
    //     unsorted: false,
    // },
    // offset: 0,
    // pageNumber: 0,
    // pageSize: 5,
    // }
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
                state.orderList = action.payload.data
                state.tableData.pageSize = action.payload.total
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
