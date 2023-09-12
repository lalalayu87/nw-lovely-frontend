import axios from 'axios'
import appConfig from '@/configs/app.config'
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '@/constants/api.constant'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import store, { signOutSuccess } from '../store'

const unauthorizedCode = [401]

const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
})

BaseService.interceptors.request.use(
    (config) => {
        console.log('step4')
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        console.log('rawPersistData :', rawPersistData)
        const persistData = deepParseJson(rawPersistData)
        console.log('persistData :', persistData)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let accessToken = (persistData as any).auth.session.token
        console.log('step5')
        if (!accessToken) {
            const { auth } = store.getState()
            accessToken = auth.session.token
            console.log('step6')
        }

        if (accessToken) {
            config.headers[
                REQUEST_HEADER_AUTH_KEY
            ] = `${TOKEN_TYPE}${accessToken}`
            console.log('step7')
        }
        console.log('step8', config)
        return config
    },
    (error) => {
        console.log('step9')
        return Promise.reject(error)
    }
)

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('step 10')
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(signOutSuccess())
        }

        return Promise.reject(error)
    }
)

export default BaseService
