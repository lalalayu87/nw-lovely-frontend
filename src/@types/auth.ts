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
    userId: string
    userName: string
    userRole: {
        roleSeq: string
        roleName: string
    }
    accessToken: string
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
