import { useEffect, useCallback, useMemo, useRef } from 'react'
import Badge from '@/components/ui/Badge'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
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
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import { apiDeleteQSheetCardList } from '@/services/QSheetService'

type Order = {
    qsheetSeq: string
    name: string
    userSeq: User
    orgSeq: Org
    data: DataItem[]
    created_at: string
}

type User = {
    userSeq: string
    userId: string
    userName: string
    userEmail: string
    userRole: {
        roleSeq: string
        roleName: string
    }
    userType: string
    userEnabled: boolean
    created_at: string
}

type Org = {
    orgSeq: string
    orgName: string
    orgBiznum: string
    orgContact: string
    orgEnabled: boolean
    created_at: string
    orgAddress: string
}

type DataItem = {
    orderIndex: number
    process: string
    content: string
    actor: string
    note: string
    filePath: string
}

const OrderColumn = ({ row }: { row: Order }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    // const onView = useCallback(() => {
    //     console.log(row)
    //     navigate(`/cuesheet/details/${row.qsheetSeq}`)
    // }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            // onClick={onView}
        >
            <Link
                to={`/cuesheet/details/${row.qsheetSeq}`}
                state={{ qsheetSeq: row.qsheetSeq }}
            >
                {row.name}
            </Link>
        </span>
    )
}

const ActionColumn = ({ row }: { row: Order }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDelete = () => {
        dispatch(setDeleteMode('single'))
        dispatch(setSelectedRow([row.qsheetSeq]))
        // apiDeleteQSheetCardList({ id: row.qsheetSeq })
        // dispatch(setSelectedRow([]))
        // location.reload()
    }

    const onEdit = useCallback(() => {
        navigate(`/cuesheet/details/${row.qsheetSeq}`)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="Edit">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onEdit}
                >
                    <HiOutlinePencil />
                </span>
            </Tooltip>
            <Tooltip title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
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

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.salesOrderList.data.tableData
    )

    const loading = useAppSelector((state) => state.salesOrderList.data.loading)

    const data = useAppSelector((state) => state.salesOrderList.data.orderList)

    // const fetchData = useCallback(() => {
    //     dispatch(getOrders({ pageIndex, pageSize }))
    // }, [dispatch, pageIndex, pageSize])

    // useEffect(() => {
    //     dispatch(setSelectedRows([]))
    //     fetchData()
    // }, [dispatch, fetchData, pageIndex, pageSize, sort])
    // // }, [dispatch])

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getOrders({ pageIndex, pageSize, sort, query }))
    }

    const columns: ColumnDef<Order>[] = useMemo(
        () => [
            {
                header: '큐시트 이름',
                accessorKey: 'name',
                cell: (props) => <OrderColumn row={props.row.original} />,
            },
            {
                header: '작성자 이름',
                accessorKey: 'userSeq.userName',
            },
            {
                header: '관리자 이름',
                accessorKey: 'orgSeq.orgName',
            },
            {
                header: '생성날짜',
                accessorKey: 'created_at',
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    const onRowSelect = (checked: boolean, row: Order) => {
        if (checked) {
            dispatch(addRowItem([row.qsheetSeq]))
        } else {
            dispatch(removeRowItem(row.qsheetSeq))
        }
    }

    const onAllRowSelect = useCallback(
        (checked: boolean, rows: Row<Order>[]) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds: string[] = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.qsheetSeq)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

    return (
        <>
            <DataTable
                ref={tableRef}
                selectable
                columns={columns}
                data={data}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
                onCheckBoxChange={onRowSelect}
                onIndeterminateCheckBoxChange={onAllRowSelect}
            />
            {/* <QSheetDetailsContent qsheetSeq={qsheetSeq}/> */}
        </>
    )
}

export default OrdersTable
