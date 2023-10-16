import reducer from '../store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import { render } from 'react-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import UserQSheetDetailsContent from './UserQSheetDetailsContent'

const UserQSheetDetails = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <DndProvider backend={HTML5Backend}>
                <UserQSheetDetailsContent />
            </DndProvider>
        </AdaptableCard>
    )
}

export default UserQSheetDetails
