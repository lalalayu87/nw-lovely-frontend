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

interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type SignUpFormSchema = {
    id: string
    userName: string
    password: string
    email: string
    emailCode: string
}

const validationSchema = Yup.object().shape({
    id: Yup.string().required('id를 입력하세요.'),
    userName: Yup.string().required('이름을 입력하세요.'),
    email: Yup.string().email('Invalid email').required('이메일을 입력하세요.'),
    emailCode: Yup.string().required('인증코드를 입력하세요.'),
    password: Yup.string().required('비밀번호를 입력하세요.'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        '비밀번호가 일치하지 않습니다.'
    ),
})

const SignUpForm = (props: SignUpFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (
        values: SignUpFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { id, userName, password, email, emailCode } = values
        setSubmitting(true)
        const result = await signUp({
            userName,
            password,
            email,
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
                    userName: 'admin1',
                    password: '123Qwe1',
                    confirmPassword: '123Qwe1',
                    email: 'test@testmail.com',
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
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                }
                                errorMessage={errors.confirmPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="confirmPassword"
                                    placeholder="비밀번호 확인"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                className="my-6"
                                label="업체명"
                                invalid={errors.userName && touched.userName}
                                errorMessage={errors.userName}
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
                                invalid={errors.userName && touched.userName}
                                errorMessage={errors.userName}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="businessRegistration"
                                    placeholder="사업자등록번호"
                                    component={Input}
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
                                <span>Already have an account? </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
