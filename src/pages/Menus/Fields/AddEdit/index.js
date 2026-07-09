import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
import queryString from "query-string"
import FormButton from "components/Common/FormButtons"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  Alert,
  Spinner,
  CardSubtitle,
} from "reactstrap"

import {
  getMenu,
  addMenuField,
  getMenuField,
  putMenuField,
  uploadFile,
  removeFile,
} from "store/actions"

import { GET_SERVICE_NAME, ROLES } from "helpers/contants"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

import SubCatForm from "./SubCatForm"

/**
 * Formats the size
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

const AddCategory = ({
  accessLevel,
  role,
  history,
  error,
  onGetMenu,
  menuItem,
  onAddMenuField,
  onGetMenuField,
  onPutMenuField,
  onUploadFile,
  menu,
  loading,
  activeStoreId,
  activeStoreType,
  currentPlan,
  storeTypeEnabled,
  uploadingFile,
  ...props
}) => {
  const { menuId, id } = useParams()
  const { content_name } = queryString.parse(props?.location?.search)

  const didMountRef = useRef(null)

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [parentCategory, setParentCategory] = useState({
    label: "None",
    value: "",
  })
  const [fields, setFields] = useState({
    menuId,
    label: "",
    link: "",
    target: "_self",
    linkType: "internal",
    parent: "",
    sortOrder: 1,
    status: "active",
  })

  const [selectedFiles, setselectedFiles] = useState([])

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
    if (menuId) {
      onGetMenu(menuId)
    }
  }, [menuId])

  useEffect(() => {
    if (id) {
      onGetMenuField(id)
    }
  }, [id])

  useEffect(() => {
    if (didMountRef.current) {
      try {
        setFields(prevState => ({
          ...prevState,
          ...menu,
          _id: menu._id,
          label: menu.label || "",
          link: menu.link || "",
          target: menu.target || "_self",
          linkType: menu.linkType || "internal",
          menuId: menu.menuId || "",
          parent: menu.parent || "",
          sortOrder: menu.sortOrder || 1,
          status: menu?.status || "active",
        }))
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(menu)])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleParentChange = data => {
    setParentCategory(data)

    setFields(prevState => ({ ...prevState, parent: data.value }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading || uploadingFile) return

    if (id) {
      if (!accesses.canEdit) return
      onPutMenuField({ _id: menu._id, ...fields }, history)
    } else {
      if (!accesses.canAdd) return
      onAddMenuField({ ...fields }, history)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={
              (id ? props.t("Edit") : props.t("Add")) + " " + props.t("field")
            }
            breadcrumbItems={[
              {
                title: props.t("menu"),
                link: "/menus",
              },
              {
                title: (content_name || "") + " " + props.t("sections"),
                link: `/${"menus"}/${menuId}/sections`,
              },
              { title: id ? props.t("edit") : props.t("add") },
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

                    <SubCatForm
                      t={props.t}
                      menuItem={menuItem}
                      fields={fields}
                      menuId={menuId}
                      handleChange={handleChange}
                      parentCategory={parentCategory}
                      handleParentChange={handleParentChange}
                      activeStoreId={activeStoreId}
                      activeStoreType={activeStoreType}
                    />

                    <FormButton
                      needSubmit={menuId ? accesses.canEdit : accesses.canAdd}
                      submitDisabled={uploadingFile || loading}
                      goBack={() => history.goBack()}
                    />

                    {(loading || uploadingFile) && (
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

AddCategory.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  menu: PropTypes.object,
  onAddMenuField: PropTypes.func,
  onGetMenuField: PropTypes.func,
  onPutMenuField: PropTypes.func,
  onUploadFile: PropTypes.func,
}

const mapStateToProps = ({ File, Login, menus, Billing, Settings }) => ({
  role: Login?.user?.role || "",
  error: menus.error,
  loading: menus.loading,
  menu: menus.menuField,
  menuItem: menus.menu,
  uploadingFile: File.loading,
  currentPlan: Billing.currentPlan,
  storeTypeEnabled: Settings.settings?.storeTypeEnabled || [],
})

const mapDispatchToProps = dispatch => ({
  onGetMenu: id => dispatch(getMenu(id)),
  onAddMenuField: (data, history) => dispatch(addMenuField(data, history)),
  onGetMenuField: id => dispatch(getMenuField(id)),
  onPutMenuField: (data, history) => dispatch(putMenuField(data, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddCategory))
)
