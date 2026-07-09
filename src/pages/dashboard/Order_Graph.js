import React, { Fragment } from "react"
import ReactApexChart from "react-apexcharts"
import moment from "moment"
import Loader from "../../components/Common/Loader"

const Spinearea = props => {
  const revenues = props.data?.map(o => o.revenueTotal)
  const labels = props.data?.map(o => o.date)
  const series = [
    {
      name: props.t("revenues"),
      data: revenues,
    },
  ]

  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },

    colors: [props.primaryColor, props.primaryColor],
    xaxis: {
      type: "datetime",
      categories: labels,
      labels: {
        rotate: -45,
        rotateAlways: false,
        show: true,
        hideOverlappingLabels: false,
      }
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
    responsive: [
      {
        breakpoint: 471,
        options: {
          yaxis: {
            labels: {
              style: {
                fontSize: '8px',
              },

            },

          },
          xaxis: {
            labels: {
              style: {
                fontSize: '8px',
              }
            },
            rotate: -45,
          },


        }
      },
    ],
    chart: {
      // width: '100%'
      // toolbar: {
      //   show: true,
      // },
    },
  }

  return (
    <Fragment>
      {props.loading ? (
        <Loader height={250} />
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height="265"
        />
      )}
    </Fragment>
  )
}

export default Spinearea
