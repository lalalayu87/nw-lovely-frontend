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
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const style = {
    width: '1560px',
}

type Product = {
    id: string
    process: string
    performer: string
    text: string
    file: string
    note: string
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
                accessorKey: 'id',
                // cell: (props) => {
                //     const row = props.row.original
                //     return <ProductColumn row={row} />
                // },
            },
            {
                header: '절차',
                accessorKey: 'process',
                sortable: true,
            },
            {
                header: '행위자',
                accessorKey: 'performer',
                sortable: true,
            },
            {
                header: '대본',
                accessorKey: 'text',
                // cell: (props) => {
                //     const row = props.row.original
                //     return <span className="capitalize">{row.category}</span>
                // },
            },
            {
                header: '파일',
                accessorKey: 'file',
                sortable: true,
            },
            {
                header: '비고',
                accessorKey: 'note',
                sortable: true,
            },

            // {
            //     header: '비고',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const { status } = props.row.original
            //         return (
            //             <div className="flex items-center gap-2">
            //                 <Badge
            //                     className={
            //                         inventoryStatusColor[status].dotClass
            //                     }
            //                 />
            //                 <span
            //                     className={`capitalize font-semibold ${inventoryStatusColor[status].textClass}`}
            //                 >
            //                     {inventoryStatusColor[status].label}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
            // {
            //     header: '파일',
            //     accessorKey: 'price',
            //     cell: (props) => {
            //         const { price } = props.row.original
            //         return <span>${price}</span>
            //     },
            // },
            // {
            //     header: '',
            //     id: 'action',
            //     cell: (props) => <ActionColumn row={props.row.original} />,
            // },
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

    // const [cards, setCards] = useState([
    //     {
    //         id: 1,
    //         text: 'Write a cool JS library',
    //     },
    //     {
    //         id: 2,
    //         text: 'Make it generic enough',
    //     },
    //     {
    //         id: 3,
    //         text: 'Write README',
    //     },
    //     {
    //         id: 4,
    //         text: 'Create some examples',
    //     },
    //     {
    //         id: 5,
    //         text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    //     },
    //     {
    //         id: 6,
    //         text: '???',
    //     },
    //     {
    //         id: 7,
    //         text: 'PROFIT',
    //     },
    // ])
    const [cards, setCards] = useState([
        {
            id: 1,
            process: '개식예고',
            performer: '신랑, 신부',
            text: '잠시 후 신랑 xxx군과 신부 xxx양의 결혼식을 거행하려 하오니 양가 가족 및 내빈 여러분께서는 식장 안으로 입장하셔서 자리에 착석하여 주시기 바랍니다. 또한 성스러운 결혼식 진행을 위해 소지하고 계신 휴대폰은 모두 진동으로 바꿔주시면 감사하겠습니다. (반복 안내)',
            file: '',
            note: '',
        },
        {
            id: 2,
            process: '개식사',
            performer: '신랑, 신부',
            text: '지금부터 양가 어르신들과 일가친척 그리고 내빈 여러분을 모신 가운데 신랑 xxx군과 신부 xxx양의 성스러운 결혼식을 시작하겠습니다. 경건한 마음으로 지켜봐 주시기 바랍니다. 아울러 바쁘신 중에도 신랑, 신부의 결혼을 축하해 주시기 위해 이 자리에 참석해 주신 모든 분들께 감사드립니다.',
            file: '',
            note: '',
        },
        {
            id: 3,
            process: '화촉점화',
            performer: '양가 어머님',
            text: '먼저 신랑신부의 앞길을 밝힐 화촉점화 순서가 있겠습니다. 양가 어머님께서 초에 불을 밝히실 때 축하의 마음으로 많은 박수 부탁드립니다. 양가 어머님 입장!! (박수 유도)(화촉점화 후) 멋진 신랑과 아름다운 신부를 훌륭하게 키워주신 양가 어머님께 다시 한 번 큰 박수 부탁드리겠습니다.',
            file: '',
            note: '',
        },
        {
            id: 4,
            process: '주례자 소개',
            performer: '주례자',
            text: '다음은 오늘 결혼식의 주례를 맡아 주실 xxx 선생님을 소개하겠습니다. (주례 선생님 약력 및 직함 소개)',
            file: '',
            note: '',
        },
        {
            id: 5,
            process: '신랑 입장',
            performer: '신랑',
            text: '자, 이어 오늘의 주인공 중 한 사람인 신랑 입장이 있겠습니다. 하객 여러분들은 뜨거운 박수로 오늘의 신랑을 축하해 주시기 바랍니다. 신랑 입장! (박수 유도)',
            file: '',
            note: '',
        },
        {
            id: 6,
            process: '신부 입장',
            performer: '신부',
            text: '다음으로 오늘의 주인공인 아름다운 신부를 소개해드리겠습니다. 오늘 그 누구보다 빛날, 아름다운 신부가 입장할 때 뜨거운 박수로 맞이하여 주십시오. 신부 입장! (박수 유도)',
            file: '',
            note: '',
        },
        {
            id: 7,
            process: '맞절',
            performer: '신랑, 신부',
            text: '방금 입장을 마친 신랑, 신부가 세상에서 가장 중요하고 아름다운 약속 장소에 섰습니다. 가족분들과 내빈여러분 앞에서 성인의 예를 드리는 맞절 순서가 있겠습니다.  신랑 신부는 서로 마주봐 주시기 바랍니다. 신랑 신부 맞절~!',
            file: '',
            note: '',
        },
        {
            id: 8,
            process: '혼인서약',
            performer: '신랑, 신부, 주례자',
            text: '이번 순서는 신랑, 신부 혼인서약이 있겠습니다. 먼저 주례 선생님께서 혼인 서약서를 낭독해 주시겠습니다. (주례 진행 : 혼인서약 문답)',
            file: '',
            note: '',
        },
        {
            id: 9,
            process: '성혼선언문',
            performer: '주례자',
            text: '이어 두 사람이 완전한 부부 됨을 선언하는 성혼선언문 낭독이 있겠습니다. (주례 진행 : 성혼선언문 낭독)',
            file: '',
            note: '',
        },
        {
            id: 10,
            process: '주례사',
            performer: '신랑, 신부',
            text: '이제 주례선생님께서 새롭게 시작하는 신랑, 신부를 위해 소중한 말씀을 해주시겠습니다. (주례사 끝난 후) 두 사람의 앞날에 귀감이 될 소중한 말씀해 주신 주례선생님께 감사의 박수 부탁드립니다.',
            file: '',
            note: '',
        },
        {
            id: 11,
            process: '축가',
            performer: '축가자',
            text: '이어서 두 사람이 하나가 된 기쁜 순간을 축하하기 위한 축하무대가 있겠습니다. 큰 박수로 맞이해 주세요.',
            file: '',
            note: '',
        },
        {
            id: 12,
            process: '인사',
            performer: '신랑, 신부',
            text: '(신부 부모님께 인사 → 신랑 부모님께 인사 → 내빈께 인사) 이제 오늘이 있기까지 길러주신 부모님과 바쁘신중에도 참석해주신 하객여러분께 감사의 인사를 드리겠습니다.(사회자 멘트)먼저 신부 부모님께 오늘이 있기까지 낳아주시고 키워주신 은혜에 감사하며 인사를 올리겠습니다. 신랑, 신부 부모님께 인사 다음은 신랑 부모님께 많은 사랑을 쏟아 키워주신 은혜에 감사하며 인사를 올리겠습니다. 신랑, 신부 부모님께 인사 / 신랑신부는 내빈석을 향해 서주시길 바랍니다. 바쁘신 와중에도 오늘처럼 기쁘고 소중한 날을 함께 해주신 내빈 여러분께 감사드리며 인사드리겠습니다. 내빈 여러분께서는 큰 박수로 답례하여 주시면 감사하겠습니다. 신랑, 신부 내빈 여러분께 인사',
            file: '',
            note: '',
        },
        {
            id: 13,
            process: '행진',
            performer: '신랑, 신부',
            text: '이제 신랑, 신부가 하객 여러분의 축복을 받으며 인생의 새로운 출발을 위해 힘찬 행진을 하겠습니다. 내빈 여러분께서는 새로운 인생을 시작하는 이들 부부의 첫 출발에 아낌없는 격려와 뜨거운 축복의 박수를 부탁드립니다. 신랑,신부행진! (박수 유도)',
            file: '',
            note: '',
        },
        {
            id: 14,
            process: '폐회식',
            performer: '',
            text: '이상으로 결혼식을 모두 마치겠습니다. 참석해 주신 하객 여러분 가정에도 만복이 항상 함께 하기를 기원합니다. 대단히 감사합니다. 곧이어 사진 촬영이 있을 예정이오니 일가친척, 친구, 직장동료께서는 잠시 기다리셔서 기념사진 촬영에 협조 부탁드리겠습니다.  식사를 하실 분들께서는 식권을 지참하시고 같은 층에 마련된 피로연장을 이용하시기 바랍니다. 감사합니다.',
            file: '',
            note: '',
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

    const onDragEnd = (result) => {
        if (!result.destination) return

        const newCards = [...cards]
        const [draggedCard] = newCards.splice(result.source.index, 1)
        newCards.splice(result.destination.index, 0, draggedCard)
        setCards(newCards)
    }

    return (
        <>
            {/* {(provided) => <DataTable columns={columns} data={cards} />} */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="cards">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="pt-3"
                        >
                            {cards.map((item, index) => (
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
                                            <div style={style}>
                                                <>{item.id}</>
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

            {/* <DataTable
                ref={tableRef}
                columns={columns}
                data={cards}
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
            /> */}

            {/* <div style={style}>
                {cards.map((card, i) => renderCard(card, i))}
            </div> */}
            {/* <CueSheettDeleteConfirmation /> */}
        </>
    )
}
