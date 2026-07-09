import React from "react"
import { Link } from "react-router-dom"
import DateRangePicker from "react-bootstrap-daterangepicker"
import moment from "moment-timezone"
import SearchInput from "components/Common/SearchInput"
import {
  DELIVERY_TYPE_FILTER_OPTIONS,
  ORDER_LIST_PAGE_SIZE_ALL,
  ORDER_LIST_PAGE_SIZE_OPTIONS,
  ORDER_STATUS_FILTER_OPTIONS,
  PAYMENT_METHOD_FILTER_OPTIONS,
  isShowingAllOrders,
  orderDateRanges,
} from "helpers/orderListFilters"

const OrderListFilters = ({
  t,
  filter,
  setFilter,
  searchText,
  setSearchText,
  dateFilter,
  setDateFilter,
  onSearch,
  searchProps,
  showDeliveryType = true,
  onClear,
  totalCount = 0,
}) => {
  const dateLocale = {
    applyLabel: t("apply"),
    cancelLabel: t("cancel"),
    customRangeLabel: t("custom_range"),
    daysOfWeek: [
      t("week_of_sunday"),
      t("week_of_monday"),
      t("week_of_tuesday"),
      t("week_of_wednesday"),
      t("week_of_thursday"),
      t("week_of_friday"),
      t("week_of_saturday"),
    ],
    monthNames: [
      t("month_of_january"),
      t("month_of_february"),
      t("month_of_march"),
      t("month_of_april"),
      t("month_of_may"),
      t("month_of_june"),
      t("month_of_july"),
      t("month_of_august"),
      t("month_of_september"),
      t("month_of_october"),
      t("month_of_november"),
      t("month_of_december"),
    ],
  }

  const handleClear = e => {
    e.preventDefault()
    onClear?.()
  }

  return (
    <div className="order-list-filters w-100">
      <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-2">
        <div className="d-flex flex-wrap align-items-center flex-grow-1">
          <div className="form-group d-flex align-items-center mb-2 mb-md-0 mr-3">
            <label className="mb-0 mr-2 text-nowrap">{t("filter_by")}:</label>
            <select
              className="custom-select"
              style={{ minWidth: "130px" }}
              value={filter?.fields?.[0]?.fieldValue || ""}
              onChange={e => {
                const value = e.target.value
                setFilter(prev => ({
                  ...prev,
                  page: 1,
                  fields: [
                    {
                      fieldName: value ? "orderStatus" : "",
                      fieldValue: value,
                    },
                  ],
                }))
              }}
            >
              <option value="">{t("all")}</option>
              {ORDER_STATUS_FILTER_OPTIONS.map(item => (
                <option key={item} value={item}>
                  {t(item)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group d-flex align-items-center mb-2 mb-md-0 mr-3">
            <label className="mb-0 mr-2 text-nowrap">{t("payment_method")}:</label>
            <select
              className="custom-select"
              style={{ minWidth: "110px" }}
              value={filter?.paymentMethod || ""}
              onChange={e =>
                setFilter(prev => ({
                  ...prev,
                  page: 1,
                  paymentMethod: e.target.value,
                }))
              }
            >
              <option value="">{t("all")}</option>
              {PAYMENT_METHOD_FILTER_OPTIONS.filter(Boolean).map(item => (
                <option key={item} value={item}>
                  {t(item)}
                </option>
              ))}
            </select>
          </div>

          {showDeliveryType && (
            <div className="form-group d-flex align-items-center mb-2 mb-md-0 mr-3">
              <label className="mb-0 mr-2 text-nowrap">
                {t("delivery")}:
              </label>
              <select
                className="custom-select"
                style={{ minWidth: "110px" }}
                value={filter?.deliveryType || ""}
                onChange={e =>
                  setFilter(prev => ({
                    ...prev,
                    page: 1,
                    deliveryType: e.target.value,
                  }))
                }
              >
                <option value="">{t("all")}</option>
                {DELIVERY_TYPE_FILTER_OPTIONS.filter(Boolean).map(item => (
                  <option key={item} value={item}>
                    {t(item)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="d-flex align-items-center mb-2 mb-md-0">
            <SearchInput
              {...searchProps}
              triggerSearch={onSearch}
              placeholder={`${t("search")} — ${t("order_id")}, ${t("customer")}, ${t("vendor")}, ${t("mobile")}`}
              searchText={searchText}
            />
            {(filter?.search ||
              filter?.fields?.[0]?.fieldName ||
              filter?.paymentMethod ||
              filter?.deliveryType) && (
              <Link
                to="#"
                onClick={handleClear}
                className="ml-3 text-nowrap"
              >
                {t("clear_filters")}
              </Link>
            )}
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-center mb-2 gap-2">
          <div className="form-group d-flex align-items-center mb-0">
            <label className="mb-0 mr-2 text-nowrap small text-muted">
              Per page:
            </label>
            <select
              className="custom-select custom-select-sm"
              style={{ minWidth: "100px" }}
              value={String(filter?.limit ?? 20)}
              onChange={e => {
                const limit = parseInt(e.target.value, 10)
                setFilter(prev => ({
                  ...prev,
                  limit,
                  page: 1,
                }))
              }}
            >
              {ORDER_LIST_PAGE_SIZE_OPTIONS.map(size => (
                <option key={size} value={size}>
                  {size === ORDER_LIST_PAGE_SIZE_ALL
                    ? t("view_all")
                    : size}
                </option>
              ))}
            </select>
          </div>

          {totalCount > 0 && (
            <span className="small text-muted mb-0">
              {isShowingAllOrders(filter?.limit)
                ? `${totalCount} ${t("orders")}`
                : `${Math.min(filter?.limit || 20, totalCount)} / ${totalCount}`}
            </span>
          )}

          <DateRangePicker
            initialSettings={{
              opens: "left",
              ranges: orderDateRanges(t),
              alwaysShowCalendars: true,
              applyButtonClasses: "btn-primary",
              maxDate: moment(),
              startDate: dateFilter?.startDate,
              endDate: dateFilter?.endDate,
              locale: dateLocale,
            }}
            onApply={(e, picker) => {
              const spanYears = picker.endDate.diff(picker.startDate, "years", true)
              setDateFilter({
                startDate: picker.startDate,
                endDate: picker.endDate,
                keydata: spanYears >= 9 ? "all_time" : "picker_date",
              })
              setFilter(prev => ({ ...prev, page: 1 }))
            }}
          >
            <div
              id="order-daterange"
              className="daterange-selectbox d-flex justify-content-between align-items-center px-3 py-2 border rounded bg-white"
              style={{ minWidth: "240px", cursor: "pointer" }}
            >
              <i className="bx bx-calendar text-primary" />
              <span className="mx-2 small">
                {dateFilter?.startDate?.format("DD MMM YYYY")} –{" "}
                {dateFilter?.endDate?.format("DD MMM YYYY")}
              </span>
              <i className="bx bx-caret-down" />
            </div>
          </DateRangePicker>
        </div>
      </div>
    </div>
  )
}

export default OrderListFilters
