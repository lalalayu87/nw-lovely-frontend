import ApiService from './ApiService'

export async function apiGetCrmDashboardData<T>() {
    return ApiService.fetchData<T>({
        url: '/crm/dashboard',
        method: 'get',
    })
}

export async function apiGetCrmCalendar<T>() {
    return ApiService.fetchData<T>({
        url: '/crm/calendar',
        method: 'get',
    })
}

export async function apiGetCrmCustomers<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/crm/customers',
        method: 'post',
        data,
    })
}

export async function apiGetCrmCustomersStatistic<T>() {
    return ApiService.fetchData<T>({
        url: '/crm/customers-statistic',
        method: 'get',
    })
}

export async function apPutCrmCustomer<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/crm/customers',
        method: 'put',
        data,
    })
}

// export async function apiGetCrmCustomerDetails<
//     T,
//     U extends Record<string, unknown>
// >(params: U) {
//     return ApiService.fetchData<T>({
//         url: '/api/v1/user',
//         method: 'get',
//     })
// }

export async function apiDeleteCrmCustomer<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/crm/customer/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetCrmMails<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/crm/mails',
        method: 'get',
        params,
    })
}

export async function apiGetCrmMail<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/crm/mail',
        method: 'get',
        params,
    })
}

// 고객카드 조회
export async function apiGetCustomerCard<T, U extends Record<string, unknown>>(

) {
    console.log("api호출")
    return ApiService.fetchData<T>({
        url: '/nw/api/v1/usercard',
        method: 'get',
    })
}

// 일정 조회
export async function apiGetCalendar<T>() {
    console.log("api 호출")
    return ApiService.fetchData<T>({
        url: '/nw/api/v1/schedule',
        method: 'get',
    })
}