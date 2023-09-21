import ApiService from '@/services/ApiService'

export interface CommomRequest {
    userId: string
    userPassword: string
}

export interface CommomResponse {
    code: number
    data: boolean
    // headers?: Record<string, string>
    // body?: string
}

export async function loginApi(data: CommomRequest) {
    return ApiService.fetchData<CommomResponse, CommomRequest>({
        url: 'api/auth/login',
        method: 'post',
        data: data,
    })
}
