import React, { useEffect, useMemo, useRef } from 'react'
import type {
    DataTableResetHandle,
    ColumnDef
} from '@/components/shared/DataTable'
import { useAppDispatch, useAppSelector, getList } from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import {
    setSelectedQSheet,
    toggleDeleteConfirmation
} from '../store/qSheetSlice'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import QSheetDataTable from './QSheetDataTable'
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

const NewQSheetHeader = ({ data }: qSheetExampleDataProps) => {
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
                width: 'w-1/12'
            },
            {
                header: '행위자',
                accessorKey: 'actor',
                sortable: true,
                width: 'w-2/12'
            },
            {
                header: '내용',
                accessorKey: 'content',
                width: 'w-5/12'
            },

            {
                header: '파일',
                accessorKey: 'filePath',
                width: 'w-2/12'
            },
            {
                header: '비고',
                accessorKey: 'note',
                width: 'w-2/12'
            }
        ],
        []
    )

    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userSeq = (persistData as any).auth.user.userSeq
    console.log((persistData as any).auth.user)

    const navigate = useNavigate()
    const onCreate = () => {
        const date = new Date()
        const name = '큐시트_' + date.toLocaleDateString('ko-kr')

        const transformedData = data.map((item) => {
            return {
                orderIndex: item.orderIndex,
                process: item.process,
                content: item.content,
                actor: item.actor,
                note: item.note,
                filePath: item.filePath
            }
        })

        const body = {
            name: name,
            userSeq: userSeq,
            data: transformedData
        }

        apiPostQSheetCardList(body)

        toast.push(
            <Notification title={'큐시트가 생성되었습니다.'} type="success">
                큐시트가 생성되었습니다.
            </Notification>
        )

        navigate('/cuesheet')
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
            <QSheetDataTable
                ref={tableRef}
                columns={columns}
                // skeletonAvatarColumns={[0]}
                // skeletonAvatarProps={{
                //     className: 'rounded-md',
                // }}
            />
        </>
    )
}

export default NewQSheetHeader
