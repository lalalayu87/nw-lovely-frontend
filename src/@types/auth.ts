export type SignInCredential = {
    userId: string
    userPassword: string
}

// export type SignInResponse = {
//     token: string
//     user: {
//         userName: string
//         authority: string
//         avatar: string
//         email: string
//     }
// }

export type SignInResponse = {
    accessToken: string
    userId: string
    userName: string
    userRole: {
        roleName: string
        roleSeq: string
    }
    authority: string
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
