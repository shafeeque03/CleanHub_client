import { userAxiosInstance } from "./axiosInstance"

export const loginVerifcation = async(loginData) =>{
    const data = await userAxiosInstance.post("/login", loginData)
    return data
}
export const userSignup = async(signupData) =>{
    const data = await userAxiosInstance.post("/signup", signupData)
    return data
};

export const requestPickup = async(userId) =>{
    const data = await userAxiosInstance.post('/pickupRequest',{userId})
    return data
}

export const myPickups = async(userId) =>{
    const data = await userAxiosInstance.post('/myPickups',{userId})
    return data
}

export const getMyPoints = async (userId)=>{
    const data = await userAxiosInstance.get(`myPoint/${userId}`);
    return data
}

export const allGiftcards = async(userId)=>{
    const data = await userAxiosInstance.get(`giftcards/${userId}`);
    return data
}

export const unlockCard = async(cardId, userId)=>{
    const data = await userAxiosInstance.post('/unlockCard',{cardId, userId})
    return data
}