import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ApiService from '@/services/ApiService'
// import { apiGetCrmCalendar } from '@/services/CrmService'

export async function apiGetCrmCalendar<T>() {
    return ApiService.fetchData<T>({
        url: '/crm/calendar',
        method: 'get',
    })
}

type Event = {
    id: string
    groom: string
    groomContact: string
    groomEmail: string
    bride: string
    brideContact: string
    brideEmail: string
    weddingDate: Date | string
    scheduleDate: Date | string
    customerStatus: string
    weddingHall: string
    weddingTime: Date | string
    guaranteePerson: number
    // eventColor: string
    // groupId?: undefined
}

type Events = Event[]

type GetCrmCalendarResponse = Events

export type CalendarState = {
    loading: boolean
    eventList: Events
    dialogOpen: boolean
    selected: {
        type: string
        groom: string
        groomContact: string
        groomEmail: string
        bride: string
        brideContact: string
        brideEmail: string
        weddingDate: Date | string
        scheduleDate: Date | string
        customerStatus: string
        weddingHall: string
        weddingTime: Date | string
        guaranteePerson: number
    } & Partial<Event>
}

export const SLICE_NAME = 'crmCalendar'

export const getEvents = createAsyncThunk(
    SLICE_NAME + '/getEvents',
    async () => {
        const response = await apiGetCrmCalendar<GetCrmCalendarResponse>()
        return response.data
    }
)

const initialState: CalendarState = {
    loading: false,
    eventList: [],
    dialogOpen: false,
    selected: {
        type: '',
        groom: '',
        groomContact: '',
        groomEmail: '',
        bride: '',
        brideContact: '',
        brideEmail: '',
        weddingDate: new Date(),
        scheduleDate: new Date(),
        customerStatus: '',
        weddingHall: '',
        weddingTime: '',
        guaranteePerson: 0,
    },
}

const calendarSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateEvent: (state, action) => {
            state.eventList = action.payload
        },
        openDialog: (state) => {
            state.dialogOpen = true
        },
        closeDialog: (state) => {
            state.dialogOpen = false
        },
        setSelected: (state, action) => {
            state.selected = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.eventList = action.payload
        })
    },
})

export const { updateEvent, openDialog, closeDialog, setSelected } =
    calendarSlice.actions

export default calendarSlice.reducer
