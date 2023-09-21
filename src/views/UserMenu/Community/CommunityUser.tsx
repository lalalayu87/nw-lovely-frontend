import ContentList from "./ContentList"
import HashtagList from "./HashtagList"

const CommunityUser = () => {
    return (
        <div className="grid grid-cols-4 gap-4 h-full">
            <div className="col-span-1 border-2"><HashtagList /></div>
            <div className="col-span-3 border-2"><ContentList /></div>
        </div>
    )
}

export default CommunityUser
