import BaseService from './BaseService'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const ApiService = {
    fetchData<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>
    ) {
        console.log('step 3', param)
        return new Promise<AxiosResponse<Response>>((resolve, reject) => {
            console.log('param', param)
            BaseService(param)
                .then((response: AxiosResponse<Response>) => {
                    console.log('step 4', resolve(response))
                    resolve(response)
                })
                .catch((errors: AxiosError) => {
                    console.log('reject(errors)', reject(errors))
                    reject(errors)
                })
        })
    },
}

export default ApiService
