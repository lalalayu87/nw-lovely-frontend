import React, { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import { getProducts, useAppDispatch, useAppSelector } from '../store'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import CueSheetDataTable from './CueSheetDataTable'

export type cueSheet = {
    id: string
    name: string
    productCode: string
    img: string
    category: string
    price: number
    stock: number
    status: number
    width: string
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

    const columns: ColumnDef<cueSheet>[] = useMemo(
        () => [
            // {
            //     header: '순서',
            //     accessorKey: 'id',
            // },
            {
                header: '절차',
                accessorKey: 'category',
                width: 'w-1/12',
            },
            {
                header: '행위자',
                accessorKey: 'stock',
                sortable: true,
                width: 'w-1/12',
            },
            {
                header: '내용',
                accessorKey: 'category',
                width: 'w-6/12',
            },

            {
                header: '파일',
                accessorKey: 'price',
                width: 'w-2/12',
            },
            {
                header: '비고',
                accessorKey: 'status',
                width: 'w-2/12',
            },
            // {
            //     header: '',
            //     id: 'action',
            // },
        ],
        []
    )

    return (
        <CueSheetDataTable
            ref={tableRef}
            columns={columns}
            // skeletonAvatarColumns={[0]}
            // skeletonAvatarProps={{
            //     className: 'rounded-md',
            // }}
        />
    )
}

export default CueSheetHeader
