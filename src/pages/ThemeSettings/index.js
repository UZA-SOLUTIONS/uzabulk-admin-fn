import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
  Form,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/BreadcrumbCenter"

import { getSettings, putSettings, deleteStore } from "store/actions"

// Other Settings
import AdminThemeSettings from "./AdminTheme"
import AppThemeSettings from "./AppTheme"
import WebThemeSettings from "./WebTheme"
import CookiePolicy from "./CookiePolicy"

import ConfirmModal from "./ConfirmModal"

// Components
import NotFound from "pages/Utility/pages-404-content"

//i18n
import { withTranslation } from "react-i18next"
import { ROLES } from "helpers/contants"

const Settings = props => {
  if (
    !props.settings?.hideThings?.find(
      element => element.type === "isThemeSettings"
    )?.value
  ) {
    return <NotFound />
  }

  const {
    accessLevel,
    onGetSettings,
    onPutSettings,
    loading,
    error,
    success,
    currentPlan,
    storeNameFailed,
    storeNameLoading,
    onDeleteStore,
    uploadingFile,
  } = props

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
  })
  const [isDelete, setIsDelete] = useState(false)
  const [fields, setFields] = useState({
    logo: "",
    favIcon: "",
    bannerImage: "",
    bannerText: "",
    cookiePolicy: {},
    themeSettings: {
      primaryColor: "",
      secondaryColor: "",
      fontColor: "",
      font: "",
      headerStyle: "leftLogo",
      topNavigation: {
        backgroundColor: "",
        fontColor: "",
        content: "",
      },
      navigation: {
        backgroundColor: "",
        fontColor: "",
      },
      bodyWrapper: {
        backgroundColor: "",
        fontColor: "",
      },
      button: {
        backgroundColor: "",
        fontColor: "",
      },
      icons: {
        backgroundColor: "",
        fontColor: "",
      },
      hyperlink: {
        fontColor: "",
      },
      sideMenu: {
        backgroundColor: "",
        fontColor: "",
      },
      footer: {
        backgroundColor: "",
        fontColor: "",
      },
    },
  })
  const [STORETYPES, setSTORETYPES] = useState([])
  const [storeTypes, setStoreTypes] = useState([])
  const [storeVendors, setStoreVendors] = useState({})

  useEffect(() => {
    if (!accessLevel) {
      const data = {
        canAdd: true,
        canEdit: true,
        canDelete: true,
      }

      return setaccesses(data)
    }

    const data = {
      canAdd: false,
      canEdit: false,
      canDelete: false,
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
      }
    })

    setaccesses(data)
  }, [JSON.stringify(accessLevel)])

  useEffect(() => {
    if (props?.role === ROLES.admin) {
      console.log("hey")
      // onGetSettings()
    }
  }, [props?.role])

  useEffect(() => {
    if (props?.settings) {
      const { themeSettings, cookiePolicy, ...rest } = props?.settings

      setFields(prevState => ({
        themeSettings,
        cookiePolicy,
        logo: rest?.logo,
        favIcon: rest?.favIcon,
        bannerImage: rest?.bannerImage,
        bannerText: rest?.bannerText,
      }))
    }
  }, [JSON.stringify(props?.settings)])

  const toggleDelete = () => {
    setIsDelete(!isDelete)
  }

  const onDeleteConfirm = () => {
    onDeleteStore(props?.history)
    toggleDelete()
  }

  const handleChange = name => event => {
    const { value } = event.target

    if (name === "removeBranding") {
      if (currentPlan?.isTrial) {
        return setFields(prevFields => ({ ...prevFields, [name]: false }))
      }
    }

    setFields(prevFields => ({ ...prevFields, [name]: value }))
  }

  const handleThemeChange = name => event => {
    const { value } = event.target

    setFields(prevFields => ({
      ...prevFields,
      themeSettings: { ...prevFields.themeSettings, [name]: value },
    }))
  }

  function submit(e) {
    e.preventDefault()

    if (storeNameFailed) return
    if (storeNameLoading || uploadingFile) return

    const { ...data } = fields

    if (!accesses.canEdit) return

    onPutSettings(data)
  }


  const isPreviewed = props?.hideThings?.filter((hide) => hide.type == "isPreviewed" && hide.value == true)?.length > 0

  return (
    <div className="page-content">
      <ConfirmModal
        isOpen={isDelete}
        toggle={toggleDelete}
        onConfirm={onDeleteConfirm}
      />

      <Container fluid>
        {/* <Breadcrumbs title="Settings" breadcrumbItem="Settings" /> */}
        <Form onSubmit={submit}>
          <Row>
            <Col lg={1} xl={2} className="d-xs-none d-sm-block"></Col>

            <Col lg={10} xl={8}>
              <Card className="store-settings">
                <CardBody className="spinner-content needs-validation">
                  {error && typeof error === "string" ? (
                    <Alert color="danger">{error}</Alert>
                  ) : null}
                  {success && typeof success === "string" ? (
                    <Alert color="success">{success}</Alert>
                  ) : null}
                  {storeNameFailed && typeof storeNameFailed === "string" && (
                    <Alert color="danger">{storeNameFailed}</Alert>
                  )}

                  {(loading || uploadingFile) && (
                    <div className="spinner"></div>
                  )}

                  <AdminThemeSettings
                    t={props.t}
                    fields={{
                      ...fields?.themeSettings,
                    }}
                    handleThemeChange={handleThemeChange}
                    handleChange={handleChange}
                    accesses={accesses}
                  />

                  <hr className="my-3" />

                  <AppThemeSettings
                    t={props.t}
                    fields={{
                      ...fields?.themeSettings,
                      logo: fields?.logo,
                      favIcon: fields?.favIcon,
                      bannerImage: fields?.bannerImage,
                      bannerText: fields?.bannerText,
                    }}
                    handleThemeChange={handleThemeChange}
                    handleChange={handleChange}
                    accesses={accesses}
                  />

                  <hr className="my-3" />

                  {isPreviewed &&
                    <>
                      <WebThemeSettings
                        t={props.t}
                        fields={{
                          ...fields?.themeSettings,
                          logo: fields?.logo,
                          favIcon: fields?.favIcon,
                          bannerImage: fields?.bannerImage,
                          bannerText: fields?.bannerText,
                        }}
                        handleThemeChange={handleThemeChange}
                        handleChange={handleChange}
                        accesses={accesses}
                      />

                      <hr className="my-3" />
                    </>
                  }

                  <CookiePolicy
                    t={props.t}
                    fields={{
                      ...fields?.cookiePolicy,
                    }}
                    handleThemeChange={handleThemeChange}
                    handleChange={handleChange}
                    accesses={accesses}
                  />

                  <hr className="my-3" />

                  <Row className="store-settings">
                    <Col sm={6} className="mb-2"></Col>

                    <Col sm={6} className="text-sm-right mb-2">
                      {(loading || uploadingFile) && (
                        <Spinner
                          color="primary"
                          className="mr-2 d-none d-sm-block"
                        />
                      )}

                      {accesses.canEdit && (
                        <Button
                          type="submit"
                          disabled={uploadingFile || loading}
                          color="primary"
                          className=""
                        >
                          {props.t("save_changes")}
                        </Button>
                      )}
                    </Col>

                    <Col xs={12} className="d-sm-none text-center">
                      {(loading || uploadingFile) && (
                        <Spinner color="primary" className="mr-2" />
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col lg={1} xl={2} className="d-xs-none d-sm-block"></Col>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

Settings.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  onGetSettings: PropTypes.func,
  onPutSettings: PropTypes.func,
}

const mapStateToProps = ({ Login, File, Settings, Billing, Register }) => ({
  role: Login?.user?.role,
  settings: Settings.settings,
  loading: Settings.loading,
  error: Settings.error,
  success: Settings.success,
  currentPlan: Billing.currentPlan,
  storeNameFailed: Register.registrationError,
  storeNameLoading: Register.storeNameLoading,
  uploadingFile: File.loading,
  hideThings: Settings.settings.hideThings,
})

const mapDispatchToProps = dispatch => ({
  onGetSettings: () => dispatch(getSettings()),
  onPutSettings: data => dispatch(putSettings(data)),
  onDeleteStore: history => dispatch(deleteStore(history)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Settings))
)
