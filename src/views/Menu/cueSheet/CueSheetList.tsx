import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import CueSheetTable from './components/CueSheetTable'
import CueSheetTableTools from './components/CueSheetTableTools'
import { render } from 'react-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import CueSheetHeader from './components/CueSheetHeader'
import CueSheetMain from './components/CueSheetMain'

injectReducer('salesProductList', reducer)

const CueSheetList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">큐시트</h3>
                <CueSheetTableTools />
            </div>
            <CueSheetHeader />

            <DndProvider backend={HTML5Backend}>
                <CueSheetTable />
                {/* <CueSheetMain /> */}
            </DndProvider>
        </AdaptableCard>
    )
}

export default CueSheetList
