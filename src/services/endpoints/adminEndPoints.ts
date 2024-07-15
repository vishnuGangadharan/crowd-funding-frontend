import {  handleBlockStatus,  } from "../../api/admin";

const adminRoutes = {
    listUsers:'/admin/users',
    // blockUser: '/admin/block-user',
    // unblockUser: '/admin/unblock-user'
    handleBlockStatus: '/admin/block-status',
}

export default adminRoutes;