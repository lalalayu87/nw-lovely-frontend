import Button from '@/components/ui/Button'

import { HiOutlinePlusCircle } from 'react-icons/hi'

import { Link } from 'react-router-dom'

const UserQSheetTools = () => {
    return (
        <div className="lg:flex items-center justify-between mb-4">
            <h3 className="mb-4 lg:mb-0">큐시트 목록</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-1">
                <Link to="create">
                    <Button
                        size="sm"
                        variant="twoTone"
                        icon={<HiOutlinePlusCircle />}
                    >
                        큐시트 생성
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default UserQSheetTools
