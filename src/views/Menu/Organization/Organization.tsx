import { injectReducer } from '@/store'
import OrdersTable from './OrganizationTable'
import reducer from './store'
import { Link } from 'react-router-dom'

injectReducer('salesOrderList', reducer)

/** Example purpose only */
const Organization = () => {
    return (
        <div className="h-full" >
            <div className="font-bold text-lg pb-5">가맹점 목록</div>
            <Link to="/organization/create">
                가맹점 등록
            </Link>
            <div>
                <OrdersTable />
            </div>
        </div>
    )
}

export default Organization
