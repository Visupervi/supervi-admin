import BarChart from "@/components/BarChart"
import LineChart from "@/components/LineChart"
import BarByBar from "@/components/BarByBar"
import Clock from "@/components/Clock"
import TradingViewWidget from "@/components/TradingViewWidget"
import "./index.less"
import {dependencies} from "../../../package.json"
export default () => {
  console.log("dependencies", dependencies)
  return (
    <div className="home">
      <div className="chart-items">
        <BarChart />
        <LineChart />
        <BarByBar />
      </div>
      <div className="table-items">
        <div className="dependence">
          {/* <Clock/> */}
          <TradingViewWidget></TradingViewWidget>
        </div>
      </div>
    </div>
  )
}