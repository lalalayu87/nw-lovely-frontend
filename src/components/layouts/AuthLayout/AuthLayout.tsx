import Side from './Side'
// import Cover from './Cover'
// import Simple from './Simple'
import View from '@/views'
import { useAppSelector } from '@/store'
import { LAYOUT_TYPE_BLANK } from '@/constants/theme.constant'

const AuthLayout = () => {
    const layoutType = useAppSelector((state) => state.theme.layout.type)

    const { accessToken, signedIn } = useAppSelector(
        (state) => state.auth.session
    )

    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh] justify-center items-center bg-white">
            {layoutType === LAYOUT_TYPE_BLANK ? (
                <View />
            ) : (
                // <Side>
                <div className="w-1/4">
                    <View />
                </div>
                // </Side>
            )}
        </div>
    )
}

export default AuthLayout
