import { useAppSelector } from '@/store'
import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

const templData = {
  data : {PbData: {},
  addData:  {
  row0: {
    detailnd: "",
    detailst: "11",
    memomd: "",
    memost: "11",
    titlend: "",
    titlest: "11"
  },
  row1: {
    detailnd: "22",
    detailst: "",
    memomd: "22",
    memost: "",
    titlend: "22",
    titlest: ""
  },
  row2: {
    detailnd: "",
    detailst: "33",
    memomd: "",
    memost: "33",
    titlend: "33",
    titlest: ""
  }
  },
  brideDeduction: "신부공제",
  brideFather: "신부아버지",
brideMother: "신부 어머니",
clickAdd: 0,
clickMakeup: false,
clickMeal: false,
clickPb: false,
essentialCheck: "",
finaltemplName: "템플릿 이름",
groomDeduction: "신랑공제",
groomFather: "신랑 아버지",
groomMother: "신랑 어머니",
  hallname: "예식장",
  makeupData: {},
  mealData: {
    adultPrice: "대인가격",
bridePerson: "신부측인원",
bridePrice: "신부측금액",
brideStaff: "신부직원",
brideStaffTicket: "",
brideTicket: "신부개인식권개수",
extraGift: "",
extraMeal: "",
groomPerson: "신랑측인원",
groomPrice: "신랑측금액",
groomStaff: "신랑직원",
groomStaffTicket: "",
groomTicket: "신랑개인식권개수",
kidsPrice: "소인가격",
mealMemo: "",
    mealMemoadd: "",
totalPerson: "총인원",
totalPrice: "총금액",
    totalTicket: ""
  },
  specialMemo: "",
weddingDatename: "날짜"}
  
}

const adddata = {
  row0: {
    detailnd: "",
    detailst: "11",
    memomd: "",
    memost: "11",
    titlend: "",
    titlest: "11"
  },
  row1: {
    detailnd: "22",
    detailst: "",
    memomd: "22",
    memost: "",
    titlend: "22",
    titlest: ""
  },
  row2: {
    detailnd: "",
    detailst: "33",
    memomd: "",
    memost: "33",
    titlend: "33",
    titlest: ""
  }
}

const FinaltemplEdit = () => {
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
        specialMemo: ''
    })
    // const [PbData, setPbData] = useState({
    //     pyebaekCost: '',
    //     pyebaekCost2: '',
    //     pyebaekMemo: '',
    //     pyebaekPayment: ''
    // })
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
        makeupMemo: ''
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
        mealMemo:''
    })

    const componentRef = useRef(null)
    // const navigate = useNavigate()

    const clickAddButton = () => {
        setClickAdd(clickAdd + 1)       
        setAddData({
            ...addData,
            ["row"+clickAdd]:{
                titlest: '',
                detailst: '',
                memost: '',
                titlend: '',
                detailnd: '',
                memomd: ''
            
            }})
        setData({
            ...data,
            addData: addData
        })
    }

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

  const addTr = () => {
    console.log(listData.data.clickAdd)
    const dataResult = listData.data.addData
    return (
    <>
      {Object.keys(dataResult).map((rowKey, index) => (
          <tr key={index} id={rowKey} onChange={handleChange}>
            <td className="border-2">
              <input
                value={listData.data.addData[rowKey].titlest}
                name="titlest"
                placeholder="제목"
              />
            </td>
            <td className="border-2">
              <input
                value={listData.data.addData[rowKey].detailst}
                name="detailst"
                placeholder="내용"
              />
            </td>
            <td className="border-2">
              <input
                value={listData.data.addData[rowKey].memost}
                name="memost"
                placeholder="메모"
              />
            </td>
            <td className="border-2">
              <input
                value={listData.data.addData[rowKey].titlend}
                name="titlend"
                placeholder="제목"
              />
            </td>
            <td className="border-2">
              <input
                value={listData.data.addData[rowKey].detailnd}
                name="detailnd"
                placeholder="내용"
              />
            </td>
            <td className="border-2">
              <input
                value={listData.data.addData[rowKey].memond}
                name="memond"
                placeholder="메모"
              />
            </td>
          </tr>
      ))}
        </>
    )
    
    // return Array.from({ length: listData.data.clickAdd }).map((_, index) => (
    //             <tr key={index}  id={`row${index}`} onChange={handleChange}>
    //               {/* <td hidden>{index}</td> */}
    //               <td className="border-2">
    //                 <input value={listData.data.addData['row'+clickAdd].titlest} name={`titlest`} placeholder="제목" />
    //               </td>
    //               <td className="border-2">
    //       <input value={listData.data.addData['row' + clickAdd].detailst} name={`detailst`} placeholder="내용" />
    //               </td>
    //               <td className="border-2">
    //       <input value={listData.data.addData['row' + clickAdd].memost} name={`memost`} placeholder="메모" />
    //               </td>
    //               <td className="border-2">
    //                 <input value={listData.data.addData['row' + clickAdd].titlend} name={`titlend`} placeholder="제목" />
    //               </td>
    //               <td className="border-2">
    //                 <input value={listData.data.addData['row' + clickAdd].detailnd} name={`detailnd`} placeholder="내용" />
    //               </td>
    //               <td className="border-2">
    //                 <input value={listData.data.addData['row' + clickAdd].memond} name={`memond`} placeholder="메모" />
    //               </td>
    //             </tr>
    //         ))
    }

    const addPb = () => {
        return (
            <>
                <tr  onChange={handlePbChange}>
                    <td className="border-2 p-2" rowSpan={2}>폐백</td>
                    <td className="border-2 p-2" rowSpan={2}>폐백 음식</td>
                    <td className="border-2 p-2">
                        <input value={listData.data.PbData["pyebaekCost"]} placeholder="가격 입력" name='pyebaekCost' />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>폐백 수묘비</td>
                    <td className="border-2 p-2" rowSpan={2}>
                      <input value={listData.data.PbData["pyebaekCost2"]} name='pyebaekCost2' placeholder="가격 입력" />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        <input value={listData.data.PbData["pyebaekMemo"]} name='pyebaekMemo' placeholder="메모" />
                    </td>
                </tr>
                <tr  onChange={handlePbChange}> 
                    <td className="border-2 p-2">
                        <input value={listData.data.PbData["pyebaekPayment"]} name='pyebaekPayment' placeholder="결제 방식" />
                    </td>
                </tr>
            </>
        )
    }
    

    const addMakeup = () => {
        return (
            <>
            <tr onChange={handleMakeup}>
                <td className="border-2 p-2" rowSpan={4}>메이크업 헤어</td>
                <td className="border-2 p-2" rowSpan={2}>신랑</td>
                <td className="border-2 p-2">여</td>
                    <td className="border-2 p-2">
                        <input value={listData.data.makeupData["groomFPrice"]} name='groomFPrice' placeholder='가격' />
                    </td>
                    <td className="border-2 p-2">
                        <input value={listData.data.makeupData["groomFPerson"]} name='groomFPerson' placeholder='인원' />
                    </td>
                <td className="border-2 p-2" rowSpan={2}>결제방식</td>
                </tr>
                <tr onChange={handleMakeup}>
                    <td className="border-2 p-2">남</td>
                    <td className="border-2 p-2">
                        <input value={listData.data.makeupData["groomMPrice"]} name='groomMPrice' placeholder='가격' />
                    </td>
                    <td className="border-2 p-2">
                        <input value={listData.data.makeupData["groomMPerson"]} name='groomMPerson' placeholder='인원' />
                    </td>
                </tr>
                <tr onChange={handleMakeup}>
                    <td className="border-2 p-2" rowSpan={2}>신부</td>
                    <td className="border-2 p-2">여</td>
                    <td className='border-2 p-2'>
                        <input value={listData.data.makeupData["brideFPrice"]} name='brideFPrice' placeholder='가격' />
                    </td>
                    <td className="border-2 p-2">
                        <input value={listData.data.makeupData["brideFPerson"]} name='brideFPerson' placeholder='인원' />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        <input value={listData.data.makeupData["makeupPayment"]} name='makeupPayment' placeholder='결제방식' />
                    </td>
                </tr>
                <tr onChange={handleMakeup}>
                    <td className="border-2 p-2">남</td>
                    <td className="border-2 p-2">
                        <input value={listData.data.makeupData["brideMPrice"]} name="brideMPrice" placeholder='가격' />
                    </td>
                    <td className="border-2 p-2">
                        <input value={listData.data.makeupData["brideMPerson"]} name='brideMPerson' placeholder='인원' />
                    </td>
                </tr>
                <tr onChange={handleMakeup}>
                    <td className='border-2 p-2'>메모</td>
                    <td className='border-2 p-2' colSpan={5}>
                        <textarea value={listData.data.makeupData["makeupMemo"]} name='makeupMemo' placeholder='메모 입력' className='w-full' />
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
                        <input value={listData.data.mealData["adultPrice"]} name='adultPrice' placeholder="가격" />
                    </td>
                    <td className="border-2  p-2">신랑측 인원</td>
                    <td className="border-2  p-2">
                        <input value={listData.data.mealData["groomPerson"]} name='groomPerson' placeholder="신랑측 인원" />
                    </td>
                    <td className="border-2  p-2">신랑측 금액</td>
                    <td className="border-2  p-2">
                        <input value={listData.data.mealData["groomPrice"]} name='groomPrice' placeholder="신랑측 금액" />
                    </td>
                </tr>
                <tr onChange={handleMealChange} className="border-2">
                    <td className="border-2  p-2">소인</td>
                    <td className="border-2  p-2">
                        <input value={listData.data.mealData["kidsPrice"]} name='kidsPrice' placeholder="가격" />
                    </td>
                    <td className="border-2 p-2">신부측 인원</td>
                    <td className="border-2 p-2">
                        <input value={listData.data.mealData["bridePerson"]} name='bridePerson' placeholder="신부측 인원" />
                    </td>
                    <td className="border-2 p-2">신부측 금액</td>
                    <td className="border-2 p-2">
                        <input value={listData.data.mealData["bridePrice"]} name='bridePrice' placeholder="신부측 금액" />
                    </td>
                </tr>
                <tr onChange={handleMealChange} className="border-2">
                    <td className="border-2 p-2" colSpan={2}>
                        <input value={listData.data.mealData["mealMemoadd"]} name='mealMemoadd' placeholder='메모' />
                    </td>
                    <td className="border-2 p-2">총 인원</td>
                    <td className="border-2 p-2">
                        <input value={listData.data.mealData["totalPerson"]} name='totalPerson' placeholder="총 인원" />
                    </td>
                    <td className="border-2 p-2">총 금액</td>
                    <td className="border-2 p-2">
                        <input value={listData.data.mealData["totalPrice"]} name='totalPrice' placeholder="총 금액" />
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
                        <input value={listData.data.mealData["groomTicket"]} name='groomTicket' placeholder="식권 개수" />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        총 식권 개수
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        식사
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        <input value={listData.data.mealData["extraMeal"]} name='extraMeal' placeholder="식사 여유분" />
                    </td>
                </tr>
                <tr onChange={handleMealChange}>
                    <td className="border-2 p-2">
                        <input value={listData.data.mealData["groomStaff"]} name='groomStaff' placeholder="직원" />
                    </td>
                    <td className="border-2 p-2">
                        <input value={listData.data.mealData["groomStaffTicket"]} name='groomStaffTicket' placeholder="식권 개수" />
                    </td>
                </tr>
                <tr onChange={handleMealChange}>
                    <td className="border-2 p-2" rowSpan={2}>
                        신부측 식권
                    </td>
                    <td className="border-2 p-2">개인</td>
                    <td className="border-2 p-2">
                        <input value={listData.data.mealData["brideTicket"]} name='brideTicket' placeholder="식권 개수" />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        <input value={listData.data.mealData["totalTicket"]} name='totalTicket' placeholder="총 식권 개수" />
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        답례
                    </td>
                    <td className="border-2 p-2" rowSpan={2}>
                        <input value={listData.data.mealData["extraGift"]} name='extraGift' placeholder="답례 여유분" />
                    </td>
                </tr>
                <tr onChange={handleMealChange}>
                    <td className="border-2 p-2">
                        <input value={listData.data.mealData["brideStaff"]} name='brideStaff' placeholder="직원" />
                    </td>
                    <td className="border-2 p-2">
                        <input value={listData.data.mealData["brideStaffTicket"]} name='brideStaffTicket' placeholder="식권 개수" />
                    </td>
                </tr>
                <tr onChange={handleMealChange}>
                    <td className='border-2 p-2'>식사 메모</td>
                    <td className='border-2 p-2' colSpan={5}>
                        <textarea value={listData.data.mealData["mealMemo"]} name='mealMemo' className='w-full' placeholder="식사 관련 사항 메모" />
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
        const trId = e.currentTarget.id;
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
            [name]: value
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
            };
        });
        clickPb === true ? data.PbData = PbData : '';
        clickMakeup === true ? data.makeupData = makeupData : '',
        clickMeal === true ? data.mealData = mealData : '',
        data.addData = addData
        console.log(data)
    }

    // const next =(data: dataType) => {
    //     navigate("./FinaltemplEdit", {
    //         state: {
    //             data
    //         }
    //     })
  // }

    const handlePbChange = (e: any) => {
        const { name, value } = e.target
        setPbData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleMakeup = (e: any) => {
        const {name, value} = e.target
        setMakeupData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleMealChange = (e: any) => {
        const { name, value } = e.target
        setMealData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    } 

    // const listData = useAppSelector((state) => state)
    const location = useLocation()
    const listData = templData
    console.log("listData : ", listData)

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
                {/* <button onClick={() => next(data)}>다음페이지</button> */}
            </div>
            <div ref={componentRef} className="page">
                <table id="finalTable" className="border-2 w-full">
                    <thead className="justify-center">
                        <th onChange={dataChange} colSpan={6}>
                            <input
                                name='finaltemplName'
                                className="w-4/5 text-xl m-2 text-center"
                placeholder="템플릿 이름을 입력하세요"
                value={listData.data["finaltemplName"]}
                            />
                        </th>
                    </thead>
                    <tbody className="border-2">
                        <tr className="border-2">
                            <td className="border-2 w-2/12 p-3">날짜</td>
                            <td onChange={dataChange} className="border-2 w-4/12 p-3" colSpan={2}>
                                <input value={listData.data["weddingDatename"]} name='weddingDatename' placeholder="날짜를 입력하세요" />
                            </td>
                            <td className="border-2 w-2/12 p-3">장소</td>
                            <td onChange={dataChange} className="border-2 w-4/12 p-3" colSpan={2}>
                                <input value={listData.data["hallname"]} name='hallname' placeholder="예식장 이름을 입력하세요" />
                            </td>
                        </tr>
                        <tr className="border-2">
                            <td rowSpan={2} className="p-3 border-2">
                                신랑
                            </td>
                            <td className="p-3 border-2">부</td>
                            <td onChange={dataChange} className="p-3 border-2">
                                <input value={listData.data["groomFather"]} name='groomFather' placeholder="신랑 아버지 성함" />
                            </td>
                            <td rowSpan={2} className="p-3 border-2">
                                신부
                            </td>
                            <td className="p-3 border-2">부</td>
                            <td onChange={dataChange} className="p-3 border-2">
                                <input value={listData.data["brideFather"]} name='brideFather' placeholder="신부 아버지 성함" />
                            </td>
                        </tr>
                        <tr className="border-2">
                            <td className="p-3 border-2">모</td>
                            <td onChange={dataChange} className="p-3 border-2">
                                <input value={listData.data["groomMother"]} name='groomMother' placeholder="신랑 어머니 성함" />
                            </td>
                            <td className="p-3 border-2">모</td>
                            <td onChange={dataChange} className="p-3 border-2">
                                <input value={listData.data["brideMother"]} name='brideMother' placeholder="신부 어머니 성함" />
                            </td>
                        </tr>
                        {listData.data.clickMeal === true ? addMeal() : ''}

                        {addTr()}
                        {listData.data.clickPb === true ? addPb() : ''}
                        {listData.data.clickMakeup === true ? addMakeup() : ''}
                        <tr className="border-2">
                            <td className="border-2" colSpan={2}>
                                웨딩홀 계약금 공제
                            </td>
                            <td className="border-2">신랑</td>
                            <td onChange={dataChange} className="border-2">
                                <input value={listData.data["groomDeduction"]} name='groomDeduction' placeholder="입력하세요" />
                            </td>
                            <td className="border-2">신부</td>
                            <td onChange={dataChange} className="border-2">
                                <input value={listData.data["brideDeduction"]} name='brideDeduction' placeholder="입력하세요" />
                            </td>
                        </tr>
                        <tr className="border-2">
                            <td className="border-2">필수체크</td>
                            <td onChange={dataChange} className="border-2" colSpan={5}>
                                <textarea value={listData.data["essentialCheck"]} name='essentialCheck' placeholder="필수 체크 사항 입력" className='w-full' />
                            </td>
                        </tr>
                        <tr className="border-2">
                            <td className="border-2">특이사항</td>
                            <td onChange={dataChange} className="border-2" colSpan={5}>
                                <textarea value={listData.data["specialMemo"]} name='specialMemo' placeholder="특이 사항 입력" className='w-full' />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default FinaltemplEdit