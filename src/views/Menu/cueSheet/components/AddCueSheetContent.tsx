import React from 'react'
import { useAppDispatch, closeDialog, useAppSelector } from '../store'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import {
    Formik,
    Field,
    Form,
    FieldProps,
    FormikTouched,
    FormikErrors,
    FieldInputProps,
    FormikProps,
} from 'formik'
import requiredFieldValidation from '@/utils/requiredFieldValidation'
import type { CommonProps } from '@/@types/common'
import * as Yup from 'yup'
import axios from 'axios'

interface AddCueSheetDialogProps {
    onClick?(): void
    onClose?(): void
}

interface CuesheetContentProps extends CommonProps {
    disableSubmit?: boolean
}

type CuesheetContentSchema = {
    process: string
    actor: string
    content: string
    filePath: string //파일 경로를 문자열로 저장
    note: string
}

interface cueSheetData {
    process: string
    actor: string
    content: string
    filePath: string
    note: string
    orderIndex: number
}

interface addCueSheetContent {
    cueSheetData: cueSheetData
    CuesheetContentSchema: CuesheetContentSchema
    CuesheetContentProps: CuesheetContentProps
}

const validationSchema = Yup.object().shape({
    id: Yup.string()
        .min(3, '3자 이상 입력하세요.')
        .max(50, '50자 이내로 입력하세요.')
        // 숫자와 알파벳만
        .matches(/[a-z0-9]/, '숫자 또는 영어로 입력하세요.')
        .required('id를 입력하세요.'),
    userName: Yup.string()
        .matches(/^[가-힣]{2,5}$/, '한글로 입력하세요.')
        .min(2, '2자 이상 입력하세요.')
        .required('이름을 입력하세요.'),
    phone: Yup.string()
        .matches(/^[0-9]{11}$/i, '숫자만 입력하세요.')
        .required('핸드폰 번호를 입력하세요.'),
    email: Yup.string()
        .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, '이메일 형식에 맞지 않습니다.')
        .required('이메일을 입력하세요.'),
    emailCode: Yup.string()
        .length(8, '유효하지 않는 코드입니다.')
        .matches(/[a-z0-9]/, '유효하지 않는 코드입니다.')
        .required('인증코드를 입력하세요.'),
    password: Yup.string()
        .matches(
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/,
            '영문, 숫자, 특수문자(!, @, #, $, %, ^, *만 사용 가능) 8-30자'
        )
        .required('비밀번호를 입력하세요.'),
    passwordConfirm: Yup.string().oneOf(
        [Yup.ref('password')],
        '비밀번호가 일치하지 않습니다.'
    ),
})

const AddCueSheetContent: React.FC<
    // AddCueSheetDialogProps & CuesheetContentProps & 
    cueSheetData
    // addCueSheetContent
> = ({
    // cueSheetData,
    // CuesheetContentSchema,
    // CuesheetContentProps
    // onClick,
    // onClose,
    // disableSubmit,
    process,
    actor,
    content,
    filePath,
    note,
    orderIndex,
}) => {
    const dispatch = useAppDispatch()

    const onFormSubmit = async (
        values: CuesheetContentSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        console.log('기둘')
        const { process, actor, content, filePath, note } = values
        setSubmitting(true)

        const { accessToken } = useAppSelector((state) => state.auth.session)

        const cueSheetPostAPI = async () => {
            try {
                const response = await axios.post(
                    `http://152.69.228.245:10001/api/v1/qsheet`,
                    {
                        process: values.process,
                        actor: values.actor,
                        content: values.content,
                        filePath: values.filePath,
                        note: values.note,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
                        },
                    }
                )

                if (Array.isArray(response.data.content)) {
                    const newData = response.data.content[0].data
                    const cueSheetData: cueSheetDataProps[] = newData
                } else {
                    return
                }
            } catch (error) {
                // 에러 처리
                console.error('cueSheet 데이터를 불러오는 중 에러 발생:', error)
                throw error
            }
        }

        // const data = cloneDeep(columns)
        // data[title ? title : 'Untitled Board'] = []
        // const newOrdered = [...ordered, ...[title ? title : 'Untitled Board']]
        // const newColumns: Record<string, unknown> = {}
        // newOrdered.forEach((elm) => {
        //     newColumns[elm] = data[elm]
        // })

        // dispatch(updateColumns(newColumns))
        // dispatch(updateOrdered(newOrdered))
        dispatch(closeDialog())
    }

    return (
        <div>
            <h5>큐시트 추가 내용</h5>
            <div className="mt-8">
                <Formik
                    initialValues={{
                        process: '',
                        actor: '',
                        content: '',
                        filePath: '',
                        note: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (!disableSubmit) {
                            onFormSubmit(values, setSubmitting)
                        } else {
                            setSubmitting(false)
                        }
                    }}
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
                                        name="text"
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
                                    <Button variant="solid" type="submit">
                                        추가
                                    </Button>
                                </FormItem>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AddCueSheetContent
