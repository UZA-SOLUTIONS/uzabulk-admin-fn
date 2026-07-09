import React, { Fragment } from "react"
import moment from "moment"
import ReactApexChart from "react-apexcharts"
import Loader from "../../../../components/Common/Loader"

const LineColumnArea = props => {
  const { data, type } = props
  const count = data?.map(o => Number(o.revenueTotal).toFixed(2))

  let DATE_TYPE = props.t("day_wise")
  let COLUMN_WIDTH = "55%"
  switch (type.label) {
    case "Week":
      DATE_TYPE = props.t("week_wise")
      COLUMN_WIDTH = "10%"
      break
    case "Month":
      DATE_TYPE = props.t("month_wise")
      COLUMN_WIDTH = "10%"
      break
    default:
      DATE_TYPE = props.t("day_wise")
      COLUMN_WIDTH = "55%"
      break
  }
  const dates = data?.map(o => moment(o.date).format("MMM DD"))


  const series = [
    {
      name: props.t("revenue"),
      type: "column",
      data: count,
    },
  ]
  var options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: COLUMN_WIDTH,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: [props.primaryColor, "#556ee6", props.primaryColor],
    xaxis: {
      categories: dates,
      labels: {
        minWidth: 0,
        maxWidth: 160
      }
    },
    yaxis: {
      title: {
        text: `(${DATE_TYPE}) ${props.t("revenue")} ${props.t("total")}`,
      },
      labels: {
        rotate: -45
      },

    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${props.t("total")}: ${val}`
        },
      },
    },
    responsive: [
      {
        breakpoint: 721,
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: '10px',
              }
            }
          },
          yaxis: {
            labels: {
              rotate: -45,
              style: {
                fontSize: '10px',
              }
            }
          }


        }
      },
      {
        breakpoint: 610,
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: '8px',
              }
            }
          },
          yaxis: {
            labels: {
              rotate: -45,
              style: {
                fontSize: '8px',
              }
            }
          }


        }
      },
      {
        breakpoint: 497,
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: '6px',
              }
            }
          },
          yaxis: {
            labels: {
              rotate: -45,
              style: {
                fontSize: '6px',
              }
            }
          }


        }
      },
      {
        breakpoint: 400,
        options: {
          xaxis: {
            labels: {
              style: {
                fontSize: '4px',
              }
            }
          },
          yaxis: {
            labels: {
              rotate: -45,
              style: {
                fontSize: '4px',
              }
            }
          }


        }
      },
    ],

    chart: {
      toolbar: {
        show: false,
      },
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
          type="bar"
          height="250"
        />
      )}
    </Fragment>
  )
}

export default LineColumnArea
