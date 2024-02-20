import { adminAxiosInstance } from "./axiosInstance";

export const adminLoginVerify = async (loginData) => {
  const data = await adminAxiosInstance.post("/login", loginData);
  return data;
};

export const getPickups = async ()=>{
  const data = await adminAxiosInstance.get("/getPickups")
  return data
}

export const editPickupWeight = async(pid, weight)=>{
  const data = await adminAxiosInstance.post("/updatePickup",{pid,weight})
  return data
}

export const addGiftCard = async(value)=>{
  const data = await adminAxiosInstance.post('/addGiftCard',{value})
  return data
}

export const totalGiftcards = async()=>{
  const data = await adminAxiosInstance.post('/allGiftcards')
  return data
}

export const usersList = async () => {
  const data = await adminAxiosInstance.get("/users");
  return data;
};

export const userBlock = async (userId, status) => {
  const data = await adminAxiosInstance.patch("/blockUser", { userId, status });
  return data;
};