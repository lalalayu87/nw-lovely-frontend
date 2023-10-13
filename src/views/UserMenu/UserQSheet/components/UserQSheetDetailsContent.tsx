/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    DragDropContext,
    Droppable,
    DropResult,
    DraggableChildrenFn,
    Draggable,
} from 'react-beautiful-dnd'
import {
    HiOutlineUpload,
    HiOutlineTrash,
    HiPlusSm,
    HiOutlinePencil,
    HiExternalLink,
} from 'react-icons/hi'
import {
    toggleDeleteConfirmation,
    // toggleEditConfirmation,
    useAppDispatch,
    useAppSelector,
    getList,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate, useLocation } from 'react-router-dom'

import {
    apiGetQSheetCardDetails,
    apiPatchQSheetCardList,
} from '@/services/QSheetService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import Tooltip from '@/components/ui/Tooltip'
import Dialog from '@/components/ui/Dialog'
import { Formik, Field, Form } from 'formik'
import requiredFieldValidation from '@/utils/requiredFieldValidation'
import Input from '@/components/ui/Input'
import * as Yup from 'yup'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { Button } from '@/components/ui'
import USerQSheetDetatilsHeader from './UserQSheetDetatilsHeader'
import USerNewQSheetHeader from './UserNewQSheetHeader'
import { DataTableResetHandle } from '@/components/shared'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import { useReactToPrint } from 'react-to-print'

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

type QSheetDetailsResponse = {
    qsheetSeq: string
    name: string
    created_at: string
    data: []
    orgSeq: string
    userSeq: string
}

type DataContent = {
    actor: string
    content: string
    filePath: string
    note: string
    orderIndex: number
    process: string
}

// interface QSheetExampleData {
//     process: string
//     actor: string
//     content: string
//     filePath: string
//     note: string
//     orderIndex: number
//     memo: string
// }

// const initialData: QSheetExampleData = {
//     process: '',
//     actor: '',
//     content: '',
//     filePath: '',
//     note: '',
//     orderIndex: 1,
//     memo: '',
// }

const UserQSheetDetailsContent: React.FC = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()

    const columns: ColumnDef<qSheet>[] = useMemo(
        () => [
            {
                header: '절차',
                accessorKey: 'process',
                width: 'w-1/12',
            },
            {
                header: '행위자',
                accessorKey: 'actor',
                sortable: true,
                width: 'w-2/12',
            },
            {
                header: '내용',
                accessorKey: 'content',
                width: 'w-5/12',
            },

            {
                header: '파일',
                accessorKey: 'filePath',
                width: 'w-2/12',
            },
            {
                header: '비고',
                accessorKey: 'note',
                width: 'w-2/12',
            },
        ],
        []
    )

    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)

    const navigate = useNavigate()

    const onUpdate = async () => {
        const transformedData = dataContent.map((item) => ({
            data: [
                {
                    orderIndex: item.orderIndex,
                    process: item.process,
                    content: item.content,
                    actor: item.actor,
                    note: item.note,
                    filePath: item.filePath,
                },
            ],
        }))

        const body = {
            data: [],
        }

        for (let i = 0; i < transformedData.length; i++) {
            body.data.push(transformedData[i].data[0])
        }

        try {
            const response = await apiPatchQSheetCardList<ResponseType>(
                qsheetSeq,
                body
            )

            toast.push(
                <Notification title={'큐시트가 수정되었습니다.'} type="success">
                    큐시트가 수정되었습니다.
                </Notification>
            )

            navigate('/cuesheetUser')
        } catch (error) {
            console.error(error)
        }
    }

    const location = useLocation()

    const [loading, setLoading] = useState(true)

    const [dataList, setDataList] = useState<QSheetDetailsResponse>()
    const qsheetSeq = location.state.qsheetSeq

    const initialDataContent: DataContent[] = [
        {
            actor: '',
            content: '',
            filePath: '',
            note: '',
            orderIndex: 1,
            process: '',
        },
    ]

    const [dataContent, setDataContent] =
        useState<DataContent[]>(initialDataContent)

    console.log(dataContent)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = async () => {
        const qsheetSeq = location.state.qsheetSeq
        if (qsheetSeq) {
            setLoading(true)
            const response = await apiGetQSheetCardDetails<
                QSheetDetailsResponse,
                { qsheetSeq: string }
            >({ qsheetSeq })
            if (response) {
                const res = response.data
                const responseData = response.data?.data
                setLoading(false)
                setDataList(res)
                setDataContent(responseData)
            }
        }
    }

    const handleInputChange = (
        field: keyof QSheetExampleData,
        value: string,
        index: number
    ) => {
        console.log(dataList)
        const updatedDataList = [...dataContent]
        updatedDataList[index][field] = value
        setDataContent(updatedDataList)
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
        const newItems = [...dataContent]

        // 1. 변경시키는 아이템을 배열에서 지워줍니다.
        // 2. return 값으로 지워진 아이템을 잡아줍니다.
        const [reorderedItem] = newItems.splice(result.source.index, 1)

        // 원하는 자리에 reorderedItem을 insert 해줍니다.
        newItems.splice(result.destination.index, 0, reorderedItem)

        setDataList(newItems)
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

    const initialData: DataContent = {
        actor: '',
        content: '',
        filePath: '',
        note: '',
        orderIndex: 1,
        process: '',
    }

    const [newData, setNewData] = useState<DataContent>({
        ...initialData,
        orderIndex: 2,
    })

    const ActionColumn = ({ row }: { row: QSheetDetailsResponse }) => {
        const { textTheme } = useThemeClass()

        const onAdd = () => {
            const orderIndex = dataContent.length + 1 // 다음 행의 orderIndex를 설정
            const newDataItem = {
                actor: '',
                content: '',
                filePath: '',
                note: '',
                orderIndex,
                process: '',
            }
            // dataContent 배열에 새 데이터 아이템을 추가합니다.
            setDataContent([...dataContent, newDataItem])
        }

        const onEdit = () => {
            console.log('onEdit')
        }

        const onDelete = () => {
            //삭제할 데이터 찾기
            const rowData = dataContent.find(
                (item) => item.orderIndex === row.orderIndex
            )
            console.log(rowData)

            // 데이터를 삭제하고 업데이트된 배열을 생성합니다.
            const updatedData = dataContent.filter(
                (item) => item.orderIndex !== row.orderIndex
            )
            console.log(updatedData)

            setDataContent(updatedData)
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

                <Tooltip title="수정">
                    <span
                        className={`cursor-pointer p-2 hover:${textTheme}`}
                        onClick={() => onEdit()}
                    >
                        <HiOutlinePencil />
                    </span>
                </Tooltip>
                <Tooltip title="삭제">
                    <span
                        className="cursor-pointer p-2 hover:text-red-500"
                        onClick={() => onDelete()}
                    >
                        <HiOutlineTrash />
                    </span>
                </Tooltip>
            </div>
        )
    }

    const componentRef = useRef(null)

    const clickPrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Finaltempl',
    })

    return (
        <>
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">큐시트 내용</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-1">
                    <span>
                        <Button block size="sm" icon={<HiExternalLink />}>
                            공유
                        </Button>
                    </span>

                    <span>
                        <Button block size="sm" onClick={onUpdate}>
                            저장
                        </Button>
                    </span>
                    <span>
                        <Button
                            block
                            size="sm"
                            variant="twoTone"
                            // onClick={onUpdate}
                        >
                            최종확인
                        </Button>
                    </span>
                    <span>
                        <Button size="sm" onClick={clickPrint}>
                            인쇄
                        </Button>
                    </span>
                </div>
            </div>
            <div ref={componentRef} className="report-template">
                <table className="min-w-full divide-x divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700 ">
                        <tr>
                            {/* <th className="border-r border-gray-300"></th> */}
                            <th
                                // style={{ width: '209px' }}
                                className="px-2 w-1/12 py-3 text-center rtl:text-rightfont-semibold uppercase tracking-wider text-gray-500 dark:text-gray-100 border border-gray-300"
                            >
                                절차
                            </th>
                            <th className="px-2 w-2/12 py-3 text-center border border-gray-300">
                                행위자
                            </th>
                            <th className="px-2 w-5/12 py-3 text-center border border-gray-300">
                                내용
                            </th>
                            <th className="px-2 w-1/12 py-3 text-center border border-gray-300">
                                파일
                            </th>
                            <th className="px-2 w-2/12 py-3 text-center border border-gray-300">
                                비고
                            </th>
                            <th className="px-2 w-1/12 py-3 text-center border border-gray-300">
                                액션
                            </th>
                        </tr>
                    </thead>
                </table>

                <div>
                    {/* <table className="table-auto min-w-full divide-x divide-y divide-gray-200 dark:divide-gray-700">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700"> */}
                    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                        <Droppable droppableId="DetailsDroppable">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="DetailsDroppable"
                                >
                                    {dataContent.map((data, index) => (
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
                                                                    &nbsp;&nbsp;
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
                    {/* </tbody>
                </table> */}
                </div>
            </div>
        </>
    )
}

export default UserQSheetDetailsContent
