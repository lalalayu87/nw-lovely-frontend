import React, { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import { getProducts, useAppDispatch, useAppSelector } from '../store'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'

type cueSheet = {
    id: string
    name: string
    productCode: string
    img: string
    category: string
    price: number
    stock: number
    status: number
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
            {
                header: '순서',
                accessorKey: 'name',
            },
            {
                header: '대본',
                accessorKey: 'category',
            },
            {
                header: '행위자',
                accessorKey: 'stock',
                sortable: true,
            },
            {
                header: '비고',
                accessorKey: 'status',
            },
            {
                header: '파일',
                accessorKey: 'price',
            },
            {
                header: '',
                id: 'action',
            },
        ],
        []
    )

    return (
        <DataTable
            ref={tableRef}
            columns={columns}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{
                className: 'rounded-md',
            }}
        />
    )
}

export default CueSheetHeader
