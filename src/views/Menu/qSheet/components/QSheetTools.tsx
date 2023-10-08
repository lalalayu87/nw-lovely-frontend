import { useRef } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Tooltip from '@/components/ui/Tooltip'
import { HiOutlinePlusCircle, HiOutlineSearch } from 'react-icons/hi'
import {
    // setSearch,
    // toggleNewProjectDialog,
    useAppDispatch,
    useAppSelector
} from '../store'
import debounce from 'lodash/debounce'
import type { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

const QSheetTools = () => {
    const dispatch = useAppDispatch()

    const inputRef = useRef(null)

    // const onAddNewProject = () => {
    //     dispatch(toggleNewProjectDialog(true))
    // }

    // const debounceFn = debounce(handleDebounceFn, 500)

    // function handleDebounceFn(val: string) {
    //     dispatch(setSearch(val))
    // }

    // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     debounceFn(e.target.value)
    // }

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

export default QSheetTools
