import Button from '@/components/ui/Button'
import { useDispatch } from 'react-redux'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { useState } from 'react'
import { openDialog, updateDialogView } from '../store'
import AddCueSheetContent from './AddCueSheetContent'

const AddCueSheetDialog = () => {
    const dispatch = useDispatch()

    const handleOpen = () => {
        dispatch(updateDialogView('NEW_COLUMN'))
        dispatch(openDialog())
        console.log('되냐')
    }

    return (
        <>
            <div>
                <span className="block lg:inline-block md:mx-2 md:mb-0 mb-4">
                    <Button
                        block
                        size="sm"
                        variant="solid"
                        icon={<HiOutlinePencilAlt />}
                        onClick={handleOpen}
                    >
                        큐시트 추가
                    </Button>
                </span>
            </div>
            {/* {open && <AddCueSheetContent onClose={handleClose} />} */}
        </>
    )
}

export default AddCueSheetDialog
