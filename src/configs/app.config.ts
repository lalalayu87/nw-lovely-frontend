export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    authenticatedEntryPathUser: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'http://152.69.228.245:10001',
    // apiPrefix: '/api',
    authenticatedEntryPath: '/cuesheet',
    authenticatedEntryPathUser: '/cuesheetUser',
    // authenticatedEntryPath: '/home',
    // authenticatedEntryPathUser: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
    // enableMock: true,
}

export default appConfig
