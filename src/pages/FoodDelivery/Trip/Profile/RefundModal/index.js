import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  UncontrolledTooltip,
  Spinner,
  Alert,
} from "reactstrap"
import Select from "react-select"

import { postFdOrderRefund } from "store/actions"

//i18n
import { withTranslation } from "react-i18next"

import { GET_SERVICE_NAME } from "helpers/contants"

const RefundModal = props => {
  const {
    orderId,
    loading,
    error,
    currency,
    isOpen,
    toggle,
    storeType,
    hasDriver,
    earnings,
    postFdOrderRefund,
    onConfirm: _onConfirm,
  } = props

  // const [types, settypes] = useState([])
  const [selectedOption, setselectedOption] = useState({
    label: "All",
    value: "all",
  })
  const [fields, setfields] = useState({
    admin: 0,
    driver: 0,
    reason: "",
  })

  useEffect(() => {
    return () => {
      setfields({ admin: 0, driver: 0, reason: "" })
    }
  }, [isOpen])

  /* useEffect(() => {
    const _types = [
      { label: props.t("All"), value: "all" },
      { label: props.t("Admin"), value: "admin" },
      { label: props.t(GET_SERVICE_NAME({ storeType })), value: "vendor" },
    ]

    if (hasDriver) {
      _types.push({ label: props.t("Driver"), value: "driver" })
    }

    settypes(_types)
  }, [storeType, hasDriver]) */

  const handleChange = name => e => {
    const { value } = e.target

    if (earnings[name] < value) return

    setfields(prevState => ({ ...prevState, [name]: value }))
  }

  const onConfirm = data => {
    if (loading) return

    postFdOrderRefund(
      {
        _id: orderId,
        adminAmount: data?.admin,
        driverAmount: data?.driver,
        reason: data?.reason,
      },
      _onConfirm
    )
  }

  const fillAmount = (name, value) => e => {
    e.preventDefault()

    if (value !== undefined) {
      setfields(prevState => ({ ...prevState, [name]: value }))
    } else {
      setfields(prevState => ({ ...prevState, [name]: earnings[name] }))
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
          onConfirm && onConfirm({ ...fields, type: selectedOption?.value })
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
            {props.t("refund_amount")}
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

        <div className="modal-body variations">
          {error && typeof error === "string" ? (
            <Alert color="danger">{error}</Alert>
          ) : null}

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>{props.t("admin_amount")}</Label>

                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{currency?.sign || "$"}</InputGroupText>
                  </InputGroupAddon>

                  <Input
                    type="number"
                    value={fields?.admin}
                    onChange={handleChange("admin")}
                    step={0.01}
                    min={0}
                  />
                  {fields?.admin > 0 && (
                    <InputGroupAddon addonType="append">
                      <InputGroupText className="border-left-0 bg-white">
                        <Link
                          className="float-right p-0 waves-effect waves-light"
                          to="#"
                          onClick={fillAmount("admin", "")}
                        >
                          X
                        </Link>
                      </InputGroupText>
                    </InputGroupAddon>
                  )}
                </InputGroup>

                <span className="w-100">
                  <span className="text-muted">
                    {props.t("max_amount")} {currency?.sign || "$"}
                    {earnings?.admin}
                  </span>

                  <Link
                    className="float-right py-0 waves-effect waves-light btn-sm"
                    to="#"
                    onClick={fillAmount("admin")}
                  >
                    {props.t("fill_amount")}
                  </Link>
                </span>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("driver_amount")}</Label>

                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{currency?.sign || "$"}</InputGroupText>
                  </InputGroupAddon>

                  <Input
                    type="number"
                    value={fields?.driver}
                    onChange={handleChange("driver")}
                    step={0.01}
                    min={0}
                  />

                  {fields?.driver > 0 && (
                    <InputGroupAddon addonType="append">
                      <InputGroupText className="border-left-0 bg-white">
                        <Link
                          className="float-right p-0 waves-effect waves-light"
                          to="#"
                          onClick={fillAmount("driver", "")}
                        >
                          X
                        </Link>
                      </InputGroupText>
                    </InputGroupAddon>
                  )}
                </InputGroup>

                <span className="w-100">
                  <span className="text-muted">
                    {props.t("max_amount")} {currency?.sign || "$"}
                    {earnings?.driver}
                  </span>

                  <Link
                    className="float-right py-0 waves-effect waves-light btn-sm"
                    to="#"
                    onClick={fillAmount("driver")}
                  >
                    {props.t("fill_amount")}
                  </Link>
                </span>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>{props.t("reason")}<span className="text-danger ml-1">*</span></Label>

                <Input
                  required
                  type="textarea"
                  value={fields?.reason}
                  onChange={handleChange("reason")}
                />
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
            {props.t("refund")}
          </button>

          <button
            type="button"
            onClick={toggle}
            className="btn btn-secondary waves-effect"
            data-dismiss="modal"
            onClick={toggle}
          >
            {props.t("close")}
          </button>
        </div>
      </form>
    </Modal>
  )
}

RefundModal.propTypes = {
  orderId: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

const mapStateToProps = ({ Settings, FD_Orders }) => ({
  loading: FD_Orders.loading,
  error: FD_Orders.error,
  currency: Settings?.settings?.currency,
})

export default withTranslation()(
  connect(mapStateToProps, { postFdOrderRefund })(RefundModal)
)
