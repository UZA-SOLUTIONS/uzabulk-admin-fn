import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
import Select from "react-select"
import FormButton from "components/Common/FormButtons"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
} from "reactstrap"

import { postNotification } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

import StoreTypes from "./StoreTypes"

const AddNotification = ({
  accessLevel,
  history,
  error,
  onPostNotification,
  loading,
  currentPlan,
  storeTypeEnabled,
  ...props
}) => {
  const { id } = useParams()

  const [accesses, setaccesses] = useState({
    canAdd: false,
  })
  const [fields, setFields] = useState({
    storeTypeId: null,
    type: null,
    title: "",
    body: "",
  })
  const [isDeliveryType, setisDeliveryType] = useState(false)

  useEffect(() => {
    let storeType

    if (["basic", "premium"].includes(currentPlan?.billingPlan?.type)) {
      storeType = storeTypeEnabled[0]
    }

    if (!!storeType && ["TAXI", "PICKUPDROP"].includes(storeType.storeType)) {
      setisDeliveryType(true)
    } else {
      setisDeliveryType(props?.vendor?.deliveryType?.includes("DELIVERY"))
    }
  }, [props.vendor, currentPlan, storeTypeEnabled])

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "CREATE":
          data.canAdd = item.value
          break
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return
    if (!accesses.canAdd) return

    onPostNotification(
      {
        ...fields,
        storeTypeId: fields?.storeTypeId?.value,
        type: fields?.type?.value,
      },
      history
    )
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Content Pages"
            breadcrumbItem={props.t("Send") + " " + props.t("Notification")}
            breadcrumbItems={[
              { title: props.t("notifications"), link: "/notifications" },
              { title: props.t("send") },
            ]}
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Form onSubmit={onSubmit} className="spinner-content">
                    {error && typeof error === "string" ? (
                      <Alert color="danger">{error}</Alert>
                    ) : null}

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("type")}</Label>

                          <Select
                            classNamePrefix="select-notificationtype"
                            options={
                              currentPlan?.billingPlan?.type === "basic"
                                ? isDeliveryType
                                  ? [
                                      {
                                        label: props.t("customers"),
                                        value: "USER",
                                      },
                                      {
                                        label: props.t("drivers"),
                                        value: "DRIVER",
                                      },
                                    ]
                                  : [
                                      {
                                        label: props.t("customers"),
                                        value: "USER",
                                      },
                                    ]
                                : [
                                    {
                                      label: props.t("customers"),
                                      value: "USER",
                                    },
                                    {
                                      label: props.t("vendors"),
                                      value: "VENDOR",
                                    },
                                    {
                                      label: props.t("drivers"),
                                      value: "DRIVER",
                                    },
                                  ]
                            }
                            value={fields?.type}
                            onChange={data =>
                              setFields(prevState => ({
                                ...prevState,
                                type: data,
                              }))
                            }
                          />
                        </FormGroup>
                      </Col>

                      {["VENDOR"].includes(fields?.type?.value) && (
                        <Col md={6}>
                          <FormGroup>
                            <Label>{props.t("store")}</Label>

                            <StoreTypes
                              parentStoreType={fields?.storeTypeId}
                              setparentStoreType={data =>
                                setFields(prevState => ({
                                  ...prevState,
                                  storeTypeId: data,
                                }))
                              }
                            />
                          </FormGroup>
                        </Col>
                      )}
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("title")}<span className="text-danger ml-1">*</span></Label>

                          <Input
                            required
                            value={fields?.title}
                            onChange={handleChange("title")}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("body")}<span className="text-danger ml-1">*</span></Label>

                          <Input
                            required
                            type="textarea"
                            rows={5}
                            value={fields?.body}
                            onChange={handleChange("body")}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormButton
                      needSubmit={id ? accesses.canEdit : accesses.canAdd}
                      goBack={() => history.goBack()}
                    />

                    {loading && (
                      <div className="spinner">
                        <Spinner color="primary" />
                      </div>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

AddNotification.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  onPostNotification: PropTypes.func,
}

const mapStateToProps = ({
  notifications,
  Billing,
  FD_Restaurants,
  Settings,
}) => ({
  error: notifications.error,
  loading: notifications.loading,
  currentPlan: Billing.currentPlan,
  vendor: FD_Restaurants.fdRestaurant,
  storeTypeEnabled: Settings.settings.storeTypeEnabled,
})

const mapDispatchToProps = dispatch => ({
  onPostNotification: (data, history) =>
    dispatch(postNotification(data, history)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(AddNotification))
)
