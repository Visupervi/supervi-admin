import { useEffect, useRef, useState } from "react";
import { getChannels } from "@/apis/articles";
// const url = "http://geek.itheima.net/v1_0/channels";
export default () => {
  const [channels, setChannels] = useState([]);
  const flag = useRef(true);
  // const dispatch = useAppDispatch();

  const fetchData = async () => {
    // You can await here
    const { data: { data: res } } = await getChannels();
    setChannels(res.channels)
    // ...
  }
  // fetchData();
  useEffect(() => {
    if (flag.current) {
      // getList();
      fetchData()
      // dispatch(getUserInfo());
      flag.current = false;
      return;
    }

  }, []);

  return {
    setChannels,
    channels
  }
};