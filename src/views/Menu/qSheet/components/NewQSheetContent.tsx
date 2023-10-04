/* eslint-disable react/jsx-key */
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    Suspense,
    lazy
} from 'react'
import {
    DragDropContext,
    Droppable,
    DropResult,
    DraggableChildrenFn,
    Draggable
} from 'react-beautiful-dnd'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
    toggleDeleteConfirmation,
    // toggleEditConfirmation,
    useAppDispatch,
    useAppSelector
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'

interface QSheetExampleData {
    process: string
    actor: string
    content: string
    filePath: string
    note: string
    orderIndex: number
}
const style = {
    border: '1px dashed gray',
    padding: '2.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move'
}

const NewQSheetContent = () => {
    const dataList = {
        process: '행진'
    }
    const dispatch = useAppDispatch()

    const loading = useAppSelector((state) => state.qsheetDataList.data.loading)

    const initialQSheetExampleData: QSheetExampleData[] = [
        {
            process: '식전 안내',
            actor: '사회자',
            content:
                '잠시 후 신랑 OOO군과 신부 OOO양의 결혼식이 진행될 예정이오니 내빈 여러분께서는 식장 안에 마련된 좌석에 앉아 주시기 바랍니다. 경건한 예식을 위해 휴대전화는 진동으로 해주시기 바랍니다.',
            filePath: '',
            note: '',
            orderIndex: 1
        },
        {
            process: '개회사',
            actor: '사회자',
            content:
                '공사다망 하신 가운데 신랑 OOO군과 신부 OOO양의 성스러운 결혼식을 축하하기 위하여 참석해 주신 내빈 여러분께 양가를 대신하여 무한한 감사에 말씀을 드립니다. 그럼 지금부터 신랑 OOO군과 신부 OOO양의 결혼식을 거행하겠습니다.',
            filePath: '',
            note: '',
            orderIndex: 2
        },
        {
            process: '화촉점화',
            actor: '사회자, 양가 어머님',
            content:
                '먼저 오늘의 소중한 예식을 위하여 양가 어머님들께서 단상 위에 마련된 촛불을 밝히시겠습니다. 하객여러분! 양가 어머님들께서 입장 하실 때 뜨거운 박수를 부탁드립니다. “양가 어머님 입장!”',
            filePath: '',
            note: '',
            orderIndex: 3
        },
        {
            process: '주례 소개',
            actor: '사회자',
            content:
                '다음은 오늘 결혼식의 주례를 맡아 주실 주례선생님을 소개하겠습니다. 오늘 주례를 맡아 주신 선생님은 (주례약력소개) 이십니다. 큰 박수로 주례선생님을 모시겠습니다.',
            filePath: '',
            note: '',
            orderIndex: 4
        },
        {
            process: '신랑 입장',
            actor: '사회자, 신랑',
            content:
                '그럼 오늘의 주인공인 신랑 입장이 있겠습니다. 큰박수로 신랑을 맞이하여 주십시오. “신랑 입장 ~!”',
            filePath: '',
            note: '',
            orderIndex: 5
        },
        {
            process: '신부 입장',
            actor: '사회자',
            content:
                '이어서 오늘 결혼식의 꽃인 아름다운 신부 입장이 있겠습니다. 모두들 뒤를 바라봐 주시길 바랍니다. 다시 한번 큰 박수로 신부를 맞이하여 주십시오. “신부 입장~!”',
            filePath: '',
            note: '',
            orderIndex: 6
        },
        {
            process: '맞절',
            actor: '사회자, 주례자, 신랑, 신부',
            content:
                '(주례 진행) 다음은 여러 증인과 가족 앞에서 부부의 예를 드리는 맞절의 순서가 있겠습니다. (주례선생님 유도 하에 서로 마주 보게 할것) "신랑, 신부 맞절"',
            filePath: '',
            note: '',
            orderIndex: 7
        }
    ]

    const [qSheetExampleData, setQSheetExampleData] = useState<
        QSheetExampleData[]
    >(initialQSheetExampleData)

    const onDragEnd = (result: DropResult) => {
        console.log(result)
        // 드래그가 취소된 경우
        if (!result.destination) return

        // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
        const newItems = [...qSheetExampleData]

        // 1. 변경시키는 아이템을 배열에서 지워줍니다.
        // 2. return 값으로 지워진 아이템을 잡아줍니다.
        const [reorderedItem] = newItems.splice(result.source.index, 1)

        // 원하는 자리에 reorderedItem을 insert 해줍니다.
        newItems.splice(result.destination.index, 0, reorderedItem)

        setQSheetExampleData(newItems)
    }

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

    const ActionColumn = ({ row }: { row: QSheetExampleData }) => {
        const dispatch = useAppDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const onEdit = () => {
            // navigate(`/app/sales/product-edit/${row.id}`)
        }

        const onDelete = () => {
            dispatch(toggleDeleteConfirmation(true))
            // dispatch(setSelectedProduct(row.orderIndex))
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

    return (
        <>
            {' '}
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="CueSheetDroppable">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="CueSheetDroppable pt-3"
                        >
                            {qSheetExampleData.map((item, index) => (
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
                                                    <div className="w-2/12">
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
                                                    <div className="w-5/12">
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
            </DragDropContext>{' '}
        </>
    )
}

export default NewQSheetContent
