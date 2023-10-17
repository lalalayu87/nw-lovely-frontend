export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    authenticatedEntryPathUser: string
    tourPath: string
    locale: string
    enableMock: boolean
}

console.log('VITE_API_URL : ', import.meta.env.VITE_API_URL)

const appConfig: AppConfig = {
    apiPrefix: import.meta.env.VITE_API_URL || 'http://127.0.0.1:10001',
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
