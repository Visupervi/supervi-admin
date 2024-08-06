import { request } from "@/utils"
import {APIS} from "@/constant"
export const login = (parmas) => {
  return request({
    url: APIS.userLogin,
    method: "post",
    data: parmas
  })
}

export const getUerProfile = () => {
  return request({
    url: APIS.userProfile,
    method: "get"
  })
}