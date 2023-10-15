import { Container } from '@/components/shared'
import UserQSheetCardList from './components/UserQSheetCardList'
import reducer from './store/UserQSheetSlice'
import { injectReducer } from '@/store'
import UserQSheetTools from './components/UserQSheetTools'

injectReducer('qsheetDataList', reducer)

const UserQSheetMain = () => {
    return (
        <>
            <Container className="h-full">
                <UserQSheetTools />
                <UserQSheetCardList />
            </Container>
        </>
    )
}

export default UserQSheetMain
