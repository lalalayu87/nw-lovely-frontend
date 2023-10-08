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
            const resp = await apiSignIn(values)
            if (resp.data) {
                const { accessToken } = resp.data
                dispatch(signInSuccess(accessToken))
                if (resp.data) {
                    dispatch(
                        setUser(
                            resp.data || {
                                userSeq: '',
                                userId: '',
                                userName: '',
                                userRole: '',
                                info: {
                                    roleSeq: '',
                                    userSeq: '',
                                },
                                accessToken: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)

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
                                userSeq: '',
                                userId: '',
                                userName: '',
                                userRole: '',
                                info: {
                                    roleSeq: '',
                                    userSeq: '',
                                },
                                accessToken: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
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
                userSeq: '',
                userId: '',
                userName: '',
                userRole: '',
                info: {
                    roleSeq: '',
                    userSeq: '',
                },
                accessToken: '',
            })
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await handleSignOut()
        // apiSignOut()
    }

    // const signOut = () => {
    //     dispatch(
    //         setUser({
    //             userId: '',
    //             userName: '',
    //             userRole: {
    //                 roleSeq: '',
    //                 roleName: '',
    //             },
    //             accessToken: '',
    //         })
    //     )
    //     navigate(appConfig.unAuthenticatedEntryPath)
    // }

    return {
        authenticated: accessToken && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
