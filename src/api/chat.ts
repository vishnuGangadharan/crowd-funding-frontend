import Api from "@/services/axios";
import chatRoutes from "@/services/endpoints/chatEndpoint";
import errorHandler from "./error";


export const sendMessages = async(data : FormData) => {
    try{
        const response = await Api.post(chatRoutes.sendMessage, data)
        return response
    }catch(error){
        const err:Error = error as Error
        errorHandler(err)
    }
}

export const getMessage = async (senderId: string | null, receiverId: string | null) => {
    try {
        const response = await Api.get(chatRoutes.getMessage, {
            params: {
                senderId,
                receiverId
            }
        })
        return response.data
    } catch (error) {
        const err: Error = error as Error
        errorHandler(err)
    }
}

export const allUsersChatted = async(userID: string) => {
    try{
        const response = await Api.get(chatRoutes.getAllUsers, {params : {userID}})
        return response.data
    }catch(error){
        const err: Error = error as Error
        errorHandler(err)
    }
}


export const lastSeenStatus = async() => {
    try{
        const response = await Api.get(chatRoutes.lastSeen)
        return response.data
    }catch(error){
        const err: Error = error as Error
        errorHandler(err)
    }
}