// import { runInAction } from "mobx";

class Calendar {
    editOpen = false
    setEditOpen = (e: boolean) => {
        this.editOpen = !e
    }
}
const CalendarStore = new Calendar()
export default CalendarStore
