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
import axios from 'axios'
import { SERVER_URL } from '../../../../../config'

const inputStyle = {
    // border: '1px solid #ccc'
    borderRadius: '4px',
    padding: '5px',
    margin: '5px',
    outline: 'none',
    width: '95%',
}

const readOnlyStyle = {
    borderRadius: '4px',
    padding: '5px',
    margin: '5px',
    width: '95%',
    border: '1px solid rgb(209 213 219)',
    backgroundColor: 'white',
}

const actorInputStyle = {
    borderRadius: '4px',
    padding: '5px',
    margin: '5px',
    outline: 'none',
    width: '95%',
    border: '1px solid rgb(209 213 219)',
    backgroundColor: 'white',
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
    memo: string
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
    readOnly: boolean // readOnly 속성 추가
    memo: string
}

// const initialData: QSheetExampleData = {
//     process: '',
//     actor: '',
//     content: '',
//     filePath: '',
//     note: '',
//     orderIndex: 1,
//     memo: '',
// }

const UserQSheetDetailsContent = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()
    const [applyCustomStyle, setApplyCustomStyle] = useState(false)

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
                setDataContent(
                    responseData.map((data) => {
                        return { ...data, readOnly: true }
                    })
                )
            }
        }
    }

    const location = useLocation()

    const [loading, setLoading] = useState(true)

    const [dataList, setDataList] = useState<QSheetDetailsResponse>()

    const qsheetSeq = location.state.qsheetSeq
    const orgSeq = dataList?.orgSeq?.orgSeq
    const secretMemo = dataList?.memo

    const initialDataContent: DataContent[] = [
        {
            actor: '',
            content: '',
            filePath: '',
            note: '',
            orderIndex: 1,
            process: '',
            readOnly: false, // 처음에는 수정 가능하게 시작
            memo: '', // memo: 추가
        },
    ]

    const [dataContent, setDataContent] =
        useState<DataContent[]>(initialDataContent)

    const columns: ColumnDef<qSheet>[] = useMemo(
        () => [
            {
                header: '식순명',
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userSeq = (persistData as any).auth.user.userSeq
    console.log(dataContent)

    const navigate = useNavigate()

    const onUpdate = async () => {
        // 빈 행인지 확인하는 로직
        const hasEmptyRow = dataContent.some(
            (item) =>
                item.process.trim() === '' &&
                item.actor.trim() === '' &&
                item.content.trim() === '' &&
                item.note.trim() === '' &&
                !fileInputs[item.orderIndex - 1] // 해당 행의 파일이 없는 경우
        )

        if (hasEmptyRow) {
            toast.push(
                <Notification title={'실패'} type="warning">
                    입력되지 않은 행이 있습니다.
                </Notification>
            )
            return // 빈 행이 있을 경우 함수 종료
        }
        const qsheetData = {
            orgSeq: orgSeq,
            data: [],
            memo: secretMemo,
        }
        // console.log(secretMemo)
        const addData = []
        const formData = new FormData()

        for (let i = 0; i < dataContent.length; i++) {
            const item = dataContent[i]
            const updatedFilePath = fileInputs[i]
                ? `${item.process}_${fileInputs[i].name}`
                : item.filePath

            const requestData = dataContent.map((item) => ({
                orderIndex: item.orderIndex,
                process: item.process,
                content: item.content,
                actor: item.actor,
                note: item.note,
                filePath: updatedFilePath,
                memo: item.memo,
            }))
            console.log(dataContent.map((i) => i.memo))
            qsheetData.data = qsheetData.data.concat(requestData[i])
        }

        // console.log(alert(JSON.stringify(qsheetData)))

        formData.append(
            'qsheetUpdateDto',
            new Blob([JSON.stringify(qsheetData)], {
                type: 'application/json',
            })
        )

        fileInputs.forEach((file, index) => {
            if (file) {
                formData.append(`files`, file)
            }
        })

        const accessToken = (persistData as any).auth.session.accessToken
        try {
            const response = await axios.patch(
                `http://152.69.228.245:10001/api/v1/qsheet/${qsheetSeq}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )

            toast.push(
                <Notification title={'큐시트가 수정되었습니다.'} type="success">
                    큐시트가 수정되었습니다.
                </Notification>
            )

            navigate('/cuesheetUser')
            // navigate('/userhome')
        } catch (error) {
            console.error(error)
        }

        // const transformedData = dataContent.map((item) => ({
        //     data: [
        //         {
        //             orderIndex: item.orderIndex,
        //             process: item.process,
        //             content: item.content,
        //             actor: item.actor,
        //             note: item.note,
        //             filePath: item.filePath
        //         }
        //     ]
        // }))

        // const body = {
        //     data: []
        // }

        // for (let i = 0; i < transformedData.length; i++) {
        //     body.data.push(transformedData[i].data[0])
        // }
    }

    const handleInputChange = (
        field: keyof DataContent,
        value: string,
        index: number
    ) => {
        const updatedDataList = [...dataContent]

        let className = ''
        if (field === 'actor') {
            className = fontColor(value)
        } else {
            className = 'text-purple-600' // 다른 필드에 대한 클래스 설정
        }
        updatedDataList[index][field] = value
        setDataContent(updatedDataList)
    }

    const fileInputRef = useRef<HTMLInputElement>(null) // useRef를 사용하여 파일 입력 요소를 참조

    const [fileInputs, setFileInputs] = useState([])

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedDataList = [...dataContent]

        const files = e.target.files

        const updatedFileInputs = [...fileInputs]

        for (let i = 0; i < e.target.files.length; i++) {
            updatedFileInputs[index + i] = e.target.files[i]
        }

        setFileInputs(updatedFileInputs)
        if (files.length > 0) {
            updatedDataList[index] = {
                ...updatedDataList[index],
                filePath: files[0].name,
            }
            setDataContent(updatedDataList)
        }
    }

    const onDragEnd = (result: DropResult) => {
        // 드래그가 취소된 경우
        if (!result.destination) return

        // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
        const newItems = [...dataContent]

        // 1. 변경시키는 아이템을 배열에서 지워줍니다.
        // 2. return 값으로 지워진 아이템을 잡아줍니다.
        const [reorderedItem] = newItems.splice(result.source.index, 1)

        // 원하는 자리에 reorderedItem을 insert 해줍니다.
        newItems.splice(result.destination.index, 0, reorderedItem)

        setDataContent(newItems)
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

    const onAdd = () => {
        const orderIndex = dataContent.length + 1
        const newDataItem = {
            actor: '',
            content: '',
            filePath: '',
            note: '',
            orderIndex,
            process: '',
            readOnly: false,
        }
        // dataContent 배열에 새 데이터 아이템을 추가합니다.
        setDataContent([...dataContent, newDataItem])
    }

    const ActionColumn = ({
        row,
        dataContent,
        setDataContent,
    }: {
        row: DataContent //QSheetExampleData
        dataContent: DataContent[]
        setDataContent: (data: DataContent[]) => void
    }) => {
        const { textTheme } = useThemeClass()

        const onEdit = () => {
            setDataContent(
                dataContent.map((item) =>
                    item.orderIndex === row.orderIndex
                        ? { ...item, readOnly: !item.readOnly }
                        : item
                )
            )
        }

        const onDelete = () => {
            //삭제할 데이터 찾기
            const rowData = dataContent.find(
                (item) => item.orderIndex === row.orderIndex
            )

            // 데이터를 삭제하고 업데이트된 배열을 생성합니다.
            const updatedData = dataContent.filter(
                (item) => item.orderIndex !== row.orderIndex
            )

            setDataContent(updatedData)
            toast.push(
                <Notification title={'삭제되었습니다.'} type="success">
                    삭제되었습니다.
                </Notification>
            )
        }

        return (
            <div className="flex justify-normal text-lg">
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

    //인쇄
    const componentRef = useRef(null)

    const clickPrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'CueSheet Content',
        pageStyle: `
        @page {
          size: 30cm 40cm;
          margin: 1cm;
        }
      `,
    })

    // 최종승인
    const [isFinalConfirmed, setIsFinalConfirmed] = useState(false)
    const finalButton = () => {
        setIsFinalConfirmed(true)

        toast.push(
            <Notification title={'success'} type="success">
                이제 큐시트를 변경할 수 없습니다.
            </Notification>
        )
    }

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
                        <Button size="sm" onClick={onAdd}>
                            추가
                        </Button>
                    </span>
                    <span>
                        <Button
                            block
                            size="sm"
                            disabled={isFinalConfirmed}
                            // onClick={onConfirm}
                            onClick={onUpdate}
                        >
                            저장
                        </Button>
                    </span>
                    <span>
                        <Button
                            block
                            size="sm"
                            disabled={isFinalConfirmed} // 버튼을 비활성화
                            variant="twoTone"
                            onClick={finalButton}
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

            <div ref={componentRef} className="CueSheet Content">
                <table className="min-w-full divide-x divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700 ">
                        <tr>
                            <th className="px-2 w-1/12 py-3 text-center rtl:text-rightfont-semibold uppercase tracking-wider text-gray-500 dark:text-gray-100 border border-gray-300">
                                식순명
                            </th>
                            <th className="px-2 w-1/12 py-3 text-center border border-gray-300">
                                행위자
                            </th>
                            <th className="px-2 w-5/12 py-3 text-center border border-gray-300">
                                내용
                            </th>
                            <th className="px-2 w-2/12 py-3 text-center border border-gray-300">
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

                                                            <td className="border border-gray-200 w-1/12 py-2">
                                                                <input
                                                                    type="text"
                                                                    style={
                                                                        data.readOnly
                                                                            ? inputStyle
                                                                            : readOnlyStyle
                                                                    } // readOnly일 때 readOnlyStyle을 적용
                                                                    value={
                                                                        data.process
                                                                    }
                                                                    readOnly={
                                                                        data.readOnly
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
                                                            <td className="border border-gray-200 w-1/12 py-2">
                                                                <input
                                                                    // className="focus:border border-gray-300"
                                                                    className={`focus:border border-gray-300 ${fontColor(
                                                                        data.actor
                                                                    )}`}
                                                                    type="text"
                                                                    style={
                                                                        applyCustomStyle
                                                                            ? {
                                                                                  ...inputStyle,
                                                                                  ...actorInputStyle,
                                                                              }
                                                                            : inputStyle
                                                                    }
                                                                    value={
                                                                        data.actor
                                                                    }
                                                                    readOnly={
                                                                        data.readOnly
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
                                                            <td className="border border-gray-200 w-5/12 py-2">
                                                                <input
                                                                    type="text"
                                                                    style={
                                                                        data.readOnly
                                                                            ? inputStyle //contentInputStyle
                                                                            : readOnlyStyle
                                                                    }
                                                                    value={
                                                                        data.content
                                                                    }
                                                                    readOnly={
                                                                        data.readOnly
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
                                                            <td className="border border-gray-200 w-2/12 py-2">
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            'flex',
                                                                        alignItems:
                                                                            'center',
                                                                        justifyContent:
                                                                            'center',
                                                                    }}
                                                                >
                                                                    <input
                                                                        className="focus:border border-gray-300"
                                                                        type="file"
                                                                        style={{
                                                                            display:
                                                                                'none',
                                                                        }}
                                                                        ref={
                                                                            fileInputRef
                                                                        } // useRef로 파일 입력 요소를 참조
                                                                        id={`fileInput-${index}`}
                                                                        accept="*/*"
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
                                                                        className="cursor-pointer flex items-center"
                                                                    >
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        <HiOutlineUpload className="text-2xl mr-1" />
                                                                        <span
                                                                            id="fileNameDisplay"
                                                                            style={{
                                                                                whiteSpace:
                                                                                    'nowrap',
                                                                                overflow:
                                                                                    'hidden',
                                                                                textOverflow:
                                                                                    'ellipsis',
                                                                                maxWidth:
                                                                                    '200px',
                                                                            }}
                                                                        >
                                                                            {data.filePath
                                                                                ? data.filePath.split(
                                                                                      '/'
                                                                                  )[
                                                                                      data.filePath.split(
                                                                                          '/'
                                                                                      )
                                                                                          .length -
                                                                                          1
                                                                                  ]
                                                                                : '파일'}
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            {/* 비고 */}
                                                            <td className="border border-gray-200 w-2/12 py-2">
                                                                <input
                                                                    type="text"
                                                                    style={
                                                                        data.readOnly
                                                                            ? inputStyle //contentInputStyle
                                                                            : readOnlyStyle
                                                                    }
                                                                    value={
                                                                        data.note
                                                                    }
                                                                    readOnly={
                                                                        data.readOnly
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
                                                            <td
                                                                className="border border-gray-200 w-1/12 py-2 text-center"
                                                                style={{
                                                                    verticalAlign:
                                                                        'middle',
                                                                }}
                                                            >
                                                                <div className="flex items-center">
                                                                    &nbsp;
                                                                    &nbsp;
                                                                    &nbsp;
                                                                    &nbsp;
                                                                    <ActionColumn
                                                                        row={
                                                                            data
                                                                        }
                                                                        dataContent={
                                                                            dataContent
                                                                        }
                                                                        setDataContent={
                                                                            setDataContent
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
                </div>
            </div>
            <div className="mb-10">
                <div className="mb-4 w-full">
                    <Input
                        textArea
                        className="w-full focus:border border-gray-300 mt-3"
                        // style={inputStyle}
                        value={dataList?.memo}
                    />
                </div>
            </div>
        </>
    )
}

export default UserQSheetDetailsContent
