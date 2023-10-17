/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo, useRef, useState, ChangeEvent } from 'react'
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
    HiOutlineUser,
    HiOutlineSearch,
    HiOutlineExclamationCircle,
} from 'react-icons/hi'
import {
    useAppDispatch,
    useAppSelector,
    updateDialogView,
    openDialog,
    getList,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import Tooltip from '@/components/ui/Tooltip'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import requiredFieldValidation from '@/utils/requiredFieldValidation'
import Input from '@/components/ui/Input'
import * as Yup from 'yup'
import { FormItem, FormContainer } from '@/components/ui/Form'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { DataTableResetHandle } from '@/components/shared'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import { apiPostQSheetCardList } from '@/services/QSheetService'
import SearchDialog from './SearchDialog'
import { apiGetOrgList } from '@/services/OrgService'
import axios, { responseEncoding } from 'axios'
import { Select } from '@/components/ui'

const inputStyle = {
    // border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px',
    margin: '5px',
    outline: 'none',
    width: '90%',
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

const validationSchema = Yup.object().shape({
    process: Yup.string().required('식순명을 입력해주세요.'),
    actor: Yup.string().required('행위자를 입력해주세요.'),
    text: Yup.string().required('내용을 입력해주세요.'),
})

const USerNewQSheetContent: React.FC = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const dispatch = useAppDispatch()
    // const searchInput = useRef(null)
    const inputQName = useRef(null)
    const selectOrg = useRef(null)
    const [qsheetName, setQsheetName] = useState('')
    const [secretMemo, setSecretMemo] = useState('')
    const [dataList, setDataList] = useState<QSheetExampleData[]>([initialData])
    const [newData, setNewData] = useState<QSheetExampleData>({
        ...initialData,
        orderIndex: 2,
    })

    // const handleOpen = () => {
    //     dispatch(updateDialogView('NEW_COLUMN'))
    //     dispatch(openDialog())
    // }
    const [orgList, setOrgList] = useState([])
    const [orgSeq, setOrgSeq] = useState('')
    const [isQsheetNameValid, setIsQsheetNameValid] = useState(false)
    const [isOrgSeqValid, setIsOrgSeqValid] = useState(false)
    const [isCheckValid, setIsCheckValid] = useState(true)
    const [loadingOrgList, setLoadingOrgList] = useState(false)

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
    const formData = new FormData()

    // const fileInputRef = useRef<HTMLInputElement>(null)
    // useRef를 사용하여 파일 입력 요소를 참조

    const [fileInputs, setFileInputs] = useState([])

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedDataList = [...dataList]
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
            setDataList(updatedDataList)
        }
    }

    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userSeq = (persistData as any).auth.user.userSeq

    const onConfirm = () => {
        for (const e of dataList) {
            console.log(e)
            if (
                e.actor === '' &&
                e.content === '' &&
                e.filePath === '' &&
                e.note === '' &&
                e.process === ''
            ) {
                toast.push(
                    <Notification title={'실패'} type="warning">
                        입력되지 않은 행이 있습니다.
                    </Notification>
                )
                break
            } else {
                onCreate()
            }
        }
    }

    const navigate = useNavigate()
    const onCreate = async () => {
        const date = new Date()
        const name = '큐시트_' + date.toLocaleDateString('ko-kr')
        const qsheetData = {
            name: qsheetName,
            userSeq: userSeq,
            orgSeq: orgSeq,
            data: [],
            memo: secretMemo,
        }

        const addData = []
        const formData = new FormData()

        for (let i = 0; i < dataList.length; i++) {
            const item = dataList[i]
            const filePath = item.filePath
                ? `${item.process}_${item.filePath}`
                : ''
            const requestData = dataList.map((item) => ({
                orderIndex: item.orderIndex,
                process: item.process,
                content: item.content,
                actor: item.actor,
                note: item.note,
                filePath: filePath,
            }))

            qsheetData.data = qsheetData.data.concat(requestData[i])
        }

        // console.log(alert(JSON.stringify(qsheetData)))

        formData.append(
            'qsheetCreateDto',
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
            const response = await axios.post(
                `http://152.69.228.245:10001/api/v1/qsheet`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )

            if (response.status === 200) {
                toast.push(
                    <Notification
                        title={'큐시트가 생성되었습니다.'}
                        type="success"
                    >
                        큐시트가 생성되었습니다.
                    </Notification>
                )
                // 데이터 초기화
                const initialDataLists = [
                    {
                        process: '',
                        actor: '',
                        content: '',
                        filePath: '',
                        note: '',
                        orderIndex: 1,
                        memo: '',
                    },
                ]

                setDataList(initialDataLists)

                console.log(dataList)

                await getList()
                navigate('/cuesheetUser')
            }
        } catch (error) {
            // 에러를 처리합니다.
            console.error(error)
        }

        // toast.push(
        //     <Notification title={'큐시트가 생성되었습니다.'} type="success">
        //         큐시트가 생성되었습니다.
        //     </Notification>
        // )
        // // 데이터 초기화
        // const initialDataLists = [
        //     {
        //         process: '',
        //         actor: '',
        //         content: '',
        //         filePath: '',
        //         note: '',
        //         orderIndex: 1,
        //         memo: '',
        //     },
        // ]

        // setDataList(initialDataLists)

        // console.log(dataList)

        // await getList()
        // navigate('/cuesheetUser')
        // navigate('/userhome')
    }

    useEffect(() => {
        getList()
    }, [])

    useEffect(() => {
        // If there is data, the form is valid
        setIsOrgSeqValid(orgSeq != '' ? true : false)
        setIsQsheetNameValid(qsheetName != '' ? true : false)
        setIsCheckValid(orgSeq != '' && qsheetName != '' ? false : true)
    }, [orgSeq, qsheetName])

    const handleInputChange = (
        field: keyof QSheetExampleData,
        value: string,
        index: number
    ) => {
        const updatedDataList = [...dataList]
        updatedDataList[index][field] = value
        setDataList(updatedDataList)
    }

    const onDragEnd = (result: DropResult) => {
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
        setNewData({
            ...newData,
            orderIndex: newData.orderIndex + 1,
        })
        setDataList([...dataList, newData])
    }

    const ActionColumn = ({ row }: { row: QSheetExampleData }) => {
        const { textTheme } = useThemeClass()

        const onDelete = (orderIndex: number) => {
            //삭제할 데이터 찾기
            const rowData = dataList.find(
                (item) => item.orderIndex === row.orderIndex
            )

            // 데이터를 삭제하고 업데이트된 배열을 생성합니다.
            const updatedData = dataList.filter(
                (item) => item.orderIndex !== row.orderIndex
            )

            setDataList(updatedData)
        }

        return (
            <div className="inset-0 flex items-center justify-center text-lg">
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

    // const [dialogIsOpen, setIsOpen] = useState(false)

    // const openDialog = () => {
    //     setIsOpen(true)
    // }

    // const onDialogClose = (e: MouseEvent) => {
    //     console.log('onDialogClose', e)
    //     setIsOpen(false)
    // }

    // const onDialogOk = (e: MouseEvent) => {
    //     console.log('onDialogOk', e)
    //     setIsOpen(false)
    // }

    // const onSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    //     const searchKeyword = e.target.value

    // const onSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    //     const searchKeyword = e.target.value
    //     console.log(searchKeyword)

    //     const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    //     const persistData = deepParseJson(rawPersistData)
    //     const accessToken = (persistData as any).auth.session.accessToken

    //     try {
    //         const response = await axios.get(
    //             'http://152.69.228.245:10001/api/v1/org',
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             }
    //         )

    //         const orgData = response.data.content

    //         const matchingOrgs = orgData.filter(
    //             (org) => org.orgName === searchKeyword
    //         )
    //         const matchingOrgSeqs = matchingOrgs.map((org) => org.orgSeq)
    //         const matchingOrgSeq = matchingOrgSeqs[0]
    //         console.log(matchingOrgSeq)

    //         if (matchingOrgSeqs.length > 0) {
    //             setOrgSeq(matchingOrgSeq)
    //         } else {
    //             console.log('No matching organizations found.')
    //         }
    //     } catch (error) {
    //         // 오류 처리
    //         console.error(error)
    //     }
    // }

    const onFocus = () => {
        if (orgList.length === 0) {
            setLoadingOrgList(true)
            getOrgs()
        }
    }

    const onCheckVaild = () => {
        if (isOrgSeqValid) {
            return true
        } else {
            return false
        }
    }

    const onSelectOrg = (e) => {
        setOrgSeq(e.value)
    }

    const getOrgs = async () => {
        try {
            const response = await apiGetOrgList()
            if (response.data) {
                const optionList = []
                for (const res of response.data.content) {
                    optionList.push({ value: res.orgSeq, label: res.orgName })
                }
                setTimeout(() => {
                    setOrgList(optionList)
                    setLoadingOrgList(false)
                }, 1500)
            }
            // )

            // const orgData = response.data.content

            // const matchingOrgs = orgData.filter(
            //     (org) => org.orgName === searchKeyword
            // )
            // const matchingOrgSeqs = matchingOrgs.map((org) => org.orgSeq)
            // const matchingOrgSeq = matchingOrgSeqs[0]

            // if (matchingOrgSeqs.length > 0) {
            //     setOrgSeq(matchingOrgSeq)
            // } else {
            //     console.log('No matching organizations found.')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">큐시트 생성</h3>

                <div className="flex flex-col md:flex-row md:items-center gap-1">
                    {/* <div>
                        <Input
                            ref={searchInput}
                            className="max-w-md md:w-52 md:mb-0 mb-4" // 가로 길이 조절
                            size="sm"
                            placeholder="조직 검색"
                            prefix={<HiOutlineSearch className="text-lg" />}
                            onChange={(e) => onSearch(e)}
                        />
                    </div> */}
                    <Button size="sm" onClick={onAdd}>
                        추가
                    </Button>
                    <Button
                        block
                        size="sm"
                        variant="twoTone"
                        onClick={onConfirm}
                    >
                        저장
                    </Button>
                </div>
            </div>

            {/* <div>
                <Dialog
                    isOpen={dialogIsOpen}
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                    <SearchDialog />
                </Dialog>
            </div> */}

            <div className="flex flex-col gap-1 h-20">
                <div className="flex flex-col md:flex-row md:items-center gap-1">
                    <Input
                        ref={inputQName}
                        placeholder="큐시트 이름"
                        size="sm"
                        className="max-w-md md:w-52 md:mb-0 mb-4"
                        prefix={<HiOutlineUser className="text-lg" />}
                        onChange={(e) => setQsheetName(e.target.value)}
                        autoFocus={!isQsheetNameValid}
                        // suffix={

                        //     <Tooltip title="큐시트 이름을 입력하세요">
                        //         <HiOutlineExclamationCircle className="text-lg cursor-pointer ml-1" />
                        //     </Tooltip>
                        // }
                    />
                    {!isQsheetNameValid && (
                        <div className="flex flex-col md:flex-row md:items-center gap-1 font-semibold text-red-500">
                            <HiOutlineExclamationCircle className="text-lg f ml-1 text-red-500" />{' '}
                            큐시트 이름을 입력하세요
                        </div>
                    )}
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-1">
                    <Select
                        ref={selectOrg}
                        className="max-w-md md:w-52 md:mb-0 mb-4" // 가로 길이 조절
                        size="sm"
                        options={orgList}
                        isLoading={loadingOrgList}
                        onFocus={onFocus}
                        placeholder="업체 검색"
                        //   onChange={(e) => onSearch(e)}
                        onChange={(e) => onSelectOrg(e)}
                    />
                    {!isOrgSeqValid && (
                        <div className="flex flex-col md:flex-row md:items-center gap-1 font-semibold text-red-500">
                            <HiOutlineExclamationCircle className="text-lg f ml-1" />{' '}
                            업체 정보를 입력하세요
                        </div>
                    )}
                </div>
            </div>

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
                                {dataList.map((data, index) => (
                                    <Draggable
                                        key={data.orderIndex}
                                        draggableId={String(data.orderIndex)}
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
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        'process',
                                                                        e.target
                                                                            .value,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        {/* 행위자 */}
                                                        <td className="border border-gray-200 w-1/12 py-2">
                                                            <input
                                                                className="focus:border border-gray-300"
                                                                type="text"
                                                                style={
                                                                    inputStyle
                                                                }
                                                                value={
                                                                    data.actor
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        'actor',
                                                                        e.target
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
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        'content',
                                                                        e.target
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
                                                                    multiple
                                                                    className="focus:border border-gray-300"
                                                                    type="file"
                                                                    style={{
                                                                        display:
                                                                            'none',
                                                                    }}
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
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        'note',
                                                                        e.target
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
                                                                <ActionColumn
                                                                    row={data}
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
            <div className="mb-10">
                <div className="mb-4">
                    <Input
                        textArea
                        placeholder="비공개 요청사항을 입력해주세요."
                        onChange={(e) => setSecretMemo(e.target.value)}
                    />
                </div>
            </div>
        </>
    )
}

export default USerNewQSheetContent
