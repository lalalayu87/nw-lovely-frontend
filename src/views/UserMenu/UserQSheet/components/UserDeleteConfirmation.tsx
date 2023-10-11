import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteList,
    getList,
} from '../store/UserQSheetSlice'
import { useAppDispatch, useAppSelector } from '../store'

const UserDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.qsheetDataList.data.deleteConfirmation
    )
    const selectedProduct = useAppSelector(
        (state) => state.qsheetDataList.data.selectedQSheet
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteList({ qsheetSeq: selectedProduct })

        if (success) {
            dispatch(getList())
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
            onConfirm={onDelete}
        >
            <p>삭제 하시겠습니까?</p>
        </ConfirmDialog>
    )
}

export default UserDeleteConfirmation
