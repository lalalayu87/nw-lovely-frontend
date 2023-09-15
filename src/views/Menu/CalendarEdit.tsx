import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import DatePicker from '@/components/ui/DatePicker'
import Dialog from '@/components/ui/Dialog'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Badge from '@/components/ui/Badge'
import hooks from '@/components/ui/hooks'
import { Field, Form, Formik, FieldProps } from 'formik'
import { HiCheck } from 'react-icons/hi'
import { components, ControlProps, OptionProps } from 'react-select'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { closeDialog, useAppDispatch, useAppSelector } from './store'
import { TimeInput } from '@/components/ui'
import CalendarDialog from '@/components/ui/Dialog/CalenderDialog'
import { useState } from 'react'

type FormModel = {
    // title: string
    // startDate: string | Date
    // endDate: string | Date
    // color: string
    // id: string
    groom: string
    groomContact: string
    groomEmail: string
    bride: string
    brideContact: string
    brideEmail: string
    weddingDate: Date | string
    scheduleDate: Date | string
    customerStatus: string
    weddingHall: string
    weddingTime: Date | string
    guaranteePerson: number
}

export type EventParam = {
    id: string
    groom: string
    groomContact: string
    groomEmail: string
    bride: string
    brideContact: string
    brideEmail: string
    weddingDate: Date | string
    scheduleDate: Date | string
    customerStatus: string
    weddingHall: string
    weddingTime: Date | string
    guaranteePerson: number
}

type ColorOption = {
    value: string
    label: string
    color: string
}

type selectOptionType = {
    value: string
    label: string
}

const weddingOptions = [
    { value: 'one', label: 'one' },
    { value: 'two', label: 'two' },
    { value: 'three', label: 'three' },
]

type EventDialogProps = {
    submit: (eventData: EventParam, type: string) => void
}

const { Control } = components

const { useUniqueId } = hooks

const colorOptions = [
    {
        value: 'red',
        label: 'red',
        color: 'bg-red-500',
    },
    {
        value: 'orange',
        label: 'orange',
        color: 'bg-orange-500',
    },
    {
        value: 'amber',
        label: 'amber',
        color: 'bg-amber-500',
    },
    {
        value: 'yellow',
        label: 'yellow',
        color: 'bg-yellow-500',
    },
    {
        value: 'lime',
        label: 'lime',
        color: 'bg-lime-500',
    },
    {
        value: 'green',
        label: 'green',
        color: 'bg-green-500',
    },
    {
        value: 'emerald',
        label: 'emerald',
        color: 'bg-emerald-500',
    },
    {
        value: 'teal',
        label: 'teal',
        color: 'bg-teal-500',
    },
    {
        value: 'cyan',
        label: 'cyan',
        color: 'bg-cyan-500',
    },
    {
        value: 'sky',
        label: 'sky',
        color: 'bg-sky-500',
    },
    {
        value: 'blue',
        label: 'blue',
        color: 'bg-blue-500',
    },
    {
        value: 'indigo',
        label: 'indigo',
        color: 'bg-indigo-500',
    },
    {
        value: 'purple',
        label: 'purple',
        color: 'bg-purple-500',
    },
    {
        value: 'fuchsia',
        label: 'fuchsia',
        color: 'bg-fuchsia-500',
    },
    {
        value: 'pink',
        label: 'pink',
        color: 'bg-pink-500',
    },
    {
        value: 'rose',
        label: 'rose',
        color: 'bg-rose-500',
    },
]

const selectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<selectOptionType>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                {/* <Badge className="bg-red-300" /> */}
                <span className="ml-2 rtl:mr-2 capitalize">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<ColorOption>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <Badge className={data.color} />
                <span className="ml-2 rtl:mr-2 capitalize">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({
    children,
    ...props
}: ControlProps<selectOptionType>) => {
    const selected = props.getValue()[0]

    return (
        <Control className="capitalize" {...props}>
            {selected && <Badge className={`red-100 ltr:ml-4 rtl:mr-4`} />}
            {children}
        </Control>
    )
}

const validatePerson = (value: number) => {
    let errors
    if (value === 0) {
        errors = '보증 인원을 입력하세요'
    }
    return errors
}

const validationSchema = Yup.object().shape({
    groom: Yup.string().required('신랑 이름을 입력하세요'),
    groomContact: Yup.string().required('신랑 연락처를 입력하세요'),
    groomEmail: Yup.string().required('신랑 이메일을 입력하세요'),
    bride: Yup.string().required('신부 이름을 입력하세요'),
    brideContact: Yup.string().required('신부 연락처를 입력하세요'),
    brideEmail: Yup.string().required('신부 이메일을 입력하세요'),
    weddingDate: Yup.string().required('예식 날짜를 입력하세요'),
    scheduleDate: Yup.string().required('일정을 등록할 날짜를 입력하세요'),
    customerStatus: Yup.string().required('고객 상태를 선택해주세요'),
    weddingHall: Yup.string().required('웨딩홀을 선택해주세요'),
    weddingTime: Yup.string().required('시작 시간을 입력하세요'),
    guaranteePerson: Yup.string().required('보증 인원을 입력하세요'),
    // title: Yup.string().required('Event title Required'),
    // startDate: Yup.date().required('Start Date Required'),
    // endDate: Yup.date(),
    // color: Yup.string().required('Color Required'),
})

const CalendarEdit = ({ submit }: EventDialogProps) => {
    const dispatch = useAppDispatch()
    const today = new Date(+new Date() + 3240 * 10000)
        .toISOString()
        .split('T')[0]

    const [dateValue, setDateValue] = useState<Date>(new Date())
    const open = useAppSelector((state) => state.crmCalendar.data.dialogOpen)
    const selected = useAppSelector((state) => state.crmCalendar.data.selected)
    const newId = useUniqueId('event-')

    console.log('selected : ', selected)

    const onCertainPeriodChange = (date: Date) => {
        setDateValue(date)
    }

    const handleDialogClose = () => {
        dispatch(closeDialog())
    }

    const handleSubmit = (
        values: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true)
        const eventData: EventParam = {
            groom: values.groom,
            groomContact: values.groomContact,
            groomEmail: values.groomEmail,
            bride: values.bride,
            brideContact: values.brideContact,
            brideEmail: values.brideEmail,
            weddingDate: values.weddingDate,
            scheduleDate: values.scheduleDate,
            customerStatus: values.customerStatus,
            weddingHall: values.weddingHall,
            weddingTime: values.weddingTime,
            guaranteePerson: values.guaranteePerson,
            id: selected.id || newId,
        }
        //     title: values.title,
        //     start: dayjs(values.startDate).format(),
        //     eventColor: values.color,

        // }
        // if (values.endDate) {
        //     eventData.end = dayjs(values.endDate).format()
        // }
        console.log('eventData : ', eventData)
        submit?.(eventData, selected.type)
        console.log('selected.type : ', selected.type)
        dispatch(closeDialog())
    }

    return (
        <CalendarDialog
            isOpen={open}
            onClose={handleDialogClose}
            onRequestClose={handleDialogClose}
        >
            {/* <h5 className="mb-4">
                {selected.type === 'NEW' ? 'Add New Event' : 'Edit Event'}
            </h5> */}
            <div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        // color: selected.eventColor || colorOptions[0].value,
                        groom: selected.groom || '',
                        groomContact: selected.groomContact || '',
                        groomEmail: selected.groomEmail || '',
                        bride: selected.bride || '',
                        brideContact: selected.brideContact || '',
                        brideEmail: selected.brideEmail || '',
                        weddingDate: selected.weddingDate
                            ? dayjs(selected.weddingDate).toDate()
                            : '',
                        scheduleDate: selected.scheduleDate
                            ? dayjs(selected.scheduleDate).toDate()
                            : '',
                        customerStatus: selected.customerStatus || '',
                        weddingHall: selected.weddingHall || '',
                        weddingTime: selected.weddingTime || '',
                        guaranteePerson: selected.guaranteePerson || 0,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log('values : ', values)
                        handleSubmit(values, setSubmitting)
                    }}
                >
                    {({ values, touched, errors }) => (
                        <Form>
                            <FormContainer>
                                <div className="flex">
                                    <FormItem
                                        label="신랑 이름"
                                        invalid={errors.groom && touched.groom}
                                        errorMessage={errors.groom}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="groom"
                                            placeholder="이름"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="신랑 연락처"
                                        invalid={
                                            errors.groomContact &&
                                            touched.groomContact
                                        }
                                        errorMessage={errors.groomContact}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="groomContact"
                                            placeholder="010-1234-5678"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="신랑 이메일"
                                        invalid={
                                            errors.groomEmail &&
                                            touched.groomEmail
                                        }
                                        errorMessage={errors.groomEmail}
                                    >
                                        <Field
                                            type="email"
                                            autoComplete="off"
                                            name="groomEmail"
                                            placeholder="이메일"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                {/* 신랑 정보 */}
                                <div className="flex">
                                    <FormItem
                                        label="신부 이름"
                                        invalid={errors.bride && touched.bride}
                                        errorMessage={errors.bride}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="bride"
                                            placeholder="이름"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="신부 연락처"
                                        invalid={
                                            errors.brideContact &&
                                            touched.brideContact
                                        }
                                        errorMessage={errors.brideContact}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="brideContact"
                                            placeholder="010-1234-5678"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="신부 이메일"
                                        invalid={
                                            errors.brideEmail &&
                                            touched.brideEmail
                                        }
                                        errorMessage={errors.brideEmail}
                                    >
                                        <Field
                                            type="email"
                                            autoComplete="off"
                                            name="brideEmail"
                                            placeholder="이메일"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                {/* 신부 정보 */}
                                <div className="flex">
                                    <div className="w-1/3">
                                        <FormItem
                                            label="고객 상태"
                                            invalid={
                                                errors.customerStatus &&
                                                touched.customerStatus
                                            }
                                            errorMessage={errors.customerStatus}
                                        >
                                            <Field name="customerStatus">
                                                {({
                                                    field,
                                                    form,
                                                }: FieldProps) => (
                                                    <Select<selectOptionType>
                                                        field={field}
                                                        form={form}
                                                        options={weddingOptions}
                                                        value={weddingOptions.filter(
                                                            (option) =>
                                                                option.value ===
                                                                values.customerStatus
                                                        )}
                                                        components={{
                                                            Option: selectOption,
                                                            Control:
                                                                CustomControl,
                                                        }}
                                                        onChange={(option) =>
                                                            form.setFieldValue(
                                                                field.name,
                                                                option?.value
                                                            )
                                                        }
                                                        className="mb-4"
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </div>
                                    <div className="w-1/3">
                                        <FormItem
                                            label="일정 등록"
                                            invalid={
                                                errors.scheduleDate &&
                                                touched.scheduleDate
                                            }
                                            errorMessage={errors.scheduleDate}
                                        >
                                            <Field name="scheduleDate">
                                                {({
                                                    field,
                                                    form,
                                                }: FieldProps) => (
                                                    <DatePicker
                                                        field={field}
                                                        form={form}
                                                        value={field.value}
                                                        placeholder={today}
                                                        onChange={(date) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                date
                                                            )
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </div>
                                    <div className="w-1/3">
                                        <FormItem label="시간">
                                            <TimeInput />
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-1/3">
                                        <FormItem
                                            label="예식 예정일"
                                            invalid={
                                                errors.weddingDate &&
                                                touched.weddingDate
                                            }
                                            errorMessage={errors.weddingDate}
                                        >
                                            <Field name="weddingDate">
                                                {({
                                                    field,
                                                    form,
                                                }: FieldProps) => (
                                                    <DatePicker
                                                        field={field}
                                                        form={form}
                                                        value={field.value}
                                                        placeholder={today}
                                                        onChange={(date) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                date
                                                            )
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </div>
                                    <div className="w-1/3">
                                        <FormItem
                                            label="웨딩홀"
                                            invalid={
                                                errors.weddingHall &&
                                                touched.weddingHall
                                            }
                                            errorMessage={errors.weddingHall}
                                        >
                                            <Field name="weddingHall">
                                                {({
                                                    field,
                                                    form,
                                                }: FieldProps) => (
                                                    <Select<selectOptionType>
                                                        field={field}
                                                        form={form}
                                                        options={weddingOptions}
                                                        components={{
                                                            Option: selectOption,
                                                            Control:
                                                                CustomControl,
                                                        }}
                                                        value={weddingOptions.filter(
                                                            (option) =>
                                                                option.value ===
                                                                values.weddingHall
                                                        )}
                                                        onChange={(option) =>
                                                            form.setFieldValue(
                                                                field.name,
                                                                option?.value
                                                            )
                                                        }
                                                        // defaultValue={
                                                        //     field.value
                                                        // }
                                                        className="mb-4"
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </div>
                                    <div className="w-1/3">
                                        <FormItem
                                            label="시작 시간"
                                            invalid={
                                                errors.weddingTime &&
                                                touched.weddingTime
                                            }
                                            errorMessage={errors.weddingTime}
                                        >
                                            <Field name="weddingTime">
                                                {({
                                                    field,
                                                    form,
                                                }: FieldProps) => (
                                                    <TimeInput
                                                        field={field}
                                                        form={form}
                                                        value={field.value}
                                                        onChange={(date) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                date
                                                            )
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="-mt-4">
                                    <FormItem
                                        label="보증 인원"
                                        invalid={
                                            errors.guaranteePerson &&
                                            touched.guaranteePerson
                                        }
                                        errorMessage={errors.guaranteePerson}
                                    >
                                        <Field
                                            type="number"
                                            autoComplete="off"
                                            name="guaranteePerson "
                                            placeholder="100 ~ 200"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div>
                                    <p className="flex items-center font-semibold mb-2">
                                        메모
                                    </p>
                                    <Input placeholder="메모" textArea />
                                </div>
                                <FormItem
                                    label="담당자"
                                    // invalid={errors.email && touched.email}
                                    // errorMessage={errors.email}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="managerId "
                                        // placeholder="100 ~ 200"
                                        component={Input}
                                    />
                                </FormItem>
                                {/* <FormItem
                        label="User Name"
                        invalid={errors.userName && touched.userName}
                        errorMessage={errors.userName}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="userName"
                            placeholder="User Name"
                            component={Input}
                        />
                    </FormItem>
                    <FormItem
                        label="Password"
                        invalid={errors.password && touched.password}
                        errorMessage={errors.password}
                    >
                        <Field
                            type={pwInputType}
                            suffix={passwordVisible}
                            autoComplete="off"
                            name="password"
                            placeholder="Password"
                            component={Input}
                        />
                    </FormItem>
                    <FormItem>
                        <Field name="rememberMe" component={Checkbox}>
                            Remember Me
                        </Field>
                    </FormItem> */}
                                <FormItem>
                                    <Button
                                        type="reset"
                                        className="ltr:mr-2 rtl:ml-2"
                                        onClick={handleDialogClose}
                                    >
                                        취소
                                    </Button>
                                    <Button variant="solid" type="submit">
                                        저장
                                    </Button>
                                </FormItem>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </div>
        </CalendarDialog>
    )
}

export default CalendarEdit
