import reducer from '../store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import NewQSheetContent from './NewQSheetContent'

const NewQSheet = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <DndProvider backend={HTML5Backend}>
                <NewQSheetContent />
            </DndProvider>
        </AdaptableCard>
    )
}

export default NewQSheet
