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
    text: t("Start Date"),
    sort: true,
  },
  {
    dataField: "deadline",
    text: t("Deadline"),
    sort: true,
  },
  {
    dataField: "budget",
    text: t("Budget"),
    sort: true,
  },
]

export default projectColumns
