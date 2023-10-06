import ApiService from './ApiService'

export async function apiGetQSheetCardList<T>() {
    console.log('QSheetService 확인')
    return ApiService.fetchData<T>({
        url: '/api/v1/qsheet',
        method: 'get',
    })
}
