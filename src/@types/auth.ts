export type SignInCredential = {
    userId: string
    userPassword: string
}

export type SignInResponse = {
    // token: string
    // user: {
    //     userId: string
    //     authority: string
    //     avatar: string
    //     email: string
    // }
    userSeq: '',
    userId: '',
    userName: '',
    userRole: '',
    info: {
        roleSeq: '',
        userSeq: '',
    },
    accessToken: ''
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userId: string
    userName: string
    userEmail: string
    type: string
    userPassword: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
