/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    DragDropContext,
    Droppable,
    DropResult,
    DraggableChildrenFn,
    Draggable
} from 'react-beautiful-dnd'
import {
    HiOutlinePencil,
    HiOutlineTrash,
    HiPlusSm,
    HiExternalLink,
    HiOutlineUpload
} from 'react-icons/hi'
import {
    toggleDeleteConfirmation,
    // toggleEditConfirmation,
    useAppDispatch,
    useAppSelector,
    getList
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate, useLocation } from 'react-router-dom'

import {
    apiGetQSheetCardDetails,
    apiPatchQSheetCardList
} from '@/services/QSheetService'
import QSheetDetatilsHeader from './QSheetDetailsHeader'
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
import { useReactToPrint } from 'react-to-print'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import { DataTableResetHandle } from '@/components/shared'
import axios from 'axios'

const inputStyle = {
    // border: '1px solid #ccc'
    borderRadius: '4px',
    padding: '5px',
    margin: '5px',
    outline: 'none',
    width: '90%'
}

const contentInputStyle = {
    // border: '1px solid #ccc'
    borderRadius: '4px',
    padding: '5px',
    margin: '5px',
    outline: 'none',
    width: '95%',
    overFlow: 'hidden'
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

const QSheetDetailsContent = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()

    const location = useLocation()
    const qsheetSeq = location.state.qsheetSeq

    const [loading, setLoading] = useState(true)

    const [dataList, setDataList] = useState<QSheetDetailsResponse>()
    const orgSeq = dataList?.orgSeq.orgSeq

    const initialDataContent: DataContent[] = [
        {
            actor: '',
            content: '',
            filePath: '',
            note: '',
            orderIndex: 1,
            process: ''
        }
    ]
    const [dataContent, setDataContent] =
        useState<DataContent[]>(initialDataContent)

    console.log(dataContent)

    const columns: ColumnDef<qSheet>[] = useMemo(
        () => [
            {
                header: '절차',
                accessorKey: 'process',
                width: 'w-1/12'
            },
            {
                header: '행위자',
                accessorKey: 'actor',
                sortable: true,
                width: 'w-2/12'
            },
            {
                header: '내용',
                accessorKey: 'content',
                width: 'w-5/12'
            },

            {
                header: '파일',
                accessorKey: 'filePath',
                width: 'w-2/12'
            },
            {
                header: '비고',
                accessorKey: 'note',
                width: 'w-2/12'
            }
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
            data: []
        }
        const addData = []
        const formData = new FormData()

        for (let i = 0; i < dataContent.length; i++) {
            const item = dataContent[i]
            const requestData = dataContent.map((item) => ({
                orderIndex: item.orderIndex,
                process: item.process,
                content: item.content,
                actor: item.actor,
                note: item.note,
                filePath: `${item.process}_${item.filePath}`
            }))
            qsheetData.data = qsheetData.data.concat(requestData[i])
            console.log(qsheetData.data)
        }

        console.log(alert(JSON.stringify(qsheetData)))

        formData.append(
            'qsheetUpdateDto',
            new Blob([JSON.stringify(qsheetData)], {
                type: 'application/json'
            })
        )
        console.log([JSON.stringify(qsheetData)])

        fileInputs.forEach((file, index) => {
            if (file) {
                formData.append(`files`, file)
            }
        })

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

        const accessToken = (persistData as any).auth.session.accessToken
        try {
            // Axios나 fetch 등을 사용하여 API로 FormData를 POST 요청으로 보냅니다.
            const response = await axios.patch(
                `http://152.69.228.245:10001/api/v1/qsheet/${qsheetSeq}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            // API 응답을 필요에 따라 처리합니다.
            console.log(response.data)
        } catch (error) {
            // 에러를 처리합니다.
            console.error(error)
        }

        // try {
        //     const response = await apiPatchQSheetCardList<ResponseType>(
        //         qsheetSeq,
        //         formData
        //     )

        //     toast.push(
        //         <Notification title={'큐시트가 수정되었습니다.'} type="success">
        //             큐시트가 수정되었습니다.
        //         </Notification>
        //     )

        //     navigate('/cuesheet')
        // } catch (error) {
        //     console.error(error)
        // }

        // const body = {
        //     data: [
        //         {
        //             orderIndex: 1,
        //             process: 'hi',
        //             content: 'hi',
        //             actor: 'hi',
        //             note: 'hi',
        //             filePath: 'hi'
        //         }
        //     ]
        // }
    }

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
                filePath: files[0].name
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
    //     const file = e.target.files[0]
    //     console.log(e.target.files)
    //     if (file) {
    //         updatedDataList[index].filePath = file.name
    //     }
    //     setDataContent(updatedDataList)

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

    // 행추가
    const onAdd = () => {
        console.log('add')
        const orderIndex = dataContent.length + 1 // 다음 행의 orderIndex를 설정
        const newDataItem = {
            actor: '',
            content: '',
            filePath: '',
            note: '',
            orderIndex,
            process: ''
        }
        // dataContent 배열에 새 데이터 아이템을 추가합니다.
        setDataContent([...dataContent, newDataItem])
    }

    const ActionColumn = ({ row }: { row: QSheetDetailsResponse }) => {
        // const dispatch = useAppDispatch()
        const { textTheme } = useThemeClass()
        // const navigate = useNavigate()

        //행 수정
        const onEdit = () => {
            // 클릭한 행의 데이터를 전달
            const rowDataTmp = dataContent.find(
                (item) => item.orderIndex === row.orderIndex
            )
            console.log(rowDataTmp)

            // setDataContent(rowDataTmp) // setDataForEdit 함수로 데이터 전달
        }

        // 행 삭제
        const onDelete = () => {
            const rowData = dataContent.find(
                (item) => item.orderIndex == row.orderIndex
            )

            console.log(rowData)
            // 데이터를 삭제하고 업데이트된 배열을 생성합니다.
            const updatedData = dataContent.filter(
                (item) => item.orderIndex !== rowData.orderIndex
            )

            // 업데이트된 배열을 qSheetExampleData로 설정하여 데이터를 삭제합니다.
            setDataContent(updatedData)

            toast.push(
                <Notification title={'삭제되었습니다.'} type="success">
                    삭제되었습니다.
                </Notification>
            )
        }

        return (
            <div>
                <span className="flex items-center justify-center">
                    <Tooltip title="수정">
                        <span
                            className={`cursor-pointer p-2 hover:${textTheme}`}
                            onClick={() => onEdit()}
                        >
                            <HiOutlinePencil />
                        </span>
                    </Tooltip>
                </span>

                <span className="flex items-center justify-center">
                    <Tooltip title="삭제">
                        <span
                            className="cursor-pointer p-2 hover:text-red-500"
                            onClick={() => onDelete()}
                        >
                            <HiOutlineTrash />
                        </span>
                    </Tooltip>
                </span>
            </div>
        )
    }

    const componentRef = useRef(null)

    const clickPrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'CueSheet Content',
        pageStyle: `
        @page {
          size: 30cm 40cm;
          margin: 1cm;
        }
      `
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
                            variant="twoTone"
                            disabled={isFinalConfirmed} // 버튼을 비활성화
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
            <div>
                <div ref={componentRef} className="CueSheet Content">
                    <table className="min-w-full divide-x divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th
                                    className="px-2 w-1/12 py-3 text-center rtl:text-rightfont-semibold uppercase tracking-wider text-gray-500 dark:text-gray-100 border border-gray-300"
                                    // style={{
                                    //     width: '10%'
                                    // }}
                                >
                                    절차
                                </th>
                                <th
                                    className="px-2 w-2/12 py-3 text-center border border-gray-300"
                                    // style={{
                                    //     width: '20%'
                                    // }}
                                >
                                    행위자
                                </th>
                                <th
                                    className="px-2 w-5/12 py-3 text-center border border-gray-300"
                                    // style={{
                                    //     width: '30%'
                                    // }}
                                >
                                    내용
                                </th>
                                <th
                                    className="px-2 w-1/12 py-3 text-center border border-gray-300"
                                    // style={{
                                    //     width: '10%'
                                    // }}
                                >
                                    파일
                                </th>
                                <th
                                    className="px-2 w-2/12 py-3 text-center border border-gray-300"
                                    // style={{
                                    //     width: '10%'
                                    // }}
                                >
                                    비고
                                </th>
                                <th
                                    className="px-2 w-1/12 py-3 text-center border border-gray-300"
                                    // style={{
                                    //     width: '10%'
                                    // }}
                                >
                                    액션
                                </th>
                            </tr>
                        </thead>
                    </table>

                    {/* <div className="min-w-full divide-x divide-y divide-gray-200 dark:divide-gray-700"> */}
                    <div>
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
                                                                <td className="border border-gray-200 w-2/12 py-2">
                                                                    <input
                                                                        className="focus:border border-gray-300"
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
                                                                {/* {data.content
                                                                    .split('\n')
                                                                    .map(
                                                                        (
                                                                            line,
                                                                            lineIndex
                                                                        ) => (
                                                                            <React.Fragment
                                                                                key={
                                                                                    lineIndex
                                                                                }
                                                                            >
                                                                                {lineIndex >
                                                                                    0 && (
                                                                                    <br />
                                                                                )}
                                                                                {
                                                                                    line
                                                                                }
                                                                            </React.Fragment>
                                                                        )
                                                                    )} */}
                                                                {/* <textarea
                                                                        // type="text"
                                                                        className="focus:border border-gray-300"
                                                                        style={
                                                                            contentInputStyle
                                                                        }
                                                                        value={
                                                                            data.content
                                                                        }
                                                                        rows={1} // 표시할 행 수를 조절할 수 있습니다
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
                                                                    /> */}
                                                                {/* </td> */}
                                                                {/* 파일 */}
                                                                <td className="border border-gray-200 w-1/12 py-2">
                                                                    <div>
                                                                        <input
                                                                            multiple
                                                                            className="focus:border border-gray-300"
                                                                            type="file"
                                                                            style={{
                                                                                display:
                                                                                    'none'
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
                                                                            className="cursor-pointer flex items-center "
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
                                                                                        '50px'
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
                                                                            'middle'
                                                                    }}
                                                                >
                                                                    <div>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default QSheetDetailsContent
