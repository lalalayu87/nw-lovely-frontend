import ApiService from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
} from '@/@types/auth'
import { SERVER_URL } from '../../config'

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchData<SignInResponse>({
        url: `${SERVER_URL}/api/auth/login`,
        method: 'post',
        data,
    })
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchData<SignUpResponse>({
        url: `${SERVER_URL}/api/auth/register`,
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: `${SERVER_URL}/sign-out`,
        method: 'post',
    })
}

export async function apiForgotPassword(data: ForgotPassword) {
    return ApiService.fetchData({
        url: `${SERVER_URL}/forgot-password`,
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data: ResetPassword) {
    return ApiService.fetchData({
        url: `${SERVER_URL}/reset-password`,
        method: 'post',
        data,
    })
}
