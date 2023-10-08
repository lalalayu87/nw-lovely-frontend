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
import { HiOutlinePencil, HiOutlineTrash, HiExternalLink } from 'react-icons/hi'
import QSheetDataTable from './QSheetDataTable'
import Button from '@/components/ui/Button'

export type qSheet = {
    id: string
    process: string
    performer: string
    text: string
    file: string
    note: string
}

export type qSheetDetailsDataProps = {
    data: {
        qsheetSeq: string
        name: string
        created_at: Date
        data: string[]
        orgSeq: string
        userSeq: string
    }
}

// const QSheetDetatilsHeader = ({ data }: qSheetDetailsDataProps) => {
const QSheetDetatilsHeader = () => {
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

    // const ActionColumn = ({ row }: { row: qSheet }) => {
    //     const dispatch = useAppDispatch()
    //     const { textTheme } = useThemeClass()
    //     const navigate = useNavigate()

    //     const onEdit = () => {
    //         navigate(`/app/sales/product-edit/${row.id}`)
    //     }

    //     const onDelete = () => {
    //         dispatch(toggleDeleteConfirmation(true))
    //         dispatch(setSelectedQSheet(row.id))
    //     }
    //     return (
    //         <div className="flex justify-end text-lg">
    //             <span
    //                 className={`cursor-pointer p-2 hover:${textTheme}`}
    //                 onClick={onEdit}
    //             >
    //                 <HiOutlinePencil />
    //             </span>
    //             <span
    //                 className="cursor-pointer p-2 hover:text-red-500"
    //                 onClick={onDelete}
    //             >
    //                 <HiOutlineTrash />
    //             </span>
    //         </div>
    //     )
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

    const onCreate = () => {
        console.log('되나')
    }

    return (
        <>
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">큐시트 내용</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-1">
                    <span>
                        <Button block size="sm" icon={<HiExternalLink />}>
                            공유
                        </Button>
                    </span>

                    <span>
                        <Button block size="sm">
                            저장
                        </Button>
                    </span>
                    <span>
                        <Button
                            block
                            size="sm"
                            variant="twoTone"
                            onClick={onCreate}
                        >
                            최종확인
                        </Button>
                    </span>
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

export default QSheetDetatilsHeader
