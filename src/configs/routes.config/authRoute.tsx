import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { ADMIN, USER } from '@/constants/roles.constant'

const authRoute: Routes = [
    {
        key: 'signIn',
        path: `/sign-in`,
        component: lazy(() => import('@/views/auth/SignIn')),
        authority: [],
    },
    {
        key: 'companySignUpForm',
        path: `/company-sign-up`,
        component: lazy(
            () => import('@/views/auth/CompanySignUp/CompanySignUp')
        ),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/views/auth/SignUp')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: lazy(() => import('@/views/auth/ForgotPassword')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/views/auth/ResetPassword')),
        authority: [],
    },
]

export default authRoute
