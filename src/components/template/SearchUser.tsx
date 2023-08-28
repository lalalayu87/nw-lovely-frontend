import Input from '@/components/ui/Input'
import type { CommonProps } from '@/@types/common'
import Tooltip from '@/components/ui/Tooltip'
import { HiOutlineUser, HiOutlineExclamationCircle } from 'react-icons/hi'
import Button from '@/components/ui/Button'

const SearchUser = ({ className }: CommonProps) => {
    return (
        <div className="flex mt-2">
            <span className="mx-4 mt-3 w-20 font-bold">사용자</span>
            <Input
                placeholder="이름을 입력하세요"
                prefix={<HiOutlineUser className="mb-2" />}
            />
            <Button
                className="ml-4 mr-2 mb-2"
                variant="twoTone"
                color="red-600"
            >
                찾기
            </Button>
        </div>
    )
}

export default SearchUser
