import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    toggleEditConfirmation,
    deleteProduct,
    getProducts,
    useAppDispatch,
    useAppSelector,
} from '../store'

const CueSheetEditConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.salesProductList.data.deleteConfirmation
    )
    const selectedProduct = useAppSelector(
        (state) => state.salesProductList.data.selectedProduct
    )
    console.log(selectedProduct)
    const tableData = useAppSelector(
        (state) => state.salesProductList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleEditConfirmation(false))
    }

    const onEdit = async () => {
        dispatch(toggleEditConfirmation(false))
        const success = await deleteProduct({ id: selectedProduct })

        if (success) {
            dispatch(getProducts(tableData))
            toast.push(
                <Notification
                    title={'삭제 완료'}
                    type="success"
                    duration={2500}
                >
                    삭제되었습니다.
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Delete"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onEdit}
        >
            <p>수정 하시겠습니까?</p>
        </ConfirmDialog>
    )
}

export default CueSheetEditConfirmation
