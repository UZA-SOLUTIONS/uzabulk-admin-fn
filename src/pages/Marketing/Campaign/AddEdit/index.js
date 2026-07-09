import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
import Select from "react-select"
import moment from "moment"
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
  FormText,
  InputGroup,
} from "reactstrap"

import { addCampaign, getCampaign, putCampaign } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

//
import CampaignTemplates from "./CampaignTemplates"

const AddCampaign = ({
  accessLevel,
  history,
  error,
  onAddCampaign,
  onGetCampaign,
  onPutCampaign,
  campaign,
  loading,
  currentPlan,
  storeTypeEnabled,
  ...props
}) => {
  const { id } = useParams()
  const didMountRef = useRef(null)

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

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    name: "",
    templateType: "email",
    audianceType: "USER",
    audianceFilter: "registeredBefore",
    audianceFilterDate: "",
    scheduleDate: "",
    status: "active",
  })
  const [templateType, settemplateType] = useState({
    label: props.t("email"),
    value: "email",
  })
  const [audianceType, setaudianceType] = useState({
    label: props.t("customer"),
    value: "USER",
  })
  const [storeType, setstoreType] = useState([])
  const [audianceFilter, setaudianceFilter] = useState({
    label: props.t("register_before"),
    value: "registeredBefore",
  })
  const [parentTemplate, setparentTemplate] = useState(null)

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "CREATE":
          data.canAdd = item.value
          break

        case "UPDATE":
          data.canEdit = item.value
          break
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    if (id) {
      onGetCampaign(id)
    }
  }, [id])

  useEffect(() => {
    if (didMountRef.current) {
      try {
        setFields({
          name: campaign.name,
          templateType: campaign.template?.type || "email",
          template: campaign.template?._id,
          audianceFilterDate: campaign.audianceFilterDate
            ? moment(campaign.audianceFilterDate).format("YYYY-MM-DD")
            : "",
          audianceType: campaign.audianceType || "USER",
          audianceFilter: campaign.audianceFilter || "registeredBefore",
          storeType: campaign?.storeType?.map(item => item._id),
          scheduleDate:
            campaign.scheduledDate && campaign.scheduledTime
              ? moment(
                  campaign.scheduledDate + " " + campaign.scheduledTime
                ).format("YYYY-MM-DDTHH:mm")
              : "",
          status: campaign.status || "active",
        })

        if (campaign.template) {
          setparentTemplate({
            label: campaign.template.name,
            value: campaign.template._id,
          })
        }

        if (campaign.storeType) {
          setstoreType(
            campaign?.storeType?.map(item => ({
              label: item.label,
              value: item._id,
            }))
          )
        }

        switch (campaign.audianceFilter) {
          case "orderBefore":
            setaudianceFilter({
              label: props.t("order_before"),
              value: "orderBefore",
            })
            break

          case "orderAfter":
            setaudianceFilter({
              label: props.t("order_after"),
              value: "orderAfter",
            })
            break

          case "all":
            setaudianceFilter({
              label: props.t("all"),
              value: "all",
            })
            break

          case "registeredAfter":
            setaudianceFilter({
              label: props.t("register_after"),
              value: "registeredAfter",
            })
            break

          default:
            setaudianceFilter({
              label: props.t("register_before"),
              value: "registeredBefore",
            })
            break
        }

        switch (campaign.audianceType) {
          case "VENDOR":
            setaudianceType({
              label: props.t("vendor"),
              value: "VENDOR",
            })
            break

          case "DRIVER":
            setaudianceType({
              label: props.t("driver"),
              value: "DRIVER",
            })
            break

          default:
            setaudianceType({
              label: props.t("customer"),
              value: "USER",
            })
            break
        }

        if (campaign.template?.type === "email") {
          settemplateType({
            label: props.t("email"),
            value: "email",
          })
        } else if (campaign.template?.type === "push") {
          settemplateType({
            label: props.t("push_notification"),
            value: "push",
          })
        } else {
          settemplateType({
            label: props.t("sms"),
            value: "sms",
          })
        }
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(campaign)])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    let storeType = fields.storeType

    if (["basic", "premium"].includes(currentPlan?.billingPlan?.type)) {
      storeType = storeTypeEnabled?.map(item => item._id)
    }

    if (id) {
      if (!accesses.canEdit) return
      onPutCampaign(
        {
          _id: campaign._id,
          ...fields,
          template: parentTemplate?.value,
          scheduledDate: moment(fields.scheduleDate).format("YYYY-MM-DD"),
          scheduledTime: moment(fields.scheduleDate).format("HH:mm"),
          storeType,
        },
        history
      )
    } else {
      if (!accesses.canAdd) return
      onAddCampaign(
        {
          ...fields,
          template: parentTemplate?.value,
          scheduledDate: moment(fields.scheduleDate).format("YYYY-MM-DD"),
          scheduledTime: moment(fields.scheduleDate).format("HH:mm"),
          storeType,
        },
        history
      )
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Campaigns"
            breadcrumbItem={
              (id ? props.t("edit") : props.t("add")) +
              " " +
              props.t("campaign")
            }
            breadcrumbItems={[
              { title: props.t("campaigns"), link: "/campaigns" },
              { title: id ? props.t("edit") : props.t("add") },
            ]}
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Form onSubmit={onSubmit} className="spinner-content">
                    {error && typeof error === "string" ? (
                      <Alert color="danger">{props.t(error)}</Alert>
                    ) : null}

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-firstname-Input">
                            {props.t("name")}<span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="formrow-firstname-Input"
                            value={fields.name}
                            onChange={handleChange("name")}
                            required
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("template_type")}</Label>

                          <Select
                            options={[
                              { label: props.t("email"), value: "email" },
                              { label: props.t("sms"), value: "sms" },
                              {
                                label: props.t("push_notification"),
                                value: "push",
                              },
                            ]}
                            value={templateType}
                            onChange={data => {
                              settemplateType(data)
                              handleChange("templateType")({ target: data })
                              setparentTemplate(null)
                            }}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("template")}</Label>

                          <CampaignTemplates
                            fields={fields}
                            parentCampaignTemplate={parentTemplate}
                            setparentCampaignTemplate={setparentTemplate}
                            type={fields.templateType}
                            t={props.t}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("audiance_type")}</Label>

                          <Select
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
                            value={audianceType}
                            onChange={data => {
                              setaudianceType(data)
                              handleChange("audianceType")({ target: data })
                            }}
                          />
                        </FormGroup>
                      </Col>

                      {!["basic", "premium"].includes(
                        currentPlan?.billingPlan?.type
                      ) &&
                        fields.audianceType === "VENDOR" && (
                          <Col md={6}>
                            <FormGroup>
                              <Label>{props.t("store")}</Label>

                              <Select
                                options={storeTypeEnabled?.map(item => ({
                                  label: item.label,
                                  value: item._id,
                                }))}
                                value={storeType}
                                onChange={data => {
                                  setstoreType(data)
                                  handleChange("storeType")({
                                    target: {
                                      value: data?.map(item => item.value),
                                    },
                                  })
                                }}
                                isMulti={true}
                              />
                            </FormGroup>
                          </Col>
                        )}

                      <Col
                        sm={
                          [
                            "registeredBefore",
                            "registeredAfter",
                            "orderBefore",
                            "orderAfter",
                          ].includes(fields.audianceFilter)
                            ? 6
                            : 12
                        }
                        md={
                          [
                            "registeredBefore",
                            "registeredAfter",
                            "orderBefore",
                            "orderAfter",
                          ].includes(fields.audianceFilter)
                            ? 3
                            : 6
                        }
                      >
                        <FormGroup>
                          <Label>{props.t("audiance")}</Label>

                          <Select
                            options={[
                              {
                                label: props.t("register_before"),
                                value: "registeredBefore",
                              },
                              {
                                label: props.t("register_after"),
                                value: "registeredAfter",
                              },
                              ...(fields.audianceType === "USER"
                                ? [
                                    {
                                      label: props.t("order_before"),
                                      value: "orderBefore",
                                    },
                                    {
                                      label: props.t("order_after"),
                                      value: "orderAfter",
                                    },
                                  ]
                                : []),
                              { label: props.t("all"), value: "all" },
                            ]}
                            value={audianceFilter}
                            onChange={data => {
                              setaudianceFilter(data)
                              handleChange("audianceFilter")({ target: data })
                            }}
                          />
                        </FormGroup>
                      </Col>

                      {[
                        "registeredBefore",
                        "registeredAfter",
                        "orderBefore",
                        "orderAfter",
                      ].includes(fields.audianceFilter) && (
                        <Col sm={6} md={3}>
                          <FormGroup>
                            <Label>{props.t("date")}<span className="text-danger ml-1">*</span></Label>

                            <Input
                              type="date"
                              value={fields.audianceFilterDate}
                              onChange={handleChange("audianceFilterDate")}
                              required
                            />
                          </FormGroup>
                        </Col>
                      )}

                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-schedule_date-Input">
                            {props.t("schedule_date")}<span className="text-danger ml-1">*</span>
                          </Label>
                          <Input
                          className="datecolorsetting"
                            type="datetime-local"
                            id="formrow-schedule_date-Input"
                            value={fields.scheduleDate}
                            onChange={handleChange("scheduleDate")}
                            min={moment().format("YYYY-MM-DDTHH:mm")}
                            required
                          />

                          <FormText>
                            {props.t("campaign_schedule_date_int")}
                          </FormText>
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label>{props.t("status")}</Label>

                          <div className="status-switch square-switch">
                            <input
                              type="checkbox"
                              id="square-switch1"
                              switch="none"
                              checked={fields.status == "active"}
                              onChange={() => {
                                const value =
                                  fields.status == "active"
                                    ? "inactive"
                                    : "active"

                                handleChange("status")({ target: { value } })
                              }}
                            />
                            <label
                              htmlFor="square-switch1"
                              data-on-label={props.t("active")}
                              data-off-label={props.t("inactive")}
                            />
                          </div>
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

AddCampaign.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  campaign: PropTypes.object,
  onAddCampaign: PropTypes.func,
  onGetCampaign: PropTypes.func,
  onPutCampaign: PropTypes.func,
}

const mapStateToProps = ({ Settings, Campaigns, Billing, FD_Restaurants }) => ({
  error: Campaigns.error,
  loading: Campaigns.loading,
  campaign: Campaigns.campaign,
  currentPlan: Billing.currentPlan,
  vendor: FD_Restaurants.fdRestaurant,
  storeTypeEnabled: Settings.settings.storeTypeEnabled,
})

const mapDispatchToProps = dispatch => ({
  onAddCampaign: (data, history) => dispatch(addCampaign(data, history)),
  onGetCampaign: id => dispatch(getCampaign(id)),
  onPutCampaign: (data, history) => dispatch(putCampaign(data, history)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddCampaign))
)
