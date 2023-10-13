import React, { useEffect, useMemo, useRef } from 'react'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import {
    useAppDispatch,
    useAppSelector,
    getList,
    setSelectedQSheet,
    toggleDeleteConfirmation,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import UserQSheetDataTable from './UserQSheetDataTable'
import Button from '@/components/ui/Button'
import { apiPostQSheetCardList } from '@/services/QSheetService'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'

export type qSheet = {
    id: string
    process: string
    performer: string
    text: string
    file: string
    note: string
}

export type qSheetExampleDataProps = {
    data: {
        qsheetSeq: string
        name: string
        created_at: Date
        data: string[]
        orgSeq: string
        userSeq: string
    }
}

const USerNewQSheetHeader = ({ data }: qSheetExampleDataProps) => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()

    // const filterData = useAppSelector(
    //     (state) => state.salesProductList.data.filterData
    // )

    // useEffect(() => {
    //     if (tableRef) {
    //         tableRef.current?.resetSorting()
    //     }
    // }, [filterData])

    // const fetchData = () => {
    //     dispatch(getProducts({ filterData }))
    // }

    const columns: ColumnDef<qSheet>[] = useMemo(
        () => [
            {
                header: '절차',
                accessorKey: 'process',
                width: 'w-1/12',
            },
            {
                header: '행위자',
                accessorKey: 'actor',
                sortable: true,
                width: 'w-2/12',
            },
            {
                header: '내용',
                accessorKey: 'content',
                width: 'w-5/12',
            },

            {
                header: '파일',
                accessorKey: 'filePath',
                width: 'w-2/12',
            },
            {
                header: '비고',
                accessorKey: 'note',
                width: 'w-2/12',
            },
        ],
        []
    )

    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userSeq = (persistData as any).auth.user.userSeq

    const navigate = useNavigate()
    const onCreate = async () => {
        const date = new Date()
        const name = '큐시트_' + date.toLocaleDateString('ko-kr')

        const transformedData = data.map((item) => {
            return {
                orderIndex: item.orderIndex,
                process: item.process,
                content: item.content,
                actor: item.actor,
                note: item.note,
                filePath: item.filePath,
            }
        })

        const body = {
            name: name,
            userSeq: userSeq,
            data: transformedData,
        }

        apiPostQSheetCardList(body)

        toast.push(
            <Notification title={'큐시트가 생성되었습니다.'} type="success">
                큐시트가 생성되었습니다.
            </Notification>
        )

        await getList()
        navigate('/cuesheetUser')
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <>
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">큐시트 생성</h3>

                <div className="flex flex-col md:flex-row md:items-center gap-1">
                    <Button
                        block
                        size="sm"
                        variant="twoTone"
                        onClick={onCreate}
                    >
                        저장
                    </Button>
                </div>
            </div>

            <table className="min-w-full divide-x divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700 ">
                    <tr>
                        {/* <th className="border-r border-gray-300"></th> */}
                        <th
                            // style={{ width: '209px' }}
                            className="px-2 w-1/12 py-3 text-center rtl:text-rightfont-semibold uppercase tracking-wider text-gray-500 dark:text-gray-100 border border-gray-300"
                        >
                            절차
                        </th>
                        <th className="px-2 w-2/12 py-3 text-center border border-gray-300">
                            행위자
                        </th>
                        <th className="px-2 w-5/12 py-3 text-center border border-gray-300">
                            내용
                        </th>
                        <th className="px-2 w-1/12 py-3 text-center border border-gray-300">
                            파일
                        </th>
                        <th className="px-2 w-2/12 py-3 text-center border border-gray-300">
                            비고
                        </th>
                        <th className="px-2 w-1/12 py-3 text-center border border-gray-300">
                            액션
                        </th>
                    </tr>
                </thead>
            </table>
            {/* <QSheetDataTable
                ref={tableRef}
                columns={columns}
                
            /> */}
        </>
    )
}

export default USerNewQSheetHeader
