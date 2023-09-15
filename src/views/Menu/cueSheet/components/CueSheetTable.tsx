import React, { useEffect, useMemo, useRef, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiPackage } from 'react-icons/fi'
import {
    getProducts,
    setTableData,
    setSelectedProduct,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import ProductDeleteConfirmation from './CueSheetDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import {
    DragDropContext,
    Droppable,
    DropResult,
    DraggableChildrenFn,
    Draggable,
} from 'react-beautiful-dnd'

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

const CueSheetTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesProductList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.salesProductList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.salesProductList.data.loading
    )

    const data = useAppSelector(
        (state) => state.salesProductList.data.productList
    )
    console.log(
        'data :',
        data.map((item, index) => [item, index])
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getProducts({ pageIndex, pageSize, sort, query, filterData }))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    const onDragEnd = (result: DropResult) => {
        const [updatelist, setUpdateList] = useState([])
        console.log('result ? : ', result)

        if (!result.destination) {
            return // 드래그 앤 드롭이 완료되지 않았을 때 반환
        }
        const currentTags = [...CueSheetTableList]
        const draggingItemIndex = result.source.index
        const afterDragItemIndex = result.destination.index

        const removeTag = currentTags.splice(beforeDragItemIndex, 1)

        currentTags.splice(afterDragItemIndex, 0, removeTag[0])

        setTags(currentTags)

        const { source, destination } = result
        console.log('source', source)
        console.log('destination', destination)

        const reorderedData = Array.from(data)
        console.log('reorderedData ', reorderedData.splice(source.index, 1))

        const [movedItem] = reorderedData.splice(source.index, 1) // 원래 위치에서 아이템을 제거
        reorderedData.splice(destination.index, 0, movedItem) // 새 위치에 아이템을 삽입
        console.log(reorderedData.splice(destination.index, 0, movedItem))

        // 여기서 reorderedData를 사용하여 새로운 데이터 상태를 업데이트할 수 있음
        // reorderedData를 Redux 상태에 업데이트하거나 필요한 작업을 수행하세요.

        // 예시: Redux 상태를 업데이트하는 방법 (필요에 따라 수정)
        setUpdateList()
    }

    return (
        <>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="CueSheetTableList">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="scrumboard flex flex-col flex-auto w-full h-full mb-2"
                        >
                            {data.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {/* {item.name} */}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {/* <DataTable
                ref={tableRef}
                columns={columns}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{
                    className: 'rounded-md',
                }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <ProductDeleteConfirmation /> */}
        </>
    )
}

export default CueSheetTable
