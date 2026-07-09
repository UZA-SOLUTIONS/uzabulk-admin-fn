import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams, Link } from "react-router-dom"
import { connect } from "react-redux"
import AnimateHeight from "react-animate-height"
import queryString from "query-string"
import FormButton from "components/Common/FormButtons"
import { usePermissions } from "helpers/permissions"
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
  UncontrolledTooltip,
  CardTitle,
} from "reactstrap"

import { GET_SERVICE_NAME, ROLES } from "helpers/contants"

import { addFdAttribute, getFdAttribute, putFdAttribute } from "store/actions"
import { SLUGS_NAME as slugname } from "helpers/contants" //Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

const AddAttribute = ({
  accessLevel,
  role,
  vendorId,
  history,
  error,
  onAddFdAttribute,
  onGetFdAttribute,
  onPutFdAttribute,
  fdAttribute,
  loading,
  activeStoreId,
  activeStoreType,
  slug,
  ...props
}) => {
  const { id, vendorId: _vendorIdParam } = useParams()
  const { vendor_name } = queryString.parse(props?.location?.search)
  console.log(slug, "gucci")
  const didMountRef = useRef(null)
  const hasPermission = usePermissions()
  const [vendorIdParam, setvendorIdPara] = useState()
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    storeTypeId: "",
    name: "",
    type: "select",
    status: "active",
    terms: [""],
    noPriceRequired: false,
  })
  const [terms, setTerms] = useState([""])

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
      if (!activeStoreId) return
      onGetFdAttribute(activeStoreId, id)
    }
  }, [id, activeStoreId])

  useEffect(() => {
    let vendor = ""
    // console.log(role, "OO");

    switch (role) {
      case ROLES.admin:
      case ROLES.staff:
        vendor =
          activeStoreType?.storeVendorType === "SINGLE"
            ? activeStoreType?.singleVendorId
            : _vendorIdParam
        break

      case ROLES.vendor:
        vendor = vendorId
        break
      case ROLES.subVendor:
        vendor = vendorId
        break

      default:
        break
    }

    if (vendor) {
      console.log(vendor, "Oo")
      setFields({ ...fields, storeTypeId: activeStoreId, vendor })
    }

    setvendorIdPara(vendor)
  }, [activeStoreId, role, vendorId, _vendorIdParam])

  useEffect(() => {
    if (didMountRef.current) {
      try {
        setFields({
          _id: fdAttribute._id,
          name: fdAttribute.name || "",
          type: fdAttribute.type || "select",
          status: fdAttribute.status || "active",
          noPriceRequired: fdAttribute?.noPriceRequired || "false",
          terms:
            fdAttribute.terms && fdAttribute.terms?.length > 0
              ? fdAttribute.terms?.map(term => term.name)
              : [""],
        })

        if (fdAttribute.terms?.length > 0) {
          setTerms(fdAttribute.terms?.map(term => term.name))
        } else {
          setTerms([""])
        }
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(fdAttribute)])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const addNewOption = event => {
    event.preventDefault()

    setTerms(prevOptions => [...prevOptions, ""])
    setFields(prevFields => ({
      ...prevFields,
      terms: [...prevFields.terms, ""],
    }))
  }

  function removeOption(e, index) {
    e.preventDefault()

    setTerms(prevOptions => [
      ...prevOptions.slice(0, index),
      ...prevOptions.slice(index + 1),
    ])
    setFields(prevFields => ({
      ...prevFields,
      terms: [
        ...prevFields.terms.slice(0, index),
        ...prevFields.terms.slice(index + 1),
      ],
    }))
  }

  const handleOptionChange =
    (name, index) =>
    ({ target }) => {
      let option = fields.terms[index]

      if (!option) {
        option = ""
      }

      option = target.value

      const options = [
        ...fields.terms.slice(0, index),
        option,
        ...fields.terms.slice(index + 1),
      ]

      setFields(prevState => ({ ...prevState, terms: options }))
    }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    if (id) {
      if (!accesses.canEdit) return
      onPutFdAttribute(
        { _id: fdAttribute._id, ...fields, storeTypeId: activeStoreId },
        history
      )
    } else {
      if (!accesses.canAdd) return
      onAddFdAttribute({ ...fields, storeTypeId: activeStoreId }, history)
    }
  }

  const content = (
    <Card>
      <CardBody>
        <Form onSubmit={onSubmit} className="spinner-content">
          {error && typeof error === "string" ? (
            <Alert color="danger">{error}</Alert>
          ) : null}

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="formrow-firstname-Input">
                  {props.t("name")}
                  <span className="text-danger ml-1">*</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="formrow-firstname-Input"
                  value={fields.name || ""}
                  onChange={handleChange("name")}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={6} xl={8}>
              <Card className="mb-3">
                <CardTitle>{props.t("options")}</CardTitle>

                <CardBody className="px-0 py-2">
                  <Row>
                    <Col md={12} className="d-none d-sm-block">
                      <Row>
                        <Col xs={8} sm={6} md={8}>
                          <Label>{props.t("name")}</Label>
                        </Col>

                        <Col xs={12} sm={4}>
                          <Label>{props.t("actions")}</Label>
                        </Col>
                      </Row>
                    </Col>

                    <Col md={12}>
                      {terms.map((name, index) => (
                        <React.Fragment key={name + "-" + index}>
                          <Row className="mb-3 mb-sm-2">
                            <Col xs={12} sm={6} md={8} className="pb-3 pb-sm-0">
                              <Label className="d-sm-none">
                                {props.t("name")}
                                <span className="text-danger ml-1">*</span>
                              </Label>

                              <Input
                                type="text"
                                className="form-control"
                                value={fields?.terms[index] || ""}
                                onChange={handleOptionChange("name", index)}
                                required
                              />
                            </Col>

                            <Col xs={12} sm={4} className="">
                              <Label className="d-sm-none">
                                {props.t("actions")}
                              </Label>

                              <div className="d-flex align-items-center">
                                {index === terms.length - 1 && (
                                  <Link
                                    to={`#`}
                                    onClick={addNewOption}
                                    className="mr-3 text-primary"
                                  >
                                    <i
                                      className="bx bx-plus font-size-22 mr-3"
                                      id="addoptiontooltip"
                                    />
                                  </Link>
                                )}

                                <Link
                                  disabled={terms?.length === 1}
                                  to={`#`}
                                  onClick={event => {
                                    event.preventDefault()

                                    terms?.length > 1 &&
                                      removeOption(event, index)
                                  }}
                                  className={
                                    terms?.length === 1
                                      ? "text-secondary"
                                      : "text-danger"
                                  }
                                >
                                  <i
                                    className="bx bx-trash font-size-22"
                                    id="removeoptiontooltip"
                                  />
                                </Link>
                              </div>
                            </Col>
                          </Row>

                          <hr className="d-block d-sm-none" />
                        </React.Fragment>
                      ))}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={6} sm={6} md={3}>
              <FormGroup>
                <Label>{props.t("status")}</Label>

                <div className="switch-xl square-switch">
                  <input
                    type="checkbox"
                    id="status-switch1"
                    switch="none"
                    checked={fields.status == "active"}
                    onChange={() => {
                      const value =
                        fields.status == "active" ? "inactive" : "active"

                      handleChange("status")({ target: { value } })
                    }}
                  />
                  <label
                    htmlFor="status-switch1"
                    data-on-label={props.t("active")}
                    data-off-label={props.t("inactive")}
                  />
                </div>
              </FormGroup>
            </Col>

            {[slugname.lemonee].includes(slug) && (
              <Col xs={6} sm={6} md={3}>
                <FormGroup>
                  <Label>{props.t("Price_Required")}</Label>

                  <div className="switch-xl square-switch">
                    <input
                      type="checkbox"
                      id="priceRequired"
                      switch="none"
                      checked={fields.noPriceRequired == true}
                      onChange={() => {
                        const value =
                          fields.noPriceRequired == true ? false : true

                        handleChange("noPriceRequired")({ target: { value } })
                      }}
                    />
                    <label
                      htmlFor="priceRequired"
                      data-on-label={props.t("true")}
                      data-off-label={props.t("false")}
                    />
                  </div>
                </FormGroup>
              </Col>
            )}
          </Row>

          <FormButton
            needSubmit={
              id
                ? accesses.canEdit && hasPermission("STORE.attribute.UPDATE")
                : accesses.canAdd && hasPermission("STORE.attribute.CREATE")
            }
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
  )

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col sm={1} lg={2}></Col>
            <Col sm={10} lg={8}>
              <Breadcrumbs
                breadcrumbItem={`${!id ? "Add" : "Edit"} Attribute`}
                breadcrumbItems={[
                  ...(activeStoreType?.storeVendorType !== "SINGLE" &&
                  role !== ROLES.vendor &&
                  role !== ROLES.subVendor
                    ? [
                        {
                          title:
                            GET_SERVICE_NAME({
                              storeType: activeStoreType?.storeType,
                            }) + "s",
                          link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                            {
                              storeType: activeStoreType?.storeType,
                            }
                          ).toLowerCase()}s`,
                        },
                        {
                          title:
                            (role === ROLES.vendor || role === ROLES.subVendor
                              ? props.vendor_name
                              : vendor_name) || props.t("profile"),
                          link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                            {
                              storeType: activeStoreType?.storeType,
                            }
                          ).toLowerCase()}s/${
                            role === ROLES.vendor
                              ? props?.vendorId
                              : vendorIdParam
                          }/profile`,
                        },
                        {
                          title: props.t("attributes"),
                          link: `/${activeStoreType?.storeType?.toLowerCase()}/attributes/${vendorIdParam}`,
                        },
                      ]
                    : [
                        {
                          title: props.t("attributes"),
                          link: `/${activeStoreType?.storeType?.toLowerCase()}/attributes`,
                        },
                      ]),

                  {
                    title: props.t(id ? "edit" : "add"),
                  },
                ]}
              />
            </Col>
            <Col sm={1} lg={2}></Col>
          </Row>

          <Row>
            <Col sm={1} lg={2}></Col>
            <Col sm={10} lg={8}>
              {content}
            </Col>
            <Col sm={1} lg={2}></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

AddAttribute.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  fdAttribute: PropTypes.object,
  onAddFdAttribute: PropTypes.func,
  onGetFdAttribute: PropTypes.func,
  onPutFdAttribute: PropTypes.func,
}

const mapStateToProps = ({ Login, FD_Attributes, Settings }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  vendor_name: Login?.user?.name,
  error: FD_Attributes.error,
  loading: FD_Attributes.loading,
  fdAttribute: FD_Attributes.fdAttribute,
  slug: Settings?.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onAddFdAttribute: (data, history) => dispatch(addFdAttribute(data, history)),
  onGetFdAttribute: (storeType, id) => dispatch(getFdAttribute(storeType, id)),
  onPutFdAttribute: (data, history) => dispatch(putFdAttribute(data, history)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddAttribute))
)
