import ApiService from './ApiService'
import { SERVER_URL } from '../../config'

export async function apiGetQSheetList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `${SERVER_URL}/api/v1/qsheet`,
        method: 'get',
        data,
    })
}

export async function apiGetQSheetCardList<T>() {
    return ApiService.fetchData<T>({
        url: `${SERVER_URL}/api/v1/qsheet`,
        method: 'get',
    })
}

export async function apiPostQSheetCardList<
    T,
    U extends Record<string, unknown>
>(data: U) {
    console.log(data)
    return ApiService.fetchData<T>({
        url: `${SERVER_URL}/api/v1/qsheet`,
        method: 'post',
        data,
    })
}

export async function apiGetQSheetCardDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    const qsheetSeq = Object.values(params)
    return ApiService.fetchData<T>({
        url: `${SERVER_URL}/api/v1/qsheet/${qsheetSeq}`,
        method: 'get',
    })
}

export async function apiPatchQSheetCardList<T>(
    qsheetSeq: string,
    body: Record<string, unknown>
): Promise<T> {
    return ApiService.fetchData<T>({
        url: `${SERVER_URL}/api/v1/qsheet/${qsheetSeq}`,
        method: 'patch',
        data: body, // body를 데이터로 전달
    })
}
export async function apiDeleteQSheetCardList<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: `${SERVER_URL}/api/v1/qsheet/${data}`,
        method: 'delete',
    })
}
