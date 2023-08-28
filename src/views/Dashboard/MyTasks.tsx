import { useMemo } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import { useNavigate } from 'react-router-dom'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import ActionLink from '@/components/shared/ActionLink'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table'

type Task = {
    taskId: string
    taskSubject: string
    priority: number
    assignees: {
        id: string
        name: string
        email: string
        img: string
    }[]
}

type MyTasksProps = {
    data?: Task[]
}

const myTasksData = [
    {
        taskId: 'KCM-1393',
        taskSubject: 'Design sign up flow',
        priority: 0,
        assignees: [
            {
                id: '1',
                name: 'Carolyn Perkins',
                email: 'eileen_h@hotmail.com',
                img: '/img/avatars/thumb-1.jpg',
            },
            {
                id: '2',
                name: 'Terrance Moreno',
                email: '',
                img: '/img/avatars/thumb-2.jpg',
            },
        ],
    },
    {
        taskId: 'KCM-2039',
        taskSubject: 'Update contact page',
        priority: 1,
        assignees: [
            {
                id: '1',
                name: 'Carolyn Perkins',
                email: 'eileen_h@hotmail.com',
                img: '/img/avatars/thumb-1.jpg',
            },
        ],
    },
    {
        taskId: 'KCM-2155',
        taskSubject: 'Document features 2.0',
        priority: 1,
        assignees: [
            {
                id: '1',
                name: 'Carolyn Perkins',
                email: 'eileen_h@hotmail.com',
                img: '/img/avatars/thumb-1.jpg',
            },
            {
                id: '2',
                name: 'Terrance Moreno',
                email: '',
                img: '/img/avatars/thumb-2.jpg',
            },
            {
                id: '3',
                name: 'Ron Vargas',
                email: 'ronnie_vergas@infotech.io',
                img: '/img/avatars/thumb-3.jpg',
            },
        ],
    },
    {
        taskId: 'KCM-2270',
        taskSubject: 'Fix typo in home page',
        priority: 2,
        assignees: [
            {
                id: '1',
                name: 'Carolyn Perkins',
                email: 'eileen_h@hotmail.com',
                img: '/img/avatars/thumb-1.jpg',
            },
            {
                id: '5',
                name: 'Joyce Freeman',
                email: 'joyce991@infotech.io',
                img: '/img/avatars/thumb-5.jpg',
            },
        ],
    },
    {
        taskId: 'KCM-1957',
        taskSubject: 'Fix broken API',
        priority: 0,
        assignees: [
            {
                id: '1',
                name: 'Carolyn Perkins',
                email: 'eileen_h@hotmail.com',
                img: '/img/avatars/thumb-1.jpg',
            },
        ],
    },
]

const { Tr, Th, Td, THead, TBody } = Table

const PriorityTag = ({ priority }: { priority: number }) => {
    switch (priority) {
        case 0:
            return (
                <Tag className="text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 rounded border-0">
                    High
                </Tag>
            )
        case 1:
            return (
                <Tag className="text-amber-600 bg-amber-100 dark:text-amber-100 dark:bg-amber-500/20 rounded border-0">
                    Medium
                </Tag>
            )
        case 2:
            return (
                <Tag className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 rounded border-0">
                    Low
                </Tag>
            )
        default:
            return null
    }
}

const MyTasks = ({ data = myTasksData }: MyTasksProps) => {
    const navigate = useNavigate()

    const columns: ColumnDef<Task>[] = useMemo(
        () => [
            {
                header: 'Task ID',
                accessorKey: 'taskId',
                cell: (props) => {
                    const { taskId } = props.row.original
                    return (
                        <ActionLink
                            themeColor={false}
                            className="font-semibold"
                            to="/app/project/scrum-board"
                        >
                            {taskId}
                        </ActionLink>
                    )
                },
            },
            {
                header: 'Subject',
                accessorKey: 'taskSubject',
            },
            {
                header: 'Priority',
                accessorKey: 'priority',
                cell: (props) => {
                    const { priority } = props.row.original
                    return <PriorityTag priority={priority} />
                },
            },
            {
                header: 'Assignees',
                accessorKey: 'Assignees',
                cell: (props) => {
                    const { assignees } = props.row.original
                    return <UsersAvatarGroup users={assignees} />
                },
            },
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const onViewAllTask = () => {
        navigate('/app/project/issue')
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h4>My Tasks</h4>
                <Button size="sm" onClick={onViewAllTask}>
                    View All
                </Button>
            </div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    )
}

export default MyTasks
