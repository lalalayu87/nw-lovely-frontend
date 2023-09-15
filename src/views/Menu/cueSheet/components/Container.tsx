import update from 'immutability-helper'
import { useCallback, useState, useMemo, useEffect, useRef } from 'react'
import { Card } from './Card'
import type {
    ColumnDef,
    DataTableResetHandle,
} from '@/components/shared/DataTable'
import { Badge } from '@/components/ui'
import {
    getProducts,
    useAppDispatch,
    toggleDeleteConfirmation,
    setSelectedProduct,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import DataTable from '@/components/shared/DataTable'
import CueSheettDeleteConfirmation from './CueSheetDeleteConfirmation'

const style = {
    width: '1560px',
}

type Product = {
    id: string
    name: string
    productCode: string
    img: string
    category: string
    price: number
    stock: number
    status: number
}

const inventoryStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: {
        label: 'In Stock',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Limited',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: {
        label: 'Out of Stock',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const ActionColumn = ({ row }: { row: Product }) => {
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

export const Container = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesProductList.data.tableData
    )

    const loading = useAppSelector(
        (state) => state.salesProductList.data.loading
    )

    const data = useAppSelector(
        (state) => state.salesProductList.data.productList
    )

    const filterData = useAppSelector(
        (state) => state.salesProductList.data.filterData
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    const fetchData = () => {
        dispatch(getProducts({ pageIndex, pageSize, sort, query, filterData }))
    }

    const columns: ColumnDef<Product>[] = useMemo(
        () => [
            {
                header: '순서',
                accessorKey: 'name',
                // cell: (props) => {
                //     const row = props.row.original
                //     return <ProductColumn row={row} />
                // },
            },
            {
                header: '대본',
                accessorKey: 'category',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.category}</span>
                },
            },
            {
                header: '행위자',
                accessorKey: 'stock',
                sortable: true,
            },
            {
                header: '비고',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <Badge
                                className={
                                    inventoryStatusColor[status].dotClass
                                }
                            />
                            <span
                                className={`capitalize font-semibold ${inventoryStatusColor[status].textClass}`}
                            >
                                {inventoryStatusColor[status].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: '파일',
                accessorKey: 'price',
                cell: (props) => {
                    const { price } = props.row.original
                    return <span>${price}</span>
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    // const onPaginationChange = (page: number) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageIndex = page
    //     dispatch(setTableData(newTableData))
    // }

    // const onSelectChange = (value: number) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageSize = Number(value)
    //     newTableData.pageIndex = 1
    //     dispatch(setTableData(newTableData))
    // }

    // const onSort = (sort: OnSortParam) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.sort = sort
    //     dispatch(setTableData(newTableData))
    // }

    const [cards, setCards] = useState([
        {
            id: 1,
            text: 'Write a cool JS library',
        },
        {
            id: 2,
            text: 'Make it generic enough',
        },
        {
            id: 3,
            text: 'Write README',
        },
        {
            id: 4,
            text: 'Create some examples',
        },
        {
            id: 5,
            text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        },
        {
            id: 6,
            text: '???',
        },
        {
            id: 7,
            text: 'PROFIT',
        },
    ])
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            })
        )
    }, [])
    const renderCard = useCallback((card, index) => {
        return (
            <Card
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                moveCard={moveCard}
            />
        )
    }, [])

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                // skeletonAvatarColumns={[0]}
                // skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                // pagingData={{
                //     total: tableData.total as number,
                //     pageIndex: tableData.pageIndex as number,
                //     pageSize: tableData.pageSize as number,
                // }}
                // onPaginationChange={onPaginationChange}
                // onSelectChange={onSelectChange}
                // onSort={onSort}
            />

            <div style={style}>
                {cards.map((card, i) => renderCard(card, i))}
            </div>
            {/* <CueSheettDeleteConfirmation /> */}
        </>
    )
}
