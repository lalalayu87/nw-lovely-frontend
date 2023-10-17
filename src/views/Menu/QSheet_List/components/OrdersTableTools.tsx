import Button from '@/components/ui/Button'
import {
    HiPlusCircle,
    HiDownload,
    HiOutlineTrash,
    HiOutlinePlusCircle,
} from 'react-icons/hi'
import OrderTableSearch from './OrderTableSearch'
import { setDeleteMode, useAppDispatch, useAppSelector } from '../store'
import { Link } from 'react-router-dom'

const BatchDeleteButton = () => {
    const dispatch = useAppDispatch()

    const onBatchDelete = () => {
        dispatch(setDeleteMode('batch'))
    }

    return (
        <Button
            variant="solid"
            color="red-600"
            size="sm"
            icon={<HiOutlineTrash />}
            onClick={onBatchDelete}
        >
            삭제
        </Button>
    )
}

const OrdersTableTools = () => {
    const selectedRows = useAppSelector(
        (state) => state.salesOrderList.data.selectedRows
    )
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <OrderTableSearch />
            {selectedRows.length > 0 && (
                <Link
                    download
                    className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                    to="/data/product-list.csv"
                    target="_blank"
                >
                    <Button block size="sm" icon={<HiDownload />}>
                        다운로드
                    </Button>
                </Link>
            )}
            {selectedRows.length > 0 && <BatchDeleteButton />}
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/cuesheet/create"
            >
                <Button
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlinePlusCircle />}
                >
                    큐시트 생성
                </Button>
            </Link>
        </div>
    )
}

export default OrdersTableTools
