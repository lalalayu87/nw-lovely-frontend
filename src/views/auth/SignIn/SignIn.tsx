import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Welcome!</h3>
                <p>낭만 웨딩에서 특별한 순간을 시작해보세요!</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
