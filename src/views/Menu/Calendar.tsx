import { useEffect } from 'react'
import CalendarView from '@/components/shared/CalendarView'
import Container from '@/components/shared/Container'
import reducer, {
    getEvents,
    updateEvent,
    setSelected,
    openDialog,
    useAppDispatch,
    useAppSelector,
} from './store'
import { injectReducer } from '@/store'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    EventDropArg,
    EventClickArg,
    DateSelectArg,
} from '@fullcalendar/core'
import CalendarEdit, { EventParam } from './CalendarEdit'

injectReducer('crmCalendar', reducer)

const Calendar = () => {
    const dispatch = useAppDispatch()
    const events = useAppSelector((state) => state.crmCalendar.data.eventList)

    useEffect(() => {
        // dispatch(getEvents())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCellSelect = (event: DateSelectArg) => {
        const { start, end } = event
        dispatch(
            setSelected({
                type: 'NEW',
                start: dayjs(start).format(),
                end: dayjs(end).format(),
            })
        )
        dispatch(openDialog())
    }

    const onEventClick = (arg: EventClickArg) => {
        const { start, end, id, title, extendedProps } = arg.event
        dispatch(
            setSelected({
                type: 'EDIT',
                eventColor: extendedProps.eventColor,
                title,
                start,
                end,
                id,
            })
        )
        dispatch(openDialog())
    }

    const onSubmit = (data: EventParam, type: string) => {
        const newEvents = cloneDeep(events)
        if (type === 'NEW') {
            console.log('data : ', data)
            newEvents.push(data)
        }

        // if (type === 'EDIT') {
        //     newEvents = newEvents.map((event) => {
        //         if (data.id === event.id) {
        //             event = data
        //         }
        //         return event
        //     })
        // }
        dispatch(updateEvent(newEvents))
    }

    const onEventChange = (arg: EventDropArg) => {
        const newEvents = cloneDeep(events).map((event) => {
            if (arg.event.id === event.id) {
                const {
                    id,
                    groom,
                    groomContact,
                    groomEmail,
                    bride,
                    brideContact,
                    brideEmail,
                    weddingDate,
                    scheduleDate,
                    customerStatus,
                    weddingHall,
                    weddingTime,
                    guaranteePerson,
                } = arg.event
                event = {
                    id,
                    groom,
                    groomContact,
                    groomEmail,
                    bride,
                    brideContact,
                    brideEmail,
                    weddingDate,
                    scheduleDate,
                    customerStatus,
                    weddingHall,
                    weddingTime,
                    guaranteePerson,
                    // start: dayjs(start).format(),
                    // end: dayjs(end).format(),
                    // title,
                    // eventColor: extendedProps.eventColor,
                }
            }
            return event
        })
        dispatch(updateEvent(newEvents))
    }

    return (
        <Container className="h-full">
            <CalendarView
                editable
                selectable
                events={events}
                eventClick={onEventClick}
                select={onCellSelect}
                eventDrop={onEventChange}
            />
            <CalendarEdit submit={onSubmit} />
        </Container>
    )
}

export default Calendar
