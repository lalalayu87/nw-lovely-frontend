import { Container } from '@/components/shared'
import QSheetCardList from './components/QSheetCardList'
import reducer from './store'
import { injectReducer } from '@/store'
import QSheetTools from './components/QSheetTools'

injectReducer('qsheetDataList', reducer)

const QSheetMain = () => {
    return (
        <>
            <Container className="h-full">
                <QSheetTools />
                <QSheetCardList />
            </Container>
        </>
    )
}

export default QSheetMain
