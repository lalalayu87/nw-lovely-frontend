import MyTasks from "./MyTasks"
import Schedule from "./Schedule"

const Home = () => {
    return (
        <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-auto">
            <MyTasks />
            </div>
            <div className="flex flex-col gap-4 flex-auto">
                <Schedule />
            </div>
        </div>
    )
}

export default Home
