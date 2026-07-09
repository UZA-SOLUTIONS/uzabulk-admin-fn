import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { withRouter, useParams, Link } from "react-router-dom"
import { connect } from "react-redux"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
// import ClassicEditor from "plugins/ckeditor/build/ckeditor"
import { isObject } from "lodash"
import queryString from "query-string"
import FormButton from "components/Common/FormButtons"
import Select from "react-select"
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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
  Spinner,
  CardTitle,
  CardSubtitle,
  FormText,
  Button,
} from "reactstrap"
import { SLUGS_NAME as slugname } from "helpers/contants"

import {
  GET_SERVICE_NAME,
  ROLES,
  DEFAULT_STORE_TYPE,
  PRODUCT_FORM,
  VERSION_3_PRODUCT_FORM,
  PRICING_TYPE_LIST,
} from "helpers/contants"

import { addFdProduct, getFdProduct, putFdProduct } from "store/actions"
import { usePermissions } from "helpers/permissions"
//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb2"

// Translation
import { withTranslation } from "react-i18next"

import Images from "./Images"
import Categories from "./Categories"
import Addons from "./Addons"
import Cuisines from "./Brands"
import Variants from "./Variants"
import Guidelines from "./Guidelines"
import HotelInfo from "./HotelInfo"
import Amenities from "./Amenities"
import Switch from "components/Common/Switch"
import TieredPricing from "./TieredPricing"

const SeoSettings = ({ fields, handleSeoChange, className, ...props }) => {
  return (
    <Card className={className}>
      <CardBody>
        <Row>
          <Col xs={12}>
            <h5>{props.t("seo_settings")}</h5>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("title")}</Label>

              <Input
                type="text"
                value={fields?.seoSettings?.title}
                onChange={handleSeoChange("title")}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("meta_keywords")}</Label>

              <Input
                type="textarea"
                rows={2}
                value={fields?.seoSettings?.metaKeywords}
                onChange={handleSeoChange("metaKeywords")}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("meta_description")}</Label>

              <Input
                type="textarea"
                rows={2}
                value={fields?.seoSettings?.metaDescription}
                onChange={handleSeoChange("metaDescription")}
              />
            </FormGroup>
          </Col>

          <Col xs={12}>
            <h5>{props.t("facebook")}</h5>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("title")}</Label>

              <Input
                type="text"
                value={fields?.seoSettings?.facebook?.title}
                onChange={e =>
                  handleSeoChange("facebook")({
                    target: {
                      value: {
                        ...fields?.seoSettings.facebook,
                        title: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("description")}</Label>

              <Input
                type="textarea"
                rows={2}
                value={fields?.seoSettings?.facebook?.description}
                onChange={e =>
                  handleSeoChange("facebook")({
                    target: {
                      value: {
                        ...fields?.seoSettings.facebook,
                        description: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("image_url")}</Label>

              <Input
                type="text"
                value={fields?.seoSettings?.facebook?.image}
                onChange={e =>
                  handleSeoChange("facebook")({
                    target: {
                      value: {
                        ...fields?.seoSettings.facebook,
                        image: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>

          <Col xs={12}>
            <h5>{props.t("twitter")}</h5>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("username")}</Label>

              <Input
                type="text"
                value={fields?.seoSettings?.twitter?.username}
                onChange={e =>
                  handleSeoChange("twitter")({
                    target: {
                      value: {
                        ...fields?.seoSettings.twitter,
                        username: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("title")}</Label>

              <Input
                type="text"
                value={fields?.seoSettings?.twitter?.title}
                onChange={e =>
                  handleSeoChange("twitter")({
                    target: {
                      value: {
                        ...fields?.seoSettings.twitter,
                        title: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("description")}</Label>

              <Input
                type="textarea"
                rows={2}
                value={fields?.seoSettings?.twitter?.description}
                onChange={e =>
                  handleSeoChange("twitter")({
                    target: {
                      value: {
                        ...fields?.seoSettings.twitter,
                        description: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>{props.t("image_url")}</Label>

              <Input
                type="text"
                value={fields?.seoSettings?.twitter?.image}
                onChange={e =>
                  handleSeoChange("twitter")({
                    target: {
                      value: {
                        ...fields?.seoSettings.twitter,
                        image: e.target.value,
                      },
                    },
                  })
                }
              />
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const AddProduct = ({
  accessLevel,
  role,
  pricingType,
  store,
  history,
  error,
  onAddFdProduct,
  onGetFdProduct,
  onPutFdProduct,
  fdProduct,
  loading,
  settings,
  activeStoreId,
  activeStoreType,
  uploadingFile,
  fd,
  ...props
}) => {
  const initTieredPricing = {
    price: "",
    startQuantity: "",
  }
  console.log(activeStoreType, "checkStoreType")
  let _PRODUCT_FORM = {}

  _PRODUCT_FORM =
    (PRODUCT_FORM[activeStoreType?.storeType]
      ? PRODUCT_FORM[activeStoreType?.storeType]
      : DEFAULT_STORE_TYPE["PRODUCT_FORM"]) || {}

  props.storeVersion && props.storeVersion > 2
    ? (_PRODUCT_FORM =
      (VERSION_3_PRODUCT_FORM[activeStoreType?.storeType]
        ? VERSION_3_PRODUCT_FORM[activeStoreType?.storeType]
        : DEFAULT_STORE_TYPE["PRODUCT_FORM"]) || {})
    : ""

  const { id, vendorId } = useParams()
  const { vendor_name } = queryString.parse(props?.location?.search)

  const didMountRef = useRef(null)

  let _PRICING_TYPE_DATA = []

  _PRICING_TYPE_DATA =
    (PRICING_TYPE_LIST[activeStoreType?.storeType]
      ? PRICING_TYPE_LIST[activeStoreType?.storeType]
      : DEFAULT_STORE_TYPE["PRICING_TYPE_LIST"]) || []

  const [serviceName, setserviceName] = useState("product")
  const [vendorIdParam, setvendorIdParam] = useState()
  const [accesses, setaccesses] = useState({
    canAdd: false,
    canEdit: false,
  })

  const [isValidPricing, setIsValidPricing] = useState();
  const [fields, setFields] = useState({
    storeTypeId: "",
    name: "",
    price: 0,
    compare_price: "",
    categories: [],
    addons: [],
    featured_image: null,
    images: [],
    type: "simple",
    sku: "",
    veganType: "veg",
    short_description: "",
    description: "",
    stock_status: "instock",
    manage_stock: false,
    stock_quantity: 0,
    attributes: [],
    variations: [],
    bestSeller: false,
    seoSettings: {},
    status: "active",
    // pricingType: "",
    guidelines: [
      {
        text: "",
      },
    ],
    tieredPricing: false,
    price_tiers: [initTieredPricing],
    vendor: vendorId,
  })

  console.log("ADD PRODUCT VENDOR", vendorId)

  const guidetext = [
    {
      text: "",
    },
  ]

  const [activeAttributes, setAttributes] = useState([])
  const [variations, setvariations] = useState([])
  const [selectedFiles, setselectedFiles] = useState([])
  const [parentCategories, setparentCategories] = useState([])
  const [parentAddons, setparentAddons] = useState([])
  const [parentCuisines, setparentCuisines] = useState(null)
  const [guidelinesarray, setGuidelinesarray] = useState([
    {
      text: "",
    },
  ])

  const [amenities, setAmenities] = useState()

  const hasPermission = usePermissions()

  useEffect(() => {
    if (activeStoreType?.storeType) {
      const _serviceName = GET_SERVICE_NAME({
        name: "product",
        storeType: activeStoreType?.storeType,
      })

      setserviceName(_serviceName)
    }
  }, [activeStoreType])

  useEffect(() => {
    setFields({ ...fields, storeTypeId: activeStoreId })
  }, [activeStoreId])

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
      onGetFdProduct(activeStoreId, id)
    }
  }, [id, activeStoreId])

  useEffect(() => {
    if (didMountRef.current) {
      try {
        console.log(fdProduct, "fdProduct")
        setFields(prevState => ({
          ...prevState,
          _id: fdProduct._id,
          pricingType:
            fdProduct.pricingType ||
            (props?.slug == slugname.oneTimeShop || props?.slug == "main-v2"
              ? ""
              : props?.slug == "topup-fuel"
                ? "liter"
                : "unit"),
          name: fdProduct.name || "",
          price: fdProduct.price || "",
          compare_price: fdProduct.compare_price || "",
          categories: fdProduct.categories || [],
          addons: fdProduct.addons || [],
          featured_image: fdProduct.featured_image || null,
          type: fdProduct.type || "simple",
          sku: fdProduct.sku || "",
          short_description: fdProduct.short_description || "",
          description: fdProduct.description || "",
          stock_status: fdProduct.stock_status || "instock",
          manage_stock: fdProduct.manage_stock || false,
          stock_quantity: fdProduct.stock_quantity || "",
          attributes: fdProduct.attributes || [],
          variations: fdProduct.variations || [],
          bestSeller: fdProduct.bestSeller,
          seoSettings: fdProduct.seoSettings || {},
          status: fdProduct.status || "active",
          guests: fdProduct.guests || "",
          rooms: fdProduct.rooms || "",
          beds: fdProduct.beds || "",
          infants: fdProduct.infants || "",
          address: fdProduct.address || "",
          weight: fdProduct.weight || "",
          price_tiers: fdProduct?.price_tiers?.length ? fdProduct.price_tiers : [initTieredPricing],
          tieredPricing: fdProduct.price_tiers?.length ? true : false,
        }))

        if (_PRODUCT_FORM.veganType) {
          setFields(prevState => ({
            ...prevState,
            veganType: fdProduct?.veganType,
          }))
        }

        if (!_PRODUCT_FORM?.images) {
          if (fdProduct?.featured_image?.link) {
            setFields(prevState => ({
              ...prevState,
              featured_image: fdProduct?.featured_image?._id,
            }))
            setselectedFiles([
              {
                preview: fdProduct.featured_image.link,
                name: fdProduct.featured_image.link,
              },
            ])
          }
        } else {
          if (fdProduct?.images) {
            if (fdProduct?.featured_image?.link) {
              setFields(prevState => ({
                ...prevState,
                featured_image: fdProduct?.featured_image?._id,
              }))
            }

            setFields(prevState => ({
              ...prevState,
              images: [
                ...(fdProduct?.featured_image?.link
                  ? [fdProduct?.featured_image?._id]
                  : []),
                ...fdProduct?.images
                  ?.filter(
                    image => image?._id !== fdProduct?.featured_image?._id
                  )
                  ?.map(image => image._id),
              ],
            }))

            setselectedFiles([
              ...(fdProduct?.featured_image?.link
                ? [
                  {
                    preview: fdProduct?.featured_image?.link,
                    name: fdProduct?.featured_image?.link,
                  },
                ]
                : []),
              ...fdProduct?.images
                ?.filter(image => image?._id !== fdProduct?.featured_image?._id)
                ?.map(image => ({
                  preview: image.link,
                  name: image.link,
                })),
            ])
          }
        }
        if (fdProduct?.guidelines) {
          setFields(pre => ({
            ...pre,
            guidelines: fdProduct.guidelines || guidetext,
          }))

          setGuidelinesarray(fdProduct?.guidelines)
        }

        if (_PRODUCT_FORM?.categories && fdProduct?.categories) {
          // Remove Sub Categories
          setparentCategories(
            fdProduct?.categories
              /* ?.filter((item, index) => {
                let notFound = false

                if (item.parent !== "none") {
                  if (
                    [
                      ...fdProduct?.categories
                        ?.slice(0, index)
                        ?.map(({ _id }) => _id),
                      ...fdProduct?.categories
                        ?.slice(index + 1)
                        ?.map(({ _id }) => _id),
                    ]?.includes(item.parent)
                  ) {
                    notFound = false
                  } else {
                    notFound = true
                  }
                } else {
                  notFound = true
                }

                return notFound
              }) */
              ?.map(({ _id, catName, subcategories }) => ({
                label: catName,
                value: _id,
                subcategories,
              }))
          )
        }

        if (_PRODUCT_FORM?.addon && fdProduct?.addons) {
          setparentAddons(
            fdProduct?.addons?.map(({ _id, name }) => ({
              label: name,
              value: _id,
            }))
          )
        }

        if (_PRODUCT_FORM?.cuisine && fdProduct?.brand) {
          setparentCuisines({
            label: fdProduct?.brand?.name,
            value: fdProduct?.brand?._id,
          })
          // setAmenities({
          //   label: fdProduct?.brand?.name,
          //   value: fdProduct?.brand?._id,
          // })
        }
        if (_PRODUCT_FORM?.amenities && fdProduct?.amenities) {
          console.log(fdProduct?.amenities, "123")
          setAmenities(
            fdProduct?.amenities?.map(fd => {
              return {
                label: fd?.name,
                value: fd?._id,
              }
            })
          )
        }

        if (_PRODUCT_FORM?.variations) {
          if (fdProduct?.attributes) {
            console.log("maggi maggi", fdProduct?.attributes)
            setAttributes(
              fdProduct?.attributes?.map(item => ({
                attribute: {
                  label: item.name,
                  value: item._id,
                  noPriceRequired: item?.noPriceRequired,
                },
                option:
                  item?.terms?.map(term => ({
                    label: term.name,
                    value: term._id,
                  })) || [],
              }))
            )
          }

          if (fdProduct?.variations) {
            setvariations(fdProduct?.variations || [])
          }
        }
      } catch (err) {
        console.log("parsing error ", err)
      }
    } else didMountRef.current = true
  }, [JSON.stringify(fdProduct)])

  const handleChange = name => event => {
    setFields(prevState => ({ ...prevState, [name]: event.target.value }))
  }

  const handleSeoChange = name => event => {
    setFields(prevState => ({
      ...prevState,
      seoSettings: { ...prevState.seoSettings, [name]: event.target.value },
    }))
  }
  console.log(props?.slug == slugname.oneTimeShop, "HHHHHHHHHHHHHHHHHHHh")

  // const handlePricingtype = e => {
  //   setFields(pre => ({
  //     ...pre,
  //     pricingType: e.target.value,
  //   }))
  // }
  // // console.log(fdProduct, "fdProduct")

  const handlePricingType = data => {
    setFields(pre => ({
      ...pre,
      pricingType: data.value,
    }))
  }

  const handleGuidelines = index => e => {
    setGuidelinesarray(pre => [
      ...guidelinesarray.slice(0, index),
      { text: e.target.value },
      ...guidelinesarray.slice(index + 1),
    ])
    setFields(pre => ({
      ...pre,
      guidelines: [
        ...pre.guidelines.slice(0, index),
        { text: e.target.value },
        ...pre.guidelines.slice(index + 1),
      ],
    }))
  }

  const removeGuideline = index => {
    // console.log(index, "index");
    // // const [...guidelinesarray[index], ...other] = guidelinesarray
    // // console.log(other,"other");

    // // guidelinesarray.splice(index, 1)
    // console.log(guidelinesarray, 'guidelinesarray1');
    setGuidelinesarray(perv => perv.filter((d, i) => i !== index))

    setFields(pre => ({
      ...pre,
      guidelines: [
        ...pre.guidelines.slice(0, index),
        ...pre.guidelines.slice(index + 1),
      ],
    }))
  }
  // console.log(guidelinesarray, 'guidelinesarray2');

  const addGuidelineText = () => {
    setGuidelinesarray(pre => [
      ...pre,
      {
        text: "",
      },
    ])
    // setFields(pre => ({
    //   ...pre,
    //   guidelines: [...pre.guidelines,
    //   { text: "" }
    //   ]
    // }))
  }

  const onSubmit = event => {
    event.preventDefault()

    if (loading || uploadingFile || !isValidPricing) return;

    const data = fields

    if (_PRODUCT_FORM?.categories) {
      const finalCategories = []

      // Send Sub Categories
      parentCategories?.map(category => {
        finalCategories.push(category.value)

        /* if (category.subcategories) {
          category.subcategories?.map(subCat =>
            finalCategories.push(isObject(subCat) ? subCat._id : subCat)
          )
        } */

        return category.value
      })

      data.categories = finalCategories
    }

    if (_PRODUCT_FORM?.addon) {
      data.addons = parentAddons?.map(addon => addon.value)
    }

    if (_PRODUCT_FORM?.cuisine) {
      data.brand = parentCuisines?.value
    }

    if (_PRODUCT_FORM?.amenities) {
      const finalamenities = []
      amenities?.map(am => {
        finalamenities.push(am.value)

        return am.value
      })
      data.amenities = finalamenities
    }

    if (_PRODUCT_FORM?.variations) {
      data.attributes = activeAttributes
        ?.filter(item => !!item.option)
        ?.map(item => ({
          _id: item?.attribute?.value,
          name: item?.attribute?.label,
          noPriceRequired: item?.attribute?.noPriceRequired,
          terms: item.option?.map(i => ({ _id: i.value, name: i.label })),
        }))

      data.variations = variations
    }

    data.images = data?.images?.filter(image => image !== data?.featured_image)

    if (!data?.featured_image) {
      data.featured_image = data?.images[0]
      // data.images = data?.images?.filter(
      //   image => image !== data?.featured_image
      // )
      data.images = data?.images;
    }

    if (id) {
      if (!accesses.canEdit && !hasPermission("STORE.product.UPDATE")) return
      onPutFdProduct(
        activeStoreType?.storeType?.toLowerCase(),
        {
          _id: fdProduct._id,
          ...data,
          isFeaturedOnly: !_PRODUCT_FORM?.images || false,
        },
        history
      )
    } else {
      if (!accesses.canAdd && !hasPermission("STORE.product.CREATE ")) return

      if (fields?.pricingType == "") toastr.error("Please Fill Pricing Type")

      onAddFdProduct(
        activeStoreType?.storeType?.toLowerCase(),
        { ...data, isFeaturedOnly: !_PRODUCT_FORM?.images || false },
        history
      )
    }
  }

  // console.log(fields, "fields");

  const content = (
    <Row>
      <Col lg={8}>
        <Card>
          <CardBody>
            <CardSubtitle>
              <small>{props.t("product_int", { serviceName })}...</small>
            </CardSubtitle>
            <Row>
              <Col lg={12}>
                <FormGroup>
                  <Label htmlFor="formrow-firstname-Input">
                    {props.t("display_name")} <span class="text-danger">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="formrow-firstname-Input"
                    value={fields.name || ""}
                    onChange={handleChange("name")}
                    required
                  />
                  {activeStoreType?.storeType?.toLowerCase() !==
                    "serviceprovider" && (
                      <FormText>{props.t("display_name_guide")}</FormText>
                    )}
                  {activeStoreType?.storeType?.toLowerCase() ===
                    "serviceprovider" && (
                      <FormText>{props.t("display_name_service_guide")}</FormText>
                    )}
                </FormGroup>
              </Col>

              <Col lg={12}>
                <FormGroup>
                  <Label>{props.t("short_description")}</Label>

                  <Input
                    type="textarea"
                    rows={2}
                    className="form-control"
                    value={fields.short_description || ""}
                    onChange={handleChange("short_description")}
                  />
                  {activeStoreType?.storeType?.toLowerCase() !==
                    "serviceprovider" && (
                      <FormText>{props.t("short_description_guide")}</FormText>
                    )}
                  {activeStoreType?.storeType?.toLowerCase() ===
                    "serviceprovider" && (
                      <FormText>
                        {" "}
                        {props.t("short_description_service_guide")}
                      </FormText>
                    )}
                </FormGroup>
              </Col>

              {_PRODUCT_FORM?.description && (
                <Col lg={12}>
                  <FormGroup>
                    <Label>
                      {props.t("description")}{" "}
                      {activeStoreType?.storeType?.toLowerCase() !== "food" && (
                        <span class="text-danger">*</span>
                      )}
                    </Label>

                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "link",
                          "BulletedList",
                          "NumberedList",
                          "FontBackgroundColor",
                          "FontColor",
                        ],
                      }}
                      data={fields.description}
                      onChange={(event, editor) => {
                        const data = editor.getData()

                        handleChange("description")({
                          target: { value: data },
                        })
                      }}
                    />
                    <FormText>{props.t("description_guide")}</FormText>
                  </FormGroup>
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>

        <Images
          isFeaturedOnly={!_PRODUCT_FORM?.images || false}
          fields={fields}
          setFields={setFields}
          selectedFiles={selectedFiles}
          setselectedFiles={setselectedFiles}
          id={id}
          accesses={accesses}
          t={props.t}
          serviceName={serviceName}
        />
        {_PRODUCT_FORM?.hotelinfo && (
          <HotelInfo
            fields={fields}
            t={props.t}
            handleChange={handleChange}
            setFields={setFields}
            accesses={accesses}
          />
        )}
        {_PRODUCT_FORM?.amenities && (
          <Amenities
            amenities={amenities}
            setAmenities={setAmenities}
            fields={fields}
            setFields={setFields}
            activeStoreId={activeStoreId}
            activeStoreType={activeStoreType}
          />
        )}

        {_PRODUCT_FORM?.guidelines && (
          <Card>
            <CardBody>
              <Row>
                <Col lg={12}>
                  <FormGroup>
                    {/* <Label>Guidelines</Label> */}
                    {guidelinesarray?.map((g, index) => {
                      return (
                        <Guidelines
                          fields={fields}
                          setFields={setFields}
                          accesses={accesses}
                          t={props.t}
                          handleGuidelines={handleGuidelines}
                          index={index}
                          length={guidelinesarray?.length}
                          removeGuideline={removeGuideline}
                          g={g}
                          buttoncolor={
                            guidelinesarray?.length > 1 ? "danger" : "secondary"
                          }
                        />
                      )
                    })}
                    <Button className="mt-3" onClick={addGuidelineText}>
                      Add
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}
        {(slugname.oneTimeShop == props?.slug || props?.slug == "main-v2") && (
          <Card>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Label>{props.t("weight")}</Label>
                  <Input
                    type="number"
                    min={0}
                    value={fields?.weight}
                    onChange={handleChange("weight")}
                  />
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      {props.t("pricingType")}
                      <span className="text-danger ml-1">*</span>
                    </Label>
                    <Select
                      options={_PRICING_TYPE_DATA?.map(({ label, value }) => ({
                        label: label,
                        value: value,
                      }))}
                      required
                      value={{ label: fields.pricingType }}
                      onChange={handlePricingType}
                      classNamePrefix="select2-selection "
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}

        {["SERVICEPROVIDER", "CARRENTAL", "AIRBNB"]?.includes(
          activeStoreType?.storeType
        ) &&
          (slugname.oneTimeShop !== props?.slug ||
            props?.slug !== "main-v2") && (
            <Card>
              <CardBody>
                <Row>
                  <Col lg={12}>
                    <FormGroup>
                      <Label>
                        {props.t("pricingType")}
                        <span className="text-danger ml-1">*</span>
                      </Label>
                      <Select
                        options={_PRICING_TYPE_DATA?.map(
                          ({ label, value }) => ({
                            label: label,
                            value: value,
                          })
                        )}
                        required
                        value={{ label: fields.pricingType }}
                        onChange={handlePricingType}
                        classNamePrefix="select2-selection "
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          )}

        {/* <Card>
          <CardBody>
            <Row>
              <Col lg={10}>
                <FormGroup>
                  <Label>{props.t("addons")}</Label>
                  <Select />
                </FormGroup>

              </Col>
              <Col lg={2}>
                KO
              </Col>
            </Row>
          </CardBody>
        </Card> */}
        <Card>
          <CardBody>
            <Row>
              <Col lg={6}>
                <FormGroup>
                  <Label htmlFor="formrow-price-Input">
                    {props.t("price")} <span class="text-danger">*</span>
                  </Label>

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>{store?.currency?.sign}</InputGroupText>
                    </InputGroupAddon>

                    <Input
                      type="number"
                      className="form-control"
                      id="formrow-price-Input"
                      value={fields.price}
                      onChange={handleChange("price")}
                      min={0}
                      step={0.01}
                      required
                    />
                  </InputGroup>
                  <FormText>
                    {props.t("product_price_guide", { serviceName })}
                  </FormText>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label htmlFor="formrow-compare_price-Input">
                    {props.t("compare_price")}
                  </Label>

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>{store?.currency?.sign}</InputGroupText>
                    </InputGroupAddon>

                    <Input
                      type="number"
                      className="form-control"
                      id="formrow-compare_price-Input"
                      value={fields.compare_price}
                      onChange={handleChange("compare_price")}
                      step={0.01}
                      min={0}
                    />
                  </InputGroup>
                  {activeStoreType?.storeType?.toLowerCase() !==
                    "serviceprovider" && (
                      <FormText>{props.t("compare_price_guide")}</FormText>
                    )}
                  {activeStoreType?.storeType?.toLowerCase() ===
                    "serviceprovider" && (
                      <FormText>
                        {props.t("compare_service_price_guide")}
                      </FormText>
                    )}
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="formrow-price-Input">
                    {props.t("Tiered Pricing")}{" "}
                    <span class="text-danger">*</span>
                  </Label>

                  {/* <Switch
                    checked={fields.tieredPricing}
                    callback={e => {
                      if (fields.tieredPricing) {
                        setFields(s => ({ ...s, price_tiers: [] }))
                      } else {
                        setFields(s => ({
                          ...s,
                          price_tiers: fdProduct?.price_tiers?.length
                            ? fdProduct.price_tiers
                            : [initTieredPricing],
                        }))
                      }
                      handleChange("tieredPricing")({
                        target: { value: !fields.tieredPricing },
                      })
                    }}
                    on="On"
                    off="Off"
                  /> */}
                </FormGroup>
              </Col>
            </Row>
            <TieredPricing
              pricingList={fields.price_tiers}
              t={props.t}
              store={store}
              setFields={setFields}
              setIsValidPricing={setIsValidPricing}
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            {_PRODUCT_FORM?.manage_stock && (
              <CardTitle className="mb-3">
                <div className="custom-control custom-checkbox custom-checkbox-primary">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`option-radio`}
                    checked={fields.manage_stock == true}
                    onChange={() => {
                      const value = fields.manage_stock == true ? false : true

                      handleChange("manage_stock")({
                        target: { value },
                      })
                    }}
                  />

                  <label
                    className="custom-control-label"
                    htmlFor={`option-radio`}
                  >
                    {props.t("manage_stock")}
                  </label>
                  <FormText>{props.t("manage_stock_guide")}</FormText>
                </div>
              </CardTitle>
            )}

            <Row>
              <Col xs={12} sm={6} md={6} lg={12} xl={6}>
                <FormGroup>
                  <Label>{props.t("sku")}</Label>
                  <Input
                    type="text"
                    className="form-control"
                    value={fields.sku || ""}
                    onChange={handleChange("sku")}
                  />
                </FormGroup>
              </Col>

              <Col xs={12} sm={6} md={6} lg={12} xl={6}>
                {fields?.manage_stock ? (
                  <FormGroup>
                    <Label>
                      {props.t("stock_quantity")}{" "}
                      {activeStoreType?.storeType?.toLowerCase() !== "food" && (
                        <span class="text-danger">*</span>
                      )}
                      <span className="text-danger ml-1">*</span>
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      value={fields.stock_quantity}
                      onChange={handleChange("stock_quantity")}
                      min={0}
                      required
                    />
                  </FormGroup>
                ) : (
                  <FormGroup>
                    <Label>{props.t("stock_status")}</Label>

                    <div className="switch-l square-switch">
                      <input
                        type="checkbox"
                        id="stock-status-switch1"
                        switch="none"
                        checked={fields.stock_status == "instock"}
                        onChange={() => {
                          const value =
                            fields.stock_status == "instock"
                              ? "outofstock"
                              : "instock"

                          handleChange("stock_status")({
                            target: { value },
                          })
                        }}
                      />
                      <label
                        htmlFor="stock-status-switch1"
                        data-on-label={props.t("instock")}
                        data-off-label={props.t("outStock")}
                      />
                    </div>
                  </FormGroup>
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>

        {_PRODUCT_FORM?.variations && (
          <Card>
            <CardBody>
              <CardTitle className="mb-3">{props.t("variants")}</CardTitle>
              <CardSubtitle>
                <small>{props.t("variants_guide")}</small>
              </CardSubtitle>

              <Row>
                <Col lg={12}>
                  <div className="custom-control custom-checkbox custom-checkbox-primary">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={`form-type-checkbox`}
                      checked={fields.type == "variable"}
                      onChange={() => {
                        const value =
                          fields.type == "simple" ? "variable" : "simple"

                        handleChange("type")({
                          target: { value },
                        })
                      }}
                    />

                    <label
                      className="custom-control-label text-capitalize"
                      htmlFor={`form-type-checkbox`}
                    >
                      {props.t("variants_type")}
                    </label>
                  </div>
                </Col>

                {fields.type == "variable" && (
                  <Col lg={12}>
                    <hr className="my-3" />

                    <Variants
                      fields={fields}
                      activeAttributes={activeAttributes}
                      setAttributes={setAttributes}
                      variations={variations}
                      setvariations={setvariations}
                      t={props.t}
                    />
                  </Col>
                )}
              </Row>
            </CardBody>
          </Card>
        )}

        <SeoSettings
          className="d-none d-lg-block"
          t={props.t}
          fields={fields}
          handleSeoChange={handleSeoChange}
        />
      </Col>

      <Col lg={4}>
        {_PRODUCT_FORM?.categories && (
          <Categories
            activeStoreId={activeStoreId}
            activeStoreType={activeStoreType}
            fields={fields}
            parentCategories={parentCategories}
            setparentCategories={setparentCategories}
            t={props.t}
            serviceName={serviceName}
          />
        )}

        {_PRODUCT_FORM?.addon && (
          <Addons
            activeStoreId={activeStoreId}
            activeStoreType={activeStoreType}
            fields={fields}
            parentAddons={parentAddons}
            setparentAddons={setparentAddons}
            t={props.t}
          />
        )}

        {/* {_PRODUCT_FORM?.cuisine && (
          <Cuisines
            activeStoreId={activeStoreId}
            activeStoreType={activeStoreType}
            fields={fields}
            parentCuisines={parentCuisines}
            setparentCuisines={setparentCuisines}
            t={props.t}
          />
        )} */}

        {_PRODUCT_FORM?.veganType && settings?.isVeganFilterActive == true && (
          <Card>
            <CardBody>
              <Row>
                <Col xs={6} sm={4} md={4} lg={12} xl={6}>
                  <FormGroup>
                    <Label>{props.t("vegan_type")}</Label>

                    <div className="switch-l square-switch">
                      <input
                        type="checkbox"
                        id="vegan-type"
                        switch="none"
                        checked={fields.veganType == "veg"}
                        onChange={() => {
                          const value =
                            fields.veganType == "veg" ? "nonveg" : "veg"

                          handleChange("veganType")({ target: { value } })
                        }}
                      />
                      <label
                        htmlFor="vegan-type"
                        data-on-label={props.t("veg")}
                        data-off-label={props.t("nonveg")}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}
        {activeStoreType?.storeType !== "SERVICEPROVIDER" && (
          <Card>
            <CardBody>
              <Row>
                <Col xs={6} sm={4} md={4} lg={12} xl={6}>
                  <FormGroup>
                    <Label>{props.t("best_seller")}</Label>

                    <div className="switch-l square-switch">
                      <input
                        type="checkbox"
                        id="best_seller-switch1"
                        switch="none"
                        checked={fields.bestSeller}
                        onChange={() => {
                          const value = !fields.bestSeller

                          handleChange("bestSeller")({ target: { value } })
                        }}
                      />
                      <label
                        htmlFor="best_seller-switch1"
                        data-on-label={props.t("yes")}
                        data-off-label={props.t("no")}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}
        <Card>
          <CardBody>
            <Row>
              <Col xs={6} sm={4} md={4} lg={12} xl={6}>
                <FormGroup>
                  <Label>{props.t("status")}</Label>

                  <div className="switch-l square-switch">
                    <input
                      type="checkbox"
                      id="square-switch1"
                      switch="none"
                      checked={fields.status == "active"}
                      onChange={() => {
                        const value =
                          fields.status == "active" ? "inactive" : "active"

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

        <SeoSettings
          className="d-block d-lg-none"
          t={props.t}
          fields={fields}
          handleSeoChange={handleSeoChange}
        />
      </Col>

      <Col lg={8} className="spinner-content">
        <FormButton
          needSubmit={
            id
              ? accesses.canEdit && hasPermission("STORE.product.UPDATE")
              : accesses.canAdd && hasPermission("STORE.product.CREATE")
          }
          submitDisabled={uploadingFile || loading}
          goBack={() => history.goBack()}
          loader={
            (loading || uploadingFile) && (
              <div className="spinner">
                <Spinner color="primary" />
              </div>
            )
          }
        />
      </Col>
    </Row>
  )
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
            <Col md={1} className="d-xs-none d-sm-block"></Col>

            <Col md={10}>
              <Breadcrumbs
                breadcrumbItem={`${!id ? "Add" : "Edit"} Product`}
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
                        title: props.t(serviceName + "s"),
                        link: `/${activeStoreType?.storeType?.toLowerCase()}/${serviceName?.toLowerCase()}s/${vendorIdParam}${props?.location?.search
                          }`,
                      },
                    ]
                    : [
                      {
                        title: props.t(serviceName + "s"),
                        link: `/${activeStoreType?.storeType?.toLowerCase()}/${serviceName?.toLowerCase()}s${props?.location?.search
                          }`,
                      },
                    ]),

                  {
                    title: props.t(id ? "edit" : "add"),
                  },
                ]}
              />
            </Col>

            <Col md={1} className="d-xs-none d-sm-block"></Col>
          </Row>

          <Row>
            <Col md={1} className="d-xs-none d-sm-block"></Col>

            <Col md={10}>
              <Form id="add-product" onSubmit={onSubmit}>
                {error && <Alert color="danger">{props.t(error)}</Alert>}
                {content}
              </Form>
            </Col>

            <Col md={1} className="d-xs-none d-sm-block"></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

AddProduct.propTypes = {
  role: PropTypes.string,
  vendorId: PropTypes.string,
  store: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  fdProduct: PropTypes.object,
  onAddFdProduct: PropTypes.func,
  onGetFdProduct: PropTypes.func,
  onPutFdProduct: PropTypes.func,
}

const mapStateToProps = ({
  File,
  Login,
  FD_Products,
  Settings,
  FD_Settings,
}) => {
  return {
    role: Login?.user?.role || "",
    vendor_name: Login?.user?.name,
    store: Settings?.settings || {},
    pricingType: Login?.pricingType,
    login: Login,
    fd: FD_Products,
    error: FD_Products.error,
    loading: FD_Products.loading,
    fdProduct: FD_Products.fdProduct,
    uploadingFile: File.loading,
    storeVersion: Settings?.settings?.storeVersion,
    settings: FD_Settings.settings,
    slug: Settings?.settings?.slug,
  }
}

const mapDispatchToProps = dispatch => ({
  onAddFdProduct: (storeType, data, history) =>
    dispatch(addFdProduct(storeType, data, history)),
  onGetFdProduct: (storeType, id) => dispatch(getFdProduct(storeType, id)),
  onPutFdProduct: (storeType, data, history) =>
    dispatch(putFdProduct(storeType, data, history)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddProduct))
)
