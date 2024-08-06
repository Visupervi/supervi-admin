import * as echarts from 'echarts';
import {useCallback, useEffect, useRef} from "react";
export default () => {
  const barRef = useRef(null);
  // const flag = useRef(true);
  const drawChart = useCallback(() => {
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };
    const chartDom = barRef.current;
    const myChart = echarts.init(chartDom);
  
    option && myChart.setOption(option);
  },[])
  useEffect(()=>{
    if(barRef.current) {
      drawChart()
      barRef.current = null
    }
  
  },[])
  return (
    <div ref={barRef} style={{width:'500px', height:'400px'}}></div>
  )
}