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
    onClose,
}) => {
    const dispatch = useAppDispatch()

    const onFormSubmit = (title: string) => {
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
                            <FormContainer layout="inline">
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
