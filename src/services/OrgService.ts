import ApiService from './ApiService'
import { SERVER_URL } from '../../config'

export async function apiGetSalesDashboardData<
    T extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/sales/dashboard',
        method: 'post',
    })
}

export async function apiGetSalesProducts<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `${SERVER_URL}/api/v1/qsheet`,
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesProducts<
    T,
    U extends Record<string, unknown>
>(data: U) {
    console.log(data.id)
    return ApiService.fetchData<T>({
        url: `${SERVER_URL}/api/v1/qsheet/${data.id}`,
        method: 'delete',
        data,
    })
}

export async function apiGetSalesProduct<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: `${SERVER_URL}/api/v1/qsheet`,
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesProduct<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/products/create',
        method: 'post',
        data,
    })
}

export async function apiGetSalesOrders<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/cuesheet',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/sales/orders-details',
        method: 'get',
        params,
    })
}
// 조직 목록
export async function apiGetOrgList() {
    return ApiService.fetchData<string, string>({
        url: `${SERVER_URL}/api/v1/org`,
        method: 'get',
    })
}

// 조직 생성
export async function apiCreateOrg<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `${SERVER_URL}/api/v1/org`,
        method: 'post',
        data,
    })
}

// 조직 삭제
export async function apiDeleteOrg<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: `${SERVER_URL}/api/v1/org/${data.id}`,
        method: 'delete',
        data,
    })
}

// 최종확인서 템플릿 목록
// export async function apiGetFinaltempl<T>() {
//     console.log("확인")
//     return ApiService.fetchData<T>({
//         url: '/nw/api/v1/finaltempl',
//         method: 'get',
//     })
// }

export async function apiGetFinaltempl<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/nw/api/v1/finaltempl',
        method: 'get',
        data,
    })
}

// 최종확인서 템플릿 생성
export async function apiCreateFinaltempl<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/nw/api/v1/finaltempl',
        method: 'post',
        data,
    })
}
