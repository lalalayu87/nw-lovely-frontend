import { injectReducer } from '@/store'
import OrdersTable from './OrganizationTable'
import reducer from './store'

injectReducer('salesOrderList', reducer)

/** Example purpose only */
const Organization = () => {
    return (
        <div>
            <div className="font-bold text-lg pb-5">가맹점 목록</div>
            <div>
                <OrdersTable />
            </div>
        </div>
    )
}

export default Organization
