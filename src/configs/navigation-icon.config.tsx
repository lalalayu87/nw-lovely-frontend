import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineOfficeBuilding,
    HiOutlineClipboardList,
    HiOutlineEmojiHappy,
    HiOutlineChatAlt2,
} from 'react-icons/hi'
import { BiCalendarCheck, BiUserCheck } from 'react-icons/bi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    biCalendarCheck: <BiCalendarCheck />,
    biUserCheck: <BiUserCheck />,
    hiOutlineOfficeBuilding: <HiOutlineOfficeBuilding />,
    hiOutlineClipboardList: <HiOutlineClipboardList />,
    hiOutlineEmojiHappy: <HiOutlineEmojiHappy />,
    hiOutlineChatAlt2: <HiOutlineChatAlt2 />,
}

export default navigationIcon
