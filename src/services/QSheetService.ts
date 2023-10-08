import ApiService from './ApiService'

export async function apiGetQSheetCardList<T>() {
    console.log('???')
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

// body: JSON.stringify(data)

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

export async function apiDeleteQSheetCardList<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: `/api/v1/qsheet/${data}`,
        method: 'delete',
    })
}
