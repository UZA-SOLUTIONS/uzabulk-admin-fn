import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import moment from "moment-timezone"
import Select from "react-select"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Label,
  Spinner,
  Table,
} from "reactstrap"
import toastr from "toastr"

import {
  CARGO_LOCATION_PRESETS,
  LOGISTICS_ORDER_STATUSES,
  alibabaDeliveryStatusBadgeClass,
  resolveCargoLocationDisplay,
  sortTrackingHistory,
  trackingStatusLabelKey,
} from "helpers/orderLogistics"
import { getOrderStatusBadgeSoftClass } from "helpers/orderStatusBadge"
import {
  getAlibabaFreightTemplates,
  syncOrderAlibabaLogisticsTrace,
  updateOrderAlibabaLogistics,
  updateOrderWarehouseLocation,
} from "helpers/backend_helper"

const selectStyles = {
  menuPortal: base => ({ ...base, zIndex: 9999 }),
  menu: base => ({ ...base, zIndex: 9999 }),
}

const OrderLogisticsTracking = ({
  t,
  order,
  orderId,
  canEdit,
  statusUpdateLoading,
  onUpdateStatus,
  onRefreshOrder,
}) => {
  const [logisticsStatus, setLogisticsStatus] = useState(null)
  const [freightTemplates, setFreightTemplates] = useState([])
  const [freightLoading, setFreightLoading] = useState(false)
  const [traceSaving, setTraceSaving] = useState(false)
  const [traceSyncing, setTraceSyncing] = useState(false)
  const [tradeId, setTradeId] = useState("")
  const [logisticsCompanyCode, setLogisticsCompanyCode] = useState("")
  const [waybillNumber, setWaybillNumber] = useState("")
  const [cargoLocationPreset, setCargoLocationPreset] = useState(null)
  const [cargoLocationCustom, setCargoLocationCustom] = useState("")
  const [warehouseNotes, setWarehouseNotes] = useState("")
  const [notifyCustomerLocation, setNotifyCustomerLocation] = useState(true)
  const [warehouseSaving, setWarehouseSaving] = useState(false)

  const warehouseLocation = order?.warehouseLocation || {}
  const currentCargoLocation = resolveCargoLocationDisplay(warehouseLocation)
  const alibabaLogistics = order?.alibabaLogistics || {}
  const hasAlibabaItems =
    !!order?.alibabaOrderId || (order?.line_items || []).some(item => item?.offerId)
  const traceList = [...(alibabaLogistics.traceList || [])].sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  )

  useEffect(() => {
    if (!order?.orderStatus) return
    const current = LOGISTICS_ORDER_STATUSES.includes(order.orderStatus)
      ? order.orderStatus
      : LOGISTICS_ORDER_STATUSES[0]
    setLogisticsStatus({
      label: t(current),
      value: current,
    })
  }, [order?.orderStatus, t])

  useEffect(() => {
    setTradeId(
      alibabaLogistics.tradeId || order?.alibabaOrderId || ""
    )
    setLogisticsCompanyCode(alibabaLogistics.logisticsCompanyCode || "")
    setWaybillNumber(alibabaLogistics.waybillNumber || "")
  }, [
    order?._id,
    alibabaLogistics.tradeId,
    alibabaLogistics.logisticsCompanyCode,
    alibabaLogistics.waybillNumber,
    order?.alibabaOrderId,
  ])

  useEffect(() => {
    const saved = resolveCargoLocationDisplay(warehouseLocation)
    const preset = CARGO_LOCATION_PRESETS.find(
      option => option.value !== "__custom__" && option.value === saved
    )
    if (preset) {
      setCargoLocationPreset(preset)
      setCargoLocationCustom("")
    } else if (saved) {
      setCargoLocationPreset(
        CARGO_LOCATION_PRESETS.find(option => option.value === "__custom__")
      )
      setCargoLocationCustom(saved)
    } else {
      setCargoLocationPreset(null)
      setCargoLocationCustom("")
    }
    setWarehouseNotes(warehouseLocation.notes || "")
  }, [
    order?._id,
    warehouseLocation.location,
    warehouseLocation.label,
    warehouseLocation.notes,
  ])

  const history = sortTrackingHistory(order?.trackingHistory || [])
  const isTerminal = ["cancelled", "rejected", "archived", "refunded"].includes(
    order?.orderStatus
  )

  const labelFor = status => {
    const key = trackingStatusLabelKey(status)
    const translated = t(key)
    return translated !== key
      ? translated
      : status.replace(/_/g, " ")
  }

  const loadFreightTemplates = async () => {
    setFreightLoading(true)
    try {
      const res = await getAlibabaFreightTemplates({
        querySubTemplate: false,
        queryRate: false,
      })
      if (res?.status === "failure") {
        toastr.error(res?.message || "Failed to load 1688 freight templates")
        return
      }
      setFreightTemplates(res?.data || [])
      if (!(res?.data || []).length) {
        toastr.info(t("no_freight_templates") || "No freight templates found")
      }
    } catch (e) {
      toastr.error(t("something_went_wrong") || "Request failed")
    } finally {
      setFreightLoading(false)
    }
  }

  const saveAlibabaLogisticsParams = async () => {
    if (!orderId || traceSaving) return
    setTraceSaving(true)
    try {
      const res = await updateOrderAlibabaLogistics(orderId, {
        tradeId,
        logisticsCompanyCode,
        waybillNumber,
      })
      if (res?.status === "failure") {
        toastr.error(res?.message || "Failed to save logistics parameters")
        return
      }
      toastr.success(t("success") || "Saved")
      onRefreshOrder?.()
    } catch (e) {
      toastr.error(t("something_went_wrong") || "Request failed")
    } finally {
      setTraceSaving(false)
    }
  }

  const syncAlibabaTrace = async () => {
    if (!orderId || traceSyncing) return
    setTraceSyncing(true)
    try {
      const res = await syncOrderAlibabaLogisticsTrace(orderId)
      if (res?.status === "failure") {
        toastr.error(res?.message || "1688 trace sync failed")
        return
      }
      toastr.success(t("success") || "Tracking updated from 1688")
      onRefreshOrder?.()
    } catch (e) {
      toastr.error(t("something_went_wrong") || "Request failed")
    } finally {
      setTraceSyncing(false)
    }
  }

  const saveWarehouseLocation = async () => {
    if (!orderId || warehouseSaving) return

    const isCustom = cargoLocationPreset?.value === "__custom__"
    const location = isCustom
      ? cargoLocationCustom.trim()
      : String(cargoLocationPreset?.value || "").trim()

    if (!location) {
      toastr.error(
        t("cargo_location_required") ||
          "Select where the cargo is (e.g. Dubai port, In transit)."
      )
      return
    }

    setWarehouseSaving(true)
    try {
      const res = await updateOrderWarehouseLocation(orderId, {
        location,
        notes: warehouseNotes,
        notifyCustomer: notifyCustomerLocation,
      })
      if (res?.status === "failure") {
        toastr.error(res?.message || "Failed to save warehouse location")
        return
      }
      toastr.success(
        notifyCustomerLocation
          ? t("warehouse_location_notified") ||
              "Location saved and customer notified"
          : t("success") || "Saved"
      )
      onRefreshOrder?.()
    } catch (e) {
      toastr.error(t("something_went_wrong") || "Request failed")
    } finally {
      setWarehouseSaving(false)
    }
  }

  const handleSubmit = () => {
    if (!logisticsStatus?.value || statusUpdateLoading) return
    if (logisticsStatus.value === order?.orderStatus) {
      toastr.info(t("order_status") || "Status unchanged")
      return
    }
    onUpdateStatus(logisticsStatus.value)
  }

  return (
    <Card className="order-logistics-tracking mb-3">
      <CardBody>
        <CardTitle className="mb-3 d-flex align-items-center justify-content-between flex-wrap">
          <span>{t("shipment_tracking") || "Shipment tracking"}</span>
          {order?.orderStatus && (
            <Badge
              className={
                "text-capitalize font-size-12 badge-soft-" +
                getOrderStatusBadgeSoftClass(order.orderStatus)
              }
              pill
            >
              {t(order.orderStatus)}
            </Badge>
          )}
        </CardTitle>

        {history.length > 0 ? (
          <ul className="list-unstyled order-logistics-timeline mb-4">
            {history.map((entry, index) => {
              const isLast = index === history.length - 1
              return (
                <li
                  key={`${entry.status}-${entry.updatedAt}`}
                  className={`order-logistics-timeline__item ${
                    isLast ? "order-logistics-timeline__item--active" : ""
                  }`}
                >
                  <span className="order-logistics-timeline__dot" />
                  <div className="order-logistics-timeline__content">
                    <strong className="text-capitalize">
                      {labelFor(entry.status)}
                    </strong>
                    <span className="text-muted small d-block">
                      {entry.updatedAt
                        ? moment(entry.updatedAt).format("DD MMM YYYY, LT")
                        : "—"}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-muted small mb-4">
            {t("no_tracking_history") ||
              "No shipment milestones recorded yet. Update status below."}
          </p>
        )}

        <div className="border-top pt-3 mt-2 mb-3">
          <h6 className="mb-2">
            {t("cargo_location") || "Cargo location"}
          </h6>
          <p className="text-muted small mb-3">
            {t("cargo_location_hint") ||
              "Tell the customer where their cargo is — e.g. China port, in transit, or Dubai port."}
          </p>

          {currentCargoLocation && (
            <div className="alert alert-soft-info py-2 px-3 mb-3">
              <strong>{t("current_location") || "Current location"}:</strong>{" "}
              {currentCargoLocation}
              {warehouseLocation.markedAt && (
                <span className="text-muted small d-block mt-1">
                  {t("last_updated") || "Updated"}:{" "}
                  {moment(warehouseLocation.markedAt).format("DD MMM YYYY, LT")}
                </span>
              )}
              {warehouseLocation.notes && (
                <span className="small d-block mt-1">{warehouseLocation.notes}</span>
              )}
            </div>
          )}

          {canEdit && !isTerminal && (
            <>
              <FormGroup className="mb-2">
                <Label className="text-muted font-size-12 mb-1">
                  {t("cargo_location_select") || "Where is the cargo?"}
                </Label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable
                  placeholder={t("select_location") || "Select location…"}
                  options={CARGO_LOCATION_PRESETS}
                  value={cargoLocationPreset}
                  onChange={setCargoLocationPreset}
                  menuPortalTarget={
                    typeof document !== "undefined" ? document.body : null
                  }
                  menuPosition="fixed"
                  styles={selectStyles}
                />
              </FormGroup>
              {cargoLocationPreset?.value === "__custom__" && (
                <FormGroup className="mb-2">
                  <Label className="text-muted font-size-12 mb-1">
                    {t("cargo_location_custom") || "Custom location"}
                  </Label>
                  <Input
                    bsSize="sm"
                    value={cargoLocationCustom}
                    onChange={e => setCargoLocationCustom(e.target.value)}
                    placeholder={
                      t("cargo_location_custom_placeholder") ||
                      "e.g. Kigali customs, Mombasa port"
                    }
                  />
                </FormGroup>
              )}
              <FormGroup className="mb-2">
                <Label className="text-muted font-size-12 mb-1">
                  {t("location_notes") || "Notes for customer (optional)"}
                </Label>
                <Input
                  bsSize="sm"
                  type="textarea"
                  rows={2}
                  value={warehouseNotes}
                  onChange={e => setWarehouseNotes(e.target.value)}
                  placeholder={
                    t("cargo_location_notes_placeholder") ||
                    "e.g. Expected to arrive at Dubai port next week"
                  }
                />
              </FormGroup>
              <FormGroup check className="mb-3">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={notifyCustomerLocation}
                    onChange={e => setNotifyCustomerLocation(e.target.checked)}
                  />{" "}
                  {t("notify_customer_cargo_location") ||
                    "Notify customer about this location"}
                </Label>
              </FormGroup>
              <Button
                color="success"
                size="sm"
                disabled={warehouseSaving}
                onClick={saveWarehouseLocation}
              >
                {warehouseSaving ? (
                  <>
                    <Spinner size="sm" className="mr-1" /> {t("loading_text")}
                  </>
                ) : (
                  t("save_cargo_location") || "Save location"
                )}
              </Button>
            </>
          )}
        </div>

        {hasAlibabaItems && (
          <div className="border-top pt-3 mt-2 mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap">
              <h6 className="mb-0">
                {t("alibaba_logistics_trace") || "1688 logistics trace"}
              </h6>
              {alibabaLogistics.deliveryStatus && (
                <Badge
                  color={alibabaDeliveryStatusBadgeClass(
                    alibabaLogistics.deliveryStatus
                  )}
                  className="text-uppercase"
                >
                  {alibabaLogistics.deliveryStatus.replace(/_/g, " ")}
                </Badge>
              )}
            </div>

            <p className="text-muted small mb-2">
              {t("alibaba_trace_poll_hint") ||
                "Polling-based integration (every 6 hours). Set trade ID, carrier code, and waybill, then sync."}
            </p>

            {alibabaLogistics.companyName && (
              <p className="small mb-2">
                <strong>{t("carrier") || "Carrier"}:</strong>{" "}
                {alibabaLogistics.companyName}
              </p>
            )}

            {(alibabaLogistics.estimatedDeliveryDate ||
              alibabaLogistics.projectedArrival) && (
              <p className="small text-muted mb-2">
                {alibabaLogistics.estimatedDeliveryDate && (
                  <span className="mr-3">
                    {t("estimated_delivery") || "Est. delivery"}:{" "}
                    {moment(alibabaLogistics.estimatedDeliveryDate).format(
                      "DD MMM YYYY"
                    )}
                  </span>
                )}
                {alibabaLogistics.projectedArrival && (
                  <span>
                    {t("projected_arrival") || "Projected arrival"}:{" "}
                    {moment(alibabaLogistics.projectedArrival).format(
                      "DD MMM YYYY"
                    )}
                  </span>
                )}
              </p>
            )}

            {alibabaLogistics.lastPolledAt && (
              <p className="small text-muted mb-2">
                {t("last_updated") || "Last polled"}:{" "}
                {moment(alibabaLogistics.lastPolledAt).format(
                  "DD MMM YYYY, LT"
                )}
              </p>
            )}

            {alibabaLogistics.lastPollError && (
              <p className="small text-danger mb-2">
                {alibabaLogistics.lastPollError}
              </p>
            )}

            {canEdit && !isTerminal && (
              <div className="row mb-3">
                <ColFormGroup
                  label={t("trade_id") || "Trade ID"}
                  value={tradeId}
                  onChange={setTradeId}
                  placeholder={order?.alibabaOrderId || ""}
                />
                <ColFormGroup
                  label={
                    t("logistics_company_code") || "Logistics company code"
                  }
                  value={logisticsCompanyCode}
                  onChange={setLogisticsCompanyCode}
                />
                <ColFormGroup
                  label={t("waybill_number") || "Waybill / tracking number"}
                  value={waybillNumber}
                  onChange={setWaybillNumber}
                />
                <div className="col-md-12 d-flex flex-wrap mb-2">
                  <Button
                    color="outline-secondary"
                    size="sm"
                    className="mr-2 mb-1"
                    disabled={traceSaving || !orderId}
                    onClick={saveAlibabaLogisticsParams}
                  >
                    {traceSaving ? <Spinner size="sm" className="mr-1" /> : null}
                    {t("save") || "Save"}
                  </Button>
                  <Button
                    color="primary"
                    size="sm"
                    className="mb-1"
                    disabled={traceSyncing || !orderId}
                    onClick={syncAlibabaTrace}
                  >
                    {traceSyncing ? <Spinner size="sm" className="mr-1" /> : null}
                    {t("sync_1688_trace") || "Sync from 1688"}
                  </Button>
                </div>
              </div>
            )}

            {traceList.length > 0 && (
              <div className="table-responsive">
                <Table size="sm" bordered className="mb-0">
                  <thead>
                    <tr>
                      <th>{t("time") || "Time"}</th>
                      <th>{t("location") || "Location"}</th>
                      <th>{t("status") || "Status"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {traceList.map((row, idx) => (
                      <tr key={`${row.time}-${idx}`}>
                        <td className="text-nowrap small">
                          {row.time
                            ? moment(row.time).format("DD MMM YYYY, LT")
                            : "—"}
                        </td>
                        <td className="small">{row.location || "—"}</td>
                        <td className="small">{row.statusDesc || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        )}

        {hasAlibabaItems && (
          <div className="border-top pt-3 mt-2 mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap">
              <h6 className="mb-0">
                {t("alibaba_freight_templates") || "1688 freight templates"}
              </h6>
              <Button
                color="outline-primary"
                size="sm"
                disabled={freightLoading}
                onClick={loadFreightTemplates}
              >
                {freightLoading ? (
                  <Spinner size="sm" className="mr-1" />
                ) : null}
                {t("load") || "Load"}
              </Button>
            </div>
            {freightTemplates.length > 0 && (
              <div className="table-responsive">
                <Table size="sm" bordered className="mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>{t("name")}</th>
                      <th>{t("status")}</th>
                      <th>{t("address") || "Address"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {freightTemplates.map(row => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.status}</td>
                        <td className="small">{row.addressCodeText}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        )}

        {canEdit && !isTerminal && (
          <div className="d-flex flex-wrap align-items-end border-top pt-3">
            <div className="mr-2 mb-2 flex-grow-1" style={{ minWidth: "200px" }}>
              <label className="text-muted font-size-12 mb-1 d-block">
                {t("update_shipment_status") || "Update shipment status"}
              </label>
              <Select
                classNamePrefix="logistics-status-select"
                options={LOGISTICS_ORDER_STATUSES.map(value => ({
                  label: t(value),
                  value,
                }))}
                value={logisticsStatus}
                onChange={setLogisticsStatus}
                isDisabled={statusUpdateLoading}
                menuPortalTarget={
                  typeof document !== "undefined" ? document.body : null
                }
                menuPosition="fixed"
                styles={selectStyles}
              />
            </div>
            <Button
              color="primary"
              size="sm"
              className="mb-2"
              disabled={statusUpdateLoading || !logisticsStatus?.value}
              onClick={handleSubmit}
            >
              {statusUpdateLoading ? t("loading_text") : t("submit")}
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

OrderLogisticsTracking.propTypes = {
  t: PropTypes.func.isRequired,
  order: PropTypes.object,
  orderId: PropTypes.string,
  canEdit: PropTypes.bool,
  statusUpdateLoading: PropTypes.bool,
  onUpdateStatus: PropTypes.func.isRequired,
  onRefreshOrder: PropTypes.func,
}

export default OrderLogisticsTracking
