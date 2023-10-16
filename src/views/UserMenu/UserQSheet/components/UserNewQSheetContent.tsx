import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    Suspense,
    lazy,
    ChangeEvent,
} from 'react'
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
    HiOutlineSearch,
} from 'react-icons/hi'
import {
    toggleDeleteConfirmation,
    // toggleEditConfirmation,
    useAppDispatch,
    useAppSelector,
    updateDialogView,
    openDialog,
    getList,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import UserNewQSheetHeader from './UserNewQSheetHeader'
import Tooltip from '@/components/ui/Tooltip'
import UserEditNewQSheetContent from './UserEditNewQSheetContent'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { Formik, Field, Form } from 'formik'
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
 
import axios from 'axios'
 
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
    // memo: string
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
    const searchInput = useRef(null)
 
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
 
    // const fileInputRef = useRef<HTMLInputElement>(null) // useRef를 사용하여 파일 입력 요소를 참조
 
    const [fileInputs, setFileInputs] = useState([])
 
    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        console.log(e)
        console.log(index)
 
        const updatedDataList = [...dataList]
        console.log('updatedDataList', updatedDataList)
        // const file = e.target.files[0]
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
            setDataList(updatedDataList)
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
 
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userSeq = (persistData as any).auth.user.userSeq
 
    const navigate = useNavigate()
    const onCreate = async () => {
        const date = new Date()
        const name = '큐시트_' + date.toLocaleDateString('ko-kr')
        const qsheetData = {
            name: name,
            userSeq: userSeq,
            orgSeq: orgSeq,
            data: [],
        }
        const addData = []
        const formData = new FormData()
 
        for (let i = 0; i < dataList.length; i++) {
            const item = dataList[i]
            const requestData = dataList.map((item) => ({
                orderIndex: item.orderIndex,
                process: item.process,
                content: item.content,
                actor: item.actor,
                note: item.note,
                filePath: `${item.process}_${item.filePath}`,
            }))
            console.log("requestData : ", requestData)
            console.log("dataList : ", dataList)
 
            qsheetData.data = requestData
        }
 
        console.log(alert(JSON.stringify(qsheetData)))
 
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
 
        // apiPostQSheetCardList(data)
        const accessToken = (persistData as any).auth.session.accessToken
        try {
            console.log(alert(formData))
            // Axios나 fetch 등을 사용하여 API로 FormData를 POST 요청으로 보냅니다.
            const response = await axios.post(
                `http://152.69.228.245:10001/api/v1/qsheet`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
 
            // API 응답을 필요에 따라 처리합니다.
            console.log(response.data)
        } catch (error) {
            // 에러를 처리합니다.
            console.error(error)
        }
 
        toast.push(
            <Notification title={'큐시트가 생성되었습니다.'} type="success">
                큐시트가 생성되었습니다.
            </Notification>
        )
 
        setDataList([])
 
        await getList()
        navigate('/cuesheetUser')
    }
 
    useEffect(() => {
        getList()
    }, [])
 
    const [dataList, setDataList] = useState<QSheetExampleData[]>([initialData])
    const [newData, setNewData] = useState<QSheetExampleData>({
        ...initialData,
        orderIndex: 2,
    })
 
    const handleInputChange = (
        field: keyof QSheetExampleData,
        value: string,
        index: number
    ) => {
        const updatedDataList = [...dataList]
        updatedDataList[index][field] = value
        setDataList(updatedDataList)
    }
 
    // const fileInputRef = useRef<HTMLInputElement>(null) // useRef를 사용하여 파일 입력 요소를 참조
 
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
        console.log('add')
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
            console.log(rowData)
 
            // 데이터를 삭제하고 업데이트된 배열을 생성합니다.
            const updatedData = dataList.filter(
                (item) => item.orderIndex !== row.orderIndex
            )
            console.log(updatedData)
 
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
 
    const [orgSeq, setOrgSeq] = useState('')
 
    const onSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        const searchKeyword = e.target.value
        console.log(searchKeyword)
 
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)
        const accessToken = (persistData as any).auth.session.accessToken
 
        try {
            const response = await axios.get(
                'http://152.69.228.245:10001/api/v1/org',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
 
            const orgData = response.data.content
 
            const matchingOrgs = orgData.filter(
                (org) => org.orgName === searchKeyword
            )
            const matchingOrgSeqs = matchingOrgs.map((org) => org.orgSeq)
            const matchingOrgSeq = matchingOrgSeqs[0]
            console.log(matchingOrgSeq)
 
            if (matchingOrgSeqs.length > 0) {
                setOrgSeq(matchingOrgSeq)
            } else {
                console.log('No matching organizations found.')
            }
        } catch (error) {
            // 오류 처리
            console.error(error)
        }
    }
 
    return (
        <>
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">큐시트 생성</h3>
 
                <div className="flex flex-col md:flex-row md:items-center gap-1">
                    <div>
                        <Input
                            ref={searchInput}
                            className="max-w-md md:w-52 md:mb-0 mb-4" // 가로 길이 조절
                            size="sm"
                            placeholder="조직 검색"
                            prefix={<HiOutlineSearch className="text-lg" />}
                            onChange={(e) => onSearch(e)}
                        />
                    </div>
                    <Button size="sm" onClick={onAdd}>
                        추가
                    </Button>
                    <Button
                        block
                        size="sm"
                        variant="twoTone"
                        onClick={onCreate}
                    >
                        저장
                    </Button>
                </div>
            </div>
 
            <table className="min-w-full divide-x divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700 ">
                    <tr>
                        <th className="px-2 w-1/12 py-3 text-center rtl:text-rightfont-semibold uppercase tracking-wider text-gray-500 dark:text-gray-100 border border-gray-300">
                            식순명
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
 
                                                        <td className="border border-gray-200 w-1/12 py-2">
                                                            <div>
                                                                <input
                                                                    className="focus:border border-gray-300"
                                                                    type="file"
                                                                    style={{
                                                                        display:
                                                                            'none',
                                                                    }}
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleFileChange(
                                                                            e,
                                                                            index
                                                                        )
                                                                    }
                                                                    multiple
                                                                    // ref={
                                                                    //     fileInputRef
                                                                    // }
                                                                    // useRef로 파일 입력 요소를 참조
                                                                    id={`fileInput-${index}`}
                                                                    // id={`fileInput-0`}
                                                                    accept="*/*"
                                                                />
                                                                <label
                                                                    // htmlFor={`fileInput-0`}
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
                                                                                '50px',
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
                                                            <div className="flex items-center">
                                                                &nbsp; &nbsp;
                                                                &nbsp; &nbsp;
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
        </>
    )
}
 
export default USerNewQSheetContent