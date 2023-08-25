import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">낭만웨딩 어서오세요!</h3>
                <p>낭만 웨딩에서 특별한 순간을 시작해보세요!</p>
            </div>
            <SignInForm disableSubmit={false} />
            <div className="pt-5 justify-center flex flex-row items-center">
                <img className="mx-2 w-8 flex" src={'/img/login/google.png'} />
                <img className="mx-2 w-8 flex" src={'/img/login/naver.png'} />
                <img className="mx-2 w-9 flex" src={'/img/login/kakao.png'} />
            </div>
        </>
    )
}

export default SignIn
