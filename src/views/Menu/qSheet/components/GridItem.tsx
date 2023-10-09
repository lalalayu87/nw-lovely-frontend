/* eslint-disable react/jsx-key */
import { useEffect } from 'react'
import Card from '@/components/ui/Card'
import {
    HiOutlineClipboardCheck,
    HiOutlineEye,
    HiOutlineTrash
} from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import NewQSheet from './NewQSheet'
import useThemeClass from '@/utils/hooks/useThemeClass'
import Tooltip from '@/components/ui/Tooltip'
import {
    useAppDispatch,
    removeRowItem,
    setSelectedRow,
    setSelectedRows,
    deleteList,
    getList
} from '../store'
import { apiGetQSheetCardDetails } from '@/services/QSheetService'
import DeleteConfirmation from './DeleteConfirmation'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

export type GridItemProps = {
    data: {
        qsheetSeq: string
        name: string
        created_at: Date
        data: string[]
        orgSeq: string
        userSeq: string
    }
}

// export type GridItemProps = {
//     data: {
//         content: [
//             {
//                 created_at: Date
//                 data: [
//                     actor: string,
//                     content: string,
//                     filePath: string,
//                     note: string,
//                     orderIndex: number,
//                     process: string
//                 ]
//                 name: string
//                 orgSeq: {
//                     orgBiznum: string
//                     orgContact: string
//                     orgEnabled: boolean
//                     orgName: boolean
//                     orgSeq: boolean
//                 }
//                 qsheetSeq: string
//                 userSeq: {
//                     created_at: Date
//                     userEmail: string
//                     userEnabled: boolean
//                     userId: string
//                     userName: string
//                     userRole: {
//                         roleName: string
//                         roleSeq: string
//                     }
//                     userSeq: string
//                 }
//             }
//         ]
//         empty: boolean
//         first: boolean
//         last: boolean
//         number: number
//         numberOfElements: number
//         pageable: {
//             offset: number
//             pageNumber: number
//             pazeSize: number
//             paged: boolean
//             sort: {
//                 empty: boolean
//                 sorted: boolean
//                 unsorted: boolean
//             }
//             unpaged: boolean
//         }
//         size: number
//         sort: {
//             empty: boolean
//             sorted: boolean
//             unsorted: boolean
//         }
//         totalElements: number
//         totalPages: number
//     }
// }

const ActionColumn = ({ row }: { row: GridItemProps }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = () => {
        // apiGetQSheetCardDetails(row.qsheetSeq)
        // getDetail(row.qsheetSeq)
        // navigate(`/cuesheet/details/${row.qsheetSeq}`)

        // 페이지 이동 시 데이터를 state로 전달
        navigate(`/cuesheet/details/${row.qsheetSeq}`, {
            state: { qsheetSeq: row.qsheetSeq }
        })
    }

    const onDelete = () => {
        deleteList(row.qsheetSeq)

        // 페이지를 새로고침
        window.location.reload()
        toast.push(
            <Notification title={'삭제되었습니다.'} type="success">
                삭제되었습니다.
            </Notification>
        )
    }

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="보기">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
            <Tooltip title="삭제">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </Tooltip>
            {/* <DeleteConfirmation /> */}
        </div>
    )
}

const GridItem = ({ data }: GridItemProps) => {
    return (
        <Card bodyClass="h-full">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between">
                    <h6>{data.name}</h6>

                    {/* <ItemDropdown /> */}
                </div>
                <p>{data.created_at.toString()}</p>
                <div className="mt-3">
                    {/* <ProgressionBar progression={progression} /> */}
                    <div className="flex items-center justify-between mt-2">
                        {/* <Members members={member} /> */}
                        <div className="flex items-center rounded-full font-semibold text-xs">
                            <ActionColumn row={data} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default GridItem