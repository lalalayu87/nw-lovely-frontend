import { useEffect, useCallback, useMemo, useRef } from 'react'
import Badge from '@/components/ui/Badge'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
    getOrders,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from './store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import { ordersData } from '@/mock/data/projectData'

type Order = {
    orgSeq: string
        orgName: string
        orgBiznum: string
        orgContact: string
        orgEnable: boolean
        created_at: string
}
type OrgContent = {
    // content: {
    //     orgSeq: string
    //     orgName: string
    //     orgBiznum: string
    //     orgContact: string
    //     orgEnable: boolean
    //     created_at: string
    // }
    pageable: {
        sort: {
            empty: boolean
            sorted: boolean
            unsorted: boolean
        }
        offset: number
        pageNumber: number
        pageSize: number
    }
}
// const orderStatusColor: Record<
//     number,
//     {
//         label: string
//         dotClass: string
//         textClass: string
//     }
// > = {
//     0: {
//         label: 'Paid',
//         dotClass: 'bg-emerald-500',
//         textClass: 'text-emerald-500',
//     },
//     1: {
//         label: 'Pending',
//         dotClass: 'bg-amber-500',
//         textClass: 'text-amber-500',
//     },
//     2: { label: 'Failed', dotClass: 'bg-red-500', textClass: 'text-red-500' },
// }
const orderStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: {
        label: '운영중',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: '정지',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: { label: 'Failed', dotClass: 'bg-red-500', textClass: 'text-red-500' },
}

const PaymentMethodImage = ({
    paymentMehod,
    className,
}: {
    paymentMehod: string
    className: string
}) => {
    switch (paymentMehod) {
        case 'visa':
            return (
                <img
                    className={className}
                    src="/img/others/img-8.png"
                    alt={paymentMehod}
                />
            )
        case 'master':
            return (
                <img
                    className={className}
                    src="/img/others/img-9.png"
                    alt={paymentMehod}
                />
            )
        case 'paypal':
            return (
                <img
                    className={className}
                    src="/img/others/img-10.png"
                    alt={paymentMehod}
                />
            )
        default:
            return <></>
    }
}

const OrderColumn = ({ row }: { row: Order }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row.orgSeq}`)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            {row.orgSeq}
        </span>
    )
}

const ActionColumn = ({ row }: { row: OrgContent }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    // const onDelete = () => {
    //     dispatch(setDeleteMode('single'))
    //     // dispatch(setSelectedRow([row.content.orgSeq]))
    // }

    // const onView = useCallback(() => {
    //     navigate(`/app/sales/order-details/${row.id}`)
    // }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    // onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
            <Tooltip title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    // onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </Tooltip>
        </div>
    )
}

const OrdersTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { sort, offset, pageNumber, pageSize  } = useAppSelector(
        (state) => state.salesOrderList.data.tableData)
    // const loading = useAppSelector((state) => state.salesOrderList.data.loading)

    const data = useAppSelector((state) => state.salesOrderList.data.orderList)

    // const data = ordersData

    const fetchData = useCallback(() => {           
        dispatch(getOrders({ sort, offset, pageNumber, pageSize }))
    }, [dispatch, sort, offset, pageNumber, pageSize])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
        // }, [dispatch])
    }, [dispatch, fetchData, sort, offset, pageNumber, pageSize])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ sort, offset, pageNumber, pageSize }),
        [sort, offset, pageNumber, pageSize]
    )

    const columns: ColumnDef<Order>[] = useMemo(
        () => [
            // {
            //     header: 'Order',
            //     accessorKey: 'id',
            //     cell: (props) => <OrderColumn row={props.row.original} />,
            // },
            {
                header: '가맹점 명',
                accessorKey: 'orgName',
                // cell: (props) => {
                //     const row = props.row.original
                //     return (
                //         <span>{dayjs.unix(row.date).format('DD/MM/YYYY')}</span>
                //     )
                // },
            },
            {
                header: '주소',
                accessorKey: 'address',
            },
            {
                header: '사업자 번호',
                accessorKey: 'orgBiznum',
            },
            {
                header: '가맹점 상태',
                accessorKey: 'orgEnable',
                cell: (props) => {
                    const enable = props.row.original.orgEnable
                    console.log(enable)
                    // return (
                    //     <div className="flex items-center">
                    //         <Badge
                    //             className={
                    //                 orderStatusColor[Number(enable)].dotClass
                    //             }
                    //         />
                    //         <span
                    //             className={`ml-2 rtl:mr-2 capitalize font-semibold ${
                    //                 orderStatusColor[Number(enable)].textClass
                    //             }`}
                    //         >
                    //             {orderStatusColor[Number(enable)].label}
                    //         </span>
                    //     </div>
                    // )
                    return (
                        <div className="flex items-center">
                            {enable === true ? (
                                <>
                            <Badge
                                className={
                                    orderStatusColor[0].dotClass
                                }
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${
                                    orderStatusColor[0].textClass
                                }`}
                            >
                                {orderStatusColor[0].label}
                            </span>
                            </>
                            ) : (   <>
                            <Badge
                                className={
                                    orderStatusColor[1].dotClass
                                }
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${
                                    orderStatusColor[1].textClass
                                }`}
                            >
                                {orderStatusColor[1].label}
                            </span>
                            </>)}
                        </div>
                    )

                },
            },
            {
                header: '등록일',
                accessorKey: 'created_at',
            },
            {
                header: '연락처',
                accessorKey: 'orgContact',
            },
            // {
            //     header: 'Status',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const { status } = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 <Badge
            //                     className={orderStatusColor[status].dotClass}
            //                 />
            //                 <span
            //                     className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
            //                 >
            //                     {orderStatusColor[status].label}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
            // {
            //     header: 'Payment Method',
            //     accessorKey: 'paymentMehod',
            //     cell: (props) => {
            //         const { paymentMehod, paymentIdendifier } =
            //             props.row.original
            //         return (
            //             <span className="flex items-center">
            //                 <PaymentMethodImage
            //                     className="max-h-[20px]"
            //                     paymentMehod={paymentMehod}
            //                 />
            //                 <span className="ltr:ml-2 rtl:mr-2">
            //                     {paymentIdendifier}
            //                 </span>
            //             </span>
            //         )
            //     },
            // },
            // {
            //     header: 'Total',
            //     accessorKey: 'totalAmount',
            //     cell: (props) => {
            //         const { totalAmount } = props.row.original
            //         return (
            //             <NumericFormat
            //                 displayType="text"
            //                 value={(
            //                     Math.round(totalAmount * 100) / 100
            //                 ).toFixed(2)}
            //                 prefix={'$'}
            //                 thousandSeparator={true}
            //             />
            //         )
            //     },
            // },
            // {
            //     header: '',
            //     id: 'action',
            //     cell: (props) => <ActionColumn row={props.row.} />,
            // },
        ],
        []
    )

    // const onPaginationChange = (page: number) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageIndex = page
    //     dispatch(setTableData(newTableData))
    // }

    // const onSelectChange = (value: number) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageSize = Number(value)
    //     newTableData.pageIndex = 1
    //     dispatch(setTableData(newTableData))
    // }

    // const onSort = (sort: OnSortParam) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.sort = sort
    //     dispatch(setTableData(newTableData))
    // }

    // const onRowSelect = (checked: boolean, row: Content) => {
    //     if (checked) {
    //         dispatch(addRowItem([row.orgSeq]))
    //     } else {
    //         dispatch(removeRowItem(row.orgSeq))
    //     }
    // }

    // const onAllRowSelect = useCallback(
    //     (checked: boolean, rows: Row<Content>[]) => {
    //         if (checked) {
    //             const originalRows = rows.map((row) => row.original)
    //             const selectedIds: string[] = []
    //             originalRows.forEach((row) => {
    //                 selectedIds.push(row.orgSeq)
    //             })
    //             dispatch(setSelectedRows(selectedIds))
    //         } else {
    //             dispatch(setSelectedRows([]))
    //         }
    //     },
    //     [dispatch]
    // )

    return (
        <DataTable
            ref={tableRef}
            selectable
            columns={columns}
            data={data}
            // loading={loading}
            // pagingData={{
            //     total: tableData.total as number,
            //     pageIndex: tableData.pageIndex as number,
            //     pageSize: tableData.pageSize as number,
            // }}
            // onPaginationChange={onPaginationChange}
            // onSelectChange={onSelectChange}
            // onSort={onSort}
            // onCheckBoxChange={onRowSelect}
            // onIndeterminateCheckBoxChange={onAllRowSelect}
        />
    )
}

export default OrdersTable
