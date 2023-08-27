import React, { useState } from 'react'
import Badge from '@/components/ui/Badge'
import { HiOutlineStar, HiOutlineBell, HiStar } from 'react-icons/hi'

const Bookmark = () => {
    const [star, setStar] = useState(false)
    const onClickStart = () => {
        setStar(!star)
    }
    return (
        <div className="text-2xl flex">
            {star === true ? (
                <HiOutlineStar className="mr-8" onClick={onClickStart} />
            ) : (
                <HiStar className="mr-8" onClick={onClickStart} />
            )}
            <Badge className="mr-4 relative " content={100}>
                <HiOutlineBell className="mr-8 absolute" />
            </Badge>
        </div>
    )
}

export default Bookmark
