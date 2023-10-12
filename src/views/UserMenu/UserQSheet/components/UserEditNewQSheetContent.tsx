/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import { useAppDispatch, closeDialog } from '../store'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Formik, Field, Form } from 'formik'
import requiredFieldValidation from '@/utils/requiredFieldValidation'
import * as Yup from 'yup'

// interface AddNewQSheetDialogProps {
//     onClick?(): void
//     onClose?(): void
// }

interface QSheetExampleData {
    process: string
    actor: string
    content: string
    filePath: string
    note: string
    orderIndex: number
}

const validationSchema = Yup.object().shape({
    process: Yup.string().required('절차를 입력해주세요.'),
    actor: Yup.string().required('행위자를 입력해주세요.'),
    text: Yup.string().required('내용을 입력해주세요.'),
})

const UserEditNewQSheetContent: React.FC<{
    onClose: () => void
    disableSubmit: boolean
    data: QSheetExampleData
}> = ({ onClose, disableSubmit, data }) => {
    const [detailData, setDetailData] = useState(data)

    useEffect(() => {
        // data props이 변경되면 내부 상태(detailData)도 변경
        setDetailData(data)
    }, [data])

    const dispatch = useAppDispatch()

    return (
        <div>
            <h5>큐시트 수정</h5>
            <div className="mt-8">
                <Formik
                    initialValues={{
                        process: detailData.process,
                        actor: detailData.actor,
                        content: detailData.content,
                        filePath: detailData.filePath,
                        note: detailData.note,
                        orderIndex: detailData.orderIndex,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (!disableSubmit) {
                            console.log('큐시트 수정 데이터:', values)

                            // 수정 버튼을 누를 때 `detailData` 값을 업데이트
                            setDetailData(values)

                            // 다른 작업 수행 가능

                            // 다이얼로그 닫기
                            dispatch(closeDialog())
                        } else {
                            setSubmitting(false)
                        }
                    }}
                    // onSubmit={(values, { setSubmitting }) => {
                    //     if (!disableSubmit) {
                    //         console.log('기둘')
                    //         // onSignUp(values, setSubmitting)
                    //     } else {
                    //         setSubmitting(false)
                    //     }
                    // }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <FormContainer layout="horizontal">
                                <FormItem
                                    label="절차"
                                    invalid={errors.process && touched.process}
                                    errorMessage={errors.process}
                                >
                                    <Field
                                        type="text"
                                        name="process"
                                        placeholder="예) 개식사"
                                        component={Input}
                                        validate={(value: string) =>
                                            requiredFieldValidation(
                                                value,
                                                '절차를 기입해주세요.'
                                            )
                                        }
                                    />
                                </FormItem>
                                <FormItem
                                    label="행위자"
                                    invalid={errors.actor && touched.actor}
                                    errorMessage={errors.actor}
                                >
                                    <Field
                                        type="text"
                                        name="actor"
                                        placeholder="예) 신랑, 신부"
                                        component={Input}
                                        validate={(value: string) =>
                                            requiredFieldValidation(
                                                value,
                                                '행위자를 기입해주세요.'
                                            )
                                        }
                                    />
                                </FormItem>
                                <FormItem
                                    label="내용"
                                    invalid={errors.content && touched.content}
                                    errorMessage={errors.content}
                                >
                                    <Field
                                        style={{ height: 100 }}
                                        type="text"
                                        name="content"
                                        placeholder="예) 결혼식을 시작하겠습니다."
                                        component={Input}
                                        validate={(value: string) =>
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
                                        errors.filePath && touched.filePath
                                    }
                                    errorMessage={errors.filePath}
                                >
                                    <Field
                                        type="file"
                                        name="file"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="비고"
                                    invalid={errors.note && touched.note}
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
                                        <span>
                                            <Button
                                                variant="solid"
                                                type="submit"
                                            >
                                                수정
                                            </Button>
                                        </span>
                                        &nbsp;
                                        <span>
                                            <Button
                                                className="ltr:mr-2 rtl:ml-2"
                                                variant="default"
                                                type="button"
                                                onClick={onClose}
                                            >
                                                취소
                                            </Button>
                                        </span>
                                    </div>
                                </FormItem>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default UserEditNewQSheetContent
