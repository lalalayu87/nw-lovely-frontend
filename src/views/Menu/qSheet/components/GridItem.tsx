import Card from '@/components/ui/Card'
// import ItemDropdown from './ItemDropdown'
// import Members from './Members'
// import ProgressionBar from './ProgressionBar'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export type GridItemProps = {
    data: {
        content: [
            {
                created_at: Date
                data: [
                    actor: string,
                    content: string,
                    filePath: string,
                    note: string,
                    orderIndex: number,
                    process: string
                ]
                name: string
                orgSeq: {
                    orgBiznum: string
                    orgContact: string
                    orgEnabled: boolean
                    orgName: boolean
                    orgSeq: boolean
                }
                qsheetSeq: string
                userSeq: {
                    created_at: Date
                    userEmail: string
                    userEnabled: boolean
                    userId: string
                    userName: string
                    userRole: {
                        roleName: string
                        roleSeq: string
                    }
                    userSeq: string
                }
            }
        ]
        empty: boolean
        first: boolean
        last: boolean
        number: number
        numberOfElements: number
        pageable: {
            offset: number
            pageNumber: number
            pazeSize: number
            paged: boolean
            sort: {
                empty: boolean
                sorted: boolean
                unsorted: boolean
            }
            unpaged: boolean
        }
        size: number
        sort: {
            empty: boolean
            sorted: boolean
            unsorted: boolean
        }
        totalElements: number
        totalPages: number
    }
}

const GridItem = ({ data }: GridItemProps) => {
    return (
        <Card bodyClass="h-full">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between">
                    <Link to="/app/scrum-board">
                        <h6>{data.name}</h6>
                    </Link>
                    {/* <ItemDropdown /> */}
                </div>
                <p>{data.created_at.toString()}</p>
                <div className="mt-3">
                    {/* <ProgressionBar progression={progression} /> */}
                    <div className="flex items-center justify-between mt-2">
                        {/* <Members members={member} /> */}
                        <div className="flex items-center rounded-full font-semibold text-xs">
                            <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                                <HiOutlineClipboardCheck className="text-base" />
                                <span className="ml-1 rtl:mr-1 whitespace-nowrap"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default GridItem
