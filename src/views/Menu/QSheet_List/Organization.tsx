import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import OrdersTable from './components/OrderTable'
import OrdersTableTools from './components/OrdersTableTools'
import OrderDeleteConfirmation from './components/OrderDeleteConfirmation'
import reducer from './store'
import { Link } from 'react-router-dom'

injectReducer('salesOrderList', reducer)

/** Example purpose only */
const Organization = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">큐시트 목록</h3>
                <OrdersTableTools />
            </div>
            <div className="text-center">
                <OrdersTable />
            </div>
            <OrderDeleteConfirmation />
        </AdaptableCard>
    )
}

export default Organization
