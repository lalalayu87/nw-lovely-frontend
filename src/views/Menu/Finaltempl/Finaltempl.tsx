/* eslint-disable react/jsx-key */
import { Table } from '@/components/ui'
import { useRef, useState } from 'react'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import '@/assets/styles/components/index.css'
import { useNavigate } from 'react-router-dom'
import FinaltemplView from './FinaltemplView'

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
    clickPb: boolean,
        clickMakeup: boolean,
        clickMeal: boolean,
        clickAdd: number,
}

const Finaltempl = () => {
    const [clickAdd, setClickAdd] = useState(0)
    const [clickPb, setClickPb] = useState(false)
    const [clickMakeup, setClickMakeup] = useState(false)
    const [clickMeal, setClickMeal] = useState(false)
    const [addData, setAddData] = useState({})
    const [data, setData] = useState({
        clickPb: clickPb,
            clickMakeup: clickMakeup,
            clickMeal: clickMeal,
            clickAdd: clickAdd,
        addData: {},
    })
    const componentRef = useRef(null)
    const navigate = useNavigate()

    const clickAddButton = () => {
        setClickAdd(clickAdd + 1)
    }

    const clickRemoveButton = () => {
        setClickAdd(clickAdd - 1)
    }

    const clickPbButton = () => {
        setClickPb(!clickPb)
    }

    const clickMakeupButton = () => {
        setClickMakeup(!clickMakeup)
    }

    const clickMealButton = () => {
        setClickMeal(!clickMeal)
    }

    const addTr = (clickAdd: number) => {
        return Array(clickAdd).fill(
            <tr id={'row' + clickAdd} onChange={handleChange}>
                <td hidden>{clickAdd}</td>
                <td className="border-2">
                    <input name={'titlsst' + clickAdd} placeholder="제목" />
                </td>
                <td className="border-2">
                    <input name={'detailst' + clickAdd} placeholder="내용" />
                </td>
                <td className="border-2">
                    <input name={'memost' + clickAdd} placeholder="메모" />
                </td>
                <td className="border-2">
                    <input name={'titlend' + clickAdd} placeholder="제목" />
                </td>
                <td className="border-2">
                    <input name={'detailnd' + clickAdd} placeholder="내용" />
                </td>
                <td className="border-2">
                    <input name={'memond' + clickAdd} placeholder="메모" />
                </td>
            </tr>
        )
    }

    const addPb = () => {
        return (
            <>
            <tr>
                <td className="border-2 p-2" rowSpan={2}>폐백</td>
    <td className="border-2 p-2" rowSpan={2}>폐백 음식</td>
                <td className="border-2 p-2"><input placeholder="가격 입력" /></td>
                <td className="border-2 p-2" rowSpan={2}>폐백 수묘비</td>
    <td className="border-2 p-2" rowSpan={2}>
        <input placeholder="가격 입력" />
    </td>
    <td className="border-2 p-2" rowSpan={2}>
        <input placeholder="메모" />
    </td>
            </tr>
                <tr><td className="border-2 p-2"><input placeholder="결제 방식" /></td></tr>
                </>
        )
    }
    

    const addMakeup = () => {
        return (
            <>
            <tr>
                <td className="border-2 p-2" rowSpan={4}>메이크업 헤어</td>
                <td className="border-2 p-2" rowSpan={2}>신랑</td>
                <td className="border-2 p-2">여</td>
                <td className="border-2 p-2"><input placeholder='가격' /></td>
                <td className="border-2 p-2"><input placeholder='인원' /></td>
                <td className="border-2 p-2" rowSpan={2}>결제방식</td>
                </tr>
                <tr>
                    <td className="border-2 p-2">남</td>
                    <td className="border-2 p-2"><input placeholder='가격' /></td>
                    <td className="border-2 p-2"><input placeholder='인원' /></td>
                </tr>
                <tr>
                    <td className="border-2 p-2" rowSpan={2}>신부</td>
                    <td className="border-2 p-2">여</td>
                    <td className='border-2 p-2'><input placeholder='가격' /></td>
                    <td className="border-2 p-2"><input placeholder='인원' /></td>
                    <td className="border-2 p-2" rowSpan={2}><input placeholder='결제방식' /></td>
                </tr>
                <tr>
                    <td className="border-2 p-2">남</td>
                    <td className="border-2 p-2"><input placeholder='가격' /></td>
                    <td className="border-2 p-2"><input placeholder='인원' /></td>
                </tr>
                <tr>
                    <td className='border-2 p-2'>메모</td>
                    <td className='border-2 p-2' colSpan={5}><textarea placeholder='메모 입력' className='w-full' /></td>
                </tr>
                </>
        )
    }

    const addMeal = () => {
        return (
            <>
                <tr className="border-2">
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
                <tr className="border-2">
                    <td className="border-2  p-2">대인</td>
                    <td className="border-2  p-2">
                        <input placeholder="가격" />
                    </td>
                    <td className="border-2  p-2">신랑측 인원</td>
                    <td className="border-2  p-2">
                        <input placeholder="신랑측 인원" />
                    </td>
                    <td className="border-2  p-2">신랑측 금액</td>
                    <td className="border-2  p-2">
                        <input placeholder="신랑측 금액" />
                    </td>
                </tr>
                <tr className="border-2">
                    <td className="border-2  p-2">소인</td>
                    <td className="border-2  p-2">
                        <input placeholder="가격" />
                    </td>
                    <td className="border-2 p-2">신부측 인원</td>
                    <td className="border-2 p-2">
                        <input placeholder="신부측 인원" />
                    </td>
                    <td className="border-2 p-2">신부측 금액</td>
                    <td className="border-2 p-2">
                        <input placeholder="신부측 금액" />
                    </td>
                </tr>
                <tr className="border-2">
                    <td className="border-2 p-2" colSpan={2}>
                        메모
                    </td>
                    <td className="border-2 p-2">총 인원</td>
                    <td className="border-2 p-2">
                        <input placeholder="총 인원" />
                    </td>
                    <td className="border-2 p-2">총 금액</td>
                    <td className="border-2 p-2">
                        <input placeholder="총 금액" />
                    </td>
                </tr>
                <tr>
                    <td className="border-2 p-2" colSpan={3}>
                        식권
                    </td>
                    <td className="border-2 p-2">총 개수</td>
                    <td className="border-2 p-2" colSpan={2}>
                        여유분
                    </td>
                </tr>
                <tr>
                    <td className="border-2 p-2" rowSpan={2}>
                        신랑측 식권
                    </td>
                    <td className="border-2 p-2">개인</td>
                    <td className="border-2 p-2">
                        <input placeholder="식권 개수" />
                    </td>
                    <td className="border-2 p-2" rowSpan={4}>
                        총 식권 개수
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        식사
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        <input placeholder="식사 여유분" />
                    </td>
                </tr>
                <tr>
                    <td className="border-2 p-2">개인</td>
                    <td className="border-2 p-2">식권 개수</td>
                </tr>
                <tr>
                    <td className="border-2 p-2" rowSpan={2}>
                        신부측 식권
                    </td>
                    <td className="border-2 p-2">개인</td>
                    <td className="border-2 p-2">식권 개수</td>
                    <td className="border-2 p-2" rowSpan={2}>
                        답례
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        답례 여유분
                    </td>
                </tr>
                <tr>
                    <td className="border-2 p-2">개인</td>
                    <td className="border-2 p-2">식권 개수</td>
                </tr>
                <tr>
                    <td className='border-2 p-2'>식사 메모</td>
                    <td className='border-2 p-2' colSpan={5}>
                        <textarea className='w-full' placeholder="식사 관련 사항 메모" />
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
        setAddData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
        console.log(addData)
    }

    const clickSave = () => {
        const Data = {
            clickPb: clickPb,
            clickMakeup: clickMakeup,
            clickMeal: clickMeal,
            clickAdd: clickAdd,
            addData: addData,
        }
        setData(Data)
        console.log(data)
    }

    // const next = (e) => {
    //     navigate("./FinaltemplView")
    // }

    const next =(e: dataType) => {
        navigate("./FinaltemplView")
    }

    return (
        <>
            <div className="flex ">
                <button
                    className="bg-blue-300 m-1 p-2 text-white rounded-md"
                    onClick={clickAddButton}
                >
                    추가
                </button>
                <button
                    className="bg-red-300 m-1 p-2 text-white rounded-md"
                    onClick={clickRemoveButton}
                >
                    삭제
                </button>
                <button
                    className="bg-green-300 m-1 p-2 text-white rounded-md"
                    onClick={clickPbButton}
                >
                    폐백
                </button>
                <button
                    className="bg-yellow-300 m-1 p-2 text-white rounded-md"
                    onClick={clickMakeupButton}
                >
                    메이크업, 헤어
                </button>
                <button
                    className="float-right bg-violet-300 m-1 p-2 text-white rounded-md"
                    onClick={clickMealButton}
                >
                    식사
                </button>
                <button
                    className="bg-pink-300 m-1 p-2 text-white rounded-md"
                    onClick={clickPrint}
                >
                    프린트하기
                </button>
                <button
                    className="bg-lime-300 m-1 p-2 text-white rounded-md"
                    onClick={clickSave}
                >
                    저장하기
                </button>
                <button onClick={() => next(data)}>다음페이지</button>
            </div>
            <div ref={componentRef} className="page">
                <table id="finalTable" className="border-2 w-full">
                    <thead className="justify-center">
                        <th colSpan={6}>
                            <input
                                className="w-4/5 text-xl m-2 text-center"
                                placeholder="템플릿 이름을 입력하세요"
                            />
                        </th>
                    </thead>
                    <tbody className="border-2">
                        <tr className="border-2">
                            <td className="border-2 w-2/12 p-3">날짜</td>
                            <td className="border-2 w-4/12 p-3" colSpan={2}>
                                <input placeholder="날짜를 입력하세요" />
                            </td>
                            <td className="border-2 w-2/12 p-3">장소</td>
                            <td className="border-2 w-4/12 p-3" colSpan={2}>
                                <input placeholder="예식장 이름을 입력하세요" />
                            </td>
                        </tr>
                        <tr className="border-2">
                            <td rowSpan={2} className="p-3 border-2">
                                신랑
                            </td>
                            <td className="p-3 border-2">부</td>
                            <td className="p-3 border-2">
                                <input placeholder="신랑 아버지 성함" />
                            </td>
                            <td rowSpan={2} className="p-3 border-2">
                                신부
                            </td>
                            <td className="p-3 border-2">부</td>
                            <td className="p-3 border-2">
                                <input placeholder="신부 아버지 성함" />
                            </td>
                        </tr>
                        <tr className="border-2">
                            <td className="p-3 border-2">모</td>
                            <td className="p-3 border-2">
                                <input placeholder="신랑 어머니 성함" />
                            </td>
                            <td className="p-3 border-2">모</td>
                            <td className="p-3 border-2">
                                <input placeholder="신부 어머니 성함" />
                            </td>
                        </tr>
                        {clickMeal === true ? addMeal() : ''}

                        {addTr(clickAdd)}
                        {clickPb === true ? addPb() : ''}
                        {clickMakeup === true ? addMakeup() : ''}
                        <tr className="border-2">
                            <td className="border-2" colSpan={2}>
                                웨딩홀 계약금 공제
                            </td>
                            <td className="border-2">신랑</td>
                            <td className="border-2">
                                <input placeholder="입력하세요" />
                            </td>
                            <td className="border-2">신부</td>
                            <td className="border-2">
                                <input placeholder="입력하세요" />
                            </td>
                        </tr>
                        <tr className="border-2">
                            <td className="border-2">필수체크</td>
                            <td className="border-2" colSpan={5}>
                                <textarea placeholder="필수 체크 사항 입력" className='w-full' />
                            </td>
                        </tr>
                        <tr className="border-2">
                            <td className="border-2">특이사항</td>
                            <td className="border-2" colSpan={5}>
                                <textarea placeholder="특이 사항 입력" className='w-full' />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Finaltempl
