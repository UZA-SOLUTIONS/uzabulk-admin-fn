import React, { useCallback, useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import moment from "moment"
import {
  Modal,
  Row,
  Col,
  Spinner,
  Alert,
  CardTitle,
  Label,
  UncontrolledTooltip,
  FormGroup,
  Input,
} from "reactstrap"

import Select from "react-select"

import { BASE_URL } from "helpers/api_helper"
import { usePermissions } from "helpers/permissions"
import {
  postAcceptFdOrder,
  postRejectFdOrder,
  postReadyFdRequest,
  postCompleteFdRequest,
  postCancelledFdRequest,
  postInprocessFdOrder,
  exportPdfOrder,
} from "store/actions"
import { isHideThingTrue, SLUGS_NAME } from "helpers/contants"

//i18n
import { withTranslation } from "react-i18next"

import ProductPreview from "../../../Order/Profile/ProductPreview"
import DetailCard from "../../../Order/Profile/DetailCard"
import {
  BOOKING_STATUS,
  COUNTRY_OPTIONS,
  SERVICE_ICON,
  SERVICE_NAMES,
  SERVICE_STATUS,
  SLUGS_NAME as slugname,
} from "helpers/contants"

const DetailsModal = props => {
  const {
    currency,
    isOpen,
    toggle,
    loading,
    error,
    onComplete,
    activestore,
    Login,
    markReadySetting,
    role,
    settings,
  } = props

  // console.log("role11111111", settings.slug)

  console.log(markReadySetting, "markReadySetting")
  const [timeList, setTimeList] = useState()
  const hasPermission = usePermissions()
  const [selectorFields, setSelectorFields] = useState()
  const [customAdd, setCustomAdd] = useState({})

  console.log("customAdd", customAdd)

  useEffect(() => {
    markReadySetting.map(item => {
      console.log("item11111", item)
      let arr = item?.markReadySetting?.time?.map(item => {
        console.log("item", item)
        return {
          label: item,
          value: item,
        }
      })
      let obj = { id: "customValue", label: "Other", value: "other" }
      let newArr = [...arr, obj]
      console.log("obj", newArr)
      setCustomAdd(newArr)
      setTimeList(item?.markReadySetting)
    })
  }, [])

  // useEffect(() => {
  //   customAdd?.map(item => {

  //     setSelectorFields(item?.id)

  //   })

  // },[])

  const [bookingstatus, setbookingstatus] = useState()

  const [fields, setFields] = useState({
    markReadyAfterMinutes: "",
  })

  const onConfirm = () => {
    if (loading) return

    if (fields?.markReadyAfterMinutes == "") {
      props.postAcceptFdOrder(
        {
          _id: props?.data?._id,
        },
        onComplete
      )
      setSelectorFields("")
    } else {
      props.postAcceptFdOrder(
        {
          _id: props?.data?._id,
          isMarkReady: true,
          markReadyAfterMinutes: fields?.markReadyAfterMinutes,
        },
        onComplete
      )
      setSelectorFields("")
    }
  }

  const onReject = () => {
    props.postRejectFdOrder(
      {
        _id: props?.data?._id,
        markReadyAfterMinutes: fields?.markReadyAfterMinutes,
      },
      onComplete
    )
  }

  const markReady = () => {
    if (
      props?.data?.deliveryType?.toUpperCase() != "TAKEAWAY" &&
      !props?.data?.isDriverAssign
    )
      return
    if (props?.data?.isOrderMarkReady) return
    props.postReadyFdRequest({ _id: props?.data?._id }, onComplete)
  }

  const markComplete = () => {
    // if (!props?.data?.isOrderMarkReady) return
    props.postCompleteFdRequest({ _id: props?.data?._id }, onComplete)
  }

  const handlebookingstatus = data => {
    console.log(data)
    setbookingstatus(data.label)

    if (data.value === "cancelled") {
      console.log("CLICK")
      props.postCancelledFdRequest({ _id: props?.data?._id }, onComplete)
    } else if (data.value === "completed") {
      props.postCompleteFdRequest({ _id: props?.data?._id }, onComplete)
    } else {
      props.postRejectFdOrder({ _id: props?.data?._id }, onComplete)
    }
  }

  const markInprocess = () => {
    if (props.data?.scheduledType !== "scheduled") return
    props.postInprocessFdOrder({ _id: props?.data?._id }, onComplete)
  }

  const downloadToogle = () => {
    props?.exportPdfOrder(props?.data?._id)
  }

  const isPdfDownloadActive = isHideThingTrue(props?.hideThings, "orderPdf")
  const onPrint = useMemo(function () {
    var _printIframe = null
    return async function (url) {
      const uri = await fetch(url)
        .then(function (response) {
          return response.blob()
        })
        .then(function (myBlob) {
          return URL.createObjectURL(
            new Blob([myBlob], { type: "application/pdf" })
          )
        })

      var iframe = _printIframe
      if (!_printIframe) {
        iframe = _printIframe = document.createElement("iframe")
        document.body.appendChild(iframe)

        iframe.style.display = "none"
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus()
            try {
              iframe.contentWindow.print()
            } catch (err) {
              console.error(err)
              window.open(url)
            }
          }, 1)
        }
      }
      iframe.src = uri
    }
  }, [])

  const handleChange = (name, type) => event => {
    console.log("event.target.value", event.target.value)

    if (event.target.value == "other") {
      setSelectorFields("other")
      setFields(prevState => ({ ...prevState, [name]: "" }))
    } else if (type == "custom") {
      setFields(prevState => ({ ...prevState, [name]: event.target.value }))
    } else if (type == "select") {
      setFields(prevState => ({ ...prevState, [name]: event.target.value }))
      setSelectorFields("")
    }
  }

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      autoFocus={true}
      centered={true}
      toggle={toggle}
    >
      <form
        onSubmit={e => {
          e.preventDefault()
          onConfirm && onConfirm()
        }}
        className="spinner-content"
      >
        {loading && (
          <div className="spinner">
            <Spinner />
          </div>
        )}
        {/* {console.log(activestore, "activestore")} */}
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            {activestore == "AIRBNB" ? props.t("booking") : props.t("order")}
          </h5>

          {isPdfDownloadActive && (
            <a
              target="_blank"
              href={`${BASE_URL}/api/v1/store/order/pdf/${props?.data?._id}`}
              download="order_slip.pdf"
              className="close"
              // onClick={toggle}
            >
              <i
                className="fa fa-download"
                id={`viewtooltip_download_${props?.data?._id}`}
              />
              <UncontrolledTooltip
                placement="top"
                target={`viewtooltip_download_${props?.data?._id}`}
              >
                {props?.t("download_pdf")}
              </UncontrolledTooltip>
            </a>
          )}
          {/*isPdfDownloadActive && (
              <a
                target="_blank"
                href={`${BASE_URL}/api/v1/store/order/pdf/${props?.data?._id}?action=print`}
                className="close"
                onClick={e => (
                  e.preventDefault(),
                  onPrint(
                    `${BASE_URL}/api/v1/store/order/pdf/${props?.data?._id}?action=print`
                  )
                )}
              >
                <i
                  className="fa fa-print"
                  id={`viewtooltip_print_${props?.data?._id}`}
                />
                <UncontrolledTooltip
                  placement="top"
                  target={`viewtooltip_print_${props?.data?._id}`}
                >
                  {props?.t("print_pdf")}
                </UncontrolledTooltip>
              </a>
                  )*/}
          {/* <button className="close" type="button" onClick={downloadToogle}><i className="fa fa-print" /></button> */}
          <button
            type="button"
            onClick={toggle}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span className="h3" aria-hidden="true">
              <i class="mdi mdi-close-thick" />
            </span>
          </button>
        </div>

        <div className="modal-body">
          {error && typeof error === "string" ? (
            <Alert color="danger">{error}</Alert>
          ) : null}

          <ProductPreview
            t={props.t}
            currency={currency}
            storeType={
              activestore || props.data?.storeType?.storeType
            }
            vendorId={props.data?.vendor?._id || props.data?.vendor}
            discountTotal={props.data?.discountTotal}
            items={props?.data?.line_items}
            subTotal={props?.data?.subTotal}
            tip={props?.data?.tip}
            tipAmount={props?.data?.tipAmount}
            tax={{ tax: props?.data?.taxAmount, taxAmount: props?.data?.tax }}
            deliveryType={props?.data?.deliveryType}
            deliveryFee={props?.data?.deliveryFee}
            isLoyaltyPointsUsed={props?.data?.isLoyaltyPointsUsed}
            redemptionValue={props?.data?.redemptionValue}
            total={props?.data?.orderTotal}
            orderInstructions={props?.data?.orderInstructions}
            coupon={props?.data?.coupon}
            activeStore={activestore}
            slug={settings.slug}
          >
            {activestore === "CARRENTAL" && (
              <Col md={8} className="mt-4">
                <CardTitle>{props.t("details")}</CardTitle>
                <hr className="my-2" />
                <div className="w-100 d-inline-flex ">
                  <Label
                    style={{ marginRight: "55px" }}
                    className="text-muted "
                  >
                    {props.t("plan_trip")}
                  </Label>

                  <div className="font-weight-bold mr-5">
                    {moment(props?.data?.checkInDate_utc).format(
                      "DD MMM YYYY"
                    ) || ""}
                  </div>
                  <Label
                    style={{ marginRight: "55px" }}
                    className="text-muted "
                  >
                    {props.t("start_time")}
                  </Label>

                  <div className="font-weight-bold  ">
                    {props?.data?.checkInTime}
                  </div>
                </div>

                <hr className="my-2" />
                <div className="w-100 d-inline-flex ">
                  <Label
                    style={{ marginRight: "55px" }}
                    className="text-muted "
                  >
                    {props.t("end_trip")}
                  </Label>

                  <div
                    className="font-weight-bold  "
                    style={{ marginRight: "50px" }}
                  >
                    {moment(props?.data?.checkOutDate_utc).format(
                      "DD MMM YYYY"
                    ) || ""}
                  </div>
                  <Label
                    style={{ marginRight: "65px" }}
                    className="text-muted "
                  >
                    {props.t("end_time")}
                  </Label>

                  <div className="font-weight-bold  ">
                    {props?.data?.checkOutTime}
                  </div>
                </div>
              </Col>
            )}

            {timeList?.status == true && props?.status === "pending" && (
              <>
                <Col md={4} className="mt-4">
                  <FormGroup>
                    <Label>
                      {props.t("auto-mark-time")} {props.t("mins")}{" "}
                    </Label>

                    <Select
                      options={customAdd}
                      // value={{ label: markReadySetting?.time }}
                      onChange={data => {
                        handleChange &&
                          handleChange(
                            "markReadyAfterMinutes",
                            "select"
                          )({
                            target: {
                              value: data.value,
                            },
                          })
                      }}
                      classNamePrefix="select2-selection "
                      // menuPosition="fixed"
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  {selectorFields == "other" && (
                    <FormGroup>
                      <Label>
                        Custom {props.t("auto-mark-time")} {props.t("mins")}{" "}
                      </Label>
                      <Input
                        max={500}
                        type="number"
                        min={1}
                        onChange={handleChange(
                          "markReadyAfterMinutes",
                          "custom"
                        )}
                        required
                      />
                    </FormGroup>
                  )}
                </Col>
              </>
            )}

            <Col md={8} className="mt-4">
              <CardTitle>{props.t("customer_details")}</CardTitle>

              <hr className="my-2" />

              <div className="w-100 d-inline-flex ">
                <Label style={{ marginRight: "55px" }} className="text-muted ">
                  {props.t("full_name")}
                </Label>

                <div className="font-weight-bold  ">
                  {props?.data?.customerDetails?.name}
                </div>
              </div>

              <hr className="my-2" />

              <div className="w-100 d-inline-flex ">
                <Label className="text-muted mr-3">{props.t("mobile")}</Label>

                <div className="font-weight-bold">
                  <a
                    href={`tel:${props?.data?.customerDetails?.countryCode}${props?.data?.customerDetails?.mobileNumber}`}
                  >
                    {props?.data?.customerDetails?.countryCode}{" "}
                    {props?.data?.customerDetails?.mobileNumber}
                  </a>
                </div>
              </div>

              <hr className="my-2" />

              <div className="w-100 d-inline-flex ">
                <Label style={{ marginRight: "85px" }} className="text-muted ">
                  {props.t("email")}
                </Label>

                <div className="font-weight-bold">
                  {props?.data?.customerDetails?.email}
                </div>
              </div>
              <hr className="my-2" />
              {settings?.slug != slugname.airide && (
                <>
                  <div className="w-100 d-inline-flex ">
                    <Label
                      style={{ marginRight: "70px" }}
                      className="text-muted "
                    >
                      {props.t("address")}
                    </Label>

                    <div className="font-weight-bold ">
                      {!!props?.data?.billingDetails
                        ? props?.data?.billingDetails.address
                        : props?.data?.customerDetails?.address}
                    </div>
                  </div>
                  <hr className="my-2" />

                  <div className="w-100 d-inline-flex ">
                    <Label
                      style={{ marginRight: "95px" }}
                      className="text-muted "
                    >
                      {props.t("area")}
                    </Label>

                    <div className="font-weight-bold ">
                      {!!props?.data?.billingDetails
                        ? props?.data?.billingDetails.area
                        : props?.data?.customerDetails?.area}
                    </div>
                  </div>
                  <hr className="my-2" />

                  <div className="w-100 d-inline-flex">
                    <Label
                      style={{ marginRight: "65px" }}
                      className="text-muted "
                    >
                      {props.t("house_no")}
                    </Label>

                    <div className="font-weight-bold ">
                      {!!props?.data?.billingDetails
                        ? props?.data?.billingDetails.houseNo
                        : props?.data?.customerDetails?.houseNo}
                    </div>
                  </div>
                  <hr className="my-2" />

                  <div className="w-100 d-inline-flex ">
                    <Label
                      style={{ marginRight: "62px" }}
                      className="text-muted "
                    >
                      {props.t("landmark")}
                    </Label>

                    <div className="font-weight-bold ">
                      {!!props?.data?.billingDetails
                        ? props?.data?.billingDetails.landmark
                        : props?.data?.customerDetails?.landmark}
                    </div>
                  </div>
                </>
              )}
            </Col>
          </ProductPreview>
        </div>

        {hasPermission("STORE.orders.UPDATE") && (
          <>
            {props?.status === "pending" &&
              (props.data?.orderStatus === "confirmed" &&
              props.data?.scheduledType === "scheduled" &&
              !props.data?.isScheduleProcess ? (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary waves-effect"
                    data-dismiss="modal"
                    onClick={markInprocess}
                  >
                    {props.t("mark_inprocess")}
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-success waves-effect"
                    onClick={e => (
                      e.preventDefault(),
                      onPrint(
                        `${BASE_URL}/api/v1/store/order/pdf/${props?.data?._id}`
                      )
                    )}
                  >
                    {props.t("print_pdf")}
                  </button>
                </div>
              ) : (
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary waves-effect"
                    data-dismiss="modal"
                  >
                    {props.t("accept")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger waves-effect"
                    data-dismiss="modal"
                    onClick={onReject}
                  >
                    {props.t("reject")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary waves-effect"
                    data-dismiss="modal"
                    onClick={toggle}
                  >
                    {props.t("close")}
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-success waves-effect"
                    onClick={e => (
                      e.preventDefault(),
                      onPrint(
                        `${BASE_URL}/api/v1/store/order/pdf/${props?.data?._id}`
                      )
                    )}
                  >
                    {props.t("print_pdf")}
                  </button>
                </div>
              ))}

            {props?.status === "confirmed" && (
              <div className="modal-footer">
                {(props?.data?.deliveryType?.toUpperCase() == "TAKEAWAY" &&
                  props?.data?.isOrderMarkReady) ||
                ["SERVICEPROVIDER"].includes(activestore) ? (
                  <button
                    type="button"
                    className="btn btn-primary waves-effect"
                    data-dismiss="modal"
                    onClick={markComplete}
                  >
                    {props.t("completed")}
                  </button>
                ) : !["CARRENTAL", "AIRBNB"].includes(activestore) ? (
                  <button
                    disabled={
                      (props?.data?.deliveryType?.toUpperCase() != "TAKEAWAY" &&
                        !props?.data?.isDriverAssign) ||
                      props?.data?.isOrderMarkReady
                    }
                    type="button"
                    className="btn btn-primary waves-effect"
                    data-dismiss="modal"
                    onClick={markReady}
                  >
                    <div id={`markreadyTooltip`}>{props.t("mark_ready")}</div>

                    {props?.data?.deliveryType?.toUpperCase() != "TAKEAWAY" &&
                      !props?.data?.isDriverAssign && (
                        <UncontrolledTooltip
                          placement="top"
                          target={`markreadyTooltip`}
                        >
                          {props.t("waiting_driver")}
                        </UncontrolledTooltip>
                      )}
                  </button>
                ) : (
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>{props.t("select_status")}</Label>

                        <Select
                          options={BOOKING_STATUS.map(value => ({
                            label: props.t(value),
                            value,
                          }))}
                          onChange={handlebookingstatus}
                          // value={bookingstatus}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}

                <button
                  type="button"
                  className="btn btn-secondary waves-effect"
                  data-dismiss="modal"
                  onClick={toggle}
                >
                  {props.t("close")}
                </button>
              </div>
            )}

            {props?.status === "completed" && (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary waves-effect"
                  data-dismiss="modal"
                  onClick={toggle}
                >
                  {props.t("close")}
                </button>
              </div>
            )}
          </>
        )}
      </form>
    </Modal>
  )
}

DetailsModal.propTypes = {
  loading: PropTypes.bool,
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

const mapStateToProps = ({ Settings, FD_Orders, Login }) => ({
  role: Login?.user?.role || "",
  currency: Settings?.settings?.currency,
  loading: FD_Orders?.loading,
  error: FD_Orders?.error,
  hideThings: Settings.settings.hideThings,
  settings: Settings.settings,

  // Login: login,
  // bankFields: Settings?.settings?.bankFields || [],
  markReadySetting: Login?.user?.storeTypeEnabled || [],
})

export default withTranslation()(
  connect(mapStateToProps, {
    postAcceptFdOrder,
    postRejectFdOrder,
    postReadyFdRequest,
    postCompleteFdRequest,
    postInprocessFdOrder,
    postCancelledFdRequest,
    exportPdfOrder,
  })(DetailsModal)
)
