import React, { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import { getProducts, useAppDispatch, useAppSelector } from '../store'
import type {
    DataTableResetHandle,
    ColumnDef
} from '@/components/shared/DataTable'
import CueSheetDataTable from './CueSheetDataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import {
    setSelectedProduct,
    toggleDeleteConfirmation
} from '../store/CueSheetListSlice'

type cueSheet = {
    id: string
    process: string
    performer: string
    text: string
    file: string
    note: string
    // id: string
    // name: string
    // productCode: string
    // img: string
    // category: string
    // price: number
    // stock: number
    // status: number
}
const CueSheetHeader = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const filterData = useAppSelector(
        (state) => state.salesProductList.data.filterData
    )

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const fetchData = () => {
        dispatch(getProducts({ filterData }))
    }

    const ActionColumn = ({ row }: { row: cueSheet }) => {
        const dispatch = useAppDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const onEdit = () => {
            navigate(`/app/sales/product-edit/${row.id}`)
        }

        const onDelete = () => {
            dispatch(toggleDeleteConfirmation(true))
            dispatch(setSelectedProduct(row.id))
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

    const columns: ColumnDef<cueSheet>[] = useMemo(
        () => [
            // {
            //     header: '순서',
            //     accessorKey: 'id',
            // },

            { header: '절차', accessorKey: 'process' },
            {
                header: '행위자',
                accessorKey: 'performer: ',
                sortable: true
            },
            {
                header: '내용',
                accessorKey: 'text: '
            },

            {
                header: '파일',
                accessorKey: 'file: '
            },
            {
                header: '비고',
                accessorKey: 'note: '
            }

            // {
            //     header: '',
            //     accessorKey: 'action',
            //     // cell: (props) => <ActionColumn row={props.row.original} />,
            // },
        ],
        []
    )

    return (
        <>
            <CueSheetDataTable
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

export default CueSheetHeader
