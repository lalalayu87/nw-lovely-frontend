export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    authenticatedEntryPathUser: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    authenticatedEntryPathUser: '/userhome',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: true,
}

export default appConfig
