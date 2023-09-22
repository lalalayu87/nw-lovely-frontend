import React from 'react'
import { useAppDispatch, closeDialog } from '../store'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Formik, Field, Form } from 'formik'
import requiredFieldValidation from '@/utils/requiredFieldValidation'

interface AddCueSheetDialogProps {
    onClick?(): void
    onClose?(): void
}

const AddCueSheetContent: React.FC<AddCueSheetDialogProps> = ({
    onClick,
    onClose
}) => {
    const dispatch = useAppDispatch()

    const onFormSubmit = (
        title: string
        // process: string,
        // performer: string,
        // text: string,
        // file: File,
        // note: string
    ) => {
        console.log('기둘')
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
                    initialValues={{ title: '' }}
                    onSubmit={({ title }) => onFormSubmit(title)}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <FormContainer layout="horizontal">
                                <FormItem
                                    label="Column title"
                                    invalid={errors.title && touched.title}
                                    errorMessage={errors.title}
                                >
                                    <Field
                                        type="text"
                                        name="title"
                                        placeholder="Please enter ticket title"
                                        component={Input}
                                        validate={(value: string) =>
                                            requiredFieldValidation(
                                                value,
                                                'Ticket title is required!'
                                            )
                                        }
                                    />
                                </FormItem>
                                {/* <FormItem
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
                                    invalid={
                                        errors.performer && touched.performer
                                    }
                                    errorMessage={errors.performer}
                                >
                                    <Field
                                        type="text"
                                        name="performer"
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
                                    invalid={errors.text && touched.text}
                                    errorMessage={errors.text}
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
                                    invalid={errors.file && touched.file}
                                    errorMessage={errors.file}
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
                                </FormItem> */}
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