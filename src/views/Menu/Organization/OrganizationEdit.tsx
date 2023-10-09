import { Button, FormContainer, FormItem, Input, hooks } from "@/components/ui"
import { Field, Form, Formik, FormikProps } from "formik"
import * as Yup from 'yup'
import { forwardRef, useState } from 'react'
import { HiOutlineTrash } from "react-icons/hi"
import { ConfirmDialog, StickyFooter } from "@/components/shared"
import { AiOutlineSave } from "react-icons/ai"


type FormikRef = FormikProps<any>

type OrgData = {
    name: string
    biznum: string
    contact: string
    address: string
}

type InitialData = {
    name: ''
    biznum: ''
    contact: ''
    address: ''
}

export type FormModel = Omit<InitialData, 'orgEnabled'> & {
    orgEnabled: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type OrgForm = {
    InitialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product Name Required'),
    biznum: Yup.number().required('biznum Required'),
    contact: Yup.number().required('contact Required'),
    address: Yup.string().required('address Required'),
})

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete product"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    Are you sure you want to delete this product? All record
                    related to this product will be deleted as well. This action
                    cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const OrganizationEdit = forwardRef<FormikRef, OrgForm>((props, ref) => {
    const {
        type,
        InitialData = {
            name: '',
            biznum: '',
            contact: '',
            address: '',
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    const newId = useUniqueId('product-')

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...InitialData,
                    // tags: initialData?.orgEnabled,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('values : ', values)
                    // handleSubmit(values, setSubmitting)
                    // formData.enabled = formData.enabled.map((tag) => {
                    //     if (typeof tag !== 'string') {
                    //         return tag.value
                    //     }
                    //     return tag
                    // })
                    // if (type === 'new') {
                    //     formData.id = newId
                    //     if (formData.imgList && formData.imgList.length > 0) {
                    //         formData.img = formData.imgList[0].img
                    //     }
                    // }
                    onFormSubmit?.(values, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                
                                <FormItem
                                    label="조직 이름"
                                    invalid={(errors.name && touched.name) as boolean}
                                // errorMessage={errors.name}
                                >
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="조직 이름"
                                        values="name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="전화번호"
                                    invalid={(errors.contact && touched.contact) as boolean}
                                // errorMessage={errors.name}
                                >
                                    <Field
                                        type="text"
                                        name="contact"
                                        placeholder="전화번호"
                                        values="contact"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="사업자번호"
                                    invalid={(errors.biznum && touched.biznum) as boolean}
                                // errorMessage={errors.name}
                                >
                                    <Field
                                        type="text"
                                        name="biznum"
                                        placeholder="사업자번호"
                                        values="biznum"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="주소"
                                    invalid={(errors.address && touched.address) as boolean}
                                // errorMessage={errors.name}
                                >
                                    <Field
                                        type="text"
                                        name="address"
                                        placeholder="주소"
                                        values="address"
                                        component={Input}
                                    />
                                </FormItem>
                                
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete as OnDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

export default OrganizationEdit