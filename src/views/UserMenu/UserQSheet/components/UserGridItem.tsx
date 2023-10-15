/* eslint-disable react/jsx-key */
import { useEffect } from 'react'
import Card from '@/components/ui/Card'
import {
    HiOutlineClipboardCheck,
    HiOutlineEye,
    HiOutlineTrash
} from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import UserNewQSheet from './UserNewQSheet'
import useThemeClass from '@/utils/hooks/useThemeClass'
import Tooltip from '@/components/ui/Tooltip'
import {
    removeRowItem,
    setSelectedRow,
    setSelectedRows,
    deleteList,
    getList,
    useAppDispatch
} from '../store'
import { apiGetQSheetCardDetails } from '@/services/QSheetService'
import UserDeleteConfirmation from './UserDeleteConfirmation'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

export type GridItemProps = {
    qsheetSeq: string
    data: {
        qsheetSeq: string
        name: string
        created_at: Date
        data: string[]
        orgSeq: string
        userSeq: string
    }
}

const ActionColumn = ({ row }: { row: GridItemProps }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()

    const onDelete = async () => {
        deleteList(row.qsheetSeq)

        // 페이지를 새로고침
        // window.location.reload()
        // useEffect 내에서 수행할 작업 정의

        toast.push(
            <Notification title={'삭제되었습니다.'} type="success">
                삭제되었습니다.
            </Notification>
        )
        location.reload()
    }

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="삭제">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </Tooltip>
        </div>
    )
}

const UserGridItem = ({ data }: GridItemProps) => {
    return (
        <Card bodyClass="h-full">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between">
                    <Link
                        to={`/cuesheetUser/details/${data.qsheetSeq}`}
                        state={{ qsheetSeq: data.qsheetSeq }}
                    >
                        <h6>{data.name}</h6>
                    </Link>
                </div>
                <p>{data.created_at.toString()}</p>
                <div className="mt-3">
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center rounded-full font-semibold text-xs">
                            <ActionColumn row={data} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default UserGridItem
