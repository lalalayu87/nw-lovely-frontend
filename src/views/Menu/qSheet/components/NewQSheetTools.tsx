import Button from '@/components/ui/Button'
import { HiExternalLink } from 'react-icons/hi'

const NewQSheetTools = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-1">
            <Button block size="sm" icon={<HiExternalLink />}>
                공유
            </Button>

            <Button block size="sm">
                저장
            </Button>

            <span>
                <Button block size="sm" variant="twoTone">
                    최종 확인
                </Button>
            </span>
        </div>
    )
}

export default NewQSheetTools
