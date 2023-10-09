/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import {
    DragDropContext,
    Droppable,
    DropResult,
    DraggableChildrenFn,
    Draggable
} from 'react-beautiful-dnd'
import { HiOutlinePencil, HiOutlineTrash, HiPlusSm } from 'react-icons/hi'
import {
    toggleDeleteConfirmation,
    // toggleEditConfirmation,
    useAppDispatch,
    useAppSelector,
    getList
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate, useLocation } from 'react-router-dom'

import { apiGetQSheetCardDetails } from '@/services/QSheetService'
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

const style = {
    border: '1px dashed gray',
    padding: '2.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move'
}

const QSheetDetailsContent = () => {
    const location = useLocation()

    const [loading, setLoading] = useState(true)
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<QSheetDetailsResponse>()
    console.log(data)

    const qsheetSeq = data?.qsheetSeq

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
                setData(res)
                setDataContent(responseData)
            }
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

    const ActionColumn = ({ row }: { row: QSheetDetailsResponse }) => {
        const dispatch = useAppDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const [addDialogIsOpen, setAddDialogIsOpen] = useState(false)
        const [dialogIsOpen, setIsOpen] = useState(false)
        const [dataForEdit, setDataForEdit] = useState<DataContent | null>(null)

        const openDialog = () => {
            setIsOpen(true)
        }

        const onDialogClose = () => {
            setIsOpen(false)
        }

        const onClickCloes = () => {
            setIsOpen(false)
        }

        const openAddDialog = () => {
            console.log('add open')
            setAddDialogIsOpen(true)
        }

        const onAddDialogClose = () => {
            console.log('add close')
            setAddDialogIsOpen(false)
        }

        const onClickAddCloes = () => {
            setAddDialogIsOpen(false)
        }

        const onAdd = () => {
            console.log('add')
            setAddDialogIsOpen(true)
        }

        const onEdit = () => {
            setIsOpen(true)

            // 클릭한 행의 데이터를 전달
            const rowDataTmp = dataContent.find(
                (item) => item.orderIndex === row.orderIndex
            )

            setDataForEdit(rowDataTmp) // setDataForEdit 함수로 데이터 전달
        }

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
            <div className="flex justify-end text-lg">
                <Tooltip title="추가">
                    <span
                        className={`cursor-pointer p-2 hover:${textTheme}`}
                        onClick={() => onAdd()}
                    >
                        <HiPlusSm />
                    </span>
                </Tooltip>
                <Dialog
                    isOpen={addDialogIsOpen}
                    contentClassName="pb-10 px-10"
                    onClose={onAddDialogClose}
                    onRequestClose={onAddDialogClose}
                >
                    <>
                        <div>
                            <h5>큐시트 추가</h5>
                            <div className="mt-8">
                                <Formik
                                    initialValues={{
                                        process: '',
                                        actor: '',
                                        content: '',
                                        filePath: '',
                                        note: '',
                                        orderIndex: ''
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        console.log('추가 되냐')
                                        setSubmitting(true)

                                        try {
                                            // 새 데이터를 생성하고 배열에 추가합니다.
                                            const newData = {
                                                ...values,
                                                orderIndex:
                                                    dataContent.length + 1
                                            }

                                            setDataContent((prevData) => [
                                                ...prevData,
                                                newData
                                            ])

                                            onAddDialogClose()

                                            console.log(
                                                '새 데이터 추가 완료:',
                                                newData
                                            )
                                        } catch (error) {
                                            console.error(
                                                '데이터 추가 실패:',
                                                error
                                            )
                                        } finally {
                                            setSubmitting(false)
                                        }
                                    }}
                                >
                                    {({ touched, errors, isSubmitting }) => (
                                        <Form>
                                            <FormContainer layout="horizontal">
                                                <FormItem
                                                    label="절차"
                                                    invalid={
                                                        errors.process &&
                                                        touched.process
                                                    }
                                                    errorMessage={
                                                        errors.process
                                                    }
                                                >
                                                    <Field
                                                        type="text"
                                                        name="process"
                                                        placeholder="예) 개식사"
                                                        component={Input}
                                                        validate={(
                                                            value: string
                                                        ) =>
                                                            requiredFieldValidation(
                                                                value,
                                                                '절차를 기입해주세요.'
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="행위자"
                                                    invalid={
                                                        errors.actor &&
                                                        touched.actor
                                                    }
                                                    errorMessage={errors.actor}
                                                >
                                                    <Field
                                                        type="text"
                                                        name="actor"
                                                        placeholder="예) 신랑, 신부"
                                                        component={Input}
                                                        validate={(
                                                            value: string
                                                        ) =>
                                                            requiredFieldValidation(
                                                                value,
                                                                '행위자를 기입해주세요.'
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="내용"
                                                    invalid={
                                                        errors.content &&
                                                        touched.content
                                                    }
                                                    errorMessage={
                                                        errors.content
                                                    }
                                                >
                                                    <Field
                                                        style={{
                                                            height: 100
                                                        }}
                                                        type="text"
                                                        name="content"
                                                        placeholder="예) 결혼식을 시작하겠습니다."
                                                        component={Input}
                                                        validate={(
                                                            value: string
                                                        ) =>
                                                            requiredFieldValidation(
                                                                value,
                                                                '내용을 기입해주세요.'
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="파일"
                                                    invalid={
                                                        errors.filePath &&
                                                        touched.filePath
                                                    }
                                                    errorMessage={
                                                        errors.filePath
                                                    }
                                                >
                                                    <Field
                                                        type="file"
                                                        name="file"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="비고"
                                                    invalid={
                                                        errors.note &&
                                                        touched.note
                                                    }
                                                    errorMessage={errors.note}
                                                >
                                                    <Field
                                                        type="text"
                                                        name="note"
                                                        placeholder="비고"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <div>
                                                        <Button
                                                            variant="solid"
                                                            loading={
                                                                isSubmitting
                                                            }
                                                            type="submit"
                                                        >
                                                            추가
                                                        </Button>
                                                        &nbsp;
                                                        <Button
                                                            size="md"
                                                            type="button"
                                                            onClick={
                                                                onClickAddCloes
                                                            }
                                                        >
                                                            취소
                                                        </Button>
                                                    </div>
                                                </FormItem>
                                            </FormContainer>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </>
                </Dialog>

                <Tooltip title="수정">
                    <span
                        className={`cursor-pointer p-2 hover:${textTheme}`}
                        onClick={() => onEdit()}
                    >
                        <HiOutlinePencil />
                    </span>
                </Tooltip>
                <Dialog
                    isOpen={dialogIsOpen}
                    contentClassName="pb-10 px-10"
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                    {/* <EditNewQSheetContent
                            disableSubmit={false}
                            data={dataForEdit}
                            onClose={onDialogClose}
                        /> */}
                    <>
                        <div>
                            <h5>큐시트 수정</h5>
                            <div className="mt-8">
                                <Formik
                                    initialValues={{
                                        process: dataForEdit?.process,
                                        actor: dataForEdit?.actor,
                                        content: dataForEdit?.content,
                                        filePath: dataForEdit?.filePath,
                                        note: dataForEdit?.note,
                                        orderIndex: dataForEdit?.orderIndex
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        console.log('되냐')
                                        setSubmitting(true)

                                        const index = dataContent.findIndex(
                                            (item) =>
                                                item.orderIndex ===
                                                values.orderIndex
                                        )

                                        if (index !== -1) {
                                            // 데이터를 업데이트합니다.
                                            const updatedData = [...dataContent]
                                            updatedData[index] = values
                                            setDataContent(updatedData)
                                        }

                                        // 다이얼로그를 닫습니다.
                                        onDialogClose()
                                    }}
                                >
                                    {({ touched, errors, isSubmitting }) => (
                                        <Form>
                                            <FormContainer layout="horizontal">
                                                <FormItem
                                                    label="절차"
                                                    invalid={
                                                        errors.process &&
                                                        touched.process
                                                    }
                                                    errorMessage={
                                                        errors.process
                                                    }
                                                >
                                                    <Field
                                                        type="text"
                                                        name="process"
                                                        placeholder="예) 개식사"
                                                        component={Input}
                                                        validate={(
                                                            value: string
                                                        ) =>
                                                            requiredFieldValidation(
                                                                value,
                                                                '절차를 기입해주세요.'
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="행위자"
                                                    invalid={
                                                        errors.actor &&
                                                        touched.actor
                                                    }
                                                    errorMessage={errors.actor}
                                                >
                                                    <Field
                                                        type="text"
                                                        name="actor"
                                                        placeholder="예) 신랑, 신부"
                                                        component={Input}
                                                        validate={(
                                                            value: string
                                                        ) =>
                                                            requiredFieldValidation(
                                                                value,
                                                                '행위자를 기입해주세요.'
                                                            )
                                                        }
                                                    />
                                                    {/* <div className="border border-gray-300 p-2 rounded-md">
                                                        <Field
                                                            type="checkbox"
                                                            name="actor"
                                                            validate={(
                                                                value: string
                                                            ) =>
                                                                requiredFieldValidation(
                                                                    value,
                                                                    '행위자를 선택해주세요.'
                                                                )
                                                            }
                                                            className="w-full h-6"
                                                        >
                                                            <option value="사회자">
                                                                사회자
                                                            </option>
                                                            <option value="신랑">
                                                                신랑
                                                            </option>
                                                            <option value="신부">
                                                                신부
                                                            </option>
                                                            <option value="주례자">
                                                                주례자
                                                            </option>
                                                            <option value="신랑 아버님">
                                                                신랑 아버님
                                                            </option>
                                                            <option value="신랑 어머님">
                                                                신랑 어머님
                                                            </option>
                                                            <option value="신부 아버님">
                                                                신부 아버님
                                                            </option>
                                                            <option value="신부 어머님">
                                                                신부 어머님
                                                            </option>
                                                            <option value="축가자">
                                                                축가자
                                                            </option>
                                                        </Field>
                                                    </div> */}
                                                </FormItem>
                                                <FormItem
                                                    label="내용"
                                                    invalid={
                                                        errors.content &&
                                                        touched.content
                                                    }
                                                    errorMessage={
                                                        errors.content
                                                    }
                                                >
                                                    <Field
                                                        style={{
                                                            height: 100
                                                        }}
                                                        type="text"
                                                        name="content"
                                                        placeholder="예) 결혼식을 시작하겠습니다."
                                                        component={Input}
                                                        validate={(
                                                            value: string
                                                        ) =>
                                                            requiredFieldValidation(
                                                                value,
                                                                '내용을 기입해주세요.'
                                                            )
                                                        }
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="파일"
                                                    invalid={
                                                        errors.filePath &&
                                                        touched.filePath
                                                    }
                                                    errorMessage={
                                                        errors.filePath
                                                    }
                                                >
                                                    <Field
                                                        type="file"
                                                        name="file"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="비고"
                                                    invalid={
                                                        errors.note &&
                                                        touched.note
                                                    }
                                                    errorMessage={errors.note}
                                                >
                                                    <Field
                                                        type="text"
                                                        name="note"
                                                        placeholder="비고"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                                <FormItem>
                                                    <div>
                                                        <Button
                                                            variant="solid"
                                                            loading={
                                                                isSubmitting
                                                            }
                                                            type="submit"
                                                        >
                                                            수정
                                                        </Button>
                                                        &nbsp;
                                                        <Button
                                                            size="md"
                                                            type="button"
                                                            onClick={
                                                                onClickCloes
                                                            }
                                                        >
                                                            취소
                                                        </Button>
                                                    </div>
                                                </FormItem>
                                            </FormContainer>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </>
                </Dialog>

                <Tooltip title="삭제">
                    <span
                        className="cursor-pointer p-2 hover:text-red-500"
                        onClick={onDelete}
                    >
                        <HiOutlineTrash />
                    </span>
                </Tooltip>
            </div>
        )
    }

    return (
        <>
            <QSheetDetatilsHeader data={dataContent} qsheetSeq={qsheetSeq} />
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="DetailsDroppable">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="DetailsDroppable pt-3"
                        >
                            {dataContent.map((item, index) => (
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
                                                    <ActionColumn row={item} />
                                                </div>
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
        </>
    )
}

export default QSheetDetailsContent
