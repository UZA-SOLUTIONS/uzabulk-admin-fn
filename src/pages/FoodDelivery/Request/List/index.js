import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link, useParams } from "react-router-dom"
import queryString from "query-string"
import classnames from "classnames"
import CardInvoice from "./card-invoice"
import CustomPagination from "components/Common/CustomPagination"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from "reactstrap"

import Pages404 from "pages/Utility/pages-404"

import { ROLES } from "helpers/contants"

//i18n
import { withTranslation } from "react-i18next"

import { getFdRequests } from "store/actions"
import DetailsModal from "./DetailsModal"

const completedLimit = 20

const OrdersList = ({
  id,
  list,
  toggleDetailsModal,
  currency,
  active,
  t,
  ...props
}) => {
  console.log(active, "active")
  if (list?.length <= 0) {
    return (
      <Card>
        <CardBody>
          {["CARRENTAL", "AIRBNB"].includes(active)
            ? t("no_orders")
            : t("no_orders")}
        </CardBody>
      </Card>
    )
  }

  return (
    <Row className="row-cols-1 row-cols-sm-6 g-4">
      {list?.map((item, key) => (
        <CardInvoice
          key={`${id}_${key}`}
          {...props}
          data={item}
          toggleDetailsModal={toggleDetailsModal}
          currency={currency}
          activestore={active}
          t={t}
        />
      ))}
    </Row>
  )
}

const FdRequests = ({
  accessLevel,
  role,
  vendorId,
  history,
  fdRequests,
  fdConfirmedRequests,
  totalFdRequests,
  onGetFdRequests,
  fdCompletedRequests,
  fdRejectedRequests,
  fdCancelledRequests,
  loading,
  activeStoreId,
  activeStoreType,
  socket,
  ...props
}) => {
  const { vendorId: vendorIdParam } = useParams()
  const { order } = queryString.parse(props?.location?.search)
  console.log(order, "role")
  const didMountRef = useRef(null)
  console.log("first load")

  const [activeTab, setActiveTab] = useState("pending")
  const [detailsModal, setdetailsModal] = useState({ isOpen: false, data: {} })
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })
  const [filter, setFilter] = useState({
    storeTypeId: "",
    orderBy: "date_created_utc", //key name
    order: -1, // asc: 1, desc: -1
    page: 1,
    limit: 50,
    fields: [
      {
        fieldName: "orderStatus",
        fieldValue: "pending",
      },
    ],
  })
  const [fdRequestsList, setFdRequestsList] = useState([])
  const [fdConfirmedRequestsList, setfdConfirmedRequestsList] = useState([])
  const [fdCompletedRequestsList, setfdCompletedRequestsList] = useState([])
  const [fdRejectedRequestsList, setfdRejectedRequestsList] = useState([])
  const [fdCancelledRequestsList, setfdCancelledRequestsList] = useState([])
  const pageOptions = {
    sizePerPage: 20,
    totalSize: totalFdRequests,
    custom: true,
    onPageChange: page => setFilter(prevState => ({ ...prevState, page })),
  }

  useEffect(() => {
    if (
      [ROLES.admin, ROLES.staff].includes(role) &&
      activeStoreType?.storeVendorType !== "SINGLE"
    )
      return

    if (ROLES.vendor === role || ROLES.subVendor === role) return

    let restaurantId = vendorId

    switch (role) {
      case ROLES.admin:
      case ROLES.staff:
        restaurantId =
          activeStoreType?.storeVendorType === "SINGLE"
            ? activeStoreType?.singleVendorId
            : vendorIdParam
        break

      default:
        break
    }
    return

    console.log("connect scket")
    socket?.on("connect", order => {
      console.log("connected")
      console.log("connect for ", order)
      socket?.emit("restaurantsocket", { restaurantId }, () => {})
    })
  }, [socket])

  useEffect(() => {
    socket?.on("order_vendor_socket", data => {
      if (!order) return
      onGetFdRequests({ ...filter, storeTypeId: activeStoreId }, true)

      // console.log("data", data)
      if (ROLES.vendor !== role) {
        if (data?.notificationSound) {
          let chatAudio = document.querySelector(`#${data?.notificationSound}`)
          if (chatAudio) {
            chatAudio.play()
          }
        }
      }

      let limit = 50
      let fields = [
        {
          fieldName: "orderStatus",
          fieldValue: order,
        },
      ]

      if (order === "confirmed") {
        fields = [
          {
            fieldName: "orderStatus",
            fieldValue: { $in: [order, "inroute"] },
          },
          {
            fieldName: "isScheduleProcess",
            fieldValue: true,
          },
        ]
      }

      if (order === "pending") {
        fields = [
          {
            fieldName: "orderStatus",
            fieldValue: { $in: [order, "confirmed"] },
          },
          {
            fieldName: "isScheduleProcess",
            fieldValue: false,
          },
        ]
      }

      switch (order) {
        case "pending":
        case "confirmed":
        case "completed":
        case "cancelled":
        case "rejected":
          onGetFdRequests(
            { ...filter, storeTypeId: activeStoreId, fields, limit },
            order,
            true
          )
          break

        default:
          return history?.replace(
            `${props?.location?.pathname}?order=${activeTab}`
          )
      }
    })
  }, [order, socket])

  useEffect(() => {
    if (
      [ROLES.admin, ROLES.staff].includes(role) &&
      activeStoreType?.storeVendorType !== "SINGLE"
    )
      return
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canBlock: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
      canDelete: false,
      canBlock: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "CREATE":
          data.canAdd = item.value
          break

        case "UPDATE":
          data.canEdit = item.value
          break

        case "DELETE":
          data.canDelete = item.value
          break

        case "BLOCK":
          data.canBlock = item.value
          break
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    if (
      [ROLES.admin, ROLES.staff].includes(role) &&
      activeStoreType?.storeVendorType !== "SINGLE"
    )
      return
    if (!order) {
      history?.replace(`${props?.location?.pathname}?order=${activeTab}`)
    }

    if (didMountRef.current) {
      if (!filter?.storeTypeId) return
      let limit = 50
      let fields = [
        {
          fieldName: "orderStatus",
          fieldValue: order || "pending",
        },
      ]

      if (order === "pending") {
        fields = [
          {
            fieldName: "orderStatus",
            fieldValue: { $in: [order, "confirmed"] },
          },
          {
            fieldName: "isScheduleProcess",
            fieldValue: false,
          },
        ]
      }

      if (order === "confirmed") {
        fields = [
          {
            fieldName: "orderStatus",
            fieldValue: { $in: [order, "inroute"] },
          },
          {
            fieldName: "isScheduleProcess",
            fieldValue: true,
          },
        ]
      }

      switch (order) {
        case "pending":
        case "confirmed":
        case "completed":
        case "cancelled":
        case "rejected":
          toggleTab(order)
          onGetFdRequests(
            { ...filter, storeTypeId: activeStoreId, fields, limit },
            order,
            false
          )
          break

        default:
          return history?.replace(
            `${props?.location?.pathname}?order=${activeTab}`
          )
      }
    } else didMountRef.current = true
  }, [JSON.stringify(filter), order])

  useEffect(() => {
    if (
      [ROLES.admin, ROLES.staff].includes(role) &&
      activeStoreType?.storeVendorType !== "SINGLE"
    )
      return

    if ([ROLES.admin, ROLES.staff].includes(role)) {
      setFilter(prevState => ({
        ...prevState,
        vendor:
          activeStoreType?.storeVendorType === "SINGLE"
            ? activeStoreType?.singleVendorId
            : vendorIdParam,
        storeTypeId: activeStoreId,
      }))
    } else if (role === ROLES.vendor || role === ROLES.subVendor) {
      setFilter(prevState => ({
        ...prevState,
        vendor: vendorId,
        storeTypeId: activeStoreId,
      }))
    }
  }, [role, vendorId, vendorIdParam, activeStoreId])

  useEffect(() => {
    if (
      [ROLES.admin, ROLES.staff].includes(role) &&
      activeStoreType?.storeVendorType !== "SINGLE"
    )
      return
    setFdRequestsList(fdRequests || [])
  }, [fdRequests])

  useEffect(() => {
    if (
      [ROLES.admin, ROLES.staff].includes(role) &&
      activeStoreType?.storeVendorType !== "SINGLE"
    )
      return
    setfdConfirmedRequestsList(fdConfirmedRequests || [])
  }, [fdConfirmedRequests])

  useEffect(() => {
    if (
      [ROLES.admin, ROLES.staff].includes(role) &&
      activeStoreType?.storeVendorType !== "SINGLE"
    )
      return
    setfdCompletedRequestsList(fdCompletedRequests || [])
  }, [fdCompletedRequests])

  useEffect(() => {
    if (
      [ROLES.admin, ROLES.staff].includes(role) &&
      activeStoreType?.storeVendorType !== "SINGLE"
    )
      return
    setfdRejectedRequestsList(fdRejectedRequests || [])
  }, [fdRejectedRequests])

  useEffect(() => {
    if (
      [ROLES.admin, ROLES.staff].includes(role) &&
      activeStoreType?.storeVendorType !== "SINGLE"
    )
      return
    setfdCancelledRequestsList(fdCancelledRequests || [])
  }, [fdCancelledRequests])

  const toggleDetailsModal = status => data => {
    setdetailsModal({ isOpen: !detailsModal.isOpen, data, status })
  }

  const handleRequestAction = () => {
    toggleDetailsModal(null)(null)

    /* const fields = [
      {
        fieldName: "orderStatus",
        fieldValue: "completed",
      },
    ];

    switch (order) {
      case "pending":
      case "confirmed":
        fields.push({
          fieldName: "isOrderMarkReady",
          fieldValue: false,
        })

      case "completed":
        toggleTab(order)
        onGetFdRequests({...filter, fields}, order)
        break

      default:
        return history?.replace(
          `${props?.location?.pathname}?order=${activeTab}`
        )
    } */
  }

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  if (
    [ROLES.admin, ROLES.staff].includes(role) &&
    activeStoreType?.storeVendorType !== "SINGLE"
  ) {
    return <Pages404 />
  }

  return (
    <React.Fragment>
      <DetailsModal
        {...detailsModal}
        toggle={toggleDetailsModal(null)}
        onComplete={handleRequestAction}
        activestore={activeStoreType.storeType}
      />

      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xs={12}>
              {/* <Card>
                <CardBody> */}
              <Nav pills className="navtab-bg nav-justified">
                <NavItem
                  className={`bg-white mb-2 ${classnames({
                    active: activeTab === "pending",
                  })}`}
                >
                  <Link
                    to={`${props?.location?.pathname}?order=pending`}
                    className={`nav-link ${classnames({
                      active: activeTab === "pending",
                    })}`}
                    onClick={() => {
                      toggleTab("pending")
                    }}
                  >
                    {props.t("new_requests")}
                  </Link>
                </NavItem>

                <NavItem
                  className={`bg-white mb-2 ${classnames({
                    active: activeTab === "confirmed",
                  })}`}
                >
                  <Link
                    to={`${props?.location?.pathname}?order=confirmed`}
                    className={`nav-link ${classnames({
                      active: activeTab === "confirmed",
                    })}`}
                    onClick={() => {
                      toggleTab("confirmed")
                    }}
                  >
                    {props.t("inprocess")}
                  </Link>
                </NavItem>

                <NavItem
                  className={`bg-white mb-2 ${classnames({
                    active: activeTab === "completed",
                  })}`}
                >
                  <Link
                    to={`${props?.location?.pathname}?order=completed`}
                    className={`nav-link ${classnames({
                      active: activeTab === "completed",
                    })}`}
                    onClick={() => {
                      toggleTab("completed")
                    }}
                  >
                    {props.t("completed")}
                  </Link>
                </NavItem>

                <NavItem
                  className={`bg-white mb-2 ${classnames({
                    active: activeTab === "rejected",
                  })}`}
                >
                  <Link
                    to={`${props?.location?.pathname}?order=rejected`}
                    className={`nav-link ${classnames({
                      active: activeTab === "rejected",
                    })}`}
                    onClick={() => {
                      toggleTab("rejected")
                    }}
                  >
                    {props.t("rejected")}
                  </Link>
                </NavItem>

                <NavItem
                  className={`bg-white mb-2 ${classnames({
                    active: activeTab === "cancelled",
                  })}`}
                >
                  <Link
                    to={`${props?.location?.pathname}?order=cancelled`}
                    className={`nav-link ${classnames({
                      active: activeTab === "cancelled",
                    })}`}
                    onClick={() => {
                      toggleTab("cancelled")
                    }}
                  >
                    {props.t("cancelled")}
                  </Link>
                </NavItem>
              </Nav>

              <TabContent
                activeTab={activeTab}
                className="spinner-content position-relative"
              >
                {loading && (
                  <div className="spinner">
                    <Spinner color="primary" />
                  </div>
                )}

                <TabPane tabId="pending" id="pending-orders">
                  <OrdersList
                    id="_pending_orders"
                    list={fdRequestsList || []}
                    toggleDetailsModal={toggleDetailsModal("pending")}
                    currency={props?.settings?.currency}
                    active={activeStoreType.storeType}
                    t={props.t}
                  />
                </TabPane>

                <TabPane tabId="confirmed" id="confirmed-orders">
                  <OrdersList
                    id="_confirmed_orders"
                    list={fdConfirmedRequestsList || []}
                    toggleDetailsModal={toggleDetailsModal("confirmed")}
                    currency={props?.settings?.currency}
                    active={activeStoreType.storeType}
                    t={props.t}
                  />
                </TabPane>

                <TabPane tabId="completed" id="completed-orders">
                  <OrdersList
                    id="_completed_orders"
                    list={fdCompletedRequestsList || []}
                    toggleDetailsModal={toggleDetailsModal("completed")}
                    currency={props?.settings?.currency}
                    active={activeStoreType.storeType}
                    t={props.t}
                  />

                  <Row className="align-items-md-center mt-30">
                    <Col
                      lg="12"
                      className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination"
                    >
                      <CustomPagination
                        totalCount={pageOptions.totalSize}
                        limit={completedLimit}
                        page={filter?.page}
                        setFilter={setFilter}
                      />
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="rejected" id="rejected-orders">
                  <OrdersList
                    id="_rejected_orders"
                    list={fdRejectedRequestsList || []}
                    toggleDetailsModal={toggleDetailsModal("rejected")}
                    currency={props?.settings?.currency}
                    active={activeStoreType.storeType}
                    t={props.t}
                  />

                  <Row className="align-items-md-center mt-30">
                    <Col
                      lg="12"
                      className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination"
                    >
                      <CustomPagination
                        totalCount={pageOptions.totalSize}
                        limit={completedLimit}
                        page={filter?.page}
                        setFilter={setFilter}
                      />
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="cancelled" id="cancelled-orders">
                  <OrdersList
                    id="_cancelled_orders"
                    list={fdCancelledRequestsList || []}
                    toggleDetailsModal={toggleDetailsModal("cancelled")}
                    currency={props?.settings?.currency}
                    active={activeStoreType.storeType}
                    t={props.t}
                  />

                  <Row className="align-items-md-center mt-30">
                    <Col
                      lg="12"
                      className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination"
                    >
                      <CustomPagination
                        totalCount={pageOptions.totalSize}
                        limit={completedLimit}
                        page={filter?.page}
                        setFilter={setFilter}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
              {/*</CardBody>
              </Card>*/}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

FdRequests.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  fdRequests: PropTypes.array,
  totalFdRequests: PropTypes.number,
  onGetFdRequests: PropTypes.func,
}

const mapStateToProps = ({ Login, FD_Requests, Settings }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  vendor_name: Login?.user?.name,
  loading: FD_Requests.loading,
  fdRequests: FD_Requests.fdPendingRequests,
  fdConfirmedRequests: FD_Requests.fdConfirmedRequests,
  fdCompletedRequests: FD_Requests.fdCompletedRequests,
  fdRejectedRequests: FD_Requests.fdRejectedRequests,
  fdCancelledRequests: FD_Requests.fdCancelledRequests,
  totalFdRequests: FD_Requests.totalFdRequests,
  settings: Settings.settings,
  socket: Login?.socket,
})

const mapDispatchToProps = dispatch => ({
  onGetFdRequests: (data, status, getSecret) =>
    dispatch(getFdRequests(data, status, getSecret)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FdRequests))
)
