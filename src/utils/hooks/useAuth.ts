import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { accessToken, signedIn } = useAppSelector(
        (state) => state.auth.session
    )

    const signIn = async (
        values: SignInCredential
    ): Promise<
        | {
              status: Status
              message: string
          }
        | undefined
    > => {
        try {
            console.log('확인')
            const resp = await apiSignIn(values)
            console.log(resp)
            if (resp.data) {
                const { accessToken } = resp.data
                console.log('accessToken : ', accessToken)
                dispatch(signInSuccess(accessToken))
                if (resp.data) {
                    console.log('resp.data : ', resp.data)
                    dispatch(
                        setUser(
                            resp.data || {
                                // avatar: '',
                                // userId: 'Anonymous',
                                // authority: 'USER',
                                // email: '',
                                userId: '',
                                userName: '',
                                userRole: {
                                    roleSeq: '',
                                    roleName: 'ROLE_ADMIN',
                                },
                                accessToken: '',
                            }
                            // resp.data.user || {
                            //     avatar: '',
                            //     userName: 'Anonymous',
                            //     authority: 'USER',
                            //     email: '',
                            // }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                console.log('redirectUrl : ', redirectUrl)

                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values: SignUpCredential) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                const { accessToken } = resp.data
                dispatch(signInSuccess(accessToken))
                if (resp.data) {
                    dispatch(
                        setUser(
                            resp.data || {
                                // avatar: '',
                                // userId: 'Anonymous',
                                // authority: 'USER',
                                // email: '',
                                userId: '',
                                userName: '',
                                userRole: {
                                    roleSeq: '',
                                    roleName: '',
                                },
                                accessToken: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    // redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                    redirectUrl
                        ? redirectUrl
                        : appConfig.unAuthenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                userId: '',
                userName: '',
                userRole: {
                    roleSeq: '',
                    roleName: '',
                },
                accessToken: '',
            })
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: accessToken && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
