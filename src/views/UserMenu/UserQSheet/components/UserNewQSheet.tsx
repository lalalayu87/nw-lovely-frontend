import reducer from '../store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import UserNewQSheetContent from './UserNewQSheetContent'

const UserNewQSheet = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <DndProvider backend={HTML5Backend}>
                <UserNewQSheetContent />
            </DndProvider>
        </AdaptableCard>
    )
}

export default UserNewQSheet
