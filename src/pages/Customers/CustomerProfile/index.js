import React, { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter, useParams } from "react-router-dom"
import { map } from "lodash"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
  UncontrolledTooltip,
  Spinner,
  Button,
} from "reactstrap"
import moment from "moment-timezone"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

//Import mini card widgets
import MiniCards from "./mini-card"

//Import Images
import profile1 from "assets/images/profile-img.png"

import { isHideThingTrue, SLUGS_NAME } from "helpers/contants"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
// import charts
import {
  getCustomer,
  deleteCustomerAddress,
  putCustomersStatus,
  getFdCustomerDocuments,
  deletevirtualAccount,
} from "store/actions"
import avatar4 from "../../../assets/images/users/avatar-9.jpg"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import projectColumns from "pages/FoodDelivery/Order/List/ListColumns"
import reviewColumns from "./ReviewColumns"
import RemoveConfirmModal from "./RemoveConfirmModal"
import PayAdjustmentModal from "../CustomersList/PayAdjustmentModal"
import { usePermissions } from "helpers/permissions"
import BlockConfirmModal from "./blockConfirm"
import { useShowThings } from "helpers/show-things"
import RemovevirtualModal from "./RemovevirtualModal"

const ContactsProfile = ({
  accessLevel,
  loading,
  userProfile,
  customer,
  activeStoreType,
  onGetCustomer,
  onDeleteCustomerAddress,
  onPutCustomersStatus,
  currentPlan,
  settings,
  demo,
  onGetFdCustomerDocuments,
  fdDocuments,
  onDeleteFdVirtual,
  ...props
}) => {
  const { id } = useParams()
  const showThings = useShowThings()

  const [fdCustomerDocumentsList, setfdCustomerDocumentsList] = useState([])
  const [filter, setFilter] = useState({
    user: id,
    role: "USER",
    orderBy: "date_created_utc",
    order: -1,
    page: 0,
    limit: 10,
  })
  console.log("id11", id)
  const hasPermission = usePermissions()
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })

  const [payAdjustmentModal, setPayAdjustmentModal] = useState({
    isOpem: false,
    customer: null,
    custoemrId: null,
  })

  // eslint-disable-next-line no-unused-vars
  const [miniCards, setMiniCards] = useState([
    {
      title: props.t("completed") + " " + props.t("orders"),
      iconClass: "bx bx-check-circle",
      text: "0",
    },
    {
      title: props.t("total_spent"),
      iconClass: "bx bx-dollar-circle",
      text: props?.currency + "0.00",
    },
    {
      title: props.t("avg_order_value"),
      iconClass: "bx bx-line-chart",
      text: "0",
    },
  ])
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    addressId: null,
  })

  const [blockconfirmModal, setBlockConfirmModal] = useState({
    isOpen: false,
    status: "",
  })

  const [walletBlockConfirmModal, setWalletBlockConfirmModal] = useState({
    isOpen: false,
    status: "",
  })
  const [walletPauseConfirmModal, setWalletPauseConfirmModal] = useState({
    isOpen: false,
    status: "",
  })
  const [confirmModal3, setConfirmModal3] = useState({
    isOpen: false,
    id: null,
  })
  useEffect(() => {
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
    if (id) {
      return onGetCustomer(id)
    }

    props.history.replace("/customers")
  }, [onGetCustomer, id])

  useEffect(() => {
    if (customer) {
      activestoree !== "null" &&
        (["TAXI", "PICKUPDROP"].includes(activestoree?.toUpperCase())
          ? setMiniCards([
            {
              title: props.t("completed") + " " + props.t("booking"),
              iconClass: "bx bx-check-circle",
              text: customer.totalOrders || 0,
            },
            {
              title: props.t("total_spent"),
              iconClass: "bx bx-dollar-circle",
              text:
                props?.currency +
                parseFloat(customer.orderSpent || 0).toFixed(2),
            },
            {
              title: props.t("avg_booking_value"),
              iconClass: "bx bx-line-chart",
              text: parseFloat(customer.orderAvgValue || 0).toFixed(2),
            },
          ])
          : setMiniCards([
            {
              title: props.t("completed") + " " + props.t("orders"),
              iconClass: "bx bx-check-circle",
              text: customer.totalOrders || 0,
            },
            {
              title: props.t("total_spent"),
              iconClass: "bx bx-dollar-circle",
              text:
                props?.currency +
                parseFloat(customer.orderSpent || 0).toFixed(2),
            },
            {
              title: props.t("avg_order_value"),
              iconClass: "bx bx-line-chart",
              text: parseFloat(customer.orderAvgValue || 0).toFixed(2),
            },
          ]))
    }
  }, [JSON.stringify(customer)])

  const toggleConfirmModal = addressId => {
    setConfirmModal(prevState => ({ isOpen: !prevState.isOpen, addressId }))
  }

  const removeConfirm = () => {
    const { addressId, isOpen } = confirmModal

    const onComplete = () => {
      onGetCustomer(id)
    }

    setConfirmModal({ isOpen: !isOpen, addressId: null })
    onDeleteCustomerAddress({ _id: addressId }, onComplete)
  }

  const handleCustomerStatusChange = status => {
    const callback = () => {
      onGetCustomer(id)
    }

    onPutCustomersStatus({ _id: [id], status }, callback)
  }
  const removeVirtualConfirm = () => {
    const { driverId, isOpen } = confirmModal3

    const onComplete = res => {
      if (res.status === "success") {
        toastr.success(res.message)
        onGetCustomer(id)
      }
    }

    setConfirmModal3({ isOpen: !isOpen, driverId: null })
    onDeleteFdVirtual(
      activeStoreType?.storeType?.toLowerCase(),
      { id: driverId },
      onComplete
    )
  }
  const [activestoree, setActiveStore] = useState(null) // to check if store is single taxior single pickupdrop
  //forc replacing orderid with booking id
  useEffect(() => {
    if (["basic", "premium"].includes(currentPlan?.type)) {
      setActiveStore(props.storeTypeEnabled[0]?.storeType)
    }
  }, [currentPlan, props.storeTypeEnabled])

  const onPaySuccess = () => {
    togglePayAdjustmentModal(null, null)
    onGetCustomer(id)
  }

  // console.log(customer?.latestOrders, "customer.latestOrders ");

  const togglePayAdjustmentModal = (customerId, customer) => {
    setPayAdjustmentModal(prev => ({
      isOpen: !prev.isOpen,
      customerId,
      customer,
    }))
  }
  let isUserWalletAccessGiven = isHideThingTrue(
    props?.hideThings,
    "usersWalletAccess"
  )

  useEffect(() => {
    setfdCustomerDocumentsList([])
    onGetFdCustomerDocuments(filter)
  }, [JSON.stringify(filter)])

  useEffect(() => {
    setfdCustomerDocumentsList(fdDocuments || [])
  }, [fdDocuments])
  // block button

  const removeblockConfirm = key => {
    if (blockconfirmModal.status == "block") {
      setBlockConfirmModal({ isOpen: false })
      handleCustomerStatusChange("blocked")
    } else {
      setBlockConfirmModal({ isOpen: false })
      handleCustomerStatusChange("active")
    }
  }

  const toggleblockConfirmModal = () => {
    setBlockConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  const removeWalletBlockConfirm = key => {
    if (walletBlockConfirmModal.status == "block") {
      setWalletBlockConfirmModal({ isOpen: false })
      handleCustomerStatusChange("deactivate_wallet")
    } else {
      setWalletBlockConfirmModal({ isOpen: false })
      handleCustomerStatusChange("activate_wallet")
    }
  }

  const toggleWalletBlockConfirmModal = () => {
    setWalletBlockConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  const removeWalletPauseConfirm = key => {
    if (walletPauseConfirmModal.status == "block") {
      setWalletPauseConfirmModal({ isOpen: false })
      handleCustomerStatusChange("paused_wallet_transaction")
    } else {
      setWalletPauseConfirmModal({ isOpen: false })
      handleCustomerStatusChange("resume_wallet_transaction")
    }
  }

  const toggleWalletPauseConfirmModal = () => {
    setWalletPauseConfirmModal(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }
  const toggleConfirmModal3 = driverId => {
    setConfirmModal3(prevState => ({ isOpen: !prevState.isOpen, driverId }))
  }
  return (
    <React.Fragment>
      <RemoveConfirmModal
        isOpen={confirmModal.isOpen}
        toggle={toggleConfirmModal}
        onConfirm={removeConfirm}
      />

      <BlockConfirmModal
        isOpen={blockconfirmModal.isOpen}
        toggle={toggleblockConfirmModal}
        onConfirm={removeblockConfirm}
      />
      <BlockConfirmModal
        isOpen={walletBlockConfirmModal.isOpen}
        toggle={toggleWalletBlockConfirmModal}
        onConfirm={removeWalletBlockConfirm}
      />
      <BlockConfirmModal
        isOpen={walletPauseConfirmModal.isOpen}
        toggle={toggleWalletPauseConfirmModal}
        onConfirm={removeWalletPauseConfirm}
        message={`Are you sure you want to ${customer?.pausedWalletTransaction === true ? "Resume" : "Pause"
          } Wallet to Wallet Transfer`}
      />

      <PayAdjustmentModal
        toggle={togglePayAdjustmentModal}
        onSuccess={onPaySuccess}
        {...payAdjustmentModal}
      />
      <RemovevirtualModal
        isOpen={confirmModal3.isOpen}
        toggle={toggleConfirmModal3}
        onConfirm={removeVirtualConfirm}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Customer Profile"
            breadcrumbItem={props.t("customer") + " " + props.t("profile")}
            breadcrumbItems={[
              { title: props.t("customers"), link: "/customers" },
              { title: props.t("profile") },
            ]}
          />

          <Row className="spinner-content">
            {loading && <div className="spinner"></div>}

            <Col xl="4">
              <Card className="overflow-hidden">
                <div className="bg-soft-primary">
                  <Row>
                    <Col xs="7"></Col>
                    <Col xs="5" className="align-self-end">
                      <img src={profile1} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>

                <CardBody className="pt-0">
                  <Row>
                    <Col sm="12" style={{ display: "flex" }}>
                      <div className="avatar-md profile-user-wid mb-4">
                        <img
                          style={{ height: "100%" }}
                          src={
                            !!customer.profileImage
                              ? customer.profileImage.link
                              : avatar4
                          }
                          alt=""
                          className="img-thumbnail rounded-circle"
                        />
                      </div>

                      <h5 className="pl-3 font-size-15 text-truncate">
                        {customer.name}{" "}
                        {SLUGS_NAME.kontaktem === settings.slug &&
                          customer?.profile_verified && (
                            <span className="text-info lead ml-2">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                height="1.2em"
                                width="1.2em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path>
                              </svg>
                            </span>
                          )}
                      </h5>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs="5">
                      <h5 className="font-size-15">
                        {moment(customer.date_created_utc).format(
                          "DD MMM YYYY"
                        )}
                      </h5>
                      <p className="text-muted mb-0">
                        {props.t("member_since")}
                      </p>
                    </Col>

                    <Col xs="4">
                      <h5 className="font-size-15 text-capitalize">
                        {props.t(customer.status || "active")}
                      </h5>
                      <p className="text-muted mb-0">{props.t("status")}</p>
                    </Col>

                    <Col xs="3">
                      <h5 className="font-size-15 text-capitalize">
                        <i
                          style={{ color: "#fabc3c" }}
                          className="bx bxs-star"
                        ></i>{" "}
                        {customer.avgRating || 0}
                        /5
                      </h5>
                      <p className="text-muted mb-0">{props.t("rating")}</p>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    {SLUGS_NAME.kontaktem === settings.slug &&
                      Object.keys(customer)?.length > 0 &&
                      !customer?.profile_verified && (
                        <Col xs="6">
                          <Button
                            className="btn btn-sm"
                            color="success"
                            onClick={() =>
                              handleCustomerStatusChange("profile_verified")
                            }
                          >
                            {props.t("mark_verify")}
                          </Button>
                        </Col>
                      )}
                    <Col xs="6">
                      {accesses.canEdit && customer?.status === "inactive" && (
                        <Button
                          className="btn btn-sm"
                          color="primary"
                          onClick={() => handleCustomerStatusChange("active")}
                        >
                          {props.t("active")}
                        </Button>
                      )}

                      {accesses.canBlock && customer?.status === "active" && (
                        <Button
                          className="btn btn-sm"
                          color="danger"
                          onClick={() =>
                            setBlockConfirmModal({
                              isOpen: true,
                              status: "block",
                            })
                          }
                        >
                          {props.t("block")}
                        </Button>
                      )}

                      {accesses.canBlock && customer?.status === "blocked" && (
                        <Button
                          className="btn btn-sm"
                          color="primary"
                          onClick={() =>
                            setBlockConfirmModal({
                              isOpen: true,
                              status: "unblock",
                            })
                          }
                        >
                          {props.t("unblock")}
                        </Button>
                      )}
                    </Col>
                    <Col xs="12" className="mt-2" />
                    <Col xs="12" sm="6" className="mt-2 mt-sm-0">
                      <div
                        onClick={e => {
                          props.history.push(
                            `/customers/${customer._id}/transactions?customer_name=${customer.name}`
                          )
                        }}
                      >
                        <Button
                          outline
                          color="success"
                          //  id={`pay-${id}-tooltip`}
                          className="d-flex align-items-center "
                        >
                          {" "}
                          {props.t("transactions")}{" "}
                          <i
                            className="fas fa-money-bill-wave ml-2"
                            id={`transaction-${id}-tooltip`}
                          />
                        </Button>
                      </div>
                    </Col>
                    {accesses?.canEdit &&
                      isUserWalletAccessGiven &&
                      hasPermission("accounting.PAY") && (
                        <Col xs="12" sm="6" className="pl-sm-0 mt-2 mt-sm-0">
                          <div
                            onClick={e => {
                              e.preventDefault()
                              togglePayAdjustmentModal(id, customer)
                            }}
                          >
                            <Button
                              outline
                              color="success"
                              //  id={`pay-${id}-tooltip`}
                              className="d-flex align-items-center "
                            >
                              {" "}
                              {props.t("adjust_payment")}{" "}
                              <i
                                className="fas fa-money-bill-wave ml-2"
                                id={`pay-${id}-tooltip`}
                              />
                            </Button>
                            {/* <UncontrolledTooltip
                            placement="top"
                            target={`pay-${id}-tooltip`}
                          >
                            {props.t("pay")}
                          </UncontrolledTooltip> */}
                          </div>
                        </Col>
                      )}
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    <Row>
                      <Col>{props.t("personal_information")}</Col>

                      <Col xs="3" className="text-right">
                        <Link
                          to={`/customers/${customer._id}/edit?customer_name=${customer?.name}`}
                          className="btn btn-primary btn-sm"
                        >
                          {props.t("edit")}
                        </Link>
                      </Col>
                    </Row>
                  </CardTitle>
                  <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <tbody>
                        {SLUGS_NAME.purposeDeliveryService ===
                          settings.slug && (
                            <tr>
                              <th scope="row">{props.t("id")} :</th>
                              <td className="text-wrap text-capitalize">{id}</td>
                            </tr>
                          )}
                        <tr>
                          <th scope="row">{props.t("full_name")} :</th>
                          <td className="text-wrap text-capitalize">
                            {customer.name}
                          </td>
                        </tr>
                        {demo ? (
                          <>
                            <tr>
                              <th scope="row">{props.t("mobile")} :</th>
                              <td id="view-mobiletooltip" className="text-wrap">
                                {customer.countryCode} {customer.mobileNumber}
                              </td>
                              <UncontrolledTooltip
                                placement="top"
                                target="view-mobiletooltip"
                              >
                                {props.t("demo_info")}
                              </UncontrolledTooltip>
                            </tr>
                            <tr>
                              <th scope="row">{props.t("email")} :</th>
                              <td id="view-emailtooltip" className="text-wrap">
                                {customer.email}
                              </td>
                              <UncontrolledTooltip
                                placement="top"
                                target="view-emailtooltip"
                              >
                                {props.t("demo_info")}
                              </UncontrolledTooltip>
                            </tr>
                          </>
                        ) : (
                          <>
                            <tr>
                              <th scope="row">{props.t("mobile")} :</th>
                              <td className="text-wrap">
                                {customer.countryCode} {customer.mobileNumber}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">{props.t("email")} :</th>
                              <td className="text-wrap">{customer.email}</td>
                            </tr>
                          </>
                        )}
                        <tr>
                          <th scope="row">{props.t("wallet_amount")} :</th>
                          <td className="text-wrap">
                            {props.currency}
                            {customer?.wallet || 0}
                            {showThings["manageWalletStatus"] &&
                              "walletStatus" in customer && (
                                <Fragment>
                                  {customer?.walletStatus === "active" ? (
                                    <Button
                                      className="btn btn-sm ms-2"
                                      color="danger"
                                      onClick={() =>
                                        setWalletBlockConfirmModal({
                                          isOpen: true,
                                          status: "block",
                                        })
                                      }
                                    >
                                      {props.t("block")}
                                    </Button>
                                  ) : (
                                    <Button
                                      className="btn btn-sm ms-2"
                                      color="primary"
                                      onClick={() =>
                                        setWalletBlockConfirmModal({
                                          isOpen: true,
                                          status: "unblock",
                                        })
                                      }
                                    >
                                      {props.t("unblock")}
                                    </Button>
                                  )}
                                </Fragment>
                              )}
                          </td>
                        </tr>
                        {showThings["pausedWalletTransaction"] && (
                          <tr>
                            <th scope="row">{props.t("wallet_transfer")} :</th>
                            <td className="text-wrap">
                              {customer?.pausedWalletTransaction !== true
                                ? props.t("active")
                                : props.t("inactive")}
                              <Fragment>
                                {customer?.pausedWalletTransaction !== true ? (
                                  <Button
                                    className="btn btn-sm ms-2"
                                    color="danger"
                                    onClick={() =>
                                      setWalletPauseConfirmModal({
                                        isOpen: true,
                                        status: "block",
                                      })
                                    }
                                  >
                                    {props.t("pause")}
                                  </Button>
                                ) : (
                                  <Button
                                    className="btn btn-sm ms-2"
                                    color="primary"
                                    onClick={() =>
                                      setWalletPauseConfirmModal({
                                        isOpen: true,
                                        status: "unblock",
                                      })
                                    }
                                  >
                                    {props.t("resume")}
                                  </Button>
                                )}
                              </Fragment>
                            </td>
                          </tr>
                        )}
                        <tr>
                          <th scope="row">{props.t("loyalty_points")} :</th>
                          <td className="text-wrap">
                            {customer?.loyaltyPoints?.points || 0} ={" "}
                            {props.currency}
                            {customer?.loyaltyPoints?.value || 0}
                          </td>
                        </tr>

                        {SLUGS_NAME.oneTimeShop === settings?.slug &&
                          customer?.isVirtualAccount && (
                            <>
                              <tr>
                                <th scope="row">
                                  {props.t("virtual_account")} :
                                </th>
                                <td className="text-wrap">
                                  {
                                    customer?.virtualAccountDetails
                                      ?.account_number
                                  }
                                  <Link
                                    to="#"
                                    onClick={e => {
                                      e.preventDefault()
                                      toggleConfirmModal3(customer?._id)
                                    }}
                                    className="ms-3 text-secondary"
                                  >
                                    <i
                                      className="fas fa-trash-alt mr-3"
                                      id={`delete-${customer?._id}-tooltip`}
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`delete-${customer?._id}-tooltip`}
                                    >
                                      {props?.t("delete")}
                                    </UncontrolledTooltip>
                                  </Link>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">{props.t("virtual_bank")} :</th>
                                <td className="text-wrap">
                                  {customer?.virtualAccountDetails?.bank?.name}
                                </td>
                              </tr>
                            </>
                          )}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
              {SLUGS_NAME.kontaktem === settings.slug &&
                settings?.hideThings?.find(
                  element => element.type === "isDocumentTemplates"
                )?.value && (
                  <Card>
                    <CardBody>
                      <CardTitle className="mb-4">
                        {props.t("documents")}
                      </CardTitle>

                      {fdCustomerDocumentsList?.map(document => (
                        <Row
                          key={document._id}
                          className="align-items-center mb-2"
                        >
                          <Col className="text-capitalize">
                            <span className="fw-sbold w-50 pe-3">
                              {document?.name}
                            </span>
                          </Col>

                          <Col xs="2" className="">
                            <Link
                              to={`/customers/${id}/document/${document?._id}?driver_name=${customer.name}`}
                              className="text-primary"
                            >
                              <i
                                className="mdi mdi-pencil font-size-18 mr-3"
                                id={`edit-${document._id}-tooltip`}
                              />
                              <UncontrolledTooltip
                                placement="top"
                                target={`edit-${document._id}-tooltip`}
                              >
                                {props.t("edit")}
                              </UncontrolledTooltip>
                            </Link>
                          </Col>
                        </Row>
                      ))}
                    </CardBody>
                  </Card>
                )}
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    <Row>
                      <Col>{props.t("addresses")}</Col>

                      {accesses?.canAdd && (
                        <Col xs="3" className="text-right">
                          <Link
                            to={`/customers/${customer._id}/address?customer_name=${customer?.name}`}
                            className="btn btn-primary btn-sm"
                          >
                            {props.t("add")}
                          </Link>
                        </Col>
                      )}
                    </Row>
                  </CardTitle>

                  {customer.addresses &&
                    customer.addresses.map(address => (
                      <React.Fragment key={address._id}>
                        <Row className="align-items-center mb-2">
                          <Col
                            xs={12}
                            sm="2"
                            md="3"
                            xl="8"
                            className="text-truncate text-capitalize order-0"
                          >
                            {address.addressType}
                          </Col>

                          <Col
                            xs={12}
                            sm={8}
                            md={7}
                            xl={12}
                            className="mt-3 mt-sm-0 mt-xl-3 text-truncate order-1 order-xl-4"
                          >
                            {address.address}
                          </Col>

                          <Col
                            xs={6}
                            sm={1}
                            xl={2}
                            className="mt-3 mt-sm-0 order-2 order-xl-1"
                          >
                            <Link
                              to={`/customers/${customer._id}/address/${address._id}?customer_name=${customer?.name}`}
                              className="text-secondary"
                            >
                              <i className="far fa-edit" id="edittooltip" />
                              <UncontrolledTooltip
                                placement="top"
                                target="edittooltip"
                              >
                                {props.t("edit")}
                              </UncontrolledTooltip>
                            </Link>
                          </Col>

                          <Col
                            xs={6}
                            sm={1}
                            xl={2}
                            className="mt-3 mt-sm-0 order-3 order-xl-2"
                          >
                            {accesses?.canDelete && (
                              <Link
                                to="#"
                                onClick={e => {
                                  e.preventDefault()

                                  toggleConfirmModal(address._id)
                                }}
                                className="text-secondary"
                              >
                                <i
                                  className="fas fa-trash-alt"
                                  id="deletetooltip"
                                />
                                <UncontrolledTooltip
                                  placement="top"
                                  target="deletetooltip"
                                >
                                  {props.t("delete")}
                                </UncontrolledTooltip>
                              </Link>
                            )}
                          </Col>
                        </Row>

                        <hr className="d-block d-sm-none d-xl-block" />
                      </React.Fragment>
                    ))}
                </CardBody>
              </Card>
            </Col>

            <Col xl="8">
              <Row>
                {map(miniCards, (card, key) => (
                  <MiniCards
                    title={card.title}
                    text={card.text}
                    iconClass={card.iconClass}
                    key={"_card_" + key}
                  />
                ))}
              </Row>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">
                    <Row>
                      {activestoree !== "null" ? (
                        ["TAXI", "PICKUPDROP"].includes(
                          activestoree?.toUpperCase()
                        ) ? (
                          <Col xs="10">{props.t("my_booking")}</Col>
                        ) : (
                          <Col xs="10">{props.t("my_orders")}</Col>
                        )
                      ) : (
                        <Col xs="10">{props.t("my_orders")}</Col>
                      )}

                      <Col sm="2">
                        <Link
                          to={`/user-order?customer=${id}&customer_name=${customer?.name || ""}`}
                          className="waves-effect waves-light btn-sm"
                        >
                          {props.t("View All")}{" "}
                          <i className="mdi mdi-arrow-right ml-1" />
                        </Link>
                      </Col>
                    </Row>
                  </CardTitle>

                  <ToolkitProvider
                    keyField="id"
                    data={customer.latestOrders || []}
                    columns={projectColumns({
                      currentUrl: null,
                      vendorIdParam: null,
                      accesses,
                      t: props.t,
                      currency: settings?.currency,
                      needVendor: true,
                      query: "",
                      isVendor: false,
                      isCustomer: true,
                      activestore:
                        settings?.storeTypeEnabled[0]?.storeType.toLowerCase(),
                      plan: currentPlan?.type,
                      activestoree,
                    })}
                    bootstrap4
                  >
                    {toolkitProps => (
                      <React.Fragment>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                responsive
                                remote
                                bordered={false}
                                striped={false}
                                classes={
                                  "table table-centered table-hover table-nowrap"
                                }
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                              />
                            </div>
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardTitle className="mb-3">
                    <Row>
                      <Col sm="10">{props.t("reviews")}</Col>

                      <Col sm="2">
                        <Link
                          to={`/reviews?customer=${id}&customer_name=${customer?.name || ""}`}
                          className="waves-effect waves-light btn-sm"
                        >
                          {props.t("View All")}{" "}
                          <i className="mdi mdi-arrow-right ml-1" />
                        </Link>
                      </Col>
                    </Row>
                  </CardTitle>

                  <ToolkitProvider
                    keyField="id"
                    data={customer?.reviews?.slice(0, 10) || []}
                    columns={reviewColumns({
                      t: props.t,
                      plan: currentPlan?.type,
                      activestore: settings?.storeTypeEnabled[0]?.storeType,
                      activestoree,
                    })}
                    bootstrap4
                  >
                    {toolkitProps => (
                      <React.Fragment>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                responsive
                                remote
                                bordered={false}
                                striped={false}
                                classes={
                                  "table table-centered table-hover table-nowrap"
                                }
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                              />
                            </div>
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ContactsProfile.propTypes = {
  t: PropTypes.any,
  userProfile: PropTypes.any,
  onGetCustomer: PropTypes.func,
  onDeleteCustomerAddress: PropTypes.func,
  loading: PropTypes.bool,
}

const mapStateToProps = ({ customers, Settings, Billing, Login }) => ({
  customer: customers.customer,
  currency: Settings?.settings?.currency?.sign || "$",
  userProfile: {},
  loading: customers.loading,
  settings: Settings.settings,
  currentPlan: Billing.currentPlan.billingPlan,
  storeTypeEnabled: Settings.settings.storeTypeEnabled,
  demo: Settings.settings.demo,
  hideThings: Settings?.settings?.hideThings,
  fdDocuments: customers.fdDocuments,
})

const mapDispatchToProps = dispatch => ({
  onGetCustomer: data => dispatch(getCustomer(data)),
  onDeleteCustomerAddress: (data, callback) =>
    dispatch(deleteCustomerAddress(data, callback)),
  onPutCustomersStatus: (data, callback) =>
    dispatch(putCustomersStatus(data, callback)),
  onGetFdCustomerDocuments: data => dispatch(getFdCustomerDocuments(data)),
  onDeleteFdVirtual: (storeType, data, callback) =>
    dispatch(deletevirtualAccount(storeType, data, callback)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(ContactsProfile)))
