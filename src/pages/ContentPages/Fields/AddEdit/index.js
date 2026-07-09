import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import queryString from "query-string"
import Dropzone from "react-dropzone"
import mime from "mime-types"
import ColorPicker from "@vtaits/react-color-picker"
import CKEditor from "react-ckeditor-component"
import Select from "react-select"
import FormButton from "components/Common/FormButtons"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  Alert,
  Spinner,
  FormGroup,
  Label,
  Input,
  CardTitle,
  Button,
  FormText,
} from "reactstrap"

import {
  addContentPageField,
  getblogCategories,
  getblogs,
  getContentPage,
  getContentPageField,
  putContentPageField,
  uploadFile,
} from "store/actions"

import {
  CONTENT_INPUT_TYPES,
  CONTENT_PAGE_IGNORE_SINGLE_VENDOR as IGNORE_SINGLE_VENDOR,
  CONTENT_PAGE_IGNORE_SINGLE_CATEGORY as IGNORE_SINGLE_CATEGORY,
} from "helpers/contants"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

//i18n
import { withTranslation } from "react-i18next"

// Images
import avatar4 from "assets/images/logo-placeholder.png"
import logoFile from "assets/images/logo-file.png"

//
import StoreTypes from "./StoreTypes"
import Categories from "./Categories"
import Products from "./Products"
import Vendors from "./Vendors"
import PreviewModal from "./Preview"

import "@vtaits/react-color-picker/dist/index.css"

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

function useOutside(callback, ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback && callback()
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}

const CreateContent = props => {
  const {
    field,
    fields,
    handleChange,
    handleNumberChange,
    handleAcceptedFiles,
    selectedFiles,
    setisUploading,
    onUploadFile,
    storeTypeEnabled,
    togglePreviewModal,
    blogList,
    selectedblog,
    onblogSelect,
    categoryList,
    selectedcategory,
    oncategorySelect,
  } = props
  console.log(fields?.blogType, "gucci")
  const wrapperRef = useRef(null)

  const [_selectedFiles, _setselectedFiles] = useState({ 0: [] })
  const [_storeType, _setstoreType] = useState({})
  const [_vendor, _setvendor] = useState({})
  const [_category, _setcategory] = useState({})
  const [_product, _setproduct] = useState({})
  const [contents, setcontents] = useState([])
  const [showColorPicker, setColorPicker] = useState(false)
  // const [blogList, setblogList] = useState([])
  // const [selectedblog, setSelectedblog] = useState([])

  // useEffect(() => {
  //   setblogList(
  //     customers?.map(({ title, _id }) => ({
  //       label: title,
  //       value: _id,
  //     }))
  //   )
  // }, [customers])
  // const onblogSelect = data => {
  //   const maxAllowedValues = 4
  //   if (data.length <= maxAllowedValues) {
  //     setSelectedblog(data)
  //   }
  // }

  useOutside(() => {
    setColorPicker(false)
  }, wrapperRef)

  useEffect(() => {
    setcontents([{}])
    _setselectedFiles({ 0: [] })
    _setstoreType({})
    _setcategory({})
    _setproduct({})
    _setvendor({})
  }, [field])

  useEffect(() => {
    if (field?.input === "loop" && !field?.length) {
      if (fields[field?.value]) {
        setcontents(fields[field?.value])

        let images = []
        let __storeTypes = []
        let __vendors = []
        let __categories = []
        let __products = []

        fields[field?.value]?.map(element => {
          if (element.bannerObj?.link) {
            images.push([{ preview: element.bannerObj.link }])
          }

          if (element.storeTypeObj?._id) {
            __storeTypes.push({
              label: element.storeTypeObj?.label,
              value: element.storeTypeObj?._id,
            })
          } else {
            __storeTypes.push(null)
          }

          if (element.vendorObj?._id) {
            __vendors.push({
              label: element.vendorObj?.name,
              value: element.vendorObj?._id,
            })
          } else {
            __vendors.push(null)
          }

          if (element.categoryObj?._id) {
            __categories.push({
              label: element.categoryObj?.catName,
              value: element.categoryObj?._id,
            })
          } else {
            __categories.push(null)
          }

          if (element.productObj) {
            __products.push(
              element.productObj?.map(p => ({
                label: p.name,
                value: p._id,
              }))
            )
          } else {
            __products.push([])
          }
        })

        _setselectedFiles(images)
        _setstoreType(__storeTypes)
        _setvendor(__vendors)
        _setcategory(__categories)
        _setproduct(__products)
      } else {
        setcontents([{}])
        _setstoreType({})
        _setcategory({})
        _setproduct({})
        _setvendor({})
      }
    }
  }, [field?.input])

  const addNewOption = () => event => {
    event.preventDefault()

    if (field.maxItems && contents.length >= field.maxItems) return

    setcontents(prevState => [...prevState, { label: "", value: "" }])
  }

  function removeOption(e, index) {
    e.preventDefault()

    setcontents(prevState => [
      ...prevState.slice(0, index),
      ...prevState.slice(index + 1),
    ])

    if (fields[field?.value] && fields[field?.value]?.length > 0) {
      _setselectedFiles(prevState => ({ ...prevState, [index]: null }))
      handleChange(field?.value)({
        target: {
          value: [
            ...fields[field?.value]?.slice(0, index),
            ...fields[field?.value]?.slice(index + 1),
          ],
        },
      })
    }
  }

  if (field?.condition) {
    if (field.condition.outFields) {
      if (field.condition?.isInclude) {
        if (field.condition.notEqual) {
          if (
            field.condition.value.includes(
              props.actualFields[field.condition.key]
            )
          )
            return <></>
        } else {
          if (
            !field.condition.value.includes(
              props.actualFields[field.condition.key]
            )
          )
            return <></>
        }
      } else {
        if (field.condition.value !== props.actualFields[field.condition.key])
          return <></>
      }
    } else {
      if (field.condition?.isInclude) {
        if (!field.condition.value.includes(fields[field.condition.key]))
          return <></>
      } else {
        if (field.condition.value !== fields[field.condition.key]) return <></>
      }
    }
  }

  if (
    props.isBasic &&
    ["custom_select"].includes(field?.input) &&
    ["storeType", "vendor"].includes(field.value)
  ) {
    // console.log("kjadskjhadsfkjh", field, fields)
    return <></>
  }

  let input

  switch (field?.input) {
    case "file":
      input = (
        <>
          <Dropzone
            onDrop={acceptedFiles => {
              handleAcceptedFiles(field.value, acceptedFiles)
            }}
          >
            {({ getRootProps, getInputProps }) => {
              const imageFile = selectedFiles[0]

              {
                /* let file = !!fields[field?.value]
                ? fields[field?.value]
                : !!imageFile
                ? imageFile.preview
                : avatar4 */
              }

              return (
                <div
                  {...getRootProps()}
                  {...(field?.label === "Banner"
                    ? {
                        className: "dropzone-single-image",
                        style: {
                          width: "9.5rem",
                        },
                      }
                    : { className: "dropzone-single-image avatar-xl" })}
                >
                  <div
                    {...(field?.label === "Banner"
                      ? {
                          className:
                            "avatar-xl d-flex align-items-center border",
                          style: {
                            width: "9.5rem",
                          },
                        }
                      : {})}
                  >
                    <input
                      {...getInputProps()}
                      id="formrow-profile-image-Input"
                      multiple={false}
                    />

                    <img
                      className="rounded avatar-xl"
                      {...(field?.label === "Banner"
                        ? {
                            style: {
                              width: "9.5rem",
                              objectFit: "cover",
                              height: "5rem",
                            },
                          }
                        : {})}
                      alt={
                        !!imageFile && imageFile.name ? imageFile.name : "uza"
                      }
                      src={!!imageFile ? imageFile.preview : avatar4}
                    />
                  </div>

                  <div className="edit">
                    <i className="bx bx-pencil"></i>
                  </div>
                </div>
              )
            }}
          </Dropzone>

          <FormText>
            {props.t("max_file_size")}{" "}
            {selectedFiles[0]?.preview && (
              <Link
                to="#"
                onClick={e => {
                  e.preventDefault()
                  togglePreviewModal(selectedFiles[0]?.preview)
                }}
              >
                {props.t("preview")}
              </Link>
            )}
          </FormText>
        </>
      )
      break

    case "custom_select":
      switch (field.value) {
        case "storeType":
          input = (
            <StoreTypes
              t={props.t}
              parentStoreType={props.storeType}
              setparentStoreType={data => {
                handleChange(field.value)({ target: data })
                props.setstoreType(data)
              }}
            />
          )
          break

        case "vendor":
          input = (
            <Vendors
              t={props.t}
              activeStoreId={fields.storeType}
              activeStoreType={props.storeType}
              parentStoreType={props.vendor}
              setparentStoreType={data => {
                handleChange(field.value)({ target: data })
                props.setvendor(data)
              }}
            />
          )
          break

        case "category":
          input = (
            <Categories
              t={props.t}
              fields={fields}
              activeStoreId={fields.storeType}
              activeStoreType={props.storeType}
              parentStoreType={props.category}
              setparentStoreType={data => {
                handleChange(field.value)({ target: data })
                props.setcategory(data)
              }}
            />
          )
          break

        case "product":
          input = (
            <Products
              t={props.t}
              fields={fields}
              isMulti={field.isMultiple}
              activeStoreId={fields.storeType}
              activeStoreType={props.storeType}
              parentStoreType={
                props.product
                  ? field.isMultiple
                    ? props.product
                    : props.product[0]
                  : props.product
              }
              setparentStoreType={data => {
                handleChange(field.value)({
                  target: {
                    value: data
                      ? field.isMultiple
                        ? data.map(i => i.value)
                        : [data.value]
                      : [],
                  },
                })
                props.setproduct(data)
              }}
            />
          )
          break

        default:
          input = <Select option={field.items} />
          break
      }
      break

    case "select":
      input = (
        <Input
          type="select"
          value={fields[field?.value]}
          onChange={handleChange(field?.value)}
          rows={field.rows}
        >
          {field.items?.map(item => (
            <option value={item.value}>{item.label}</option>
          ))}
        </Input>
      )
      break
    case "custom_categoryselect":
      input = (
        <Select
          input
          options={categoryList}
          onChange={oncategorySelect}
          isMulti={false}
          value={selectedcategory}
        />
      )

      break
    case "custom_blogselect":
      if (fields?.blogType !== "custom") {
        return null
      }
      input = (
        <div style={{ minHeight: 150 }}>
          <Select
            input
            options={blogList}
            onChange={onblogSelect}
            isMulti={true}
            value={selectedblog}
          />
        </div>
      )

      break
    case "number":
      if (fields?.blogType == "custom") {
        return null
      }
      input = (
        <Input
          type={field?.input}
          value={fields[field?.value]}
          onChange={handleNumberChange(field?.value)}
          rows={field.rows}
        />
      )

      break
    case "checkbox":
      input = (
        <div
          className="custom-control custom-checkbox custom-checkbox-primary"
          style={{ zIndex: "unset" }}
        >
          <input
            type="checkbox"
            className="custom-control-input"
            id={`option-${field.value}-radio`}
            checked={fields[field?.value]}
            onChange={() => {
              handleChange(field.value)({
                target: {
                  value: !fields[field?.value],
                },
              })
            }}
          />

          <label
            className="custom-control-label"
            htmlFor={`option-${field.value}-radio`}
          >
            {props.t(field.label)}
          </label>
        </div>
      )
      break

    case "color":
      input = (
        <>
          <div
            className="input-group colorpicker-default mb-1"
            title="Using format option"
          >
            <Input
              type="text"
              className="colorpicker-rgba form-control"
              value={fields[field?.value]}
              onClick={() => {
                setColorPicker(!showColorPicker)
              }}
              onChange={handleChange(field?.value)}
            />

            <span className="input-group-append">
              <span
                className="input-group-text colorpicker-input-addon"
                onClick={() => {
                  setColorPicker(!showColorPicker)
                }}
              >
                <i
                  style={{
                    height: "16px",
                    width: "16px",
                    background: fields[field?.value],
                  }}
                />
              </span>
            </span>
          </div>

          {showColorPicker ? (
            <ColorPicker
              saturationHeight={100}
              saturationWidth={200}
              value={fields[field?.value]}
              onDrag={color =>
                handleChange(field?.value)({ target: { value: color } })
              }
            />
          ) : null}
        </>
      )
      break

    case "loop":
      const data = []

      const _handleChange =
        index =>
        name =>
        ({ target }) => {
          const { value } = target
          let prevFields = fields[field?.value] || []
          prevFields[index] = { ...(prevFields[index] || {}), [name]: value }

          handleChange(field?.value)({ target: { value: prevFields } })
        }

      const uploadFileSuccess = (index, name) => response => {
        const { link, _id } = response.data

        setisUploading(false)
        _handleChange(index)(name)({ target: { value: _id } })
      }

      const _handleAcceptedFiles = index => (name, _files) => {
        const files = _files?.filter(file => file.size < 5242880)

        if (files.length < _files.length) {
          return toastr.error(props.t("max_file_size"))
        }

        setisUploading(true)
        onUploadFile({ image: files[0] }, uploadFileSuccess(index, name))

        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: formatBytes(file.size),
          })
        )

        _setselectedFiles(prevState => ({ ...prevState, [index]: files }))
      }

      for (let i = 0; i < contents?.length; i++) {
        let _fields = (fields[field.value] || [])[i] || {}

        data.push({
          fields: {
            ..._fields,
            storeType: props.isBasic
              ? storeTypeEnabled[0]?._id
              : _fields.storeType,
            vendor: props.isBasic
              ? storeTypeEnabled[0]?.singleVendorId
              : _fields.vendor,
          },
          field: field?.items,
          handleChange: _handleChange(i),
          handleAcceptedFiles: _handleAcceptedFiles(i),
          selectedFiles: _selectedFiles[i] || [],
          storeType: props.isBasic
            ? {
                label: storeTypeEnabled[0]?.label,
                value: storeTypeEnabled[0]?._id,
              }
            : _storeType[i],
          setstoreType: data =>
            _setstoreType(prevState => ({ ...prevState, [i]: data })),
          vendor: props.isBasic
            ? {
                label: storeTypeEnabled[0]?.singleVendoName,
                value: storeTypeEnabled[0]?.singleVendorId,
              }
            : _vendor[i],
          setvendor: data =>
            _setvendor(prevState => ({ ...prevState, [i]: data })),
          category: _category[i],
          setcategory: data =>
            _setcategory(prevState => ({ ...prevState, [i]: data })),
          product: _product[i],
          setproduct: data =>
            _setproduct(prevState => ({ ...prevState, [i]: data })),
        })
      }

      return (
        <>
          <Col md={12}>
            {data.map((item, itemIndex) => {
              console.log(item, "murga2")
              return (
                <Row className="mb-2 border border-light rounded py-3">
                  {item?.field?.map((key, index) => {
                    console.log(key, "murga")
                    return (
                      <CreateContent
                        {...props}
                        {...item}
                        key={index}
                        fields={item.fields}
                        field={key}
                        _handleChange={handleChange}
                        index={itemIndex}
                      />
                    )
                  })}

                  <Col md={6} className="mt-4">
                    <div className="form-group mb-0">
                      <Button
                        onClick={e => {
                          e.preventDefault()

                          contents?.length > 1 && removeOption(e, itemIndex)
                        }}
                        color={contents?.length === 1 ? "secondary" : "danger"}
                      >
                        {props.t("remove")}
                      </Button>
                    </div>
                  </Col>
                </Row>
              )
            })}
          </Col>

          {(field.maxItems ? contents.length < field.maxItems : true) && (
            <Col md={12} className="text-center">
              <Button onClick={addNewOption()} color="success">
                {props.t("add_more")}
              </Button>
            </Col>
          )}
        </>
      )

      break

    case "switch":
      input = (
        <div className="status-switch square-switch">
          <input
            type="checkbox"
            id={`square-${field.value}-switch1`}
            switch={"none"}
            checked={fields[field?.value] === field?.items?.right}
            onChange={() => {
              if (fields[field?.value] === field?.items?.right) {
                handleChange(field.value)({
                  target: { value: field?.items?.left },
                })
              } else {
                handleChange(field.value)({
                  target: { value: field?.items?.right },
                })
              }
            }}
          />
          <label
            htmlFor={`square-${field.value}-switch1`}
            data-on-label={props.t(field?.items?.right)}
            data-off-label={props.t(field?.items?.left)}
          />
        </div>
      )
      break

    case "html":
      input = (
        <CKEditor
          content={fields.content}
          events={{
            change: evt => {
              const data = evt?.editor?.getData()

              props._handleChange(
                field?.value,
                props.index
              )({
                target: { value: data },
              })
            },
          }}
          config={{
            height: 250,
            toolbar: [
              [
                "Undo",
                "Redo",
                "Font",
                "FontSize",
                "Styles",
                "Format",
                "-",
                "Maximize",
                "-",
                "Source",
              ],
              [
                "Bold",
                "Italic",
                "Underline",
                "Strike",
                "-",
                "RemoveFormat",
                "-",
                "NumberedList",
                "BulletedList",
              ],
              [
                "Link",
                "Unlink",
                "-",
                "JustifyLeft",
                "JustifyCenter",
                "JustifyRight",
                "JustifyBlock",
                "-",
                "Outdent",
                "Indent",
                "-",
                "TextColor",
                "BGColor",
              ],
              [
                "Image",
                "Table",
                "HorizontalRule",
                "SpecialChar",
                "-",
                "Blockquote",
              ],
            ],
          }}
          scriptUrl="https://cdn.ckeditor.com/4.16.0/full/ckeditor.js"
        />
      )
      break

    default:
      input = (
        <Input
          type={field?.input}
          value={fields[field?.value]}
          onChange={handleChange(field?.value)}
          rows={field.rows}
        />
      )
      break
  }

  return (
    <Col
      md={field?.col || 6}
      className={field?.input === "checkbox" ? "mt-2" : ""}
    >
      <div ref={wrapperRef} className="form-group">
        {field.input !== "checkbox" && (
          <Label>
            {field?.label === "Banner"
              ? props.t("banner_200_500")
              : props.t(field?.label)}
          </Label>
        )}

        {input}
      </div>
    </Col>
  )
}

const AddCategory = ({
  accessLevel,
  role,
  history,
  error,
  onAddContentPageField,
  onGetContentPageField,
  onPutContentPageField,
  contentPage,
  loading,
  onUploadFile,
  currentPlan,
  onGetContentPage,
  storeTypeEnabled,
  slug,
  ...props
}) => {
  const { contentPageId, id } = useParams()
  const { content_name } = queryString.parse(props?.location?.search)
  console.log(contentPage, "contentPage")
  const didMountRef = useRef(null)

  const [previewModal, setPreviewModal] = useState({
    isOpen: false,
    preview: null,
  })
  // For Showing Form Option in Vendor & Driver Registration Section
  let forOneTimeShopVendorDriverContent = ["VENDORPAGE", "DRIVERPAGE"].includes(
    props?.contentpage?.type
  )
  let contentSectionforAll = props?.contentSectionType?.filter(
    con => !["form"].includes(con.type)
  )
  //

  const [CONTENT_PAGES, setcontentPages] = useState(
    props.match.path.includes("/content-pages")
      ? // ? (forOneTimeShopVendorDriverContent ? props.contentSectionType : contentSectionforAll)
        props?.contentSectionType
      : props.appBannerSectionType
  )
  const [isWeb, setisWeb] = useState(
    props.match.path.includes("/content-pages")
  )
  const [isUploading, setisUploading] = useState(false)
  const [selectedFiles, setselectedFiles] = useState([])
  const [storeType, setstoreType] = useState()
  const [vendor, setvendor] = useState()
  const [category, setcategory] = useState()
  const [product, setproduct] = useState()
  const [templates, settemplates] = useState([])
  const [selectedTemplate, setselectedTemplate] = useState(null)
  const [blogList, setblogList] = useState([])
  const [categoryList, setcategoryList] = useState([])

  const [selectedblog, setSelectedblog] = useState([])
  const [selectedcategory, setSelectedcategory] = useState([])
  console.log(selectedcategory, "selectedcategory")

  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })
  const [fields, setFields] = useState({
    contentSection: contentPageId,
    type: {},
    status: "active",
    blogType: "recent",
  })

  console.log(fields, "props.contentpageprops.contentpage")

  // For Showing Form Option in Vendor & Driver Registration Section

  useEffect(() => {
    let _isWeb = props.match.path.includes("/content-pages")
    setisWeb(_isWeb)
    // console.log(props.contentSectionType, forOneTimeShopVendorDriverContent, contentSectionforAll, 123456);

    let _contentPages = _isWeb
      ? props?.contentSectionType
      : props.appBannerSectionType

    setcontentPages(_contentPages)
  }, [props.match.path, forOneTimeShopVendorDriverContent])

  useEffect(() => {
    if (id) return
    // setselectedFiles([])
    let sectionIndex = CONTENT_PAGES?.findIndex(
      section => section.type === fields.type?.type
    )

    if (sectionIndex !== -1) {
      settemplates(CONTENT_PAGES[sectionIndex].styles || [])
      setselectedTemplate(null)
    } else {
      setselectedTemplate(null)
    }

    setFields(prevState => ({ ...prevState, templateType: null }))
  }, [fields?.type, CONTENT_PAGES])

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
      onGetContentPageField(id)
    }
  }, [id])

  useEffect(() => {
    setblogList(
      props?.customers?.map(({ title, _id }) => ({
        label: title,
        value: _id,
      }))
    )
  }, [props?.customers])

  useEffect(() => {
    setcategoryList(
      props?.categories?.map(({ name, _id }) => ({
        label: name,
        value: _id,
      }))
    )
  }, [props?.categories])

  const onblogSelect = data => {
    const maxAllowedValues = 4
    if (data.length <= maxAllowedValues) {
      setSelectedblog(data)
    }
  }
  const oncategorySelect = data => {
    setSelectedcategory(data)
    props?.onGetCustomers({ ...blogpayload, category: data?.value })
  }

  let blogpayload = {
    limit: 500,
    orderBy: "date_created_utc",
    sortOrder: -1,
    paged: 1,
    fieldName: "",
    fieldValue: "",
    search: "",
    // category: selectedcategory?.value,
  }
  let categorypayload = {
    limit: 500,
    orderBy: "date_created_utc",
    sortOrder: -1,
    paged: 1,
    fieldName: "",
    fieldValue: "",
    search: "",
  }
  useEffect(() => {
    props?.onGetCustomers(blogpayload)
  }, [props?.onGetCustomers])

  useEffect(() => {
    props?.onGetCategories(categorypayload)
  }, [props?.onGetCategories])

  useEffect(() => {
    if (didMountRef.current) {
      try {
        let contentType =
          CONTENT_PAGES?.filter(item => item.type === contentPage?.type)[0] ||
          {}

        setFields(prevState => ({
          ...prevState,
          ...contentPage,
          banner: contentPage?.banner?._id,
          type: contentType,
          templateType: contentPage.templateType,
          status: contentPage?.status || "active",
          multipleContent: contentPage?.multipleContent
            ?.map(element => ({
              ...element,
              storeTypeObj: element.storeType,
              storeType: element.storeType?._id,
              vendorObj: element.vendor,
              vendor: element.vendor?._id,
              categoryObj: element.category,
              category: element.category?._id,
              productObj: element.product,
              product: element.product?.map(pp => pp._id),
              bannerObj: element?.banner,
              banner: element?.banner?._id,
            }))
            ?.filter(item => !!item),
        }))
        setSelectedblog(
          contentPage?.blogs?.map(({ title, _id }) => ({
            label: title,
            value: _id,
          }))
        )
        setSelectedcategory({
          label: contentPage?.blogCategory?.name,
          value: contentPage?.blogCategory?._id,
        })
        if (contentPage.banner && contentPage.banner.link) {
          setselectedFiles([{ preview: contentPage.banner.link }])
        }

        if (contentPage.templateType) {
          let sectionIndex = CONTENT_PAGES?.findIndex(
            section => section.type === contentPage?.type
          )

          if (sectionIndex !== -1) {
            let templateStyles = CONTENT_PAGES[sectionIndex].styles || []
            settemplates(templateStyles)

            let sStyles = templateStyles.filter(
              template => template.value === contentPage.templateType
            )

            setselectedTemplate(sStyles[0])
          } else {
            setselectedTemplate(null)
          }
        }
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(contentPage)])

  const handleChange = (name, index) => event => {
    console.log(name, event.target.value, "gucci")
    if (name == "content" && ![undefined, null].includes(index)) {
      setFields(prevState => ({
        ...prevState,
        multipleContent: [
          ...(prevState?.multipleContent?.slice(0, index) || []),
          {
            ...((prevState?.multipleContent || [])[index] || {}),
            [name]: event.target.value,
          },
          ...(prevState?.multipleContent?.slice(index + 1) || []),
        ],
      }))
      return
    }

    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }
  /* Handle NumberInput onChange */
  const handleNumberChange = name => event => {
    let fvalue = event.target.value
    if (name == "recentBlogNo" && fvalue <= 4) {
      setFields(prevState => ({
        ...prevState,
        [name]: Math.abs(fvalue > 1 ? fvalue : 1),
      }))
    }
  }
  const uploadFileSuccess = name => response => {
    const { link, _id } = response.data

    setisUploading(false)
    handleChange(name)({ target: { value: _id } })
  }

  function handleAcceptedFiles(name, _files) {
    if (id && !accesses.canEdit) return

    const files = _files?.filter(file => file.size < 5242880)

    if (files.length < _files.length) {
      return toastr.error(props.t("max_file_size"))
    }

    setisUploading(true)
    handleChange(name)({ target: { value: null } })
    onUploadFile({ image: files[0] }, uploadFileSuccess(name))

    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading) return
    if (isUploading) return
    let blogs = selectedblog?.map(blog => blog.value) || null
    let blogCategory = selectedcategory?.value || null

    if (id) {
      if (!accesses.canEdit) return
      onPutContentPageField(
        {
          _id: contentPage._id,
          ...fields,
          blogs,
          blogCategory,
          type: fields?.type?.type,
          multipleContent: fields?.multipleContent
            ?.filter(item => !!item)
            .map(item => ({
              ...item,
              storeType:
                currentPlan?.billingPlan?.type === "basic"
                  ? storeTypeEnabled[0]?._id
                  : item.storeType,
              vendor:
                currentPlan?.billingPlan?.type === "basic"
                  ? storeTypeEnabled[0]?.singleVendorId
                  : item.vendor,
            })),
        },
        history
      )
    } else {
      if (!accesses.canAdd) return
      onAddContentPageField(
        {
          ...fields,
          blogs,
          blogCategory,
          type: fields?.type?.type,
          multipleContent: fields?.multipleContent
            ?.filter(item => !!item)
            .map(item => ({
              ...item,
              storeType:
                currentPlan?.billingPlan?.type === "basic"
                  ? storeTypeEnabled[0]?._id
                  : item.storeType,
              vendor:
                currentPlan?.billingPlan?.type === "basic"
                  ? storeTypeEnabled[0]?.singleVendorId
                  : item.vendor,
            })),
        },
        history
      )
    }
  }

  useEffect(() => {
    onGetContentPage(contentPageId)
  }, [contentPageId])

  const togglePreviewModal = preview => {
    setPreviewModal(prevState => ({ isOpen: !prevState.isOpen, preview }))
  }

  return (
    <React.Fragment>
      <PreviewModal {...previewModal} toggle={togglePreviewModal} />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            breadcrumbItem={
              (id ? props.t("Edit") : props.t("Add")) + " " + props.t("Field")
            }
            breadcrumbItems={[
              {
                title: props.t(isWeb ? "content_pages" : "app_settings"),
                link: isWeb ? "/content-pages" : "/app-settings",
              },
              {
                title: (content_name || "") + " " + props.t("sections"),
                link: `/${
                  isWeb ? "content-pages" : "app-settings"
                }/${contentPageId}/sections`,
              },
              { title: id ? props.t("edit") : props.t("add") },
            ]}
          />

          <Card>
            <CardBody>
              <Form onSubmit={onSubmit} className="spinner-content">
                {error && typeof error === "string" ? (
                  <Alert color="danger">{error}</Alert>
                ) : null}

                <Row>
                  <Col md={isWeb ? 4 : 6}>
                    <FormGroup>
                      <Label>{props.t("content_type")}</Label>

                      <Select
                        isDisabled={!!id}
                        menuPosition={"fixed"}
                        options={CONTENT_PAGES.filter(item =>
                          currentPlan?.billingPlan?.type === "basic"
                            ? !IGNORE_SINGLE_VENDOR.includes(item)
                            : currentPlan?.billingPlan?.type === "premium"
                            ? !IGNORE_SINGLE_CATEGORY.includes(item)
                            : true
                        )}
                        getOptionLabel={data => data.name}
                        getOptionValue={data => data.type}
                        value={fields.type}
                        onChange={data =>
                          handleChange("type")({ target: { value: data } })
                        }
                      />
                    </FormGroup>
                  </Col>

                  {isWeb && (
                    <Col md={4}>
                      <FormGroup>
                        <div className="d-flex justify-content-between flex-column flex-sm-row w-100">
                          <Label>{props.t("template")}</Label>

                          {selectedTemplate && (
                            <div className="text-right">
                              <a
                                className="mr-sm-2"
                                target="_blank"
                                href={
                                  "https://" +
                                  selectedTemplate?.previewUrl
                                    ?.replace("http://", "")
                                    ?.replace("https://", "")
                                }
                                onClick={e => {
                                  e.preventDefault()

                                  togglePreviewModal(
                                    selectedTemplate?.previewUrl
                                  )
                                }}
                              >
                                {props.t("preview")}
                              </a>
                            </div>
                          )}
                        </div>

                        <Select
                          menuPosition={"fixed"}
                          options={templates}
                          value={selectedTemplate}
                          onChange={data => {
                            handleChange("templateType")({ target: data })
                            setselectedTemplate(data)
                          }}
                        />
                      </FormGroup>
                    </Col>
                  )}

                  <Col md={isWeb ? 4 : 6}>
                    <FormGroup>
                      <Label>{props.t("status")}</Label>

                      <div className="status-switch square-switch">
                        <input
                          type="checkbox"
                          id="square-switch1"
                          switch={"none"}
                          checked={fields?.status === "active"}
                          onChange={() => {
                            const value =
                              fields.status === "active" ? "inactive" : "active"

                            handleChange("status")({
                              target: { value },
                            })
                          }}
                        />
                        <label
                          id="statustooltip"
                          htmlFor="square-switch1"
                          data-on-label={props.t("active")}
                          data-off-label={props.t("inactive")}
                        />
                      </div>
                    </FormGroup>
                  </Col>

                  {CONTENT_INPUT_TYPES[fields?.type?.type]?.map(
                    (field, index) => (
                      <CreateContent
                        key={`_contetn-${index}_`}
                        field={field}
                        fields={fields}
                        actualFields={fields}
                        t={props.t}
                        handleAcceptedFiles={handleAcceptedFiles}
                        selectedFiles={selectedFiles}
                        handleChange={handleChange}
                        setisUploading={setisUploading}
                        onUploadFile={onUploadFile}
                        _handleChange={handleChange}
                        isBasic={currentPlan?.billingPlan?.type === "basic"}
                        storeTypeEnabled={storeTypeEnabled}
                        togglePreviewModal={togglePreviewModal}
                        customers={props?.customers}
                        blogList={blogList}
                        categoryList={categoryList}
                        selectedblog={selectedblog}
                        selectedcategory={selectedcategory}
                        onblogSelect={onblogSelect}
                        oncategorySelect={oncategorySelect}
                        handleNumberChange={handleNumberChange}
                      />
                    )
                  )}
                </Row>

                <FormButton
                  needSubmit={
                    contentPageId ? accesses.canEdit : accesses.canAdd
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
  contentPage: PropTypes.object,
  onAddContentPageField: PropTypes.func,
  onGetContentPageField: PropTypes.func,
  onPutContentPageField: PropTypes.func,
}

const mapStateToProps = ({
  Login,
  contentpages,
  Billing,
  Settings,
  Blog,
  BlogCategory,
}) => ({
  role: Login?.user?.role || "",
  vendorId: Login?.user?._id || "", // In Case Restaurant/Vendor based on role
  error: contentpages.error,
  loading: contentpages.loading,
  contentpage: contentpages.contentPage,
  contentPage: contentpages.contentPageField,
  contentSectionType: Login.contentSectionType,
  appBannerSectionType: Login.appBannerSectionType,
  currentPlan: Billing.currentPlan,
  storeTypeEnabled: Settings.settings?.storeTypeEnabled || [],
  slug: Settings.settings.slug,
  customers: Blog.blogs,
  categories: BlogCategory.blogCategories,
})

const mapDispatchToProps = dispatch => ({
  onGetContentPage: id => dispatch(getContentPage(id)),
  onAddContentPageField: (data, history) =>
    dispatch(addContentPageField(data, history)),
  onGetContentPageField: id => dispatch(getContentPageField(id)),
  onPutContentPageField: (data, history) =>
    dispatch(putContentPageField(data, history)),
  onUploadFile: (data, callback) => dispatch(uploadFile(data, callback)),
  onGetCustomers: data => dispatch(getblogs(data)),
  onGetCategories: data => dispatch(getblogCategories(data)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddCategory))
)
