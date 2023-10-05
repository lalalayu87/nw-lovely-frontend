import ApiService from './ApiService'



export async function apiGetQSheetCardList<T>() {

    return ApiService.fetchData<T>({
        url: '/api/v1/qsheet',
        method: 'get',
    })
}


