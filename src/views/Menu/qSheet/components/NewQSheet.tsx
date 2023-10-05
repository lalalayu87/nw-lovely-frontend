import reducer from '../store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import { render } from 'react-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import NewQSheetTools from './NewQSheetTools'
import NewQSheetHeader from './NewQSheetHeader'

const NewQSheet = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">큐시트 생성</h3>
                <NewQSheetTools />
            </div>
            <NewQSheetHeader />

            {/* <DndProvider backend={HTML5Backend}>
                            <CueSheetTable />
                        </DndProvider> */}
        </AdaptableCard>
    )
}

export default NewQSheet
