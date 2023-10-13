import { useEffect } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import Spinner from '@/components/ui/Spinner'
import { deleteList, getList, useAppDispatch, useAppSelector } from '../store'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Notification, toast } from '@/components/ui'
import {
    HiOutlineEye,
    HiOutlinePlusCircle,
    HiOutlineTrash
} from 'react-icons/hi'
import Tooltip from '@/components/ui/Tooltip'
import useThemeClass from '@/utils/hooks/useThemeClass'

export type QSheetList = {
    data: {
        qsheetSeq: string
        name: string
        created_at: Date
        data: string[]
        orgSeq: string
        userSeq: string
    }
}

const QSheetCardList = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector((state) => state.qsheetDataList.loading)
    const t = useAppSelector((state) => state.qsheetDataList)
    console.log(t)
    const tt = useAppSelector((state) => state.qsheetDataList.data)
    console.log(tt)

    const qsheetCardList = useAppSelector(
        (state) => state.qsheetDataList.data.qSheetDataList
    )

    useEffect(() => {
        dispatch(getList())
    }, [dispatch])

    const ActionColumn = ({
        row,
        qsheetCardList
    }: {
        row: QSheetData
        qsheetCardList: QSheetData[]
    }) => {
        console.log(row)
        console.log(qsheetCardList)
        const dispatch = useAppDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const onView = () => {
            console.log('보기', row)
            // 페이지 이동 시 데이터를 state로 전달
            navigate(`/cuesheet/details/${row.qsheetSeq}`, {
                state: { qsheetSeq: row.qsheetSeq }
            })
        }

        const onDelete = async () => {
            console.log('삭제')
            deleteList(row.qsheetSeq)

            // 페이지를 새로고침
            // window.location.reload()

            toast.push(
                <Notification title={'삭제되었습니다.'} type="success">
                    삭제되었습니다.
                </Notification>
            )
            location.reload()
        }

        return (
            <div>
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

    return (
        <>
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
            <div>
                {/* <div ref={componentRef} className="report-template"> */}
                <table className="table-auto min-w-full divide-x divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700 ">
                        <tr>
                            <th className="px-2 py-3 text-center rtl:text-right font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-100">
                                이름
                            </th>
                            <th className="px-2 py-3 text-center ">생성일</th>
                            <th className="px-2 py-3 text-center ">액션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qsheetCardList.map((data, index) => (
                            <tr key={index}>
                                <td className="text-center rtl:text-right font-semibold justify-cent border-t border-b  border-gray-300 py-2">
                                    {data.name}{' '}
                                </td>
                                <td className="text-center rtl:text-right font-semibold justify-cent border-t border-b  border-gray-300 py-2">
                                    {data.created_at.toString()}
                                </td>
                                <td className="text-center rtl:text-right font-semibold justify-cent border-t border-b  border-gray-300 py-2">
                                    <ActionColumn
                                        row={data}
                                        qsheetCardList={qsheetCardList}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default QSheetCardList
