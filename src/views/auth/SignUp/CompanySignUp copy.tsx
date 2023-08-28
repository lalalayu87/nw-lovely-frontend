// import SignUpForm from './SignUpForm'
import CompanySignUpForm from './CompanySignUpForm'

const CompanySignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">회원가입</h3>
            </div>
            {/* <SignUpForm disableSubmit={false} /> */}
            <CompanySignUpForm disableSubmit={false} />
        </>
    )
}

export default CompanySignUp
