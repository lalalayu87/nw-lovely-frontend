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

const inputStyle = {
    // border: '1px solid #ccc'
    borderRadius: '4px',
    padding: '5px',
    margin: '5px',
    outline: 'none',
    width: '95%',
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

const UserQSheetDetailsContent = () => {
    // const UserQSheetDetailsContent: React.FC = () => {
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
            }
        }
    }

    const location = useLocation()

    const [loading, setLoading] = useState(true)

    const [dataList, setDataList] = useState<QSheetDetailsResponse>()

    const qsheetSeq = location.state.qsheetSeq
    const orgSeq = dataList?.orgSeq.orgSeq

    const initialDataContent: DataContent[] = [
        {
            actor: '',
            content: '',
            filePath: '',
            note: '',
            orderIndex: 1,
            process: '',
            readOnly: false, // 처음에는 수정 가능하게 시작
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
    // const orgSeq = dataList

    const navigate = useNavigate()

    const onUpdate = async () => {
        const qsheetData = {
            orgSeq: orgSeq,
            data: [],
        }
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
            }))
            qsheetData.data = qsheetData.data.concat(requestData[i])
            console.log(qsheetData.data)
            console.log(qsheetData)
        }

        // console.log(alert(JSON.stringify(qsheetData)))

        formData.append(
            'qsheetUpdateDto',
            new Blob([JSON.stringify(qsheetData)], {
                type: 'application/json',
            })
        )
        console.log([JSON.stringify(qsheetData)])

        fileInputs.forEach((file, index) => {
            if (file) {
                formData.append(`files`, file)
            }
        })

        const accessToken = (persistData as any).auth.session.accessToken
        try {
            // Axios나 fetch 등을 사용하여 API로 FormData를 POST 요청으로 보냅니다.
            const response = await axios.patch(
                `http://152.69.228.245:10001/api/v1/qsheet/${qsheetSeq}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )

            // API 응답을 필요에 따라 처리합니다.
            console.log(response.data)

            toast.push(
                <Notification title={'큐시트가 수정되었습니다.'} type="success">
                    큐시트가 수정되었습니다.
                </Notification>
            )

            navigate('/cuesheetUser')
        } catch (error) {
            // 에러를 처리합니다.
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

        // try {
        //     const response = await apiPatchQSheetCardList<ResponseType>(
        //         qsheetSeq,
        //         body
        //     )

        //     toast.push(
        //         <Notification title={'큐시트가 수정되었습니다.'} type="success">
        //             큐시트가 수정되었습니다.
        //         </Notification>
        //     )

        //     navigate('/cuesheetUser')
        // } catch (error) {
        //     console.error(error)
        // }
    }
    const [readOnly, setReadOnly] = useState(true)

    const handleInputChange = (
        field: keyof DataContent,
        value: string,
        index: number
    ) => {
        console.log(dataList)
        const updatedDataList = [...dataContent]
        console.log(field)

        let className = ''
        if (field === 'actor') {
            className = fontColor(value)
        } else {
            className = 'text-purple-600' // 다른 필드에 대한 클래스 설정
        }
        updatedDataList[index][field] = value
        setDataContent(updatedDataList)
        console.log(updatedDataList)
    }

    const fileInputRef = useRef<HTMLInputElement>(null) // useRef를 사용하여 파일 입력 요소를 참조

    const [fileInputs, setFileInputs] = useState([])

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        console.log(e)
        console.log(index)

        const updatedDataList = [...dataContent]
        console.log('updatedDataList', updatedDataList)

        const files = e.target.files
        console.log(files)

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

        // if (file) {
        //     updatedDataList[index] = {
        //         ...updatedDataList[index], //중요!!!
        //         filePath: file.name
        //     }
        //     console.log(updatedDataList)
        //     console.log(index)
        //     console.log(file.name)
        // }
        // setDataList(updatedDataList)
        console.log(updatedDataList)

        // const fileInputName = fileInputRef.current // useRef를 통해 파일 입력 요소를 얻음
        // const fileNameDisplay = document.getElementById('fileNameDisplay')

        // if (fileInputName && fileInputName.files.length > 0) {
        //     // null 체크를 수행하여 오류 방지
        //     const fileName = fileInputName.files[0].name
        //     if (fileNameDisplay) {
        //         fileNameDisplay.textContent = fileName
        //     }
        // } else {
        //     if (fileNameDisplay) {
        //         fileNameDisplay.textContent = '파일'
        //     }
        // }
    }

    // const handleFileChange = (
    //     e: React.ChangeEvent<HTMLInputElement>,
    //     index: number
    // ) => {
    //     const updatedDataList = [...dataContent]
    //     console.log(e.target.files[0].name)
    //     const file = e.target.files[0]
    //     console.log(file)

    //     if (file) {
    //         updatedDataList[index].filePath = file.name
    //     }
    //     setDataContent(updatedDataList)
    //     console.log(updatedDataList)

    //     const fileInputName = fileInputRef.current // useRef를 통해 파일 입력 요소를 얻음
    //     const fileNameDisplay = document.getElementById('fileNameDisplay')

    //     if (fileInputName && fileInputName.files.length > 0) {
    //         // null 체크를 수행하여 오류 방지
    //         const fileName = fileInputName.files[0].name
    //         if (fileNameDisplay) {
    //             fileNameDisplay.textContent = fileName
    //         }
    //     } else {
    //         if (fileNameDisplay) {
    //             fileNameDisplay.textContent = '파일'
    //         }
    //     }
    // }

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

        setDataContent(newItems) //setDataList에서 수정
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
        console.log(orderIndex)
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

    // const ActionColumn = ({ row }: { row: DataContent }) => {
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

        // console.log('dataContent : ', dataContent)

        const onEdit = () => {
            console.log('d')
            // console.log(dataContent.map(() => ))
            const readOnlyDataContent = dataContent.map((item) => {
                return { ...item, readOnly: false }
            })

            readOnlyDataContent[row.orderIndex].readOnly === true
            console.log(readOnlyDataContent)

            // const updatedDataContent = dataContent.map((item) => {
            //     if (item.orderIndex === row.orderIndex) {
            //         return { ...item, readOnly: true }
            //         // return { ...item, readOnly: false }
            //     }
            //     return item
            // })

            setDataContent(readOnlyDataContent)
            console.log(dataContent)

            // 클릭한 행만 수정 가능하도록 업데이트
            // const updatedData = dataList.data.map((item) => {
            //     console.log(item.orderIndex)
            //     console.log(row.orderIndex)
            //     if (item.orderIndex === row.orderIndex) {
            //         return { ...item, readOnly: !item.readOnly }
            //     }
            //     return item
            // })

            // setDataContent(updatedData)

            // setReadOnly(!readOnly) // 클릭 시 readOnly 상태를 토글
            // 클릭 시 커스텀 스타일 적용 여부를 토글
            // setApplyCustomStyle(!applyCustomStyle)
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
                                                                    className="focus:border border-gray-300"
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
                                                                        readOnly
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
                                                                    className="focus:border border-gray-300"
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
                                                                    className="focus:border border-gray-300"
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
        </>
    )
}

export default UserQSheetDetailsContent
