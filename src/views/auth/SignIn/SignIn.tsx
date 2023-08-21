import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">낭만웨딩 어서오세요!</h3>
                <p>낭만웨딩에서 새로운 인생을 시작하세요!</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
