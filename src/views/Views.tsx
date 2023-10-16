import { Suspense } from 'react'
import Loading from '@/components/shared/Loading'
import {
    protectedRoutes,
    publicRoutes,
    protectedUserRoutes,
} from '@/configs/routes.config'
import appConfig from '@/configs/app.config'
import PageContainer from '@/components/template/PageContainer'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store'
import ProtectedRoute from '@/components/route/ProtectedRoute'
import PublicRoute from '@/components/route/PublicRoute'
import AuthorityGuard from '@/components/route/AuthorityGuard'
import AppRoute from '@/components/route/AppRoute'
import type { LayoutType } from '@/@types/theme'
import PageContainerUser from '@/components/template/VerticalMenuContent/PageContainerUser'
import PublicRouteUser from '@/components/route/PublicRouteUser'

interface ViewsProps {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    layout?: LayoutType
}

type AllRoutesProps = ViewsProps

type Role = 'ROLE_ADMIN' | 'ROLE_USER'

const {
    authenticatedEntryPath,
    authenticatedEntryPathUser,
    unAuthenticatedEntryPath,
    tourPath,
} = appConfig

const AllRoutes = (props: AllRoutesProps) => {
    const userAuthority = useAppSelector((state) => state.auth.user.userRole)
    // const userAuthority = 'ROLE_USER'
    if (userAuthority) {
        return (
            <Routes>
                <Route path="/" element={<ProtectedRoute />}>
                    <Route
                        path="/"
                        element={
                            <Navigate replace to={authenticatedEntryPath} />
                        }
                    />
                    {userAuthority === 'ROLE_ADMIN'
                        ? protectedRoutes.map((route, index) => (
                              <Route
                                  key={route.key + index}
                                  path={route.path}
                                  element={
                                      <AuthorityGuard
                                          userAuthority={userAuthority}
                                          authority={route.authority}
                                      >
                                          {/* {userAuthority === 'ROLE_ADMIN' ? ( */}
                                          <PageContainer
                                              {...props}
                                              // {...route.meta}
                                          >
                                              <AppRoute
                                                  routeKey={route.key}
                                                  component={route.component}
                                                  // {...route.meta}
                                              />
                                          </PageContainer>
                                          {/* ) : (
                                        <PageContainerUser
                                            {...props}
                                            // {...route.meta}
                                        >
                                            <AppRoute
                                                routeKey={route.key}
                                                component={route.component}
                                                // {...route.meta}
                                            />
                                        </PageContainerUser>
                                    )} */}
                                      </AuthorityGuard>
                                  }
                              />
                          ))
                        : protectedUserRoutes.map((route, index) => (
                              <Route
                                  key={route.key + index}
                                  path={route.path}
                                  element={
                                      <AuthorityGuard
                                          userAuthority={userAuthority}
                                          authority={route.authority}
                                      >
                                          <PageContainer
                                              {...props}
                                              // {...route.meta}
                                          >
                                              <AppRoute
                                                  routeKey={route.key}
                                                  component={route.component}
                                                  // {...route.meta}
                                              />
                                          </PageContainer>
                                      </AuthorityGuard>
                                  }
                              />
                          ))}
                    {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
                </Route>
                <Route
                    path="/"
                    element={
                        userAuthority === 'ROLE_ADMIN' ? (
                            <PublicRoute />
                        ) : (
                            <PublicRouteUser />
                        )
                    }
                >
                    {publicRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <AppRoute
                                    routeKey={route.key}
                                    component={route.component}
                                    {...route.meta}
                                />
                            }
                        />
                    ))}
                </Route>
            </Routes>
        )
    } else {
        return (
            <Routes>
                {/* <Route path="/" element={<ProtectedRoute />}> */}
                {/* <Route
                        path="/"
                        element={
                            <Navigate replace to={unAuthenticatedEntryPath} />
                        }
                    /> */}
                <Route
                    path="*"
                    element={<Navigate replace to={unAuthenticatedEntryPath} />}
                />
                {publicRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <AppRoute
                                routeKey={route.key}
                                component={route.component}
                                {...route.meta}
                            />
                        }
                    />
                ))}
                {/* </Route> */}
            </Routes>
        )
    }
}

const Views = (props: ViewsProps) => {
    return (
        <Suspense fallback={<Loading loading={true} />}>
            <AllRoutes {...props} />
        </Suspense>
    )
}

export default Views
