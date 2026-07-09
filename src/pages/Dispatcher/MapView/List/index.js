import React, { useEffect, useState, useRef } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { withTranslation } from "react-i18next"
import { Card, Col, Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n

import { getDispatchRequests } from "store/actions"

// Components
import NotFound from "pages/Utility/pages-404-content"
import MapData from "./MapData"
import MapView from "./MapView"

const FdDispute = ({
  onGetDispatchRequests,
  dispatchList,
  dispatchListCount,
  ...props
}) => {
  if (
    !props.settings?.hideThings?.find(
      element => element.type === "isDispatcher"
    )?.value
  ) {
    return <NotFound />
  }

  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 20,
    search: "",
    fields: [
      {
        fieldName: "status",
        fieldValue: "newtrip",
      },
    ],
  })
  const [list, setDisputeList] = useState([])
  const [totalCount, setTotalCount] = useState()
  const [customActiveTable, setCustomActiveTable] = useState("1")

  const pageOptions = {
    sizePerPage: 20,
    totalSize: dispatchListCount,
    custom: true,
    onPageChange: page => setFilter(prevState => ({ ...prevState, page })),
  }

  useEffect(() => {
    if (props.settings?._id) {
      props.socket?.emit(
        "storesocket",
        { storeId: props.settings?._id },
        () => { }
      )
    }
  }, [props.settings?._id, props.socket])

  useEffect(() => {
    props.socket?.on("storeListen", () => {
      onGetDispatchRequests(filter)
    })
  }, [])

  useEffect(() => {
    setDisputeList(dispatchList)
    setTotalCount(dispatchListCount)
  }, [dispatchList])

  function toggleTable(tab, table) {
    if (customActiveTable !== tab) {
      setCustomActiveTable(tab)
    }
    const fieldName = !!table ? "status" : ""

    setFilter(prevState => ({
      ...prevState,
      fields: [
        {
          fieldName,
          fieldValue: table == "new" ? "newtrip" : "currenttrip",
        },
      ],
    }))
  }

  useEffect(() => {
    onGetDispatchRequests(filter)
  }, [filter])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={props.t("Dispatch")}
            breadcrumbItems={[
              {
                title: props.t("dispatch"),
              },
            ]}
          />

          <Row>
            <Col>
              <Card className=" container-fluid position-relative cardHeight">
                <MapData
                  toggleTable={toggleTable}
                  totalCount={totalCount}
                  {...props}
                  customActiveTable={customActiveTable}
                />
                <MapView className={"mapStyling"} userLocation={props?.userLocation} dispatchList={list} googleMapKey={props.googleMapKey} />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = ({ Login, Settings, Dispatch }) => ({
  googleMapKey: process.env.NODE_ENV === "development"
  ? "AIzaSyAxlXaOet7nyJcEJQw_SXFuK2EnRMw0zbg"
  : Settings?.settings?.googleMapKey?.web,
  socket: Login.socket,
  settings: Settings.settings,
  dispatchList: Dispatch.list,
  dispatchListCount: Dispatch.listcount,
  userLocation: Settings?.settings?.userLocation
})

const mapDispatchToProps = dispatch => ({
  onGetDispatchRequests: data => dispatch(getDispatchRequests(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FdDispute))
)
