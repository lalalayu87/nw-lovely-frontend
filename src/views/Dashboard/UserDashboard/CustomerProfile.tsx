import { useState } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
} from 'react-icons/fa'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
// import EditCustomerProfile from './EditCustomerProfile'

const personalData: PersonalInfo = {
    bride: '신부님',
    bride_contact: '010-0000-0000',
    bride_email: 'bride@gmail.com',
    bride_mother: '신부엄마',
    bride_father: '신부아빠',
    groom: '신랑님',
    groom_contact: '010-1111-1111',
    groom_email: 'groom@gmail.com',
    groom_mother: '신랑엄마',
    groom_father: '신랑아빠',
    note: 'I am baby kitsch plaid mustache, williamsburg butcher gluten-free 3 wolf moon authentic quinoa selvage knausgaard unicorn. Palo santo viral everyday carry, heirloom tumblr raw denim yr iceland wayfarers single-origin coffee tote bag shoreditch cloud bread poke.',
    reservation_date: new Date(2023, 9, 10),
    wedding_date: new Date(2024, 10, 25),
    status: '전화상담',
}

const customerData: Customer = {
    id: 'string',
    name: 'username',
    email: 'string',
    img: 'string',
    role: 'string',
    lastOnline: 10,
    status: 'string',
    personalInfo: personalData,
}

type PersonalInfo = {
    bride: string
    bride_contact: string
    bride_email: string
    bride_mother: string
    bride_father: string
    groom: string
    groom_contact: string
    groom_email: string
    groom_mother: string
    groom_father: string
    note: string
    reservation_date: Date
    wedding_date: Date
    status: string
}

type Customer = {
    id: string
    name: string
    email: string
    img: string
    role: string
    lastOnline: number
    status: string
    personalInfo: PersonalInfo
}

type CustomerInfoFieldProps = {
    title?: string
    value?: string
}

type CustomerProfileProps = {
    data?: Partial<Customer>
}

const CustomerInfoField = ({ title, value }: CustomerInfoFieldProps) => {
    return (
        <div>
            <span>{title}</span>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
                {value}
            </p>
        </div>
    )
}

const CustomerProfileAction = ({ id }: { id?: string }) => {
    // const dispatch = useAppDispatch()
    const [dialogOpen, setDialogOpen] = useState(false)

    const navigate = useNavigate()

    const onDialogClose = () => {
        setDialogOpen(false)
    }

    const onDialogOpen = () => {
        setDialogOpen(true)
    }

    const onDelete = () => {
        setDialogOpen(false)
        if (id) {
            // dispatch(deleteCustomer({ id }))
        }
        navigate('/app/crm/customers')
        toast.push(
            <Notification title={'Successfuly Deleted'} type="success">
                Customer successfuly deleted
            </Notification>
        )
    }

    const onEdit = () => {
        // dispatch(openEditCustomerDetailDialog())
    }

    return (
        <>
            <Button block icon={<HiOutlineTrash />} onClick={onDialogOpen}>
                Delete
            </Button>
            <Button
                block
                icon={<HiPencilAlt />}
                variant="solid"
                onClick={onEdit}
            >
                Edit
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete customer"
                confirmButtonColor="red-600"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                onCancel={onDialogClose}
                onConfirm={onDelete}
            >
                <p>
                    Are you sure you want to delete this customer? All record
                    related to this customer will be deleted as well. This
                    action cannot be undone.
                </p>
            </ConfirmDialog>
            {/* <EditCustomerProfile /> */}
        </>
    )
}

const CustomerProfile = ({ data = customerData }: CustomerProfileProps) => {
    return (
        <Card className="w-3/5">
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4">
                    {data.personalInfo?.status === '전화상담' ? (
                        <div className="aspect-square rounded-full bg-red-400 h-24 justify-center flex items-center text-lg font-semibold text-gray-100">
                            {data.personalInfo.status}
                        </div>
                    ) : null}
                    <h4 className="font-bold">{data.name}</h4>
                </div>
                <div className="grid grid-cols-2 divide-x-2">
                    <div className=" grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
                        <CustomerInfoField
                            title="신부 이름"
                            value={data.personalInfo?.bride}
                        />
                        <CustomerInfoField
                            title="신부 전화번호"
                            value={data.personalInfo?.bride_contact}
                        />
                        <CustomerInfoField
                            title="신부 이메일"
                            value={data.personalInfo?.bride_email}
                        />
                        <CustomerInfoField
                            title="신부측 어머니 이름"
                            value={data.personalInfo?.bride_mother}
                        />

                        <CustomerInfoField
                            title="신부측 아버지 이름"
                            value={data.personalInfo?.bride_father}
                        />
                        <CustomerInfoField
                            title="예약 날짜"
                            value={data.personalInfo?.reservation_date.toString()}
                        />
                        {/* <div className="mb-7">
                        <span>Social</span>
                        <div className="flex mt-4">
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaFacebookF className="text-[#1773ea]" />
                                }
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={<FaTwitter className="text-[#1da1f3]" />}
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaLinkedinIn className="text-[#0077b5]" />
                                }
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaPinterestP className="text-[#df0018]" />
                                }
                            />
                        </div>
                    </div> */}
                    </div>
                    <div className="pl-5 grid sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
                        <CustomerInfoField
                            title="신랑 이름"
                            value={data.personalInfo?.groom}
                        />
                        <CustomerInfoField
                            title="신랑 전화번호"
                            value={data.personalInfo?.groom_contact}
                        />
                        <CustomerInfoField
                            title="신랑 이메일"
                            value={data.personalInfo?.groom_email}
                        />
                        <CustomerInfoField
                            title="신랑측 어머니 이름"
                            value={data.personalInfo?.groom_mother}
                        />
                        <CustomerInfoField
                            title="신랑측 아버지 이름"
                            value={data.personalInfo?.groom_father}
                        />
                        <CustomerInfoField
                            title="예식 날짜"
                            value={data.personalInfo?.wedding_date.toString()}
                        />
                    </div>
                </div>
                <div className="pt-7">
                    <CustomerInfoField
                        title="메모"
                        value={data.personalInfo?.note}
                    />
                </div>
                {/* <div className="mt-4 flex flex-col xl:flex-row gap-2">
                    <CustomerProfileAction id={data.id} />
                </div> */}
            </div>
        </Card>
    )
}

export default CustomerProfile
