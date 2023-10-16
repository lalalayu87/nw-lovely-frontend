import { Card } from '@/components/ui'
import { HiOutlineClipboardCheck, HiOutlineTrash } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export type GridItemProps = {
    data: {
        id: number
        name: string
        category: string
        desc: string
        attachmentCount: number
        totalTask: number
        completedTask: number
        progression: number
        dayleft: number
        status: string
        member: {
            name: string
            img: string
        }[]
    }
}

export type finaltemplTest = {
    data: {
        userName: string
        finaltemplName: string
        weddingDatename: string
        hallname: string
        groomFather: string
        groomMother: string
        brideFather: string
        brideMother: string
        clickPb: boolean
        clickMakeup: boolean
        clickMeal: boolean
        clickAdd: number
        // addData: []
        // PbData: []
        //     makeupData: [],
        //     mealData: [],
        groomDeduction: string
        brideDeduction: string
        essentialCheck: string
        specialMemo: string
    }
}

const GridItem = ({ data }: finaltemplTest) => {
    const { finaltemplName, weddingDatename, userName } = data

    const onDelete = () => {
        alert('삭제완료')
    }

    return (
        <Card bodyClass="h-full">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between">
                    <Link to="/FinaltemplEdit">
                        <h6>{finaltemplName}</h6>
                    </Link>
                    {/* <ItemDropdown /> */}
                </div>
                <p className="mt-4">{userName}</p>
                <div className="mt-3">
                    {/* <ProgressionBar progression={progression} /> */}
                    <div className="flex items-center justify-between mt-2">
                        {/* <Members members={member} /> */}
                        <div className="flex items-center rounded-full font-semibold text-xs">
                            <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                                <HiOutlineClipboardCheck className="text-base" />
                                <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                    {weddingDatename}
                                </span>
                            </div>
                            <span
                                className="text-lg cursor-pointer p-2 hover:text-red-500"
                                onClick={onDelete}
                            >
                                <HiOutlineTrash />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default GridItem
