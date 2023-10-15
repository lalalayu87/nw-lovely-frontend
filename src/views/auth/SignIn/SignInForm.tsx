import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useAuth from '@/utils/hooks/useAuth'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    companySignUpUrl: string
    userSignUpUrl: string
    // signUpUrl?: string
}

type SignInFormSchema = {
    userId: string
    userPassword: string
    // rememberMe: boolean
}

const validationSchema = Yup.object().shape({
    userId: Yup.string().required('아이디를 입력해주세요'),
    userPassword: Yup.string().required('비밀번호를 입력해주세요'),
    rememberMe: Yup.bool()
})

const SignInForm = (props: SignInFormProps) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        companySignUpUrl = '/company-sign-up',
        userSignUpUrl = '/sign-up'
        // signUpUrl = '/sign-up',
    } = props

    const [message, setMessage] = useTimeOutMessage()

    const { signIn } = useAuth()

    const onSignIn = async (
        values: SignInFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        console.log('onSignIn values : ', values)
        const { userId, userPassword } = values
        setSubmitting(true)

        const result = await signIn({ userId, userPassword })
        console.log(result)

        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <>{message}</>
                </Alert>
            )}
            <Formik
                initialValues={{
                    userId: '',
                    userPassword: '',
                    rememberMe: true
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignIn(values, setSubmitting)
                        console.log('signIn values', values)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="아이디"
                                invalid={
                                    (errors.userId && touched.userId) as boolean
                                }
                                errorMessage={errors.userId}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="userId"
                                    placeholder="아이디"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="비밀번호"
                                invalid={
                                    (errors.userPassword &&
                                        touched.userPassword) as boolean
                                }
                                errorMessage={errors.userPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="userPassword"
                                    placeholder="비밀번호"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <div className="flex justify-between mb-6">
                                <Field
                                    className="mb-0"
                                    name="rememberMe"
                                    component={Checkbox}
                                >
                                    로그인 정보 기억하기
                                </Field>
                                <ActionLink to={forgotPasswordUrl}>
                                    비밀번호 찾기
                                </ActionLink>
                            </div>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>{`아직 회원이 아니신가요?`} </span>
                                <ActionLink to={companySignUpUrl}>
                                    기업 회원가입&nbsp;
                                </ActionLink>
                                <span>|</span>
                                <ActionLink to={userSignUpUrl}>
                                    &nbsp;일반 회원가입
                                </ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignInForm
