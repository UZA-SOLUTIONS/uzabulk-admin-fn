import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"
import {
  Modal,
  Row,
  Col,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Spinner,
  Alert,
  Table,
} from "reactstrap"
import DateRangePicker from "react-bootstrap-daterangepicker"

import "bootstrap-daterangepicker/daterangepicker.css"

import { postFdDriverPay } from "store/actions"

//i18n
import { withTranslation } from "react-i18next"

const PayModal = props => {
  const {
    isOpen,
    toggle,
    onPaySuccess,
    driverId,
    driver,
    loading,
    error,
    currency,
    onPostFdDriverPay,
    storeTypeId,
  } = props

  const [fields, setfields] = useState({
    amount: 0,
    date: moment(),
  })

  useEffect(() => {
    setfields({ amount: driver?.wallet || 0, date: moment() })
  }, [isOpen])

  const handleChange = name => e => {
    const { value } = e.target

    setfields(prevState => ({ ...prevState, [name]: value }))
  }

  const onConfirm = data => {
   if (loading) return

    if (!driverId) return
    onPostFdDriverPay(
      { ...data, payment_to: driverId, storeTypeId, userType: "DRIVER" },
      onPaySuccess
    )
  }

  const fillAmount = (name, value) => e => {
    e.preventDefault()

    if (value !== undefined) {
      setfields(prevState => ({ ...prevState, [name]: value }))
    } else {
      setfields(prevState => ({ ...prevState, [name]: driver?.wallet }))
    }
  }

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      autoFocus={true}
      centered={true}
      toggle={toggle}
    >
      <form
        onSubmit={e => {
          e.preventDefault()
          onConfirm && onConfirm(fields)
        }}
        className="spinner-content"
      >
        {loading && (
          <div className="spinner">
            <Spinner />
          </div>
        )}

        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            {props.t("pay_amount")}
          </h5>

          <button
            type="button"
            onClick={toggle}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span className="h3" aria-hidden="true">
              &times;
            </span>
          </button>
        </div>

        <div className="modal-body">
          {error && typeof error === "string" ? (
            <Alert color="danger">{error}</Alert>
          ) : null}

          <Row>
            {driver?.bankFields?.map((field, key) => (
              <Col key={`_bankfields-${key}`} md={6}>
                <FormGroup>
                  <Label>{props.t(field?.label)}</Label>

                  <p>{field?.value || "-"}</p>
                </FormGroup>
              </Col>
            ))}
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>{props.t("amount")}<span className="text-danger ml-1">*</span></Label>

                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{currency?.sign || "$"}</InputGroupText>
                  </InputGroupAddon>

                  <Input
                    required
                    type="number"
                    value={fields?.amount}
                    onChange={handleChange("amount")}
                    step={0.01}
                    min={0}
                  />
                </InputGroup>

                <span className="w-100">
                  <span className="text-muted">
                    {props.t("balance_amount")} {currency?.sign || "$"}
                    {driver?.wallet || 0}
                  </span>
                </span>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("date")}</Label>

                <DateRangePicker
                  initialSettings={{
                    singleDatePicker: true,
                    opens: "left",
                    drops: "auto",
                    alwaysShowCalendars: true,
                    applyButtonClasses: "btn-primary",
                    maxDate: moment(),
                    autoApply: true,
                    startDate: fields?.date,
                    autoUpdateInput: false,
                  }}
                  onCallback={start => {
                    handleChange("date")({ target: { value: start } })
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    value={fields?.date?.format("DD MMM YYYY") || ""}
                  />
                </DateRangePicker>
              </FormGroup>
            </Col>
          </Row>
        </div>

        <div className="modal-footer">
          <button
            type="submit"
            className="btn btn-primary waves-effect"
            data-dismiss="modal"
          >
            {props.t("pay")}
          </button>

          <button
            type="button"
            onClick={toggle}
            className="btn btn-outline-secondary waves-effect"
            data-dismiss="modal"
          >
            {props.t("cancel")}
          </button>
        </div>
      </form>
    </Modal>
  )
}

PayModal.propTypes = {
  driverId: PropTypes.string,
  driver: PropTypes.object,
  loading: PropTypes.bool,
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

const mapStateToProps = ({ Settings, FD_Drivers }) => ({
  loading: FD_Drivers.loading,
  error: FD_Drivers.error,
  currency: Settings?.settings?.currency,
})

export default withTranslation()(
  connect(mapStateToProps, { onPostFdDriverPay: postFdDriverPay })(PayModal)
)
