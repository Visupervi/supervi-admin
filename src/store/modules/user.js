import { clearToken, getToken, request, setToken } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import {login as userLogin, getUerProfile} from "@/apis/user";
export const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {}
  },
  reducers: {
    // 同步修改的方法
    setUserToken(state, { payload }) {
      state.token = payload;
      setToken(payload)

    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload
    },

    clearUserInfo(state) {
      state.token = ""
      state.userInfo = {}
      clearToken()
    }
  }
});

// 异步函数
const login = params => async (dispatch) => {
  const { data } = await userLogin(params);
  dispatch(setUserToken(data.data.token))
}

// 异步函数
const getUserInfo = () => async (dispatch) => {
  const { data } = await getUerProfile();
  // console.log(data);
  dispatch(setUserInfo(data.data))
}
// 解构actionCreater
const { setUserToken, setUserInfo, clearUserInfo } = userStore.actions;

export { setUserToken, login, setUserInfo, getUserInfo, clearUserInfo };
// 导出reducer
export default userStore.reducer;

// redux的值是存在浏览器的内存中，只要刷新就会恢复到初始值