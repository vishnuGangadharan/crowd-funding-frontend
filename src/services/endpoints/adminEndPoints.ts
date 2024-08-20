import {  handleBlockStatus,  } from "../../api/admin";

const adminRoutes = {
    listUsers:'/admin/users',
    handleBlockStatus: '/admin/block-status',
    campaignRequest : "/admin/campaign-request",
    adminPostApproval: "/admin/post-approval",
    allReports : '/admin/all-reports',
    getPostDetails:'/admin/post-details',
    blockPost:'/admin/block-post',
    getFundRequest:'/admin/fund-request',
}

export default adminRoutes;