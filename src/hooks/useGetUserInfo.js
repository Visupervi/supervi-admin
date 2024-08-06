import { useEffect, useRef, useState } from "react";
import { getUserInfo } from "@/store/modules/user";
import { useAppDispatch } from "@/store";
// const url = "http://geek.itheima.net/v1_0/channels";
export default () => {
  // const [list, setList] = useState([]);
  const flag = useRef(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (flag.current) {
      // getList();
      dispatch(getUserInfo());
      flag.current = false;
      return;
    }

  }, [dispatch]);
};