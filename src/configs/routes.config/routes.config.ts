import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { ADMIN, USER } from '@/constants/roles.constant'
import session from 'redux-persist/lib/storage/session'
import OrganizationSlice, {
    getOrders,
} from '@/views/Menu/Organization/store/OrganizationSlice'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Dashboard/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'organization',
        path: '/organization',
        component: lazy(() => import('@/views/Menu/Organization/Organization')),
        authority: [],
    },
    {
        key: 'organization.create',
        path: '/organization/create',
        component: lazy(
            () => import('@/views/Menu/Organization/OrganizationNew')
        ),
        authority: [],
    },
    {
        key: 'organization.edit',
        path: '/organization/edit/:id',
        component: lazy(
            () => import('@/views/Menu/Organization/OrganizationEdit')
        ),
        authority: [],
    },
    {
        key: 'finaltempl',
        path: '/finaltempl',
        component: lazy(() => import('@/views/Menu/Finaltempl/Finaltempl')),
        authority: [],
    },

    {
        key: 'FinaltemplEdit',
        path: '/FinaltemplEdit',
        component: lazy(() => import('@/views/Menu/Finaltempl/FinaltemplEdit')),
        authority: [],
    },
    {
        key: 'finaltemplCreate',
        path: '/finaltempl/finaltemplCreate',
        component: lazy(
            () => import('@/views/Menu/Finaltempl/FinaltemplCreate')
        ),
        authority: [],
    },
    {
        key: 'place',
        path: '/place',
        component: lazy(() => import('@/views/Menu/Place')),
        authority: [],
    },
    {
        key: 'schedule',
        path: '/schedule',
        component: lazy(() => import('@/views/Menu/Schedule')),
        authority: [],
    },
    // {
    //     key: 'qsheet',
    //     path: '/cuesheet',
    //     component: lazy(() => import('@/views/Menu/qSheet/QSheetMain')),
    //     authority: [],
    // },
    {
        key: 'qsheet',
        path: '/cuesheet',
        component: lazy(() => import('@/views/Menu/QSheet_List/Organization')),
        // component: lazy(() => import('@/views/Menu/QsheetList/QSheetMain')),
        authority: [],
    },
    {
        key: 'qsheet',
        path: '/cuesheet/create',
        component: lazy(
            () => import('@/views/Menu/qSheet/components/NewQSheet')
        ),
        authority: [],
    },
    {
        key: 'qsheet',
        path: '/cuesheet/details/:qsheetSeq',
        component: lazy(
            () => import('@/views/Menu/qSheet/components/QSheetDetails')
        ),
        authority: [],
    },
    {
        key: 'mypage',
        path: '/mypage',
        component: lazy(() => import('@/views/Menu/mypage/CustomerDetail')),
        authority: [],
    },
]

export const protectedUserRoutes = [
    {
        key: 'Userhome',
        path: '/userhome',
        component: lazy(
            () => import('@/views/Dashboard/UserDashboard/UserHome')
        ),
        authority: [],
    },
    {
        key: 'QsheetUser',
        path: '/cuesheetUser',
        component: lazy(
            () => import('@/views/UserMenu/UserQSheet/UserQSheetMain')
        ),
        authority: [],
    },
    {
        key: 'QsheetUser',
        path: '/cuesheetUser/create',
        component: lazy(
            () => import('@/views/UserMenu/UserQSheet/components/UserNewQSheet')
        ),
        authority: [],
    },
    {
        key: 'QsheetUser',
        path: '/cuesheetUser/details/:qsheetSeq',
        component: lazy(
            () =>
                import(
                    '@/views/UserMenu/UserQSheet/components/UserQSheetDetails'
                )
        ),
        authority: [],
    },
    {
        key: 'CommunityUser',
        path: '/communityUser',
        component: lazy(
            () => import('@/views/UserMenu/Community/CommunityUser')
        ),
        authority: [],
    },
    {
        key: 'MypageUser',
        path: '/mypageUser',
        component: lazy(() => import('@/views/UserMenu/MypageUser')),
        authority: [],
    },
]
