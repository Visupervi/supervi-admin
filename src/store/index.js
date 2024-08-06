
/**
 * 组合子模块
 */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import { useDispatch } from "react-redux";
const rootReducer = combineReducers({
  user: userReducer
});
const store = configureStore({
  reducer: rootReducer
});

// export type AppDispatch = typeof store.dispatch;
// 为了解决dispatch去触发异步请求
export const useAppDispatch = () => useDispatch();
export default store;