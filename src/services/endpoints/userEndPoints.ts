const userRoutes={

    signup: '/user/signup',
    userOtpVerify: "user/verify",
    login: "/user/login",
    editUserProfile: "/user/edit-profile",
    fundraisingRegister: "/user/fund-register",
    fileUpload: '/user/media-uploader',
    fundraising:'/user/getBenificiers',
    getUser:"/user/user-details",
    beneficiaryVerification: "/user/beneficiary-verification",
    beneficiaryOtpVerification :"/user/beneficiary-otpverify",
    getPostDetails : "/user/post-details",
    postComment : '/user/add-comment',
    getComment : '/user/get-comments',
    allPost : '/user/all-posts',
    updatePassword : "/user/update-password",
    reportPost : '/user/report-post',
    getSessionId: '/user/get-session-id',
    getDonations: '/user/get-donations',
    updateBeneficiary : '/user/update-beneficiary',
    getUpdatedStatus: '/user/status-updates',
    getWallet: '/user/get-wallet', 
    walletPayment: '/user/wallet-payment',
    makeFundRequest:'/user/requesting-fund'
}

export default userRoutes;