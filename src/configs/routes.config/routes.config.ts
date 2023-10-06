import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { ADMIN, USER } from '@/constants/roles.constant'

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
    {
        key: 'qsheet',
        path: '/qsheet',
        component: lazy(() => import('@/views/Menu/qSheet/QSheetMain')),
        authority: [],
    },
    // {
    //     key: 'qsheet',
    //     path: '/cuesheet/create',
    //     component: lazy(
    //         () => import('@/views/Menu/qSheet/components/NewQSheet')
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'qsheet',
    //     path: '/cuesheet/details/:qsheetSeq',
    //     component: lazy(
    //         () => import('@/views/Menu/qSheet/components/QSheetDetails')
    //     ),
    //     authority: [],
    // },
    {
        key: 'mypage',
        path: '/mypage',
        component: lazy(() => import('@/views/Menu/mypage/CustomerDetail')),
        authority: [],
    },
    // {
    //     key: 'collapseMenu.item1',
    //     path: '/collapse-menu-item-view-1',
    //     component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item2',
    //     path: '/collapse-menu-item-view-2',
    //     component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.single',
    //     path: '/group-single-menu-item-view',
    //     component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item1',
    //     path: '/group-collapse-menu-item-view-1',
    //     component: lazy(
    //         () => import('@/views/demo/GroupCollapseMenuItemView1')
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item2',
    //     path: '/group-collapse-menu-item-view-2',
    //     component: lazy(
    //         () => import('@/views/demo/GroupCollapseMenuItemView2')
    //     ),
    //     authority: [],
    // },
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
        key: 'CuesheetUser',
        path: '/cuesheetUser',
        component: lazy(() => import('@/views/UserMenu/CueSheetUser')),
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
