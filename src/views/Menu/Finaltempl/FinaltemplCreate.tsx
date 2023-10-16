/* eslint-disable react/jsx-key */
import { Button, Table } from '@/components/ui'
import { useRef, useState } from 'react'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import '@/assets/styles/components/index.css'
import { useNavigate } from 'react-router-dom'
import FinaltemplView from './Finaltempl'
import { injectReducer, useAppSelector } from '@/store'
import reducer from './store'

const exampleData = {
    data: {
        finaltemplSeq: '650c5427418bfb67513ec1fa',
        finaltemplName: 'B예식장 최종확인서 템플릿',
        content: {
            groom: {
                name: '신랑 이름',
                parent: {
                    father: '신랑 부 이름',
                    mother: '신랑 모 이름',
                },
            },
            bride: {
                name: '신부 이름',
                parent: {
                    father: '신부 부 이름',
                    mother: '신부 모 이름',
                },
            },
            hallname: '홀',
            weddingDatename: '날짜',
            guaranteePerson: {
                groom: '신랑 보증 인원',
                bride: '신부 보증 인원',
            },
            hallFee: '보증금',
            weddingPicture: '스튜디오',
            dresshelper: '헬퍼',
            mc: '사회자',
            bus: '',
            bouqet: '',
            pyebaek: '폐백',
            photo: '포토',
            officiant: '주례',
        },
    },
}
type dataType = {
    clickPb: boolean
    clickMakeup: boolean
    clickMeal: boolean
    clickAdd: number
}

type addTr = {
    titlest: string
    detailst: string
    memost: string
    titlend: string
    detailnd: string
    memomd: string
}

const FinaltemplCreate = () => {
    const [clickAdd, setClickAdd] = useState(0)
    const [clickPb, setClickPb] = useState(false)
    const [clickMakeup, setClickMakeup] = useState(false)
    const [clickMeal, setClickMeal] = useState(false)
    const [addData, setAddData] = useState({})
    const [data, setData] = useState({
        finaltemplName: '',
        weddingDatename: '',
        hallname: '',
        groomFather: '',
        groomMother: '',
        brideFather: '',
        brideMother: '',
        clickPb: clickPb,
        clickMakeup: clickMakeup,
        clickMeal: clickMeal,
        clickAdd: clickAdd,
        addData: {},
        PbData: {},
        makeupData: {},
        mealData: {},
        groomDeduction: '',
        brideDeduction: '',
        essentialCheck: '',
        specialMemo: '',
    })
    const [PbData, setPbData] = useState({
        pyebaekCost: '',
        pyebaekCost2: '',
        pyebaekMemo: '',
        pyebaekPayment: '',
    })
    const [makeupData, setMakeupData] = useState({
        groomFPrice: '',
        groomFPerson: '',
        groomMPrice: '',
        groomMPerson: '',
        brideFPrice: '',
        brideFPerson: '',
        brideMPrice: '',
        brideMPerson: '',
        makeupPayment: '',
        makeupMemo: '',
    })
    const [mealData, setMealData] = useState({
        adultPrice: '',
        kidsPrice: '',
        groomPerson: '',
        groomPrice: '',
        bridePerson: '',
        bridePrice: '',
        mealMemoadd: '',
        totalPerson: '',
        totalPrice: '',
        groomTicket: '',
        brideTicket: '',
        totalTicket: '',
        groomStaff: '',
        groomStaffTicket: '',
        brideStaff: '',
        brideStaffTicket: '',
        extraMeal: '',
        extraGift: '',
        mealMemo: '',
    })

    const componentRef = useRef(null)
    const navigate = useNavigate()

    const clickAddButton = () => {
        setClickAdd(clickAdd + 1)
        setAddData({
            ...addData,
            ['row' + clickAdd]: {
                titlest: '',
                detailst: '',
                memost: '',
                titlend: '',
                detailnd: '',
                memomd: '',
            },
        })
        setData({
            ...data,
            addData: addData,
        })
    }

    console.log('addData : ', addData)
    const clickRemoveButton = () => {
        setClickAdd(clickAdd - 1)
    }

    const clickPbButton = () => {
        setClickPb(!clickPb)
        console.log(clickPb)
    }

    const clickMakeupButton = () => {
        setClickMakeup(!clickMakeup)
    }

    const clickMealButton = () => {
        setClickMeal(!clickMeal)
    }

    const addTr = (clickAdd: number) => {
        return Array.from({ length: clickAdd }).map((_, index) => (
            <tr key={index} id={`row${index}`} onChange={handleChange}>
                {/* <td hidden>{index}</td> */}
                <td className="border-2 p-2">
                    <input name={`titlest`} placeholder="제목" />
                </td>
                <td className="border-2 p-2">
                    <input name={`detailst`} placeholder="내용" />
                </td>
                <td className="border-2 p-2">
                    <input name={`memost`} placeholder="메모" />
                </td>
                <td className="border-2 p-2">
                    <input name={`titlend`} placeholder="제목" />
                </td>
                <td className="border-2 p-2">
                    <input name={`detailnd`} placeholder="내용" />
                </td>
                <td className="border-2 p-2">
                    <input name={`memond`} placeholder="메모" />
                </td>
            </tr>
        ))
    }

    const addPb = () => {
        return (
            <>
                <tr onChange={handlePbChange}>
                    <td className="border-2 p-2" rowSpan={2}>
                        폐백
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        폐백 음식
                    </td>
                    <td className="border-2 p-2">
                        <input placeholder="가격 입력" name="pyebaekCost" />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        폐백 수묘비
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        <input name="pyebaekCost2" placeholder="가격 입력" />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        <input name="pyebaekMemo" placeholder="메모" />
                    </td>
                </tr>
                <tr onChange={handlePbChange}>
                    <td className="border-2 p-2">
                        <input name="pyebaekPayment" placeholder="결제 방식" />
                    </td>
                </tr>
            </>
        )
    }

    const addMakeup = () => {
        return (
            <>
                <tr onChange={handleMakeup}>
                    <td className="border-2 p-2" rowSpan={4}>
                        메이크업 헤어
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        신랑
                    </td>
                    <td className="border-2 p-2">여</td>
                    <td className="border-2 p-2">
                        <input name="groomFPrice" placeholder="가격" />
                    </td>
                    <td className="border-2 p-2">
                        <input name="groomFPerson" placeholder="인원" />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        결제방식
                    </td>
                </tr>
                <tr onChange={handleMakeup}>
                    <td className="border-2 p-2">남</td>
                    <td className="border-2 p-2">
                        <input name="groomMPrice" placeholder="가격" />
                    </td>
                    <td className="border-2 p-2">
                        <input name="groomMPerson" placeholder="인원" />
                    </td>
                </tr>
                <tr onChange={handleMakeup}>
                    <td className="border-2 p-2" rowSpan={2}>
                        신부
                    </td>
                    <td className="border-2 p-2">여</td>
                    <td className="border-2 p-2">
                        <input name="brideFPrice" placeholder="가격" />
                    </td>
                    <td className="border-2 p-2">
                        <input name="brideFPerson" placeholder="인원" />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        <input name="makeupPayment" placeholder="결제방식" />
                    </td>
                </tr>
                <tr onChange={handleMakeup}>
                    <td className="border-2 p-2">남</td>
                    <td className="border-2 p-2">
                        <input name="brideMPrice" placeholder="가격" />
                    </td>
                    <td className="border-2 p-2">
                        <input name="brideMPerson" placeholder="인원" />
                    </td>
                </tr>
                <tr onChange={handleMakeup}>
                    <td className="border-2 p-2">메모</td>
                    <td className="border-2 p-2" colSpan={5}>
                        <textarea
                            name="makeupMemo"
                            placeholder="메모 입력"
                            className="w-full"
                        />
                    </td>
                </tr>
            </>
        )
    }

    const addMeal = () => {
        return (
            <>
                <tr onChange={handleMealChange} className="border-2">
                    <td className="border-2 p-2" colSpan={2}>
                        식대
                    </td>
                    <td className="border-2 p-2" colSpan={2}>
                        보증인원
                    </td>
                    <td className="border-2 p-2" colSpan={2}>
                        총 합계 금액
                    </td>
                </tr>
                <tr onChange={handleMealChange} className="border-2">
                    <td className="border-2  p-2">대인</td>
                    <td className="border-2  p-2">
                        <input name="adultPrice" placeholder="가격" />
                    </td>
                    <td className="border-2  p-2">신랑측 인원</td>
                    <td className="border-2  p-2">
                        <input name="groomPerson" placeholder="신랑측 인원" />
                    </td>
                    <td className="border-2  p-2">신랑측 금액</td>
                    <td className="border-2  p-2">
                        <input name="groomPrice" placeholder="신랑측 금액" />
                    </td>
                </tr>
                <tr onChange={handleMealChange} className="border-2">
                    <td className="border-2  p-2">소인</td>
                    <td className="border-2  p-2">
                        <input name="kidsPrice" placeholder="가격" />
                    </td>
                    <td className="border-2 p-2">신부측 인원</td>
                    <td className="border-2 p-2">
                        <input name="bridePerson" placeholder="신부측 인원" />
                    </td>
                    <td className="border-2 p-2">신부측 금액</td>
                    <td className="border-2 p-2">
                        <input name="bridePrice" placeholder="신부측 금액" />
                    </td>
                </tr>
                <tr onChange={handleMealChange} className="border-2">
                    <td className="border-2 p-2" colSpan={2}>
                        <input name="mealMemoadd" placeholder="메모" />
                    </td>
                    <td className="border-2 p-2">총 인원</td>
                    <td className="border-2 p-2">
                        <input name="totalPerson" placeholder="총 인원" />
                    </td>
                    <td className="border-2 p-2">총 금액</td>
                    <td className="border-2 p-2">
                        <input name="totalPrice" placeholder="총 금액" />
                    </td>
                </tr>
                <tr onChange={handleMealChange}>
                    <td className="border-2 p-2" colSpan={3}>
                        식권
                    </td>
                    <td className="border-2 p-2">총 개수</td>
                    <td className="border-2 p-2" colSpan={2}>
                        여유분
                    </td>
                </tr>
                <tr onChange={handleMealChange}>
                    <td className="border-2 p-2" rowSpan={2}>
                        신랑측 식권
                    </td>
                    <td className="border-2 p-2">개인</td>
                    <td className="border-2 p-2">
                        <input name="groomTicket" placeholder="식권 개수" />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        총 식권 개수
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        식사
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        <input name="extraMeal" placeholder="식사 여유분" />
                    </td>
                </tr>
                <tr onChange={handleMealChange}>
                    <td className="border-2 p-2">
                        <input name="groomStaff" placeholder="직원" />
                    </td>
                    <td className="border-2 p-2">
                        <input
                            name="groomStaffTicket"
                            placeholder="식권 개수"
                        />
                    </td>
                </tr>
                <tr onChange={handleMealChange}>
                    <td className="border-2 p-2" rowSpan={2}>
                        신부측 식권
                    </td>
                    <td className="border-2 p-2">개인</td>
                    <td className="border-2 p-2">
                        <input name="brideTicket" placeholder="식권 개수" />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        <input name="totalTicket" placeholder="총 식권 개수" />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        답례
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        <input name="extraGift" placeholder="답례 여유분" />
                    </td>
                </tr>
                <tr onChange={handleMealChange}>
                    <td className="border-2 p-2">
                        <input name="brideStaff" placeholder="직원" />
                    </td>
                    <td className="border-2 p-2">
                        <input
                            name="brideStaffTicket"
                            placeholder="식권 개수"
                        />
                    </td>
                </tr>
                <tr onChange={handleMealChange}>
                    <td className="border-2 p-2">식사 메모</td>
                    <td className="border-2 p-2" colSpan={5}>
                        <textarea
                            name="mealMemo"
                            className="w-full"
                            placeholder="식사 관련 사항 메모"
                        />
                    </td>
                </tr>
            </>
        )
    }
    // const pageStyle = `{ size: A4; margin: 20mm; }`

    const clickPrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Finaltempl',
        // copyStyles: true,
        pageStyle: `
        @page {
          size: 30cm 40cm;
          margin: 1cm;
        }
      `,
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        const trId = e.currentTarget.id
        console.log(trId)
        setAddData((prevData) => ({
            ...prevData,
            // [name]: value,
            [trId]: {
                ...prevData[trId],
                [name]: value,
            },
        }))
    }

    const dataChange = (e: any) => {
        const { name, value } = e.target
        setData((data) => ({
            ...data,
            [name]: value,
        }))
    }

    const clickSave = () => {
        console.log(addData)
        setData((prevData) => {
            return {
                ...prevData,
                clickPb: clickPb,
                clickMakeup: clickMakeup,
                clickMeal: clickMeal,
                clickAdd: clickAdd,
            }
        })
        clickPb === true ? (data.PbData = PbData) : ''
        clickMakeup === true ? (data.makeupData = makeupData) : '',
            clickMeal === true ? (data.mealData = mealData) : '',
            (data.addData = addData)
        console.log(data)
    }

    const next = (data: dataType) => {
        navigate('./FinaltemplEdit', {
            state: {
                data,
            },
        })
    }

    const handlePbChange = (e: any) => {
        const { name, value } = e.target
        setPbData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleMakeup = (e: any) => {
        const { name, value } = e.target
        setMakeupData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleMealChange = (e: any) => {
        const { name, value } = e.target
        setMealData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const listData = useAppSelector((state) => state)
    console.log('listData : ', listData)

    return (
        <>
            <div className="flex w-full">
                <div>
                    <Button
                        className="mr-2 mb-2"
                        variant="twoTone"
                        color="red-600"
                        onClick={clickAddButton}
                    >
                        추가
                    </Button>
                    <Button
                        className="mr-2 mb-2"
                        variant="twoTone"
                        color="red-600"
                        onClick={clickRemoveButton}
                    >
                        삭제
                    </Button>
                    <Button
                        className="mr-2 mb-2"
                        variant="twoTone"
                        color="red-600"
                        onClick={clickPbButton}
                    >
                        폐백
                    </Button>
                    <Button
                        className="mr-2 mb-2"
                        variant="twoTone"
                        color="red-600"
                        onClick={clickMakeupButton}
                    >
                        메이크업, 헤어
                    </Button>
                    <Button
                        className="mr-2 mb-2"
                        variant="twoTone"
                        color="red-600"
                        onClick={clickMealButton}
                    >
                        식사
                    </Button>
                </div>
                <div className="items-end">
                    <Button
                        className="mr-2 mb-2"
                        variant="solid"
                        color="red-300"
                        onClick={clickPrint}
                    >
                        프린트하기
                    </Button>
                    <Button
                        className="mr-2 mb-2"
                        variant="solid"
                        color="red-300"
                        onClick={clickSave}
                    >
                        저장하기
                    </Button>
                </div>
                {/* <button onClick={() => next(data)}>다음페이지</button> */}
            </div>
            <div ref={componentRef} className="page">
                <table id="finalTable" className="border-2 w-full">
                    <thead className="justify-center">
                        <th onChange={dataChange} colSpan={6}>
                            <input
                                name="finaltemplName"
                                className="w-4/5 text-xl m-2 text-center"
                                placeholder="템플릿 이름을 입력하세요"
                            />
                        </th>
                    </thead>
                    <tbody className="border-2">
                        <tr className="border-2">
                            <td className="border-2 w-2/12 p-3">날짜</td>
                            <td
                                onChange={dataChange}
                                className="border-2 w-4/12 p-3"
                                colSpan={2}
                            >
                                <input
                                    name="weddingDatename"
                                    placeholder="날짜를 입력하세요"
                                />
                            </td>
                            <td className="border-2 w-2/12 p-3">장소</td>
                            <td
                                onChange={dataChange}
                                className="border-2 w-4/12 p-3"
                                colSpan={2}
                            >
                                <input
                                    name="hallname"
                                    placeholder="예식장 이름을 입력하세요"
                                />
                            </td>
                        </tr>
                        <tr className="border-2">
                            <td rowSpan={2} className="p-3 border-2">
                                신랑
                            </td>
                            <td className="p-3 border-2">부</td>
                            <td onChange={dataChange} className="p-3 border-2">
                                <input
                                    name="groomFather"
                                    placeholder="신랑 아버지 성함"
                                />
                            </td>
                            <td rowSpan={2} className="p-3 border-2">
                                신부
                            </td>
                            <td className="p-3 border-2">부</td>
                            <td onChange={dataChange} className="p-3 border-2">
                                <input
                                    name="brideFather"
                                    placeholder="신부 아버지 성함"
                                />
                            </td>
                        </tr>
                        <tr className="border-2">
                            <td className="p-3 border-2">모</td>
                            <td onChange={dataChange} className="p-3 border-2">
                                <input
                                    name="groomMother"
                                    placeholder="신랑 어머니 성함"
                                />
                            </td>
                            <td className="p-3 border-2">모</td>
                            <td onChange={dataChange} className="p-3 border-2">
                                <input
                                    name="brideMother"
                                    placeholder="신부 어머니 성함"
                                />
                            </td>
                        </tr>
                        {clickMeal === true ? addMeal() : ''}

                        {addTr(clickAdd)}
                        {clickPb === true ? addPb() : ''}
                        {clickMakeup === true ? addMakeup() : ''}
                        <tr className="border-2">
                            <td className="border-2 p-2" colSpan={2}>
                                웨딩홀 계약금 공제
                            </td>
                            <td className="border-2 p-2">신랑</td>
                            <td onChange={dataChange} className="border-2 p-2">
                                <input
                                    name="groomDeduction"
                                    placeholder="입력하세요"
                                />
                            </td>
                            <td className="border-2 p-2">신부</td>
                            <td onChange={dataChange} className="border-2 p-2">
                                <input
                                    name="brideDeduction"
                                    placeholder="입력하세요"
                                />
                            </td>
                        </tr>
                        <tr className="border-2">
                            <td className="border-2 p-2">필수체크</td>

                            <td
                                onChange={dataChange}
                                className="border-2 p-2"
                                colSpan={5}
                            >
                                <textarea
                                    name="essentialCheck"
                                    placeholder="필수 체크 사항 입력"
                                    className="w-full"
                                />
                            </td>
                        </tr>
                        <tr className="border-2">
                            <td className="border-2 p-2">특이사항</td>
                            <td
                                onChange={dataChange}
                                className="border-2 p-2"
                                colSpan={5}
                            >
                                <textarea
                                    name="specialMemo"
                                    placeholder="특이 사항 입력"
                                    className="w-full"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default FinaltemplCreate
