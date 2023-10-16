import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'
import type { TableQueries } from '@/@types/common'
import { apiGetFinaltempl } from '@/services/SalesService'
import { Action } from 'history'

type Finaltempl = {
    clickPb: boolean
    clickMakeup: boolean
    clickMeal: boolean
    clickAdd: boolean
    addData: []
    PbData: []
}

export type FinaltemplListState = {
    FinaltemplList: finaltemplTest[]
    contents: []
    setFinaltemplList: []
    setContentList: []
    // tableData: TableQueries
    // deleteMode: 'single' | 'batch' | ''
    // selectedRows: string[]
    // selectedRow: string
}

type finaltemplTests = finaltemplTest[]

type finaltemplTest = {
    finaltemplSeq: string
    finaltemplName: string
    content: {
        groom: {
            name: string
            father: string
            mother: string
        }
        bride: {
            name: string
            father: string
            mother: string
        }
        hallname: string
        weddingDatename: string
        guaranteePerson: {
            groom: string
            bride: string
        }
        hallFee: string
        weddingPicture: string
        dresshelper: string
        mc: string
        bus: string
        bouqet: string
        pyebaek: string
        photo: string
        officiant: string
    }
    userid: {
        userSeq: string
        userId: string
        userName: string
        userEmail: string
        userRole: {
            roleSeq: string
            roleName: string
        }
        userEnabled: boolean
        created_at: string
    }
    orgid: {
        orgSeq: string
        orgName: string
        orgBiznum: string
        orgContact: string
        orgEnabled: boolean
        orgAddress: string
    }
    created_at: string
}

type GetFinaltemplsResponse = {
    FinaltemplList: finaltemplTest
    contents: []
}

type GetFinaltemplRequest = TableQueries

type Finaltempls = Finaltempl[]

export const SLICE_NAME = 'finaltemplList'

export const getFinaltempls = createAsyncThunk(
    SLICE_NAME + '/getFinaltempls',
    async (data: GetFinaltemplRequest) => {
        const response = await apiGetFinaltempl<
            GetFinaltemplsResponse,
            GetFinaltemplRequest
        >(data)
        return response.data, console.log(response.data)
    }
)

const initialState: FinaltemplListState = {
    FinaltemplList: [],
    contents: [],
    setFinaltemplList: [],
    setContentList: [],
    // FinaltemplList: {
    //     finaltemplSeq: "",
    // finaltemplName: "",
    //   content: {
    //       groom: {
    //           name: "",
    //           father: "",
    //           mother: ""
    //       },
    //       bride: {
    //           name: "",
    //           father: "",
    //           mother: ""
    //       },
    //     hallname: "",
    //     weddingDatename: "",
    //       guaranteePerson: {
    //           groom: "",
    //           bride: ""
    //       },
    //     hallFee: "",
    //     weddingPicture: "",
    //     dresshelper: "",
    //     mc: "",
    //     bus: "",
    //     bouqet: "",
    //     pyebaek : "",
    //     photo : "",
    //     officiant: ""
    //   },
    //   userid: {
    //     userSeq: "",
    //     userId: "",
    //     userName: "",
    //     userEmail: "",
    //     userRole: {
    //       roleSeq: "",
    //       roleName: ""
    //     },
    //     userEnabled: true,
    //     created_at: ""
    //   },
    //   orgid: {
    //     orgSeq: "",
    //     orgName: "",
    //     orgBiznum: "",
    //     orgContact: "",
    //     orgEnabled: true,
    //     orgAddress: ""
    //   },
    //   created_at: ""
    // },
}

const finaltemplListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setFinaltemplList: (state, action) => {
            state.FinaltemplList = action.payload
        },
        setContentList: (state, action) => {
            state.contents = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getFinaltempls.fulfilled, (state, action) => {
            console.log('action.payload : ', action.payload)
            state.FinaltemplList = action.payload
            // state.FinaltemplList = action.payload
            // state.contents = action.payload
        })
    },
})

export const { setContentList, setFinaltemplList } = finaltemplListSlice.actions

export default finaltemplListSlice.reducer
