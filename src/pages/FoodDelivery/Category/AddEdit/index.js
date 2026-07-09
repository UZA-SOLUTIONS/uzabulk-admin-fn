import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
import queryString from "query-string"
import FormButton from "components/Common/FormButtons"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { usePermissions } from "helpers/permissions"
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
  addFdCategory,
  getFdCategory,
  putFdCategory,
  uploadFile,
  removeFile,
} from "store/actions"

import {
  GET_SERVICE_NAME,
  ROLES,
  DEFAULT_STORE_TYPE,
  CATEGORY_FORM,
  SLUGS_NAME as slugname,
} from "helpers/contants"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

import SubCatForm from "./SubCatForm"
import SimpleForm from "./SimpleForm"

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
  vendorId,
  history,
  error,
  onAddFdCategory,
  onGetFdCategory,
  onPutFdCategory,
  onUploadFile,
  onRemoveFile,
  fdCategory,
  loading,
  activeStoreId,
  activeStoreType,
  uploadingFile,
  ...props
}) => {
  const { id, vendorId: _vendorIdParam } = useParams()
  const { vendor_name } = queryString.parse(props?.location?.search)

  const didMountRef = useRef(null)
  const hasPermission = usePermissions()
  const [vendorIdParam, setvendorIdPara] = useState()
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [parentCategory, setParentCategory] = useState({
    label: "None",
    value: "",
  })
  const [fields, setFields] = useState({
    storeTypeId: "",
    catName: "",
    catDesc: "",
    parent: "",
    catImage: null,
    isFeatured: false,
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
    if (id) {
      if (!activeStoreId) return
      onGetFdCategory(activeStoreId, id)
    }
  }, [id, activeStoreId])

  useEffect(() => {
    let vendor = ""

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

    if (vendor || activeStoreType?.storeType == "FOOD") {
      setFields(prevState => ({
        ...prevState,
        vendor,
        storeTypeId: activeStoreId,
      }))
    }

    if (
      ["SERVICEPROVIDER", "CARRENTAL", "AIRBNB"].includes(
        activeStoreType?.storeType
      )
    ) {
      setFields({ ...fields, storeTypeId: activeStoreId })
    }

    setvendorIdPara(vendor)
  }, [activeStoreId, role, vendorId, _vendorIdParam])

  useEffect(() => {
    if (didMountRef.current) {
      try {
        setFields(prevState => ({
          ...prevState,
          _id: fdCategory._id,
          catName: fdCategory.catName || "",
          catDesc: fdCategory.catDesc || "",
          parent: fdCategory.parent || "",
          catImage: fdCategory.catImage || null,
          isFeatured: fdCategory.isFeatured || false,
          sortOrder: fdCategory.sortOrder || 1,
          status: fdCategory.status || "active",
        }))

        if (fdCategory.catImage && fdCategory.catImage.link) {
          setselectedFiles([{ preview: fdCategory.catImage.link }])
        }
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(fdCategory)])

  const uploadFileSuccess = response => {
    const { _id: catImage } = response.data

    setFields(prevState => ({ ...prevState, catImage }))
  }

  function handleAcceptedFiles(_files) {
    if (id && !accesses.canEdit) return
    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    if (selectedFiles.length > 0) {
      if (fields.catImage) {
        onRemoveFile({ _id: fields.catImage })

        setFields(prevState => ({ ...prevState, catImage: null }))
      }
    }

    setFields(prevState => ({ ...prevState, catImage: files[0] }))
    onUploadFile({ image: files[0] }, uploadFileSuccess)

    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }

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
    if (!activeStoreType?.storeType?.toLowerCase()) return

    if (id) {
      if (!accesses.canEdit && !hasPermission("STORE.category.UPDATE")) return
      onPutFdCategory(
        activeStoreType?.storeType?.toLowerCase(),
        { _id: fdCategory._id, ...fields },
        history
      )
    } else {
      if (!accesses.canAdd && !hasPermission("STORE.category.CREATE")) return
      onAddFdCategory(
        activeStoreType?.storeType?.toLowerCase(),
        { ...fields },
        history
      )
    }
  }

  const pageHeader = [slugname.dewe, slugname.zaza].includes(props?.slug)
    ? props.t("store")
    : GET_SERVICE_NAME({
        storeType: activeStoreType?.storeType,
      })

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={
              (id ? props.t("Edit") : props.t("Add")) +
              " " +
              props.t("Category")
            }
            breadcrumbItems={[
              ...(activeStoreType?.storeVendorType !== "SINGLE" &&
              !["SERVICEPROVIDER"].includes(activeStoreType?.storeType) &&
              role !== ROLES.vendor &&
              role !== ROLES.subVendor
                ? [
                    {
                      title: pageHeader + "s",
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
                      ).toLowerCase()}s/${vendorIdParam}/profile`,
                    },
                    {
                      title: props.t("categories"),
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/category/${vendorIdParam}${
                        props?.location?.search
                      }`,
                    },
                  ]
                : [
                    {
                      title: props.t("categories"),
                      link: `/${activeStoreType?.storeType?.toLowerCase()}/category${
                        props?.location?.search
                      }`,
                    },
                  ]),

              {
                title: props.t(id ? "edit" : "add"),
              },
            ]}
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardSubtitle>
                    {activeStoreType?.storeType?.toLowerCase() !==
                      "serviceprovider" && (
                      <small>{props.t("category_int")}</small>
                    )}
                    {activeStoreType?.storeType?.toLowerCase() ===
                      "serviceprovider" && (
                      <small>{props.t("category_service_int")}</small>
                    )}
                  </CardSubtitle>
                  <Form onSubmit={onSubmit} className="spinner-content">
                    {error && typeof error === "string" ? (
                      <Alert color="danger">{error}</Alert>
                    ) : null}

                    {(CATEGORY_FORM[activeStoreType?.storeType]
                      ? CATEGORY_FORM[activeStoreType?.storeType]
                      : DEFAULT_STORE_TYPE["CATEGORY_FORM"]) === "simple" ? (
                      <SimpleForm
                        t={props.t}
                        fields={fields}
                        handleChange={handleChange}
                      />
                    ) : (
                      <SubCatForm
                        t={props.t}
                        fields={fields}
                        handleChange={handleChange}
                        parentCategory={parentCategory}
                        handleParentChange={handleParentChange}
                        handleAcceptedFiles={handleAcceptedFiles}
                        selectedFiles={selectedFiles}
                        activeStoreId={activeStoreId}
                        activeStoreType={activeStoreType}
                      />
                    )}

                    <FormButton
                      needSubmit={
                        id
                          ? accesses.canEdit &&
                            hasPermission("STORE.category.UPDATE")
                          : accesses.canAdd &&
                            hasPermission("STORE.category.CREATE")
                      }
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
  fdCategory: PropTypes.object,
  onAddFdCategory: PropTypes.func,
  onGetFdCategory: PropTypes.func,
  onPutFdCategory: PropTypes.func,
  onUploadFile: PropTypes.func,
  onRemoveFile: PropTypes.func,
}

const mapStateToProps = ({ File, Login, FD_Categories, Settings }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "", // In Case Restaurant/Vendor based on role
  vendor_name: Login?.user?.name,
  error: FD_Categories.error,
  loading: FD_Categories.loading,
  fdCategory: FD_Categories.fdCategory,
  uploadingFile: File.loading,
  slug: Settings?.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onAddFdCategory: (storeType, data, history) =>
    dispatch(addFdCategory(storeType, data, history)),
  onGetFdCategory: (storeType, id) => dispatch(getFdCategory(storeType, id)),
  onPutFdCategory: (storeType, data, history) =>
    dispatch(putFdCategory(storeType, data, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
  onRemoveFile: data => dispatch(removeFile(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddCategory))
)
