import { Navigate, Outlet } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import useAuth from '@/utils/hooks/useAuth'

const { authenticatedEntryPathUser } = appConfig

const PublicRouteUser = () => {
    const { authenticated } = useAuth()
    // console.log('authenticated : ', authenticated)
    return authenticated ? (
        <Navigate to={authenticatedEntryPathUser} />
    ) : (
        <Outlet />
    )
}

export default PublicRouteUser
