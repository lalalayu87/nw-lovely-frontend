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

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { value, name } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    // const validCheck = () => {
    //     const emailReg =
    //         /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

    //     if (userId === '') {
    //         return false
    //     }
    //     if (userName === '') {
    //         return false
    //     }
    //     if (
    //         userPassword === '' ||
    //         confirmPassword === '' ||
    //         userPassword !== confirmPassword
    //     ) {
    //         return false
    //     }
    //     if (userEmail === '' || !emailReg.test(userEmail)) {
    //         return false
    //     }

    //     return true
    // }
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const emailReg =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

        if (userId === '') {
            toast.push(
                <Notification title={''} type="warning">
                    아이디를 입력하세요.
                </Notification>
            )
            return false
        }
        if (userName === '') {
            toast.push(
                <Notification title={''} type="warning">
                    이름을 입력하세요.
                </Notification>
            )
            return false
        }
        if (
            userPassword === '' ||
            confirmPassword === '' ||
            userPassword !== confirmPassword
        ) {
            toast.push(
                <Notification title={''} type="warning">
                    비밀번호가 일치하지 않습니다.
                </Notification>
            )
            return false
        }
        if (userEmail === '' || !emailReg.test(userEmail)) {
            toast.push(
                <Notification title={''} type="warning">
                    이메일이 형식에 일치하지 않습니다.
                </Notification>
            )
            return false
        }

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

            console.log(response.data)
            navigate('/sign-in')
        } catch (error) {
            console.error('회원 가입 실패:', error)
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
                />
            </div>

            <div style={{ margin: '20px 0' }}>
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
                    backgroundColor: '#FFA2A2',
                    height: '60px',
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
