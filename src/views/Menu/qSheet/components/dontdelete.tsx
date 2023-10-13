import { useEffect } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import Spinner from '@/components/ui/Spinner'
import { getList, useAppDispatch, useAppSelector } from '../store'

const QSheetCardList = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector((state) => state.qsheetDataList.loading)
    const t = useAppSelector((state) => state.qsheetDataList)
    console.log(t)
    const tt = useAppSelector((state) => state.qsheetDataList.data)
    console.log(tt)

    const qsheetCardList = useAppSelector(
        (state) => state.qsheetDataList.data.qSheetDataList
    )

    useEffect(() => {
        dispatch(getList())
    }, [dispatch])

    return (
        <>
            <div
                className={classNames(
                    'mt-6 h-full flex flex-col',
                    loading && 'justify-center'
                )}
            >
                {loading && (
                    <div className="flex justify-center">
                        <Spinner size={40} />
                    </div>
                )}

                {qsheetCardList?.length > 0 && !loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {qsheetCardList.map((qsheet, index) => (
                            <GridItem
                                key={index}
                                data={qsheet}
                                qsheetSeq={qsheet.qsheetSeq}
                            />
                        ))}
                    </div>
                )}
                {qsheetCardList?.length === 0 && !loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                        <p>큐시트를 작성해 주세요.</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default QSheetCardList
