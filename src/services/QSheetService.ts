import ApiService from './ApiService'

export async function apiGetQSheetList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `/api/v1/qsheet`,
        method: 'get',
        data,
    })
}

export async function apiGetQSheetCardList<T>() {
    return ApiService.fetchData<T>({
        url: '/api/v1/qsheet',
        method: 'get',
    })
}

export async function apiPostQSheetCardList<
    T,
    U extends Record<string, unknown>
>(data: U) {
    console.log(data)
    return ApiService.fetchData<T>({
        url: '/api/v1/qsheet',
        method: 'post',
        data,
    })
}

export async function apiGetQSheetCardDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    // params가 왜 object로 오는지 모르겠다..
    const qsheetSeq = Object.values(params)
    return ApiService.fetchData<T>({
        url: `/api/v1/qsheet/${qsheetSeq}`,
        method: 'get',
    })
}

export async function apiPatchQSheetCardList<T>(
    qsheetSeq: string,
    body: Record<string, unknown>
): Promise<T> {
    return ApiService.fetchData<T>({
        url: `/api/v1/qsheet/${qsheetSeq}`,
        method: 'patch',
        data: body, // body를 데이터로 전달
    })
}
export async function apiDeleteQSheetCardList<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: `/api/v1/qsheet/${data}`,
        method: 'delete',
    })
}
