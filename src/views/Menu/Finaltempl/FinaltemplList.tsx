import { useAppDispatch, useAppSelector } from '@/store'
import { useCallback, useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { getFinaltempls } from './store'
import { Button, Spinner } from '@/components/ui'
import classNames from 'classnames'
import GridItem from './GridItem'

type dataType = {
    clickPb: boolean
    clickMakeup: boolean
    clickMeal: boolean
    clickAdd: string[]
}

const templData = {
    userName: 'userName',
    PbData: {},
    addData: {
        // row0: {
        //   detailnd: "",
        //   detailst: "11",
        //   memomd: "",
        //   memost: "11",
        //   titlend: "",
        //   titlest: "11"
        // },
        // row1: {
        //   detailnd: "22",
        //   detailst: "",
        //   memomd: "22",
        //   memost: "",
        //   titlend: "22",
        //   titlest: ""
        // },
        // row2: {
        //   detailnd: "",
        //   detailst: "33",
        //   memomd: "",
        //   memost: "33",
        //   titlend: "33",
        //   titlest: ""
        // }
    },
    brideDeduction: '신부공제',
    brideFather: '신부아버지',
    brideMother: '신부 어머니',
    clickAdd: 3,
    clickMakeup: false,
    clickMeal: false,
    clickPb: false,
    essentialCheck: '',
    finaltemplName: '템플릿 이름',
    groomDeduction: '신랑공제',
    groomFather: '신랑 아버지',
    groomMother: '신랑 어머니',
    hallname: '예식장',
    //   makeupData: {},
    //   mealData: {
    //     adultPrice: "대인가격",
    // bridePerson: "신부측인원",
    // bridePrice: "신부측금액",
    // brideStaff: "신부직원",
    // brideStaffTicket: "",
    // brideTicket: "신부개인식권개수",
    // extraGift: "",
    // extraMeal: "",
    // groomPerson: "신랑측인원",
    // groomPrice: "신랑측금액",
    // groomStaff: "신랑직원",
    // groomStaffTicket: "",
    // groomTicket: "신랑개인식권개수",
    // kidsPrice: "소인가격",
    // mealMemo: "",
    //     mealMemoadd: "",
    // totalPerson: "총인원",
    // totalPrice: "총금액",
    //     totalTicket: ""
    //   },
    specialMemo: '',
    weddingDatename: '날짜',
}

const projectList = [
    {
        id: 27,
        name: 'EVO SaaS',
        category: 'Web Application',
        desc: 'Most of you are familiar with the virtues of a programmer',
        attachmentCount: 12,
        totalTask: 32,
        completedTask: 27,
        progression: 80,
        dayleft: 21,
        status: 'none',
        member: [
            {
                name: 'Frederick Adams',
                img: '/img/avatars/thumb-8.jpg',
            },
            {
                name: 'Joyce Freeman',
                img: '/img/avatars/thumb-5.jpg',
            },
            {
                name: 'Clayton Bates',
                img: '',
            },
            {
                name: 'Clayton Bates',
                img: '',
            },
        ],
    },
    {
        id: 28,
        name: 'AIA Bill App',
        category: 'Mobile Application',
        desc: 'We are not shipping your machine!',
        attachmentCount: 5,
        totalTask: 36,
        completedTask: 15,
        progression: 45,
        dayleft: 19,
        status: 'none',
        member: [
            {
                name: 'Carolyn Perkins',
                img: '/img/avatars/thumb-1.jpg',
            },
            {
                name: 'Gabriel Frazier',
                img: '',
            },
        ],
    },
    {
        id: 29,
        name: 'IOP Web',
        category: 'Web Backend Application',
        desc: 'There are two ways to write error-free programs; only the third one works.',
        attachmentCount: 8,
        totalTask: 27,
        completedTask: 19,
        progression: 73,
        dayleft: 6,
        status: 'orange',
        member: [
            {
                name: 'Debra Hamilton',
                img: '',
            },
            {
                name: 'Stacey Ward',
                img: '',
            },
            {
                name: 'Ron Vargas',
                img: '/img/avatars/thumb-3.jpg',
            },
            {
                name: 'Ron Vargas',
                img: '/img/avatars/thumb-3.jpg',
            },
            {
                name: 'Ron Vargas',
                img: '/img/avatars/thumb-3.jpg',
            },
            {
                name: 'Ron Vargas',
                img: '/img/avatars/thumb-3.jpg',
            },
        ],
    },
    {
        id: 31,
        name: 'Octonine POS',
        category: 'Backend Application',
        desc: 'Everything that can be invented has been invented.',
        attachmentCount: 8,
        totalTask: 78,
        completedTask: 23,
        progression: 21,
        dayleft: 52,
        status: 'cyan',
        member: [
            {
                name: 'Brittany Hale',
                img: '/img/avatars/thumb-10.jpg',
            },
            {
                name: 'Frederick Adams',
                img: '/img/avatars/thumb-8.jpg',
            },
            {
                name: 'Samantha Phillips',
                img: '/img/avatars/thumb-6.jpg',
            },
            {
                name: 'Samantha Phillips',
                img: '/img/avatars/thumb-6.jpg',
            },
            {
                name: 'Samantha Phillips',
                img: '/img/avatars/thumb-6.jpg',
            },
        ],
    },
    {
        id: 30,
        name: 'Evo SaaS API',
        category: 'Backend Services',
        desc: 'Debugging is twice as hard as writing the code in the first place.',
        attachmentCount: 2,
        totalTask: 15,
        completedTask: 13,
        progression: 87,
        dayleft: 2,
        status: 'red',
        member: [
            {
                name: 'Troy Alexander',
                img: '',
            },
            {
                name: 'Lloyd Obrien',
                img: '/img/avatars/thumb-11.jpg',
            },
        ],
    },
    {
        id: 32,
        name: 'Posiflex Web',
        category: 'Frontend Web Application',
        desc: 'The function of good software is to make the complex appear to be simple.',
        attachmentCount: 6,
        totalTask: 18,
        completedTask: 9,
        progression: 50,
        dayleft: 6,
        status: 'orange',
        member: [
            {
                name: 'Gabriella May',
                img: '/img/avatars/thumb-12.jpg',
            },
            {
                name: 'Larry Campbell',
                img: '',
            },
            {
                name: 'Phyllis Chapman',
                img: '',
            },
        ],
    },
    {
        id: 33,
        name: 'FoksMart APP',
        category: 'Mobile Application',
        desc: 'It is not about bits, bytes and protocols, but profits, losses and margins. ',
        attachmentCount: 3,
        totalTask: 26,
        completedTask: 19,
        progression: 67,
        dayleft: 14,
        status: 'none',
        member: [
            {
                name: 'Lee Wheeler',
                img: '/img/avatars/thumb-13.jpg',
            },
            {
                name: 'Ella Robinson',
                img: '/img/avatars/thumb-15.jpg',
            },
        ],
    },
]

const FinaltemplList = () => {
    const location = useLocation()
    const data = { ...location.state }
    const listData = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const fetchData = useCallback(() => {
        dispatch(getFinaltempls())
    }, [dispatch])

    const loading = false
    const view = 'grid'

    const navigate = useNavigate()

    const clickCreate = () => {
        navigate('./finaltemplCreate')
    }

    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData])

    console.log(data)
    console.log(listData)
    return (
        <div
            className={classNames(
                'mt-6 h-full flex flex-col',
                loading && 'justify-center'
            )}
        >
            <Button
                className="mr-2 mb-2"
                variant="twoTone"
                color="red-600"
                onClick={clickCreate}
            >
                템플릿생성
            </Button>
            {loading && (
                <div className="flex justify-center">
                    <Spinner size={40} />
                </div>
            )}
            {view === 'grid' && projectList.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {projectList.map((project) => (
                        <GridItem key={project.id} data={templData} />
                    ))}
                </div>
            )}
            {/* {view === 'list' &&
                projectList.length > 0 &&
                !loading &&
                projectList.map((project) => (
                    <ListItem key={project.id} data={project} />
                ))} */}
        </div>
    )
}

export default FinaltemplList
