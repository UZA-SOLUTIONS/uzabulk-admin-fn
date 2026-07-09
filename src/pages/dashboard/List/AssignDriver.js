import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import {
  Card,
  CardBody,
  CardText,
  Button,
  Alert,
  Modal,
  FormGroup,
  Input,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"

import { postRequestDrivers, putAssignDriver } from "store/actions"

const AssignDriver = ({
  onPutAssignDriver,
  onPostRequestDrivers,
  neardrivers,
  ...props
}) => {
  const { setOpen, data, id, setOrderDetails } = props

  const [visible, setVisble] = useState(false)
  const [order, setOrder] = useState(null)
  const [availableDriver, setAvailableDriver] = useState([])

  const closeModal = status => {
    setVisble(false)
    setOpen(status)
  }

  const assignDriver = () => {
    const driver = {
      driver: order,
    }

    const callback = () => {
      closeModal(false)
      setOrder(null)
    }
    onPutAssignDriver(id, driver, callback)
  }

  useEffect(() => {
    const obj = {
      order: id,
    }
    onPostRequestDrivers(obj)
  }, [id])

  useEffect(() => {
    props.apiStatus?.status && setVisble(true)
  }, [props.apiStatus])

  useEffect(() => {
    setAvailableDriver(neardrivers.data)
  }, [neardrivers])

  return (
    <Fragment>
      <Modal
        size="md"
        isOpen={true}
        toggle={() => {
          closeModal(false)
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="mySmallModalLabel">
            {props.t("assign")} {props.t("driver")}
          </h5>
          <button
            onClick={() => {
              closeModal(false)
            }}
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Card>
            <CardBody>
              {!!data && (
                <>
                  <CardText>
                    <FormGroup>
                      <Input
                        type="select"
                        name="orderId"
                        onChange={({ target }) => {
                          setOrder(target.value)
                        }}
                      >
                        <option value="">{props.t("select_driver")}</option>
                        {availableDriver?.map(s => {
                          return <option value={s._id}>{s.name}</option>
                        })}
                      </Input>
                    </FormGroup>
                  </CardText>
                </>
              )}

              <CardText>
                <Alert
                  color={`${
                    props.apiStatus?.status === "failure" ? "danger" : "success"
                  }`}
                  className="alert-dismissible fade show"
                  role="alert"
                  isOpen={visible}
                  toggle={() => setVisble(false)}
                >
                  {props.apiStatus?.message}
                </Alert>
              </CardText>
            </CardBody>
          </Card>
        </div>
        <div className="modal-footer">
          <Button
            type="button"
            outline
            color="secondary"
            onClick={() => {
              closeModal(false)
            }}
          >
            {props.t("no_cancel")}
          </Button>

          {!!data ? (
            <Button
              type="button"
              color="primary"
              disabled={!order && !props.orderDetails}
              onClick={() => {
                assignDriver()
              }}
            >
              {props.t("assign")} {props.t("driver")}
            </Button>
          ) : (
            <Button
              type="button"
              color="primary"
              disabled={!order}
              onClick={() => {
                setOrderDetails(props.orders?.find(item => item._id === order))
                closeModal()
              }}
            >
              {props.t("select")} {props.t("order")}
            </Button>
          )}
        </div>
      </Modal>
    </Fragment>
  )
}

const mapStateToProps = state => {
  const { Settings, Dispatch } = state
  return {
    storeTypes: Settings.settings.storeTypeEnabled,
    neardrivers: Dispatch.drivers,
  }
}

const mapDispatchToProps = dispatch => ({
  onPutAssignDriver: (id, data, callback) =>
    dispatch(putAssignDriver(id, data, callback)),
  onPostRequestDrivers: data => dispatch(postRequestDrivers(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(AssignDriver))
