import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCrmCustomerDetails,
    apiDeleteCrmCustomer,
    apPutCrmCustomer,
} from '@/services/CrmService'

export const SLICE_NAME = 'customerCardDetails'

export type UserInfo = {
    userSeq: string
    userId: string
    userName: string
    userEmail: string
    userRole: {
        roleSeq: string
        roleName: string
    }
    userEnable: boolean
    created_at: string
}

export type Groom = {
    name: string
    email: string
    contact: string
}

export type Bride = {
    name: string
    email: string
    contact: string
}

export type CustomerCardDetail = {
    userCardSeq: string
    groom?: Groom
    bride?: Bride
    userInfo: UserInfo
    note: string
    resDate: string
    status: string
    weddingDate: string
    update_at: string
}

// export type GetCrmCustomerDetailsResponse = {
//     // orderHistory?: OrderHistory[]
//     // paymentMethod?: PaymentMethod[]
//     // subscription?: Subscription[]
//     userInfo: Customer
//     bried?: Bride
//     groom?: Groom
//     note: string
//     resDate: Date
//     status: string
//     weddingDate: Date
//     update_at: Date
// }

type GetCrmCustomerDetailsRequest = { userSeq: string }

// eslint-disable-next-line @typescript-eslint/ban-types
type DeleteCrmCustomerResponse = {}

type DeleteCrmCustomerRequest = { id: string }

export type CustomerDetailState = {
    loading: boolean
    profileData: Partial<CustomerCardDetail>
    // deletePaymentMethodDialog: boolean
    // editPaymentMethodDialog: boolean
    // editCustomerDetailDialog: boolean
    // selectedCard: Partial<PaymentMethod>
}

export const getCustomer = createAsyncThunk(
    SLICE_NAME + '/getCustomer',
    async (data: GetCrmCustomerDetailsRequest) => {
        const response = await apiGetCrmCustomerDetails<
            // GetCrmCustomerDetailsResponse,
            CustomerCardDetail,
            GetCrmCustomerDetailsRequest
        >(data)
        return response.data
    }
)

export const deleteCustomer = createAsyncThunk(
    SLICE_NAME + '/deleteCustomer',
    async (data: DeleteCrmCustomerRequest) => {
        const response = await apiDeleteCrmCustomer<
            DeleteCrmCustomerResponse,
            DeleteCrmCustomerRequest
        >(data)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    SLICE_NAME + '/putCustomer',
    async (data: CustomerCardDetail) => {
        const response = await apPutCrmCustomer(data)
        return response.data
    }
)

const initialState: CustomerCardDetail = {
    userCardSeq: '',
    userInfo: {
        userSeq: '',
        userId: '',
        userName: '',
        userEmail: '',
        userRole: {
            roleSeq: '',
            roleName: '',
        },
        userEnable: false,
        created_at: '',
    },
    bride: {
        name: '',
        email: '',
        contact: '',
    },
    groom: {
        name: '',
        email: '',
        contact: '',
    },
    note: '',
    resDate: '',
    status: '',
    weddingDate: '',
    update_at: '',
    // loading: true,
    // profileData: {},
    // subscriptionData: [],
    // paymentHistoryData: [],
    // paymentMethodData: [],
    // deletePaymentMethodDialog: false,
    // editPaymentMethodDialog: false,
    // editCustomerDetailDialog: false,
    // selectedCard: {},
}

const customerCardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        // updatePaymentMethodData: (state, action) => {
        //     state.paymentMethodData = action.payload
        // },
        updateProfileData: (state, action) => {
            state = action.payload
        },
        // openDeletePaymentMethodDialog: (state) => {
        //     state.deletePaymentMethodDialog = true
        // },
        // closeDeletePaymentMethodDialog: (state) => {
        //     state.deletePaymentMethodDialog = false
        // },
        // openEditPaymentMethodDialog: (state) => {
        //     state.editPaymentMethodDialog = true
        // },
        // closeEditPaymentMethodDialog: (state) => {
        //     state.editPaymentMethodDialog = false
        // },
        // openEditCustomerDetailDialog: (state) => {
        //     state.userInfo = true
        // },
        // closeEditCustomerDetailDialog: (state) => {
        //     state.userInfo = false
        // },
        updateSelectedCard: (state, action) => {
            state = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCustomer.fulfilled, (state, action) => {
            // state.loading = false
            state = action.payload
            // state.subscriptionData = action.payload?.subscription || []
            // state.paymentHistoryData = action.payload?.orderHistory || []
            // state.paymentMethodData = action.payload?.paymentMethod || []
            // state = action.payload || []
        })
        // .addCase(getCustomer.pending, (state) => {
        //     state.loading = true
        // })
    },
})

export const {
    // updatePaymentMethodData,
    updateProfileData,
    // openDeletePaymentMethodDialog,
    // closeDeletePaymentMethodDialog,
    // openEditPaymentMethodDialog,
    // closeEditPaymentMethodDialog,
    // openEditCustomerDetailDialog,
    // closeEditCustomerDetailDialog,
    updateSelectedCard,
} = customerCardSlice.actions

export default customerCardSlice.reducer
