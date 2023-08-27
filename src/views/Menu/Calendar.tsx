import { useEffect, useState } from 'react'
import Modal from 'react-modal';
import CalendarView from '@/components/shared/CalendarView'
import Container from '@/components/shared/Container'
// import EventDialog, { EventParam } from './components/EventDialog'
// import reducer, {
//     getEvents,
//     updateEvent,
//     setSelected,
//     openDialog,
//     useAppDispatch,
//     useAppSelector,
// } from './store'
import { injectReducer } from '@/store'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    EventDropArg,
    EventClickArg,
    DateSelectArg,
} from '@fullcalendar/core'
import CalendarEdit from './CalendarEdit';
import { Dialog } from '@/components/ui';

// injectReducer('crmCalendar', reducer)

const Calendar = () => {
    const [editOpen, setEditOpen] = useState(false)

    const openEdit = () => {
        console.log("열기")
        setEditOpen(!editOpen)
    }
    // const dispatch = useAppDispatch()
    // const events = useAppSelector((state) => state.crmCalendar.data.eventList)

    useEffect(() => {
        // dispatch(getEvents())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCellSelect = (event: DateSelectArg) => {
        // const { start, end } = event
        // dispatch(
        //     setSelected({
        //         type: 'NEW',
        //         start: dayjs(start).format(),
        //         end: dayjs(end).format(),
        //     })
        // )
        // dispatch(openDialog())
        console.log("선택")
        setEditOpen(!editOpen)
    }

    const onEventClick = (arg: EventClickArg) => {
        // const { start, end, id, title, extendedProps } = arg.event
        // dispatch(
        //     setSelected({
        //         type: 'EDIT',
        //         eventColor: extendedProps.eventColor,
        //         title,
        //         start,
        //         end,
        //         id,
        //     })
        // )
        // dispatch(openDialog())
        openEdit();
        return (
            <Dialog isOpen={editOpen}><CalendarEdit /></Dialog>
        )
    }

    // const onSubmit = (data: EventParam, type: string) => {
    //     let newEvents = cloneDeep(events)
    //     if (type === 'NEW') {
    //         newEvents.push(data)
    //     }

    //     if (type === 'EDIT') {
    //         newEvents = newEvents.map((event) => {
    //             if (data.id === event.id) {
    //                 event = data
    //             }
    //             return event
    //         })
    //     }
    //     // dispatch(updateEvent(newEvents))
    // }

    // const onEventChange = (arg: EventDropArg) => {
    //     const newEvents = cloneDeep(events).map((event) => {
    //         if (arg.event.id === event.id) {
    //             const { id, extendedProps, start, end, title } = arg.event
    //             event = {
    //                 id,
    //                 start: dayjs(start).format(),
    //                 end: dayjs(end).format(),
    //                 title,
    //                 eventColor: extendedProps.eventColor,
    //             }
    //         }
    //         return event
    //     })
    //     dispatch(updateEvent(newEvents))
    // }

    return (
        <Container className="h-full relative ">
           {editOpen && <CalendarEdit onOpenAlert={openEdit} />}
            <CalendarView
                editable
                selectable
                // events={events}
                eventClick={openEdit}
                select={onCellSelect}
                // eventDrop={onEventChange}
            />
            {/* <EventDialog /> */}
        </Container>
    )
}

export default Calendar
