import React, { useEffect, useMemo, useRef } from 'react'
import type {
    DataTableResetHandle,
    ColumnDef
} from '@/components/shared/DataTable'
import { useAppDispatch, useAppSelector } from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import {
    setSelectedQSheet,
    toggleDeleteConfirmation
} from '../store/qSheetSlice'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import QSheetDataTable from './QSheetDataTable'

export type qSheet = {
    id: string
    process: string
    performer: string
    text: string
    file: string
    note: string
}

const NewQSheetHeader = () => {
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

    const ActionColumn = ({ row }: { row: qSheet }) => {
        const dispatch = useAppDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const onEdit = () => {
            navigate(`/app/sales/product-edit/${row.id}`)
        }

        const onDelete = () => {
            dispatch(toggleDeleteConfirmation(true))
            dispatch(setSelectedQSheet(row.id))
        }
        return (
            <div className="flex justify-end text-lg">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onEdit}
                >
                    <HiOutlinePencil />
                </span>
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </div>
        )
    }

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

    return (
        <>
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
