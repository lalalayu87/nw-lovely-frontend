import React, { useState } from 'react'
import { SERVER_URL } from '../../../../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Notification, toast } from '@/components/ui'

interface SignUpFormProps {
    className: string
}

interface FormData {
    userId: string
    userName: string
    userEmail: string
    userPassword: string
    confirmPassword: string
    userType: string
}
function SignUpForm({ className }: SignUpFormProps) {
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        confirmPassword: '',
        userType: 'user', // 기본값으로 'user' 설정
    })

    const {
        userId,
        userName,
        userEmail,
        userPassword,
        confirmPassword,
        userType,
    } = formData

    const [errors, setErrors] = useState({})

    const [errorMessages, setErrorMessages] = useState({
        userId: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        confirmPassword: '',
        // 다른 필드의 오류 메시지도 추가
    })

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { value, name } = e.target

        if (name === 'userId') {
            if (value === '') {
                setErrorMessages({
                    ...errorMessages,
                    userId: '아이디를 입력하세요.',
                })
            } else if (value.length < 4) {
                setErrorMessages({
                    ...errorMessages,
                    userId: '아이디를 4자 이상 입력해주세요.',
                })
            } else {
                const alphanumericRegex = /^[a-zA-Z0-9]+/
                if (!alphanumericRegex.test(value)) {
                    setErrorMessages({
                        ...errorMessages,
                        userId: '아이디를 숫자 또는 영어로 입력해주세요.',
                    })
                } else {
                    setErrorMessages({
                        ...errorMessages,
                        userId: '', // 오류가 없을 때 빈 문자열로 설정
                    })
                }
            }
        }

        if (name === 'userName') {
            if (value === '') {
                setErrorMessages({
                    ...errorMessages,
                    userName: '이름을 입력하세요.',
                })
            } else {
                const regex = /^[가-힣]+$/
                if (!regex.test(value)) {
                    setErrorMessages({
                        ...errorMessages,
                        userName: '이름을 한글로 입력하세요.',
                    })
                } else {
                    setErrorMessages({
                        ...errorMessages,
                        userName: '', // 오류가 없을 때 빈 문자열로 설정
                    })
                }
            }
        }

        if (name === 'userEmail') {
            const emailReg =
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
            if (value === '') {
                setErrorMessages({
                    ...errorMessages,
                    userEmail: '이메일을 입력하세요.',
                })
            } else {
                const emailReg =
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
                console.log('emailReg : ', emailReg)
                if (!emailReg.test(value)) {
                    console.log('errorMessages', errorMessages)
                    setErrorMessages({
                        ...errorMessages,
                        userEmail: '이메일이 형식에 맞지 않습니다.',
                    })
                } else {
                    setErrorMessages({
                        ...errorMessages,
                        userEmail: '', // 오류가 없을 때 빈 문자열로 설정
                    })
                }
            }
        }

        if (name === 'userPassword') {
            if (value === '') {
                setErrorMessages({
                    ...errorMessages,
                    userPassword: '비밀번호를 입력하세요.',
                })
            } else {
                if (
                    confirmPassword === '' ||
                    userPassword !== confirmPassword
                ) {
                    setErrorMessages({
                        ...errorMessages,
                        userPassword: '비밀번호를 확인해주세요.',
                    })
                } else {
                    setErrorMessages({
                        ...errorMessages,
                        userPassword: '', // 오류가 없을 때 빈 문자열로 설정
                    })
                }
            }
        }

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                `${SERVER_URL}/api/auth/register`,
                {
                    userId,
                    userName,
                    userEmail,
                    userPassword,
                }
            )
            console.log(response)
            if (response.status === 200) {
                toast.push(
                    <Notification title={'성공'} type="success">
                        회원가입이 완료되었습니다.
                    </Notification>
                )
                navigate('/sign-in')
            }
        } catch (error) {
            console.error('회원 가입 실패:', error)
            toast.push(
                <Notification title={'실패'} type="warning">
                    회원가입 실패
                </Notification>
            )
        }
    }

    // validateForm 함수와 handleSubmit 함수 수정 필요

    return (
        <div className="mb-8">
            <div>
                <label htmlFor="userId">아이디</label>
                <input
                    type="text"
                    name="userId"
                    value={userId}
                    style={{
                        width: '500px',
                        border: '1px solid #ccc', // 경계선 스타일 및 색상 설정
                        borderRadius: '4px', // 경계선 둥근 모서리 설정
                        padding: '8px', // 내부 여백 설정
                    }}
                    onChange={onChange}
                />
                <div style={{ color: 'red' }}>{errorMessages.userId}</div>
            </div>

            <div style={{ margin: '30px 0' }}>
                <label htmlFor="userName">이름</label>
                <input
                    type="text"
                    name="userName"
                    value={userName}
                    style={{
                        width: '500px',
                        border: '1px solid #ccc', // 경계선 스타일 및 색상 설정
                        borderRadius: '4px', // 경계선 둥근 모서리 설정
                        padding: '8px', // 내부 여백 설정
                    }}
                    onChange={onChange}
                />
                <div style={{ color: 'red' }}>{errorMessages.userName}</div>
            </div>

            <div style={{ margin: '20px 0' }}>
                <label htmlFor="userEmail">이메일</label>
                <input
                    type="email"
                    name="userEmail"
                    value={userEmail}
                    style={{
                        width: '500px',
                        border: '1px solid #ccc', // 경계선 스타일 및 색상 설정
                        borderRadius: '4px', // 경계선 둥근 모서리 설정
                        padding: '8px', // 내부 여백 설정
                    }}
                    onChange={onChange}
                />
                <div style={{ color: 'red' }}>{errorMessages.userEmail}</div>
            </div>

            <div style={{ margin: '20px 0' }}>
                <label htmlFor="userPassword">비밀번호</label>
                <input
                    type="password"
                    name="userPassword"
                    value={userPassword}
                    style={{
                        width: '500px',
                        border: '1px solid #ccc', // 경계선 스타일 및 색상 설정
                        borderRadius: '4px', // 경계선 둥근 모서리 설정
                        padding: '8px', // 내부 여백 설정
                    }}
                    onChange={onChange}
                />
                <div style={{ color: 'red' }}>{errorMessages.userPassword}</div>
            </div>

            <div style={{ margin: '20px 0' }}>
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    style={{
                        width: '500px',
                        border: '1px solid #ccc', // 경계선 스타일 및 색상 설정
                        borderRadius: '4px', // 경계선 둥근 모서리 설정
                        padding: '8px', // 내부 여백 설정
                    }}
                    onChange={onChange}
                />
                <div style={{ color: 'red' }}>
                    {errorMessages.confirmPassword}
                </div>
            </div>

            <div style={{ margin: '20px 0' }}>
                <label htmlFor="userType">회원 유형</label>
                <select
                    name="userType"
                    value={userType}
                    style={{
                        width: '500px', // select 엘리먼트의 폭을 500px로 설정
                        border: '1px solid #ccc', // 경계선 스타일 및 색상 설정
                        borderRadius: '4px', // 경계선 둥근 모서리 설정
                        padding: '8px', // 내부 여백 설정
                    }}
                    onChange={onChange}
                >
                    <option value="user">일반 사용자</option>
                    <option value="org">기업 사용자</option>
                </select>
            </div>
            <div style={{ margin: '20px 0' }}></div>
            <button
                type="submit"
                style={{
                    width: '500px',
                    display: 'block',
                    // margin: '0 auto',
                    margin: '20px 0',
                    color: 'white',
                    backgroundColor: '#E11D48',
                    height: '50px',
                    borderRadius: '4px',
                    fontWeight: 'bold', // 글자를 진하게 설정
                    fontSize: '16px', // 글자 크기를 20px로 설정
                }}
                onClick={handleSubmit}
            >
                가입하기
            </button>
        </div>
    )
}

export default SignUpForm
