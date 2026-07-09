import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Modal, Row, Col, Spinner, Alert } from "reactstrap"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"

import { postFdOrderRefund } from "store/actions"

//i18n
import { withTranslation } from "react-i18next"

import {} from "helpers/contants"

import ListColumns from "./ListColumns"

const RefundModal = props => {
  const { loading, error, currency, isOpen, toggle, data } = props

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      autoFocus={true}
      centered={true}
      toggle={toggle}
    >
      {loading && (
        <div className="spinner">
          <Spinner />
        </div>
      )}

      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myModalLabel">
          {props.t("refund_transactions")}
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
          <Col md={12}>
            <ToolkitProvider
              keyField="_id"
              data={data}
              columns={ListColumns(props.t, currency)}
              bootstrap4
              search
            >
              {toolkitProps => (
                <div className="table-responsive spinner-content">
                  <BootstrapTable
                    responsive
                    remote
                    bordered={false}
                    striped={false}
                    classes={"table table-centered table-nowrap"}
                    headerWrapperClasses={"thead-light"}
                    {...toolkitProps.baseProps}
                  />

                  {loading && (
                    <div className="spinner">
                      <Spinner color="primary" />
                    </div>
                  )}
                </div>
              )}
            </ToolkitProvider>
          </Col>
        </Row>
      </div>
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
