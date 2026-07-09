import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  Input,
  FormGroup,
  Label,
  Spinner,
  Alert,
} from "reactstrap"
import Select from "react-select"

//i18n
import { withTranslation } from "react-i18next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"
import { getTerminologies, putTerminology } from "store/actions"

// Components
import NotFound from "pages/Utility/pages-404-content"

import { LANGUAGES, USER_TYPES } from "helpers/contants"

const Terminologies = ({
  accessLevel,
  history,
  error,
  success,
  terminologies,
  totalTerminologies,
  onGetTerminologies,
  onPutTerminology,
  loading,
  storeTypeEnabled,
  languages,
  terminologyType,
  allLanguages,
  ...props
}) => {
  if (
    !props.settings?.hideThings?.find(
      element => element.type === "isTerminology"
    )?.value
  ) {
    return <NotFound />
  }

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canBlock: false,
  })
  const [terminologiesList, setterminologiesList] = useState([])
  const [filter, setfilter] = useState({ lang: "en", type: "customers" })
  const [isbasicplan, setisbasicplan] = useState(false)
  const [isDeliveryType, setisDeliveryType] = useState(false)




  // for text areas on click input
  // const [textFields, setTextFields] = useState("false")

  // console.log("textFields", textFields)

  // const textIndex = index => {
  //   setTextFields(index, "true")
  // }

  useEffect(() => {
    setisbasicplan(props.currentPlan?.billingPlan?.type === "basic")
  }, [props.currentPlan])

  useEffect(() => {
    let storeType

    if (["basic", "premium"].includes(props.currentPlan?.billingPlan?.type)) {
      storeType = storeTypeEnabled[0]
    }

    if (!!storeType && ["TAXI", "PICKUPDROP"].includes(storeType.storeType)) {
      setisDeliveryType(true)
    } else {
      setisDeliveryType(props?.vendor?.deliveryType?.includes("DELIVERY"))
    }
  }, [props.vendor, props.currentPlan, storeTypeEnabled])

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canBlock: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
      canDelete: false,
      canBlock: false,
    }

    accessLevel?.map(item => {
      switch (item.label) {
        case "CREATE":
          data.canAdd = item.value
          break

        case "UPDATE":
          data.canEdit = item.value
          break

        case "DELETE":
          data.canDelete = item.value
          break

        case "BLOCK":
          data.canBlock = item.value
          break
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    onGetTerminologies(filter)
    setterminologiesList([])
  }, [filter])

  useEffect(() => {
    setterminologiesList(terminologies?.values || [])
  }, [terminologies])

  const languageChecker = () => {
    // if superadmin doesnot select languages for it ..it will show all languages

    if (languages.length < 1) {
      return allLanguages
    } else {
      return languages
    }
  }

  const handlefilterChange =
    name =>
    ({ target }) => {
      setfilter(prevState => ({ ...prevState, [name]: target.value }))
    }

  const handleChange =
    (index, name) =>
    ({ target }) => {
      setterminologiesList(prevState => [
        ...prevState.slice(0, index),
        { ...prevState[index], [name]: target.value },
        ...prevState.slice(index + 1),
      ])
    }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    if (!accesses.canEdit) return
    onPutTerminology(
      { _id: terminologies._id, values: terminologiesList },
      history
    )
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Terminology"
            breadcrumbItem={props.t("terminology")}
            breadcrumbItems={[{ title: props.t("terminology") }]}
          />

          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>{props.t("language")}</Label>

                        <Select
                          options={languageChecker()}
                          defaultValue={
                            languageChecker()?.filter(
                              item => item.value === filter.lang
                            )[0]
                          }
                          onChange={data => {
                            handlefilterChange("lang")({ target: data })
                          }}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label>{props.t("user_type")}</Label>

                        <Select
                          options={terminologyType.filter(item => {
                            if (
                              item.value === "order" &&
                              isbasicplan &&
                              !!storeTypeEnabled[0] &&
                              ["TAXI", "PICKUPDROP"].includes(
                                storeTypeEnabled[0]?.storeType?.toUpperCase()
                              )
                            ) {
                              return false
                            }

                            if (item.value === "trip") {
                              return false
                            }

                            if (item.value === "drivers") {
                              return false
                            }

                            return true
                          })}
                          defaultValue={
                            terminologyType?.filter(
                              item => item.value === filter.type
                            )[0]
                          }
                          onChange={data => {
                            handlefilterChange("type")({ target: data })
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col xs="12">
              <Card>
                <CardBody>
                  <Form onSubmit={onSubmit} className="spinner-content">
                    {error && typeof error === "string" ? (
                      <Alert color="danger">{error}</Alert>
                    ) : null}
                    {success && typeof success === "string" ? (
                      <Alert color="success">{success}</Alert>
                    ) : null}

                    <Row>
                      {terminologiesList?.map((terminology, index) => (
                        <Col key={index} md={4}>
                          <FormGroup>
                            <Label
                              for={`formrow-${terminology.constant}-Input`}
                            >
                              {terminology.label}
                            </Label>



                            {/* for text area */}

                            {/* {textFields == index ? (
                              (console.log("index", terminology.index),
                              (
                                <textarea
                                  type="text"
                                  id={`formrow-${terminology.constant}-Input`}
                                  value={terminology.value}
                                  onChange={handleChange(index, "value")}
                                />
                              ))
                            ) : ( */}
                            <Input
                              type="text"
                              id={`formrow-${terminology.constant}-Input`}
                              value={terminology.value}
                              onChange={handleChange(index, "value")}
                            />
                            {/* )} */}
                          </FormGroup>
                        </Col>
                      ))}
                    </Row>

                    <div className="mt-4 d-flex flex-wrap flex-column flex-sm-row">
                      {accesses.canEdit && (
                        <button
                          type="submit"
                          className="btn btn-primary w-md mb-2"
                        >
                          {props.t("submit")}
                        </button>
                      )}

                      {/*  <button
                        type="button"
                        className="btn outline btn-outline-secondary w-md ml-3"
                        onClick={() => history.goBack()}
                      >
                        <i className="mdi mdi-arrow-left mr-1"></i>
                        {props.t("back")}
                      </button> */}
                    </div>

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

Terminologies.propTypes = {
  error: PropTypes.string,
  terminologies: PropTypes.array,
  totalTerminologies: PropTypes.number,
  onGetTerminologies: PropTypes.func,
  onPutTerminology: PropTypes.func,
}

const mapStateToProps = ({
  Login,
  Settings,
  terminologies,
  Billing,
  FD_Restaurants,
}) => ({
  terminologyType: Login.terminologyType,
  languages:
    Settings.settings.storeLanguage?.map(item => ({
      label: item.name,
      value: item.code,
    })) || [],
  allLanguages:
    Login.languages?.map(item => ({ label: item.name, value: item.code })) ||
    [],
  settings: Settings.settings,
  error: terminologies.error,
  success: terminologies.success,
  loading: terminologies.loading,
  terminologies: terminologies.terminologies,
  totalTerminologies: terminologies.totalTerminologies,
  currentPlan: Billing.currentPlan,
  vendor: FD_Restaurants.fdRestaurant,
  storeTypeEnabled: Settings.settings.storeTypeEnabled,
})

const mapDispatchToProps = dispatch => ({
  onGetTerminologies: data => dispatch(getTerminologies(data)),
  onPutTerminology: (data, callback) =>
    dispatch(putTerminology(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Terminologies))
)
