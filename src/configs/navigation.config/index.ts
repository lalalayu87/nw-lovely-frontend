import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'
import { BiCalendarCheck } from 'react-icons/bi'

// route.configs.ts와 연결
const navigationConfig: NavigationTree[] = [
    // {
    //     key: 'home',
    //     path: '/home',
    //     title: 'Home',
    //     translateKey: 'nav.home',
    //     icon: 'home',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'organization',
    //     path: '/organization',
    //     title: '조직관리',
    //     translateKey: 'nav.organization',
    //     icon: 'biUserCheck',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'place',
    //     path: '/place',
    //     title: '장소관리',
    //     translateKey: 'nav.place',
    //     icon: 'hiOutlineOfficeBuilding',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'schedule',
    //     path: '/schedule',
    //     title: '일정관리',
    //     translateKey: 'nav.schedule',
    //     icon: 'biCalendarCheck',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    {
        key: 'home',
        path: '/cuesheet',
        title: '큐시트관리',
        translateKey: 'nav.qsheet',
        icon: 'hiOutlineClipboardList',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    // {
    //     key: 'qsheet',
    //     path: '/cuesheet',
    //     title: '큐시트관리',
    //     translateKey: 'nav.qsheet',
    //     icon: 'hiOutlineClipboardList',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'mypage',
    //     path: '/mypage',
    //     title: '마이페이지',
    //     translateKey: 'nav.mypage',
    //     icon: 'hiOutlineEmojiHappy',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
]

export default navigationConfig
