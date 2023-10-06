/* eslint-disable react/jsx-key */
import Card from '@/components/ui/Card'
import { HiOutlineClipboardCheck, HiOutlineEye } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import NewQSheet from './NewQSheet'
import useThemeClass from '@/utils/hooks/useThemeClass'
import Tooltip from '@/components/ui/Tooltip'
import { useAppDispatch } from '../store'

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

const ActionColumn = ({ row }: { row: GridItemProps }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = () => {
        navigate(`/qsheet/details/${row.data.content[0].qsheetSeq}`)
    }

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
        </div>
    )
}

const GridItem = ({ data }: GridItemProps) => {
    return (
        <Card bodyClass="h-full">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between">
                    <h6>{data.content[0].name}</h6>

                    {/* <ItemDropdown /> */}
                </div>
                <p>{data.content[0].created_at.toString()}</p>
                <div className="mt-3">
                    {/* <ProgressionBar progression={progression} /> */}
                    <div className="flex items-center justify-between mt-2">
                        {/* <Members members={member} /> */}
                        {/* <div className="flex items-center rounded-full font-semibold text-xs">
                            <ActionColumn row={data.size} />
                        </div> */}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default GridItem
