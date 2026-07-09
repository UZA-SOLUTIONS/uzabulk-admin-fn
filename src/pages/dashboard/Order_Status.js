import React, { Component } from "react"
import ReactEcharts from "echarts-for-react"
import Loader from "../../components/Common/Loader"

import { STATUS_COLORS } from "helpers/contants"

const Pie = props => {
  const getOption = () => {
    const order = props?.data || []
    return {
      toolbox: {
        show: false,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",

        data: order.map(item => props.t(item._id)),
        textStyle: {
          color: ["#74788d"],
        },
      },
      color: order.map(item => STATUS_COLORS[item._id]),
      series: [
        {
          name: props.t("total_sales"),
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: order.map(item => ({
            value: item.count,
            name: props.t(item._id),
          })),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    }
  }
  return (
    <React.Fragment>
      {props.loading ? (
        <Loader height={280} />
      ) : (
        <ReactEcharts style={{ height: "300px" }} option={getOption()} />
      )}
    </React.Fragment>
  )
}
export default Pie
