import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ProductTable from './components/ProductTable'
import ProductTableTools from './components/ProductTableTools'
import { render } from 'react-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

injectReducer('salesProductList', reducer)

const ProductList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Products</h3>
                <ProductTableTools />
            </div>
            <DndProvider backend={HTML5Backend}>
                <ProductTable />
            </DndProvider>
        </AdaptableCard>
    )
}

export default ProductList
