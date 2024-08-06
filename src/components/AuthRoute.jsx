// 封装高阶组件
// 根据有无token完成路由组件的跳转

import { getToken } from "@/utils"

import { Navigate } from "react-router-dom"

export function AuthRoute({ children }) {
  const token = getToken()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to={"/login"} replace />
  }
}
