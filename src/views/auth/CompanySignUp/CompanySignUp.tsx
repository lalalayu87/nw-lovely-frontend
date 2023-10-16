import CompanySignUpForm from './CompanySignUpForm'

const CompanySignUp = () => {
    console.log('확인')
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">기업 회원가입</h3>
            </div>
            <CompanySignUpForm disableSubmit={false} />
        </>
    )
}

export default CompanySignUp
