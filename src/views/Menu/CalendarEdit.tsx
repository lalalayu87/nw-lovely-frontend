import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { Field, Form, Formik } from 'formik'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import * as Yup from 'yup'
import type { MouseEvent } from 'react'
import { DatePicker, Select, TimeInput } from '@/components/ui'

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    userName: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('User Name Required'),
    password: Yup.string()
        .required('Password Required')
        .min(8, 'Too Short!')
        .matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed'),
    rememberMe: Yup.bool(),
})

const weddingOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
]

const CalendarEdit = () => {
    const [pwInputType, setPwInputType] = useState('password')

    const onPasswordVisibleClick = (e: MouseEvent) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }

    const passwordVisible = (
        <span
            className="cursor-pointer"
            onClick={(e) => onPasswordVisibleClick(e)}
        >
            {pwInputType === 'password' ? (
                <HiOutlineEyeOff />
            ) : (
                <HiOutlineEye />
            )}
        </span>
    )

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    userName: '',
                    password: '',
                    rememberMe: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        setSubmitting(false)
                        resetForm()
                    }, 400)
                }}
            >
                {({ touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <div className="flex">
                                <FormItem
                                    label="신랑 이름"
                                    // invalid={errors.email && touched.email}
                                    // errorMessage={errors.email}
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
                                    // invalid={errors.email && touched.email}
                                    // errorMessage={errors.email}
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
                                    // invalid={errors.email && touched.email}
                                    // errorMessage={errors.email}
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
                                    // invalid={errors.email && touched.email}
                                    // errorMessage={errors.email}
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
                                    // invalid={errors.email && touched.email}
                                    // errorMessage={errors.email}
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
                                    // invalid={errors.email && touched.email}
                                    // errorMessage={errors.email}
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
                                    <p>고객 상태</p>
                                    <Select
                                        options={weddingOptions}
                                        // components={{
                                        //     Option: CustomSelectOption,
                                        //     Control: CustomControl,
                                        // }}
                                        defaultValue={weddingOptions[0]}
                                        className="mb-4"
                                    />
                                </div>
                                <div className="w-1/3">
                                    <p>일정 등록</p>
                                    <DatePicker placeholder="날짜를 골라주세요" />
                                </div>
                                <div className="w-1/3">
                                    <p>시간</p>
                                    <TimeInput />
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-1/3">
                                    <p>예식(예정)일</p>
                                    <DatePicker placeholder="날짜를 골라주세요" />
                                </div>
                                <div className="w-1/3">
                                    <p>웨딩홀</p>
                                    <Select
                                        options={weddingOptions}
                                        // components={{
                                        //     Option: CustomSelectOption,
                                        //     Control: CustomControl,
                                        // }}
                                        defaultValue={weddingOptions[0]}
                                        className="mb-4"
                                    />
                                </div>
                                <div className="w-1/3">
                                    <p>시작 시간</p>
                                    <TimeInput />
                                </div>
                            </div>
                            <FormItem
                                label="보증 인원"
                                // invalid={errors.email && touched.email}
                                // errorMessage={errors.email}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="guaranteePerson "
                                    placeholder="100 ~ 200"
                                    component={Input}
                                />
                            </FormItem>
                            <div>
                                <p>메모</p>
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
                                    placeholder="100 ~ 200"
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
                                    onClick={() => resetForm()}
                                >
                                    Reset
                                </Button>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CalendarEdit
