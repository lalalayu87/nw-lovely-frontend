import UserSignUpForm from './UserSignUpForm'

const UserSignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">회원가입</h3>
            </div>
            {/* <SignUpForm disableSubmit={false} /> */}
            <UserSignUpForm disableSubmit={false} />
        </>
    )
}

export default UserSignUp
