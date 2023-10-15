import { useEffect, useState } from 'react'
import classNames from 'classnames'
import UserGridItem from './UserGridItem'
import Spinner from '@/components/ui/Spinner'
import { getList, useAppDispatch, useAppSelector } from '../store'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'
import axios from 'axios'

const UserQSheetCardList = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)
    const [qsheetCardList, setQSheetCardList] = useState([])

    // const loading = useAppSelector((state) => state.qsheetDataList.data.loading)

    // const qsheetCardList = useAppSelector(
    //     (state) => state.qsheetDataList.data.qSheetDataList
    // )

    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)

    useEffect(() => {
        const accessToken = (persistData as any).auth.session.accessToken
        console.log('되나')

        const sendFormDataToAPI = async () => {
            try {
                const response = await axios.get(
                    `http://152.69.228.245:10001/api/v1/qsheet`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                )
                console.log(response)

                // 받은 데이터로 상태를 업데이트합니다
                setQSheetCardList(response.data.content)
                setLoading(false)

                // API 응답을 필요에 따라 처리합니다.
                // console.log(response.data)
                // alert(`API 응답: ${JSON.stringify(response.data)}`)
                console.log(response.data.content)
            } catch (error) {
                // 에러를 처리합니다.
                console.error(error)
            }
        }
        // API에 양식 데이터를 보내는 함수를 호출합니다.
        sendFormDataToAPI()
    }, [])

    useEffect(() => {
        dispatch(getList())
        console.log('되나')
    }, [dispatch])

    return (
        <>
            <div
                className={classNames(
                    'mt-6 h-full flex flex-col',
                    loading && 'justify-center'
                )}
            >
                {loading ? (
                    <div className="flex justify-center">
                        <Spinner size={40} />
                    </div>
                ) : (
                    qsheetCardList?.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {qsheetCardList.map((qsheet, index) => (
                                <UserGridItem
                                    key={index}
                                    data={qsheet}
                                    qsheetSeq={qsheet.qsheetSeq}
                                />
                            ))}
                        </div>
                    )
                )}
                {!loading && qsheetCardList?.length === 0 && (
                    <div>
                        <p>큐시트를 작성해 주세요.</p>
                    </div>
                )}
            </div>
        </>
    )

    // return (
    //     <>
    //         <div
    //             className={classNames(
    //                 'mt-6 h-full flex flex-col',
    //                 loading && 'justify-center'
    //             )}
    //         >
    //             {loading && (
    //                 <div className="flex justify-center">
    //                     <Spinner size={40} />
    //                 </div>
    //             )}

    //             {qsheetCardList?.length > 0 && !loading && (
    //                 <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    //                     {qsheetCardList.map((qsheet, index) => (
    //                         <UserGridItem
    //                             key={index}
    //                             data={qsheet}
    //                             qsheetSeq={qsheet.qsheetSeq}
    //                         />
    //                     ))}
    //                 </div>
    //             )}
    //             {qsheetCardList?.length === 0 && !loading && (
    //                 <div>
    //                     <p>큐시트를 작성해 주세요.</p>
    //                 </div>
    //             )}
    //         </div>
    //     </>
    // )
}

export default UserQSheetCardList
