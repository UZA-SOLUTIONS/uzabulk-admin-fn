import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect, useSelector } from "react-redux"
import { map } from "lodash"
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

import { getAccessList, addRole, getRole, putRole } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

import AccessHelper from "./AccessHelper"

const filterPermissionsHerlper = (permissions, storeType) => {
  let _permissions = []

  map(permissions, store => {
    if (store.storeType && !storeType?.includes(store.storeType)) return

    if (store.type === "storetypes") {
      _permissions.push({
        label: store.label,
        type: store.type,
        storeTypes: filterPermissionsHerlper(store?.storeTypes, storeType),
      })
    } else {
      _permissions.push(store)
    }
  })

  return _permissions
}

const mixPermissionsHelper = (
  prevPermissions,
  newPermissions,
  storeType,
  isStoreType = false
) => {
  let permissions = []

  map(newPermissions, store => {
    if (store.storeType && !storeType?.includes(store.storeType)) return
    const _storeIndex = prevPermissions?.findIndex(item =>
      isStoreType
        ? item.storeType === store.storeType
        : item.type === store.type
    )

    if (_storeIndex === -1) {
      permissions.push(store)
    } else {
      if (store.type === "storetypes") {
        permissions.push({
          label: store.label,
          type: store.type,
          storeTypes: mixPermissionsHelper(
            prevPermissions[_storeIndex]?.storeTypes,
            store?.storeTypes,
            storeType,
            true
          ),
        })
      } else {
        permissions.push(prevPermissions[_storeIndex])
      }
    }
  })

  return permissions
}

const AddRole = ({
  history,
  storeType,
  error,
  accessList,
  onGetAccessList,
  onAddRole,
  onGetRole,
  onPutRole,
  role,
  loading,
  currentPlan,
  activeStoreType,
  ...props
}) => {
  const { id } = useParams()
  const didMountRef = useRef(null)
  const accessTimeout = useRef(null)
  console.log(history, "ghdfgfgf")
  const [fields, setFields] = useState({
    name: "",
    permissions: accessList,
    status: "active",
  })
  const [isDeliveryType, setisDeliveryType] = useState(false)
  const User = useSelector(s => s?.Login?.user)
  const vendorrole = User?.role || ""
  useEffect(() => {
    let _storeType

    if (["basic", "premium"].includes(currentPlan?.billingPlan?.type)) {
      _storeType = storeType[0]
    }

    if (!!_storeType && ["TAXI", "PICKUPDROP"].includes(_storeType.storeType)) {
      setisDeliveryType(true)
    } else {
      setisDeliveryType(props?.vendor?.deliveryType?.includes("DELIVERY"))
    }
  }, [props.vendor, currentPlan, storeType])

  useEffect(() => {
    onGetAccessList()

    if (id) {
      onGetRole(id)
    }
  }, [id])

  useEffect(() => {
    if (didMountRef.current) {
      try {
        setFields({
          name: role.name || "",
          permissions: role.permissions || [],
          status: role.status || "active",
        })
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(role)])

  useEffect(() => {
    if (id) return

    const _permissions = filterPermissionsHerlper(
      accessList || [],
      storeType?.map(store => store.storeType)
    )

    setFields(prevState => ({ ...prevState, permissions: _permissions }))
  }, [JSON.stringify(accessList)])

  useEffect(() => {
    if (!id) return

    if (didMountRef.current) {
      /* if (accessTimeout.current) {
        accessTimeout.current = null
        clearTimeout(accessTimeout.current)
      } */
      /* accessTimeout.current = setTimeout(() => { */
      const _list = mixPermissionsHelper(
        role?.permissions || [],
        accessList,
        storeType?.map(item => item?.storeType)
      )

      setFields(prevState => ({ ...prevState, permissions: _list }))
      /* }, 1000) */
    }

    return () => {
      /* if (accessTimeout.current) {
        accessTimeout.current = null
        clearTimeout(accessTimeout.current)
      } */
    }
  }, [JSON.stringify(accessList), JSON.stringify(role)])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleAccessChange = index => newObject => {
    /* console.log(index, newObject)
    return */
    setFields(prevState => ({
      ...prevState,
      permissions: [
        ...prevState.permissions?.slice(0, index),
        {
          ...prevState.permissions[index],
          ...newObject,
        },
        ...prevState.permissions?.slice(index + 1),
      ],
    }))
  }
  const lowerCaseStoreType = activeStoreType?.storeType.toLowerCase()

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return

    if (id) {
      onPutRole(
        { _id: role._id, ...fields },
        history,
        vendorrole,
        lowerCaseStoreType
      )
    } else {
      onAddRole({ ...fields }, history, vendorrole, lowerCaseStoreType)
    }
  }
  console.log(storeType, "anmol")

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Roles"
            breadcrumbItem={
              (id ? props.t("edit") : props.t("add")) + " " + props.t("role")
            }
            breadcrumbItems={[
              {
                title: props.t("roles"),
                link:
                  vendorrole !== "VENDOR"
                    ? "/roles"
                    : `/${lowerCaseStoreType}/roles`,
              },
              { title: id ? props.t("edit") : props.t("add") },
            ]}
          />

          <Form onSubmit={onSubmit} className="spinner-content">
            {error && typeof error === "string" ? (
              <Alert color="danger">{error}</Alert>
            ) : null}

            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="formrow-firstname-Input">
                            {props.t("name")}
                            <span className="text-danger ml-1">*</span>
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
                  </CardBody>
                </Card>
              </Col>

              <Col xs={12}>
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0 font-size-18">
                    {props.t(`permissions`)}
                  </h4>
                </div>
              </Col>

              <AccessHelper
                list={fields?.permissions}
                handleChange={handleAccessChange}
                storeType={storeType}
                currentPlan={props.currentPlan}
                isDeliveryType={isDeliveryType}
                activeStoreType={activeStoreType}
              />
            </Row>

            <FormButton goBack={() => history.goBack()} />

            {loading && (
              <div className="spinner">
                <Spinner color="primary" />
              </div>
            )}
          </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

AddRole.propTypes = {
  storeType: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  role: PropTypes.object,
  onGetAccessList: PropTypes.func,
  onAddRole: PropTypes.func,
  onGetRole: PropTypes.func,
  onPutRole: PropTypes.func,
}

const mapStateToProps = ({ Settings, roles, Billing, FD_Restaurants }) => ({
  accessList: Settings.accessList,
  storeType: Settings?.settings?.storeTypeEnabled,
  error: roles.error,
  loading: roles.loading,
  role: roles.role,
  currentPlan: Billing.currentPlan,
  vendor: FD_Restaurants.fdRestaurant,
})

const mapDispatchToProps = dispatch => ({
  onGetAccessList: () => dispatch(getAccessList()),
  onAddRole: (data, history, vendorrole, lowerCaseStoreType) =>
    dispatch(addRole(data, history, vendorrole, lowerCaseStoreType)),
  onGetRole: id => dispatch(getRole(id)),
  onPutRole: (data, history, vendorrole, lowerCaseStoreType) =>
    dispatch(putRole(data, history, vendorrole, lowerCaseStoreType)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddRole))
)
