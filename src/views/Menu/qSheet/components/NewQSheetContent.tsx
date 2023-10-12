/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import {
    DragDropContext,
    Droppable,
    DropResult,
    DraggableChildrenFn,
    Draggable,
} from 'react-beautiful-dnd'
// import '@/assets/styles/components/_tables.css'
import { Tooltip } from '@/components/ui'
import {
    HiOutlinePencil,
    HiOutlineTrash,
    HiPlusSm,
    HiOutlineUpload,
} from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import NewQSheetHeader from './NewQSheetHeader'

const inputStyle = {
    // border: '1px solid #ccc'
    borderRadius: '4px',
    padding: '5px',
    margin: '5px',
    outline: 'none',
    width: '95%',
}

const contentInputStyle = {
    // border: '1px solid #ccc'
    borderRadius: '4px',
    padding: '5px',
    margin: '5px',
    outline: 'none',
    width: '95%',
}
interface QSheetExampleData {
    process: string
    actor: string
    content: string
    filePath: string
    note: string
    orderIndex: number
    memo: string
}

const initialData: QSheetExampleData = {
    process: '',
    actor: '',
    content: '',
    filePath: '',
    note: '',
    orderIndex: 1,
    memo: '',
}

const NewQSheetContent: React.FC = () => {
    const [dataList, setDataList] = useState<QSheetExampleData[]>([initialData])
    const [newData, setNewData] = useState<QSheetExampleData>({
        ...initialData,
        orderIndex: 2,
    })

    // const handleAddData = () => {
    //     setNewData({
    //         ...newData,
    //         orderIndex: newData.orderIndex + 1,
    //     })
    //     setDataList([...dataList, newData])
    // }

    const handleInputChange = (
        field: keyof QSheetExampleData,
        value: string,
        index: number
    ) => {
        console.log(dataList)
        const updatedDataList = [...dataList]
        updatedDataList[index][field] = value
        setDataList(updatedDataList)
    }

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedDataList = [...dataList]
        const file = e.target.files[0]
        if (file) {
            updatedDataList[index].filePath = file.name
        }
        setDataList(updatedDataList)
    }

    const onDragEnd = (result: DropResult) => {
        console.log(result)
        // 드래그가 취소된 경우
        if (!result.destination) return

        // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
        const newItems = [...dataList]

        // 1. 변경시키는 아이템을 배열에서 지워줍니다.
        // 2. return 값으로 지워진 아이템을 잡아줍니다.
        const [reorderedItem] = newItems.splice(result.source.index, 1)

        // 원하는 자리에 reorderedItem을 insert 해줍니다.
        newItems.splice(result.destination.index, 0, reorderedItem)

        setDataList(newItems)
    }

    // const ActionColumn = ({ row }: { row: QSheetDetailsResponse }) => {
    const ActionColumn = ({ row }: { row: QSheetExampleData }) => {
        const { textTheme } = useThemeClass()

        const onAdd = () => {
            console.log('add')
            setNewData({
                ...newData,
                orderIndex: newData.orderIndex + 1,
            })
            setDataList([...dataList, newData])
        }

        const onDelete = (orderIndex: number) => {
            //삭제할 데이터 찾기
            const rowData = dataList.find(
                (item) => item.orderIndex === row.orderIndex
            )
            console.log(rowData)

            // 데이터를 삭제하고 업데이트된 배열을 생성합니다.
            const updatedData = dataList.filter(
                (item) => item.orderIndex !== row.orderIndex
            )
            console.log(updatedData)

            setDataList(updatedData)
        }

        return (
            <div className="flex justify-normal text-lg">
                <Tooltip title="추가">
                    <span
                        className={`cursor-pointer p-2 hover:${textTheme}`}
                        onClick={() => onAdd()}
                    >
                        <HiPlusSm />
                    </span>
                </Tooltip>
                &nbsp;
                {/* <Tooltip title="수정">
                    <span
                        className={`cursor-pointer p-2 hover:${textTheme}`}
                        onClick={() => onEdit()}
                    >
                        <HiOutlinePencil />
                    </span>
                </Tooltip> */}
                <Tooltip title="삭제">
                    <span
                        className="cursor-pointer p-2 hover:text-red-500"
                        onClick={() => onDelete(row.orderIndex)}
                    >
                        <HiOutlineTrash />
                    </span>
                </Tooltip>
            </div>
        )
    }

    return (
        <>
            {/* <button onClick={handleAddData}>추가</button> */}
            <NewQSheetHeader />
            <div>
                <table className="table-auto min-w-full divide-x divide-y divide-gray-200 dark:divide-gray-700">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <DragDropContext
                            onDragEnd={(result) => onDragEnd(result)}
                        >
                            <Droppable droppableId="DetailsDroppable">
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="DetailsDroppable"
                                    >
                                        {dataList.map((data, index) => (
                                            <Draggable
                                                key={data.orderIndex}
                                                draggableId={String(
                                                    data.orderIndex
                                                )}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <>
                                                            <tr key={index}>
                                                                {/* 절차 */}
                                                                <td className="border border-gray-300 w-1/12 py-2">
                                                                    <input
                                                                        type="text"
                                                                        style={
                                                                            inputStyle
                                                                        }
                                                                        value={
                                                                            data.process
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleInputChange(
                                                                                'process',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                                index
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                                {/* 행위자 */}
                                                                <td className="border border-gray-300 w-2/12 py-2">
                                                                    <input
                                                                        type="text"
                                                                        style={
                                                                            inputStyle
                                                                        }
                                                                        value={
                                                                            data.actor
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleInputChange(
                                                                                'actor',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                                index
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                                {/* 내용 */}
                                                                <td className="border border-gray-300 w-5/12 py-2">
                                                                    <input
                                                                        type="text"
                                                                        style={
                                                                            contentInputStyle
                                                                        }
                                                                        value={
                                                                            data.content
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleInputChange(
                                                                                'content',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                                index
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                                {/* 파일 */}
                                                                <td className="border border-gray-300 w-1/12 py-2">
                                                                    <div>
                                                                        <input
                                                                            type="file"
                                                                            style={{
                                                                                display:
                                                                                    'none',
                                                                            }}
                                                                            id={`fileInput-${index}`}
                                                                            accept="application/pdf"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleFileChange(
                                                                                    e,
                                                                                    index
                                                                                )
                                                                            }
                                                                        />
                                                                        <label
                                                                            htmlFor={`fileInput-${index}`}
                                                                            className="cursor-pointer flex items-center "
                                                                        >
                                                                            &nbsp;
                                                                            &nbsp;
                                                                            <HiOutlineUpload className="text-2xl mr-1" />
                                                                            파일
                                                                            올리기
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                {/* 비고 */}
                                                                <td className="border border-gray-300 w-2/12 py-2">
                                                                    <input
                                                                        type="text"
                                                                        style={
                                                                            inputStyle
                                                                        }
                                                                        value={
                                                                            data.note
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleInputChange(
                                                                                'note',
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                                index
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                                <td className="border border-gray-300 w-1/12 py-2">
                                                                    <div className="flex items-center">
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        <ActionColumn
                                                                            row={
                                                                                data
                                                                            }
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default NewQSheetContent
