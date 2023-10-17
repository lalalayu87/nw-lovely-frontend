import { ReactNode, CSSProperties } from 'react'

export interface CommonProps {
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type TableQueries = {
    total?: number
    pageIndex?: number
    pageSize?: number
    query?: string
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    }
}

// export type TableQueries = {
//     // content: {
//         // orgSeq: string
//         // orgName: string
//         // orgBiznum: string
//         // orgContact: string
//         // orgEnable: boolean
//         // created_at: string
//     // }
//     // pageable: {
//         sort: {
//             // empty: boolean
//             sorted: boolean
//             unsorted: boolean
//         }
//         // offset: number
//         page: number
//         size: number
//     // }
// }
