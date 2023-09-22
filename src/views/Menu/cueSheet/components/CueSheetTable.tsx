/* eslint-disable react/jsx-key */
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    Suspense,
    lazy,
} from 'react'
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
    toggleEditConfirmation,
    useAppDispatch,
    useAppSelector,
    closeDialog,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import CueSheetDeleteConfirmation from './CueSheetDeleteConfirmation'
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
import CueSheetDataTable from './CueSheetDataTable'
import CueSheetHeader from './CueSheetHeader'
import Dialog from '@/components/ui/Dialog'
import axios from 'axios'
import CueSheetEditConfirmation from './CueSheetEditConfirmation'

const style = {
    border: '1px dashed gray',
    padding: '2.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
}

// type cueSheet = {
//     id: string
//     process: string
//     performer: string
//     text: string
//     file: string
//     note: string
// }

type cards = {
    id: string
    process: string
    performer: string
    text: string
    file: File
    note: string
}

interface CueSheetData {
    process: string
    actor: string
    content: string
    filePath: string
    note: string
    orderIndex: number
}

// const inventoryStatusColor: Record<
//     number,
//     {
//         label: string
//         dotClass: string
//         textClass: string
//     }
// > = {
//     0: {
//         label: 'In Stock',
//         dotClass: 'bg-emerald-500',
//         textClass: 'text-emerald-500'
//     },
//     1: {
//         label: 'Limited',
//         dotClass: 'bg-amber-500',
//         textClass: 'text-amber-500'
//     },
//     2: {
//         label: 'Out of Stock',
//         dotClass: 'bg-red-500',
//         textClass: 'text-red-500'
//     }
// }

const AddCueSheetContent = lazy(() => import('./AddCueSheetContent'))

const ActionColumn = ({ row }: { row: CueSheetData }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        // navigate(`/app/sales/product-edit/${row.id}`)
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.orderIndex))
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

    const [cueSheetData, setCueSheetData] = useState<CueSheetData[]>([])

    const { accessToken } = useAppSelector((state) => state.auth.session)
    const cueSheetDataAPI = async () => {
        try {
            const response = await axios.get(
                `http://152.69.228.245:10001/api/v1/qsheet`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
                    },
                }
            )

            if (Array.isArray(response.data.content)) {
                const responseData = response.data.content.map(
                    (item: any) => item.data
                )
                const content = responseData.map((data: any) => data)
                const cueSheetData: CueSheetData[] = content[0]
                setCueSheetData(cueSheetData)
            } else {
                return
            }
            // API에서 받은 데이터를 CueSheetData[] 형식으로 반환
        } catch (error) {
            // 에러 처리
            console.error('cueSheet 데이터를 불러오는 중 에러 발생:', error)
            throw error
        }
    }

    const onDragEnd = (result: DropResult) => {
        console.log(result)
        // 드래그가 취소된 경우
        if (!result.destination) return

        // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
        const newItems = [...cueSheetData]

        // 1. 변경시키는 아이템을 배열에서 지워줍니다.
        // 2. return 값으로 지워진 아이템을 잡아줍니다.
        const [reorderedItem] = newItems.splice(result.source.index, 1)

        // 원하는 자리에 reorderedItem을 insert 해줍니다.
        newItems.splice(result.destination.index, 0, reorderedItem)

        setCueSheetData(newItems)
    }

    const dialogOpen = useAppSelector(
        (state) => state.salesProductList.data.dialogOpen
    )

    const dialogView = useAppSelector(
        (state) => state.salesProductList.data.dialogView
    )

    const onDialogClose = () => {
        dispatch(closeDialog())
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    useEffect(() => {
        cueSheetDataAPI()
        //왜 자꾸 POST도 호출이 되지??
    }, [])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fontColor = (e: string | void) => {
        if (e === '신랑') {
            return 'm-2 bg-blue-200 border-blue-500 w-10 rounded-lg border-2 text-blue-500 text-center'
        } else if (e === '신부') {
            return 'm-2 bg-red-200 border-red-500 w-10 rounded-lg border-2 text-red-500 text-center'
        } else if (e === '신부 어머니') {
            return 'm-2 bg-amber-100 border-amber-500 w-20 rounded-lg border-2 text-amber-500 text-center'
        } else if (e === '신랑 어머니') {
            return 'm-2 bg-indigo-200 border-indigo-500 w-20 rounded-lg border-2 text-indigo-500 text-center'
        } else if (e === '신부 아버지') {
            return
        } else if (e === '신랑 아버지') {
            return
            // eslint-disable-next-line no-constant-condition
        } else if (e === '사회자' || '축가자' || '주례자') {
            return 'm-2 bg-violet-200 border-violet-500 w-12 rounded-lg border-2 text-violet-500 text-center'
        } else {
            return 'text-purple-600'
        }
    }

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

    console.log(cueSheetData)
    return (
        <>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="CueSheetDroppable">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="CueSheetDroppable pt-3"
                        >
                            {cueSheetData.map((item, index) => (
                                <Draggable
                                    key={item.orderIndex}
                                    draggableId={String(item.orderIndex)}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div style={style}>
                                                <div className="flex">
                                                    <div className="w-1/12 font-semibold">
                                                        {item.process}
                                                    </div>
                                                    <div className="w-1/1">
                                                        {item.actor
                                                            .split(', ')
                                                            .map((e) => (
                                                                <div
                                                                    className={fontColor(
                                                                        e
                                                                    )}
                                                                >
                                                                    {e}
                                                                </div>
                                                            ))}
                                                    </div>
                                                    <div className="w-6/12">
                                                        {item.content}
                                                    </div>
                                                    <div className="w-2/12">
                                                        {item.filePath}
                                                    </div>
                                                    <div className="w-2/12">
                                                        {item.note}
                                                    </div>
                                                </div>
                                                {/* ActionColumn을 사용하여 수정 및 삭제 기능 추가 */}
                                                <ActionColumn
                                                    row={item}
                                                    // onClick={onDeleteClick}
                                                    // index={orderIndex}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Dialog
                isOpen={dialogOpen}
                width={400}
                // closable={dialogView !== 'TICKET'}
                onClose={onDialogClose}
                // onRequestClose={onDialogClose}
            >
                <Suspense fallback={<></>}>
                    {dialogView === 'NEW_COLUMN' && <AddCueSheetContent />}
                </Suspense>
            </Dialog>
            <CueSheetDeleteConfirmation />
            {/* <CueSheetEditConfirmation /> */}
            {/* <DataTable
                ref={tableRef}
                columns={columns}
                data={cards}

                // skeletonAvatarColumns={[0]}
                // skeletonAvatarProps={{
                //     className: 'rounded-md',
                // }}
                // loading={loading}
                // pagingData={{
                //     total: tableData.total as number,
                //     pageIndex: tableData.pageIndex as number,
                //     pageSize: tableData.pageSize as number,
                // }}
                // onPaginationChange={onPaginationChange}
                // onSelectChange={onSelectChange}
                // onSort={onSort}
            />
            <ProductDeleteConfirmation /> */}
        </>
    )
}

export default CueSheetTable
