import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams, Link } from "react-router-dom"
import { connect } from "react-redux"
import AnimateHeight from "react-animate-height"
import queryString from "query-string"
import FormButton from "components/Common/FormButtons"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Alert,
  Spinner,
  UncontrolledTooltip,
  CardTitle,
} from "reactstrap"

import {
  ADDON_FORM,
  DEFAULT_STORE_TYPE,
  GET_SERVICE_NAME,
  ROLES,
  SLUGS_NAME as slugname,
} from "helpers/contants"

import { addFdAddon, getFdAddon, putFdAddon, uploadFile } from "store/actions"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"
import Dropzone from "react-dropzone"

import OptionsForm from "./OptionsForm"
import ImageForm from "./ImageForm"
import { usePermissions } from "helpers/permissions"

const AddAddon = ({
  accessLevel,
  role,
  vendorId,
  history,
  error,
  onAddFdAddon,
  onGetFdAddon,
  onPutFdAddon,
  fdAddon,
  loading,
  onUploadFile,
  activeStoreId,
  activeStoreType,
  slug,
  ...props
}) => {
  const { id, vendorId: _vendorIdParam } = useParams()
  const { vendor_name } = queryString.parse(props?.location?.search)

  const didMountRef = useRef(null)
  const hasPermission = usePermissions()
  console.log(
    hasPermission("STORE.addon.UPDATE"),

    "has"
  )
  console.log(slug, "gucci")
  const [vendorIdParam, setvendorIdPara] = useState()
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })

  const [selectedFiles, setselectedFiles] = useState([])

  // // FOR CAR RENTAL Store
  // const [carAddonData, setCarAddonData] = useState({
  //   storeTypeId: "",
  //   name: "",
  //   status: "",
  //   image: "",
  // })

  const [fields, setFields] = useState({
    storeTypeId: "",
    name: "",
    type: "SINGLESELECT",
    minLimit: 0,
    maxLimit: "",
    required: false,
    isSelectorRequired: false,
    status: "active",
    multipleType: "false",
    options: [{ name: "", price: "", default: false }],
  })
  const [options, setOptions] = useState([
    { name: "", price: "", default: false },
  ])

  // const [hotelOption,setHotelOptions] = useState([
  //   {name: ""}
  // ])

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
    // console.log(vendor, "VENDOR");
    if (!!vendor) {
      setFields({ ...fields, storeTypeId: activeStoreId, vendor })
    }

    setvendorIdPara(vendor)
  }, [activeStoreId, role, vendorId, _vendorIdParam])

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
    if (id && activeStoreId) {
      onGetFdAddon(activeStoreId, id)
    }
  }, [activeStoreId, id])

  const uploadFileSuccess = name => response => {
    const { _id: image } = response.data

    if (name === "profileImage") {
      setFields(prevState => ({ ...prevState, image }))
    }
  }

  const handleChange = name => event => {
    // console.log(name);
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }
  // const handlecarChange = name => event => {
  //   carAddonData(prevState => ({ ...prevState, [name]: event.target.value }))
  // }

  const addNewOption = event => {
    event.preventDefault()

    setOptions(prevOptions => [...prevOptions, { name: "", price: "" }])
    setFields(prevFields => ({
      ...prevFields,
      options: [...prevFields.options, { name: "", price: "", default: false }],
    }))
  }

  function removeOption(e, index) {
    e.preventDefault()
    // console.log(e, index, "ss");

    setOptions(prevOptions => [
      ...prevOptions.slice(0, index),
      ...prevOptions.slice(index + 1),
    ])
    setFields(prevFields => ({
      ...prevFields,
      options: [
        ...prevFields.options.slice(0, index),
        ...prevFields.options.slice(index + 1),
      ],
    }))
  }

  useEffect(() => {
    // console.log(fdAddon, "fdAddonnnn");

    if (didMountRef.current) {
      try {
        setFields({
          _id: fdAddon._id,
          name: fdAddon.name || "",
          type: fdAddon.type || "SINGLESELECT",
          minLimit: fdAddon.minLimit || "0",
          maxLimit: fdAddon.maxLimit || "",
          required: fdAddon.required || false,
          isSelectorRequired: fdAddon?.isSelectorRequired || false,
          status: fdAddon.status || "active",
          multipleType: fdAddon.minLimit > 0 ? "true" : "false",
          options: fdAddon.options || [{ name: "", price: "", default: false }],
          // image: fdAddon.image || "",
        })
        if (fdAddon.image && fdAddon.image.link) {
          setselectedFiles([{ preview: fdAddon.image.link }])
        }
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(fdAddon)])

  const defaultOptionChange = index => () => {
    const prevOptionI = fields.options.findIndex(option => option.default)

    let option = fields.options[index]

    if (!option) {
      option = { name: "", price: "", default: false }
    }

    if (option.default) {
      option.default = false
      let options = [
        ...fields.options.slice(0, index),
        option,
        ...fields.options.slice(index + 1),
      ]

      return setFields(prevState => ({ ...prevState, options }))
    }

    option.default = true

    let options = [
      ...fields.options.slice(0, index),
      option,
      ...fields.options.slice(index + 1),
    ]

    if (prevOptionI !== -1) {
      const prevOption = options[prevOptionI]

      prevOption.default = false

      if (index < prevOptionI) {
        options = [
          ...options.slice(0, index),
          option,
          ...options.slice(index + 1, prevOptionI),
          prevOption,
          ...options.slice(prevOptionI + 1),
        ]
      } else {
        options = [
          ...options.slice(0, prevOptionI),
          prevOption,
          ...options.slice(prevOptionI + 1, index),
          option,
          ...options.slice(index + 1),
        ]
      }
    }

    setFields(prevState => ({ ...prevState, options }))
  }

  const handleOptionChange =
    (name, index) =>
    ({ target }) => {
      let option = fields.options[index]

      if (!option) {
        option = { name: "", price: "", default: false }
      }
      option[name] = target.value

      const options = [
        ...fields.options.slice(0, index),
        option,
        ...fields.options.slice(index + 1),
      ]

      setFields(prevState => ({ ...prevState, options }))
    }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return
    if (id) {
      if (!accesses.canEdit && !hasPermission("STORE.addon.UPDATE")) return

      onPutFdAddon(
        { _id: fdAddon._id, ...fields, storeTypeId: activeStoreId },
        history
      )
    } else {
      if (!accesses.canAdd && !hasPermission("STORE.addon.CREATE")) return
      onAddFdAddon({ ...fields, storeTypeId: activeStoreId }, history)
    }
  }

  const handleAcceptedFiles = name => _files => {
    if (id && !accesses.canEdit) return
    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    onUploadFile({ image: files[0] }, uploadFileSuccess(name))

    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    if (name === "profileImage") {
      setselectedFiles(files)
    }
  }
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

  const pageHeader = [slugname.dewe, slugname.zaza].includes(props?.slug)
    ? props.t("store")
    : GET_SERVICE_NAME({
        storeType: activeStoreType?.storeType,
      })
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={1} xl={2} className="d-xs-none d-sm-block"></Col>
            <Col lg={10} xl={8}>
              <Breadcrumbs
                breadcrumbItem={
                  (id ? props.t("edit") : props.t("add")) +
                  " " +
                  props.t("addon")
                }
                breadcrumbItems={[
                  ...(activeStoreType?.storeVendorType !== "SINGLE" &&
                  !["SERVICEPROVIDER"].includes(activeStoreType?.storeType) &&
                  role !== ROLES.vendor
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
                            (role === ROLES.vendor
                              ? props.vendor_name
                              : vendor_name) || props.t("profile"),
                          link: `/${activeStoreType?.storeType?.toLowerCase()}/${GET_SERVICE_NAME(
                            {
                              storeType: activeStoreType?.storeType,
                            }
                          ).toLowerCase()}s/${vendorIdParam}/profile`,
                        },
                        {
                          title: GET_SERVICE_NAME({
                            storeType: activeStoreType?.storeType,
                            name: "add-on",
                          }),
                          link: `/${activeStoreType?.storeType?.toLowerCase()}/add-on/${vendorIdParam}${
                            props?.location?.search
                          }`,
                        },
                      ]
                    : [
                        {
                          title: GET_SERVICE_NAME({
                            storeType: activeStoreType?.storeType,
                            name: "add-on",
                          }),
                          link: `/${activeStoreType?.storeType?.toLowerCase()}/add-on${
                            props?.location?.search
                          }`,
                        },
                      ]),

                  {
                    title: props.t(id ? "edit" : "add"),
                  },
                ]}
              />
            </Col>
            <Col lg={1} xl={2} className="d-xs-none d-sm-block"></Col>
          </Row>

          <Row>
            <Col lg={1} xl={2} className="d-xs-none d-sm-block"></Col>
            <Col lg={10} xl={8}>
              <Card>
                <CardBody>
                  <Form onSubmit={onSubmit} className="spinner-content">
                    {error && typeof error === "string" ? (
                      <Alert color="danger">{error}</Alert>
                    ) : null}
                    {console.log([activeStoreType.storeType], "V")}

                    {(ADDON_FORM[activeStoreType.storeType]
                      ? ADDON_FORM[activeStoreType.storeType]
                      : DEFAULT_STORE_TYPE["ADDON_FORM"]) === "optionsTag" ? (
                      <OptionsForm
                        fields={fields}
                        handleChange={handleChange}
                        handleOptionChange={handleOptionChange}
                        defaultOptionChange={defaultOptionChange}
                        t={props.t}
                        options={options}
                        addNewOption={addNewOption}
                        removeOption={removeOption}
                        fdAddon={fdAddon}
                        setFields={setFields}
                        slug={slug}
                      />
                    ) : (
                      <ImageForm
                        fields={fields}
                        handleChange={handleChange}
                        handleAcceptedFiles={handleAcceptedFiles}
                        t={props.t}
                        options={options}
                        fdAddon={fdAddon}
                        selectedFiles={selectedFiles}
                        setFields={setFields}
                        setselectedFiles={setselectedFiles}
                      />
                    )}

                    <FormButton
                      needSubmit={
                        id
                          ? accesses.canEdit &&
                            hasPermission("STORE.addon.UPDATE")
                          : accesses.canAdd &&
                            hasPermission("STORE.addon.CREATE")
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
            </Col>
            <Col lg={1} xl={2} className="d-xs-none d-sm-block"></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

AddAddon.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  fdAddon: PropTypes.object,
  onAddFdAddon: PropTypes.func,
  onGetFdAddon: PropTypes.func,
  onPutFdAddon: PropTypes.func,
}

const mapStateToProps = ({ Login, FD_Addons, Settings }) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "",
  vendor_name: Login?.user?.name,
  error: FD_Addons.error,
  loading: FD_Addons.loading,
  fdAddon: FD_Addons.fdAddon,
  slug: Settings?.settings?.slug,
})

const mapDispatchToProps = dispatch => ({
  onAddFdAddon: (data, history) => dispatch(addFdAddon(data, history)),
  onGetFdAddon: (storeType, id) => dispatch(getFdAddon(storeType, id)),
  onPutFdAddon: (data, history) => dispatch(putFdAddon(data, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddAddon))
)
