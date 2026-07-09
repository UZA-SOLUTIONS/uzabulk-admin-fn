import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Modal, Row, Col, FormGroup, Label, Spinner, Alert } from "reactstrap"
import Select from "react-select"

import { postFdOrderStatus } from "store/actions"

//i18n
import { withTranslation } from "react-i18next"

import { SERVICE_STATUS } from "helpers/contants"

const RefundModal = props => {
  const {
    orderId,
    orderDetails,
    loading,
    error,
    isOpen,
    toggle,
    postFdOrderStatus,
    onConfirm: _onConfirm,
  } = props

  // const [types, settypes] = useState([])
  const [orderStatus, setorderStatus] = useState({
    label: "",
    value: "",
  })

  useEffect(() => {
    if (orderDetails.orderStatus) {
      let orderStatus = SERVICE_STATUS?.find(
        item => item === orderDetails.orderStatus
      )

      if (orderStatus) {
        setorderStatus({ label: props.t(orderStatus), value: orderStatus })
      }
    }

    return () => {
      setorderStatus({ label: "", value: "" })
    }
  }, [orderDetails])

  const onConfirm = () => {
    if (loading) return

    if (orderStatus.value) {
      postFdOrderStatus(
        {
          _id: orderId,
          orderStatus: orderStatus.value,
        },
        _onConfirm
      )
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
          onConfirm && onConfirm()
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
            {props.t("change_order_status")}
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
                <Label>{props.t("order_status")}</Label>

                <Select
                  options={SERVICE_STATUS.map(value => ({
                    label: props.t(value),
                    value,
                  }))}
                  onChange={data => setorderStatus(data)}
                  value={orderStatus}
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
            {props.t("submit")}
          </button>

          <button
            type="button"
            onClick={toggle}
            className="btn btn-secondary waves-effect"
            data-dismiss="modal"
            // onClick={toggle}
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

const mapStateToProps = ({ FD_Orders }) => ({
  loading: FD_Orders.loading,
  error: FD_Orders.error,
})

export default withTranslation()(
  connect(mapStateToProps, { postFdOrderStatus })(RefundModal)
)
