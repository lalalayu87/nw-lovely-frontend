/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import { HiOutlineUpload } from 'react-icons/hi'

const inputStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px',
    margin: '5px',
}

interface QSheetExampleData {
    process: string
    actor: string
    content: string
    filePath: string
    note: string
    orderIndex: number
}

const initialData: QSheetExampleData = {
    process: '',
    actor: '',
    content: '',
    filePath: '',
    note: '',
    orderIndex: 1,
}

const NewQSheetContent: React.FC = () => {
    const [dataList, setDataList] = useState<QSheetExampleData[]>([initialData])
    const [newData, setNewData] = useState<QSheetExampleData>({
        ...initialData,
        orderIndex: 2,
    })

    const handleAddData = () => {
        setNewData({
            ...newData,
            orderIndex: newData.orderIndex + 1,
        })
        setDataList([...dataList, newData])
    }

    const handleInputChange = (
        field: keyof QSheetExampleData,
        value: string,
        index: number
    ) => {
        console.log(dataList)
        const updatedDataList = [...dataList]
        updatedDataList[index][field] = value
        setDataList(updatedDataList)
    }

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedDataList = [...dataList]
        const file = e.target.files[0]
        if (file) {
            updatedDataList[index].filePath = file.name
        }
        setDataList(updatedDataList)
    }

    return (
        <div>
            <button onClick={handleAddData}>추가</button>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>절차</th>
                        <th>행위자</th>
                        <th>내용</th>
                        <th>파일</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((data, index) => (
                        <tr key={index}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            {/* 절차 */}
                            <td>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    value={data.process}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'process',
                                            e.target.value,
                                            index
                                        )
                                    }
                                />
                            </td>
                            {/* 행위자 */}
                            <td>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    value={data.actor}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'actor',
                                            e.target.value,
                                            index
                                        )
                                    }
                                />
                            </td>
                            {/* 내용 */}
                            <td className="p-2">
                                <input
                                    type="text"
                                    style={inputStyle}
                                    className="w-full"
                                    value={data.content}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'content',
                                            e.target.value,
                                            index
                                        )
                                    }
                                />
                            </td>
                            <td>
                                <div className="flex items-center">
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        id={`fileInput-${index}`}
                                        accept="application/pdf"
                                        onChange={(e) =>
                                            handleFileChange(e, index)
                                        }
                                    />
                                    <label
                                        htmlFor={`fileInput-${index}`}
                                        className="cursor-pointer flex items-center"
                                    >
                                        <HiOutlineUpload className="text-2xl mr-1" />
                                        파일 올리기
                                    </label>
                                </div>
                            </td>
                            {/* 비고 */}
                            <td>
                                <input
                                    type="text"
                                    style={inputStyle}
                                    value={data.note}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'note',
                                            e.target.value,
                                            index
                                        )
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default NewQSheetContent
