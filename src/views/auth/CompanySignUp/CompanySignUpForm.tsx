import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from '@/utils/hooks/useAuth'
import type { CommonProps } from '@/@types/common'
import React, { useState, useRef } from 'react'

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    id: string
    userName: string
    phone: string
    email: string
    emailCode: string
    password: string
    passwordConfirm: string
    company: string
    businessRegistration: string
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
    company: Yup.string().required('업체명을 입력하세요.'),
    businessRegistration: Yup.string().required('사업자등록번호를 입력하세요.')
})

const CompanySignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const [businessRegistrationValue, setbusinessRegistrationValue] =
        useState<string>('')
    const businessRegistrationRef = useRef<string>()

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // event: React.ChangeEvent<HTMLInputElement>
        // const newValue = event.target.value.replace(/\D+/g, '')
        const value = event.target.value
        const newValue = businessRegistrationRef.current.replace(/\D+/g, '')
        const newValueLength = 10

        let result
        result = ''

        for (let i = 0; i < newValue.length && i < newValueLength; i++) {
            switch (i) {
                case 3:
                    result += '-'
                    break
                case 2:
                    result += '-'
                    break
                case 5:
                    result += '-'
                    break
                default:
                    break
            }
            result += newValue[i]
        }

        console.log(newValue)
        setbusinessRegistrationValue(newValue)
        // if (newValue.length === 10) {
        //     console.log(newValue.length)
        //     const formattedValue = newValue.replace(
        //         /(\d{3})(\d{4})(\d{4})(\d{2})/,
        //         '$1-$2-$3-$4'
        //     )
        //     setbusinessRegistrationValue(formattedValue) // 상태 업데이트
        // } else {
        //     setbusinessRegistrationValue(newValue) // 상태 업데이트
        // }
    }

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const {
            id,
            userName,
            phone,
            email,
            emailCode,
            password,
            company,
            businessRegistration
        } = values
        setSubmitting(true)
        const result = await signUp({
            userName,
            password,
            email
        })

        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    id: '',
                    userName: '',
                    phone: '',
                    email: '',
                    emailCode: '',
                    password: '',
                    passwordConfirm: '',
                    company: '',
                    businessRegistration: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                className="my-6"
                                label="ID"
                                invalid={errors.id && touched.id}
                                errorMessage={errors.id}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="id"
                                    placeholder="아이디"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                className="my-6"
                                label="이름"
                                invalid={errors.userName && touched.userName}
                                errorMessage={errors.userName}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="userName"
                                    placeholder="이름"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                className=" my-6"
                                label="Email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                {/* 왼쪽 여백 space-x-1 > * + * */}
                                <div className="flex space-x-1 > * + *">
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="이메일"
                                        component={Input}
                                    />
                                    <Button
                                        className="mr-2 mb-2"
                                        variant="twoTone"
                                        color="red-600"
                                    >
                                        인증
                                    </Button>
                                </div>
                            </FormItem>

                            <FormItem
                                className=" my-6"
                                label="인증코드"
                                invalid={errors.emailCode && touched.emailCode}
                                errorMessage={errors.emailCode}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="emailCode"
                                    placeholder="이메일 인증코드"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                className="my-6"
                                label="비밀번호"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="비밀번호 (영문, 숫자, 특수문자 8-30자)"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                className="my-6"
                                label="비밀번호 확인"
                                invalid={
                                    errors.passwordConfirm &&
                                    touched.passwordConfirm
                                }
                                errorMessage={errors.passwordConfirm}
                            >
                                <Field
                                    autoComplete="off"
                                    name="passwordConfirm"
                                    placeholder="비밀번호 확인"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                className="my-6"
                                label="업체명"
                                invalid={errors.company && touched.company}
                                errorMessage={errors.company}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="company"
                                    placeholder="업체명"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                className="my-6"
                                label="사업자등록번호"
                                invalid={
                                    errors.businessRegistration &&
                                    touched.businessRegistration
                                }
                                errorMessage={errors.businessRegistration}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="businessRegistration"
                                    component={Input}
                                    onChange={onChange}
                                    placeholder="사업자등록번호"
                                    // value={businessRegistrationRef}
                                    ref={businessRegistrationRef}
                                />
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Sign Up'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>이미 계정이 있으신가요? </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CompanySignUpForm
