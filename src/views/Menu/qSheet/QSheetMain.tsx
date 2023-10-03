import { Container } from '@/components/shared'
import QSheetCardList from './components/QSheetCardList'
import reducer from './store'
import { injectReducer } from '@/store'
import ActionBar from './components/ActionBar'

injectReducer('qsheetDataList', reducer)

const QSheetMain = () => {
    return (
        <>
            <Container className="h-full">
                <ActionBar />
                <QSheetCardList />
            </Container>
        </>
    )
}

export default QSheetMain
