const projectColumns = t => [
  {
    dataField: "id",
    text: "#",
    sort: true,
  },
  {
    dataField: "name",
    text: t("name"),
    sort: true,
  },
  {
    dataField: "startDate",
    text: t("start_date"),
    sort: true,
  },
  {
    dataField: "deadline",
    text: t("deadline"),
    sort: true,
  },
  {
    dataField: "budget",
    text: t("budget"),
    sort: true,
  },
]

export default projectColumns
