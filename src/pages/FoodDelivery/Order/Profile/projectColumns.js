import React from "react"
import { Link } from "react-router-dom"
import { UncontrolledTooltip } from "reactstrap"

const projectColumns = () => [
  {
    dataField: "name",
    text: "Name",
  },
  {
    dataField: "lineTotal",
    text: "Cost",
  },
  {
    dataField: "quantity",
    text: "Quantity",
  },
  {
    isDummyField: true,
    text: "Action",
    dataField: "action",
    formatter: (_, row) => (
      <>
        <Link to={`#`} className="mr-3 text-primary">
          <i className="mdi mdi-eye font-size-18 mr-3" id="viewtooltip" />
          <UncontrolledTooltip placement="top" target="viewtooltip">
            View Details
          </UncontrolledTooltip>
        </Link>
      </>
    ),
  },
]

export default projectColumns
