import axios from "axios"
import { API_VERSION, post, del, get, put } from "./api_helper"
import * as url from "./url_helper"
import authHeader from "./jwt-token-access/auth-token-header"
import createFormData from "./create-form-data"

const urlHelper = (...props) => props?.join("/")

// Login Method
export const getPublicData = data =>
  post(API_VERSION + url.GET_PUBLIC_DATA, data)
export const postSuperAdminLogin = data =>
  post(API_VERSION + url.POST_SUPER_ADMIN_LOGIN, data)
export const postLogin = data => post(API_VERSION + url.POST_LOGIN, data)
export const postLogout = data => post(API_VERSION + url.POST_LOGOUT, data)

// Register
export const postRegisterEmail = data =>
  post(API_VERSION + url.POST_REGISTER_EMAIL, data)
export const postStoreName = data =>
  post(API_VERSION + url.POST_STORE_NAME, data)
export const postRegister = data => post(API_VERSION + url.POST_REGISTER, data)

// Forgot Password
export const postForgetPwd = data =>
  post(API_VERSION + url.POST_FORGOT_PASSWORD, { ...data, role: "ADMIN" })
export const postResetPwd = data =>
  post(API_VERSION + url.POST_RESET_PASSWORD, data)

// Profile
export const getCurrentUser = () => get(API_VERSION + url.GET_CURRENT_USER)
export const putProfile = data => post(API_VERSION + url.PUT_PROFILE, data)
export const putChangePassword = data =>
  post(API_VERSION + url.CHANGE_PASSWORD, data)
export const getLanguages = () => get(API_VERSION + url.GET_LANGUAGES)
export const postEnableNotifications = data => {
  console.log("Calling notification api...");
  post(API_VERSION + url.POST_ENABLE_NOTIFICATIONS, data)
}

// Pay
export const postPay = data => post(API_VERSION + url.POST_PAY, data)
export const postPayAdjustment = data =>
  post(API_VERSION + url.POST_PAY_ADJUSTMENT, data)

// Billing
export const getCurrentPlan = () => get(API_VERSION + url.GET_CURRENT_PLAN)
export const getBillingPlans = data =>
  post(API_VERSION + url.GET_BILLING_PLANS, data)
export const postBillingCard = data =>
  post(API_VERSION + url.POST_BILLING_CARD, data)
export const postUpgradePlan = data =>
  post(API_VERSION + url.POST_UPGRADE_PLAN, data)

// File
export const postFile = data => {
  const formData = new FormData()

  Object.entries(data).map(([key, value]) => formData.append(key, value))

  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  }

  return post(API_VERSION + url.POST_FILE, formData, config)
}
export const postRemoveFile = data =>
  post(API_VERSION + url.POST_REMOVE_FILE, data)

// Customers
export const getCustomers = data => post(API_VERSION + url.GET_CUSTOMERS, data)
export const postCustomer = data => post(API_VERSION + url.ADD_CUSTOMER, data)
export const getCustomer = id => get(API_VERSION + url.GET_CUSTOMER + "/" + id)
export const putCustomer = data => post(API_VERSION + url.PUT_CUSTOMER, data)
export const deleteCustomer = data =>
  post(API_VERSION + url.DELETE_CUSTOMER, data)
export const postCustomerAddress = data =>
  post(API_VERSION + url.POST_CUSTOMER_ADDRESS, data)
export const getCustomerAddress = id =>
  get(API_VERSION + url.GET_CUSTOMER_ADDRESS + "/" + id)
export const putCustomerAddress = data =>
  post(API_VERSION + url.PUT_CUSTOMER_ADDRESS, data)
export const deleteCustomerAddress = data =>
  post(API_VERSION + url.DELETE_CUSTOMER_ADDRESS, data)
export const putCustomersStatus = data =>
  post(API_VERSION + url.PUT_CUSTOMERS_STATUS, data)
export const exportCustomers = () => get(API_VERSION + url.EXPORT_CUSTOMERS)
export const importCustomers = data => {
  const formData = new FormData()

  Object.entries(data).map(([key, value]) => formData.append(key, value))

  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  }

  return post(API_VERSION + url.IMPORT_CUSTOMERS, formData, config)
}

// Campaigns
export const getCampaigns = data => post(API_VERSION + url.GET_CAMPAIGNS, data)
export const postCampaign = data => post(API_VERSION + url.ADD_CAMPAIGN, data)
export const getCampaign = id => get(API_VERSION + url.GET_CAMPAIGN + "/" + id)
export const putCampaign = data => post(API_VERSION + url.PUT_CAMPAIGN, data)
export const deleteCampaign = data =>
  post(API_VERSION + url.DELETE_CAMPAIGN, data)
export const putCampaignsStatus = data =>
  post(API_VERSION + url.PUT_CAMPAIGNS_STATUS, data)

// Email Campaigns
export const getCampaignTemplates = data =>
  post(API_VERSION + url.GET_CAMPAIGN_TEMPLATES, data)
export const postCampaignTemplate = data =>
  post(API_VERSION + url.ADD_CAMPAIGN_TEMPLATE, data)
export const getCampaignTemplate = id =>
  get(API_VERSION + url.GET_CAMPAIGN_TEMPLATE + "/" + id)
export const putCampaignTemplate = data =>
  post(API_VERSION + url.PUT_CAMPAIGN_TEMPLATE, data)
export const deleteCampaignTemplate = data =>
  post(API_VERSION + url.DELETE_CAMPAIGN_TEMPLATE, data)
export const putCampaignTemplatesStatus = data =>
  post(API_VERSION + url.PUT_CAMPAIGN_TEMPLATES_STATUS, data)

// Faqs
export const getFaqs = data => post(API_VERSION + url.GET_FAQS, data)
export const postFaq = data => post(API_VERSION + url.ADD_FAQ, data)
export const getFaq = id => get(API_VERSION + url.GET_FAQ + "/" + id)
export const putFaq = data => post(API_VERSION + url.PUT_FAQ, data)
export const deleteFaq = data => post(API_VERSION + url.DELETE_FAQ, data)
export const putFaqsStatus = data =>
  post(API_VERSION + url.PUT_FAQS_STATUS, data)

// Roles
export const getRoles = data => post(API_VERSION + url.GET_ROLES, data)
export const postRole = data => post(API_VERSION + url.ADD_ROLE, data)
export const getRole = id => get(API_VERSION + url.GET_ROLE + "/" + id)
export const putRole = data => post(API_VERSION + url.PUT_ROLE, data)
export const deleteRole = data => post(API_VERSION + url.DELETE_ROLE, data)
export const putRolesStatus = data =>
  post(API_VERSION + url.PUT_ROLES_STATUS, data)

// Sub Admins
export const getSubAdmins = data => post(API_VERSION + url.GET_SUB_ADMINS, data)
export const postSubAdmin = data =>
  post(API_VERSION + url.ADD_BLOG_CATEGORY, data)
export const getSubAdmin = id => get(API_VERSION + url.GET_SUB_ADMIN + "/" + id)
export const putSubAdmin = data => post(API_VERSION + url.PUT_SUB_ADMIN, data)
export const deleteSubAdmin = data =>
  post(API_VERSION + url.DELETE_SUB_ADMIN, data)
export const putSubAdminsStatus = data =>
  post(API_VERSION + url.PUT_SUB_ADMINS_STATUS, data)

export const getDriverDispatcherList = data =>
  post(API_VERSION + url.DRIVER_DISPATCHER_LIST, data)
export const getCustomerDispatcherList = data =>
  post(API_VERSION + url.CUSTOMER_DISPATCHER_LIST, data)

// BLOG CATegory

export const blogCategories = data =>
  post(API_VERSION + url.GET_BLOG_CATEGORIES, data)
export const postblogCategory = data =>
  post(API_VERSION + url.ADD_BLOG_CATEGORY, data)
export const getBlogCategory = id =>
  get(API_VERSION + url.GET_BLOG_CATEGORY + "/" + id)
export const putBlogCategory = data =>
  post(API_VERSION + url.PUT_BLOG_CATEGORY, data)
export const deleteBlogCategory = data =>
  post(API_VERSION + url.DELETE_BLOG_CATEGORY, data)
export const putBlogCategoriesStatus = data =>
  post(API_VERSION + url.PUT_BLOG_CATEGORIES_STATUS, data)

// BLOG Tag

export const blogTags = data => post(API_VERSION + url.GET_BLOG_TAGS, data)
export const postblogTag = data => post(API_VERSION + url.ADD_BLOG_TAG, data)
export const getBlogTag = id => get(API_VERSION + url.GET_BLOG_TAG + "/" + id)
export const putBlogTag = data => post(API_VERSION + url.PUT_BLOG_TAG, data)
export const deleteBlogTag = data =>
  post(API_VERSION + url.DELETE_BLOG_TAG, data)
export const putBlogTagsStatus = data =>
  post(API_VERSION + url.PUT_BLOG_TAGS_STATUS, data)

// BLOG

export const blogs = data => post(API_VERSION + url.GET_BLOGS, data)
export const postblog = data => post(API_VERSION + url.ADD_BLOG_, data)
export const getBlog = id => get(API_VERSION + url.GET_BLOG_ + "/" + id)
export const putBlog = data => post(API_VERSION + url.PUT_BLOG_, data)
export const deleteBlog = data => post(API_VERSION + url.DELETE_BLOG_, data)
export const putBlogsStatus = data =>
  post(API_VERSION + url.PUT_BLOGS_STATUS, data)

// Promo Codes
export const getPromoCodes = data =>
  post(API_VERSION + url.GET_PROMO_CODES, data)
export const postPromoCode = data =>
  post(API_VERSION + url.ADD_PROMO_CODE, data)
export const getPromoCode = id =>
  get(API_VERSION + url.GET_PROMO_CODE + "/" + id)
export const putPromoCode = data => post(API_VERSION + url.PUT_PROMO_CODE, data)
export const deletePromoCode = data =>
  post(API_VERSION + url.DELETE_PROMO_CODE, data)
export const putPromoCodesStatus = data =>
  post(API_VERSION + url.PUT_PROMO_CODES_STATUS, data)

// Promotions
export const getPromotions = data =>
  post(API_VERSION + url.GET_PROMOTIONS, data)
export const postPromotion = data => post(API_VERSION + url.ADD_PROMOTION, data)
export const getPromotion = id =>
  get(API_VERSION + url.GET_PROMOTION + "/" + id)
export const putPromotion = data => post(API_VERSION + url.PUT_PROMOTION, data)
export const deletePromotion = data =>
  post(API_VERSION + url.DELETE_PROMOTION, data)
export const putPromotionsStatus = data =>
  post(API_VERSION + url.PUT_PROMOTIONS_STATUS, data)

// Gallery
export const getGalleries = data => post(API_VERSION + url.GET_GALLERIES, data)
export const postGallery = data => {
  const formData = new FormData()

  Object.entries(data).map(([key, value]) => formData.append(key, value))

  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  }

  return post(API_VERSION + url.ADD_GALLERY, formData, config)
}
export const getGallery = id => get(API_VERSION + url.GET_GALLERY + "/" + id)
export const putGallery = data => {
  const formData = new FormData()

  Object.entries(data).map(([key, value]) => formData.append(key, value))

  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  }

  return post(API_VERSION + url.PUT_GALLERY, formData, config)
}
export const deleteGallery = data =>
  post(API_VERSION + url.DELETE_GALLERY, data)
export const putGalleriesStatus = data =>
  post(API_VERSION + url.PUT_GALLERIES_STATUS, data)

// Content Pages
export const getContentPages = data =>
  post(API_VERSION + url.GET_CONTENT_PAGES, data)
export const postContentPage = data =>
  post(API_VERSION + url.ADD_CONTENT_PAGE, data)
export const getContentPage = id =>
  get(API_VERSION + url.GET_CONTENT_PAGE + "/" + id)
export const putContentPage = data =>
  post(API_VERSION + url.PUT_CONTENT_PAGE, data)
export const deleteContentPage = data =>
  post(API_VERSION + url.DELETE_CONTENT_PAGE, data)
export const putContentPagesStatus = data =>
  post(API_VERSION + url.PUT_CONTENT_PAGES_STATUS, data)

// Content Pages Fields
export const postContentPageField = data =>
  post(API_VERSION + url.ADD_CONTENT_PAGE_FIELD, data)
export const getContentPageField = id =>
  get(API_VERSION + url.GET_CONTENT_PAGE_FIELD + "/" + id)
export const putContentPageField = data =>
  post(API_VERSION + url.PUT_CONTENT_PAGE_FIELD, data)
export const deleteContentPageField = data =>
  post(API_VERSION + url.DELETE_CONTENT_PAGE_FIELD, data)
export const putContentPageFieldSort = data =>
  post(API_VERSION + url.PUT_CONTENT_PAGE_FIELD_SORT, data)

// Menu
export const getMenus = data => post(API_VERSION + url.GET_MENUS, data)
export const postMenu = data => post(API_VERSION + url.ADD_MENU, data)
export const getMenu = id => get(API_VERSION + url.GET_MENU + "/" + id)
export const putMenu = data => post(API_VERSION + url.PUT_MENU, data)
export const deleteMenu = data => post(API_VERSION + url.DELETE_MENU, data)
export const putMenusStatus = data =>
  post(API_VERSION + url.PUT_MENUS_STATUS, data)

// Menu Fields
export const getMenuFields = data =>
  post(API_VERSION + url.GET_MENU_FIELDS, data)
export const postMenuField = data =>
  post(API_VERSION + url.ADD_MENU_FIELD, data)
export const getMenuField = id =>
  get(API_VERSION + url.GET_MENU_FIELD + "/" + id)
export const putMenuField = data => post(API_VERSION + url.PUT_MENU_FIELD, data)
export const deleteMenuField = id =>
  get(API_VERSION + url.DELETE_MENU_FIELD + "/" + id)
export const putMenuFieldSort = data =>
  post(API_VERSION + url.PUT_MENU_FIELD_SORT, data)

// Email Templates Pages
export const getEmailTemplates = data =>
  post(API_VERSION + url.GET_EMAIL_TEMPLATES, data)
export const getEmailTemplate = id =>
  get(API_VERSION + url.GET_EMAIL_TEMPLATE + "/" + id)
export const putEmailTemplate = data =>
  post(API_VERSION + url.PUT_EMAIL_TEMPLATE, data)
export const postResetEmailTemplate = data =>
  post(API_VERSION + url.POST_RESET_EMAIL_TEMPLATE, data)

// Notifications Pages
export const getNotifications = data =>
  post(API_VERSION + url.GET_NOTIFICATIONS, data)
export const postNotification = data =>
  post(API_VERSION + url.POST_NOTIFICATION, data)

// Transactions
export const getTransactions = data =>
  post(API_VERSION + url.GET_TRANSACTIONS, data)
export const exportTransactions = query =>
  get(API_VERSION + url.EXPORT_TRANSACTIONS + query)
export const getSettlementList = data =>
  post(API_VERSION + url.SETTLEMENT_TRANSACTION, data)

export const getWalletTransactions = data =>
  post(API_VERSION + url.WALLET_TRANSACTION, data)

export const exportWalletTransactions = query =>
  get(API_VERSION + url.WALLET_TRANSACTION_EXPORT + query)

// Document Templates
export const getDocTemplates = data =>
  post(API_VERSION + url.GET_DOCUMENT_TEMPLATES, data)
export const postDocTemplate = data =>
  post(API_VERSION + url.ADD_DOCUMENT_TEMPLATE, data)
export const getDocTemplate = id =>
  get(API_VERSION + url.GET_DOCUMENT_TEMPLATE + "/" + id)
export const putDocTemplate = data =>
  post(API_VERSION + url.PUT_DOCUMENT_TEMPLATE, data)
export const deleteDocTemplate = data =>
  post(API_VERSION + url.DELETE_DOCUMENT_TEMPLATE, data)
export const putDocTemplatesStatus = data =>
  post(API_VERSION + url.PUT_DOCUMENT_TEMPLATES_STATUS, data)

// Document Templates Fields
export const postDocTemplateField = data =>
  post(API_VERSION + url.ADD_DOCUMENT_TEMPLATE_FIELD, data)
export const getDocTemplateField = id =>
  get(API_VERSION + url.GET_DOCUMENT_TEMPLATE_FIELD + "/" + id)
export const putDocTemplateField = data =>
  post(API_VERSION + url.PUT_DOCUMENT_TEMPLATE_FIELD, data)
export const deleteDocTemplateField = data =>
  post(API_VERSION + url.DELETE_DOCUMENT_TEMPLATE_FIELD, data)
export const putDocTemplateFieldSort = data =>
  post(API_VERSION + url.PUT_DOCUMENT_TEMPLATE_FIELD_SORT, data)
// export const getEditDocTemplateField = data =>
//   get(API_VERSION + url.GET_EDIT_DOCTEMPLATE_FIELD + "/" + id)

// Document
export const getDocuments = data => post(API_VERSION + url.GET_DOCUMENTS, data)
export const postDocument = data => post(API_VERSION + url.ADD_DOCUMENT, data)
export const getDocument = data => post(API_VERSION + url.GET_DOCUMENT, data)
export const putDocument = data => post(API_VERSION + url.PUT_DOCUMENT, data)
export const deleteDocument = data =>
  post(API_VERSION + url.DELETE_DOCUMENT, data)

//Driver Edit vehicle
export const editVehicleDriver = data =>
  post(API_VERSION + url.EDIT_VEHICLE_DRIVER, data)
export const updateVehicleDriver = data =>
  post(API_VERSION + url.UPDATE_VHICLE_DRIVER, data)

// Vendor Delivery Restaurants
export const getFdRestaurants = (storeType, data) =>
  post(API_VERSION + url.GET_FD_VENDORS, data)
export const postFdRestaurant = (storeType, data) =>
  post(API_VERSION + url.ADD_FD_VENDOR, data)
export const getFdRestaurant = (storeType, id) =>
  get(API_VERSION + url.GET_FD_VENDOR + "/" + storeType + "/" + id)

export const getFdRestaurantPost = (data, id) =>
  post(API_VERSION + url.POST_FD_VENDOR + "/" + id, data)

export const putFdRestaurant = (storeType, data) =>
  post(API_VERSION + url.PUT_FD_VENDOR, data)
export const deleteFdRestaurant = (storeType, data) =>
  post(API_VERSION + url.DELETE_FD_VENDOR, data)
export const cloneFdRestaurant = (storeType, data) =>
  post(API_VERSION + url.CLONE_FD_VENDOR, data)
export const putFdRestaurantsStatus = (storeType, data) =>
  post(API_VERSION + url.PUT_FD_VENDORS_STATUS, data)
export const putFdRestaurantSettings = (storeType, data) =>
  post(API_VERSION + url.PUT_FD_RESTAURANT_SETTINGS, data)
export const exportFdRestaurants = storeType =>
  get(API_VERSION + url.EXPORT_FD_VENDORS + "/" + storeType)
export const downloadOrderPdf = storeType =>
  get(API_VERSION + url.EXPORT_ORDER_PDF + "/" + storeType)
export const importFdRestaurants = data => {
  const formData = new FormData()

  Object.entries(data).map(([key, value]) => formData.append(key, value))

  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  }

  return post(API_VERSION + url.IMPORT_FD_VENDORS, formData, config)
}
export const deleteFdRestaurantStripeConnect = id =>
  post(API_VERSION + url.DELETE_FD_VENDOR_STRIPE_CONNECT + "?id=" + id, {})

// Download Export Api Order

// export const exportFdOrderReport = () => post(API_VERSION + url.GET_FD_ORDERS_EXPORT)

export const exportFdOrderReport = data =>
  post(API_VERSION + url.GET_FD_ORDERS_EXPORT, undefined, {
    responseType: "blob",
  })

// export const exportDrivers = () => get(API_VERSION + url.EXPORT_DRIVERS)

// Vendor Delivery Orders
export const getFdOrders = (data, query) =>
  post(API_VERSION + url.GET_FD_ORDERS + query, data)
// export const getFdOrdersPost = (data, version) =>
//   post((version || API_VERSION) + url.GET_FD_ORDERS_POST + query, data)
export const getFdOrder = id =>
  get(API_VERSION + urlHelper(url.GET_FD_ORDER, id))
export const postRefund = data => post(API_VERSION + url.POST_REFUND, data)
export const postAcceptFdOrder = (data, version) =>
  post((version || API_VERSION) + url.POST_ACCEPT_FD_ORDER, data)
export const postRejectFdOrder = (data, version) =>
  post((version || API_VERSION) + url.POST_REJECT_FD_ORDER, data)
export const postInprocessFdOrder = (data, version) =>
  post((version || API_VERSION) + url.POST_INPROCESS_FD_ORDER, data)
export const postReadyFdOrder = (data, version) =>
  post((version || API_VERSION) + url.POST_READY_FD_ORDER, data)
export const postCompleteFdOrder = data =>
  post(API_VERSION + url.POST_COMPLETE_FD_ORDER, data)
export const postCancelledFdOrder = (data, version) =>
  post((version || API_VERSION) + url.POST_CANCELLED_FD_ORDER, data)
export const postFdOrderStatus = data =>
  post(API_VERSION + url.POST_FD_ORDER_STATUS, data)
export const getAlibabaFreightTemplates = data =>
  post(API_VERSION + url.POST_ALIBABA_FREIGHT_TEMPLATES, data)
export const updateOrderAlibabaLogistics = (orderId, data) =>
  post(
    `${API_VERSION}${url.POST_ORDER_ALIBABA_LOGISTICS}/${orderId}/alibaba-logistics`,
    data
  )
export const syncOrderAlibabaLogisticsTrace = orderId =>
  post(
    `${API_VERSION}${url.POST_ORDER_ALIBABA_LOGISTICS_SYNC}/${orderId}/alibaba-logistics/sync`,
    {}
  )

// Vendor Delivery Drivers
export const getFdDrivers = (storeType, data) =>
  post(API_VERSION + urlHelper(url.API_FD_DRIVERS, url.GET_FD_DRIVERS), data)
export const postFdDriver = (storeType, data) =>
  post(API_VERSION + urlHelper(url.API_FD_DRIVERS, url.ADD_FD_DRIVER), data)
export const getFdDriver = (storeType, id) =>
  get(API_VERSION + urlHelper(url.API_FD_DRIVERS, url.GET_FD_DRIVER, id))

// date based on list driver

export const getFdDriverPost = (storeType, data) =>
  post(
    API_VERSION +
    urlHelper(url.API_FD_DRIVERS, url.GET_FD_DRIVER_POST, storeType),
    data
  )

export const putFdDriver = (storeType, data) =>
  post(API_VERSION + urlHelper(url.API_FD_DRIVERS, url.PUT_FD_DRIVER), data)
export const deleteFdDriver = (storeType, data) =>
  post(API_VERSION + urlHelper(url.API_FD_DRIVERS, url.DELETE_FD_DRIVER), data)
export const putFdDriversStatus = (storeType, data) =>
  post(
    API_VERSION + urlHelper(url.API_FD_DRIVERS, url.PUT_FD_DRIVERS_STATUS),
    data
  )

export const removeFraudStatusDriver = (storeType, data) =>
  post(
    API_VERSION + urlHelper(url.API_FD_DRIVERS, url.REMOVE_FRAUD_STATUS_DRIVER),
    data
  )
export const exportDrivers = () => get(API_VERSION + url.EXPORT_DRIVERS)
export const importDrivers = data => {
  const formData = new FormData()

  Object.entries(data).map(([key, value]) => formData.append(key, value))

  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  }

  return post(API_VERSION + url.IMPORT_DRIVERS, formData, config)
}

// Vendor Delivery Attributes
export const getFdAttributes = data =>
  post(API_VERSION + url.GET_FD_ATTRIBUTES, data)
export const postFdAttribute = data =>
  post(API_VERSION + url.ADD_FD_ATTRIBUTE, data)
export const getFdAttribute = (storeType, id) =>
  get(API_VERSION + url.GET_FD_ATTRIBUTE + "/" + storeType + "/" + id)
export const putFdAttribute = data =>
  post(API_VERSION + url.PUT_FD_ATTRIBUTE, data)
export const deleteFdAttribute = data =>
  post(API_VERSION + url.DELETE_FD_ATTRIBUTE, data)
export const putFdAttributesStatus = data =>
  post(API_VERSION + url.PUT_FD_ATTRIBUTES_STATUS, data)
export const postFdTermInAttribute = data =>
  post(API_VERSION + url.POST_FD_TERM_IN_ATTRIBUTE, data)

// Vendor Delivery Categories
export const getFdCategories = (storeType, data) =>
  post(API_VERSION + url.API_CATEGORY, data)

export const postFdCategory = (storeType, data) =>
  post(API_VERSION + url.API_CATEGORY + url.ADD_FD_CATEGORY, data)

export const getFdCategory = (storeType, id) =>
  get(
    API_VERSION +
    url.API_CATEGORY +
    url.GET_FD_CATEGORY +
    "/" +
    storeType +
    "/" +
    id
  )

export const putFdCategory = (storeType, data) =>
  post(API_VERSION + url.API_CATEGORY + url.PUT_FD_CATEGORY, data)

export const deleteFdCategory = (storeType, data) =>
  post(API_VERSION + url.API_CATEGORY + url.DELETE_FD_CATEGORY, data)

export const putFdCategoriesStatus = (storeType, data) =>
  post(API_VERSION + url.PUT_FD_CATEGORIES_STATUS, data)

export const putFdCategorySort = data =>
  post(API_VERSION + url.PUT_FD_CATEGORY_SORT, data)

export const exportFdCategories = (storeType, id) =>
  get(API_VERSION + urlHelper(url.EXPORT_FD_CATEGORIES, storeType, id))

// Vendor Delivery Addon
export const getFdAddons = data => post(API_VERSION + url.GET_FD_ADDONS, data)
export const postFdAddon = data => post(API_VERSION + url.ADD_FD_ADDON, data)
export const getFdAddon = (storeType, id) =>
  get(API_VERSION + url.GET_FD_ADDON + "/" + storeType + "/" + id)
export const putFdAddon = data => post(API_VERSION + url.PUT_FD_ADDON, data)
export const deleteFdAddon = data =>
  post(API_VERSION + url.DELETE_FD_ADDON, data)
export const putFdAddonsStatus = data =>
  post(API_VERSION + url.PUT_FD_ADDONS_STATUS, data)

// Vendor Delivery Product
export const getFdProducts = (storeType, data) =>
  post(API_VERSION + url.API_PRODUCT + url.GET_FD_PRODUCTS, data)

export const postFdProduct = (storeType, data) =>
  post(API_VERSION + url.API_PRODUCT + url.ADD_FD_PRODUCT, data)

export const getFdProduct = (storeType, id) =>
  get(API_VERSION + url.API_PRODUCT + url.GET_FD_PRODUCT + storeType + "/" + id)

export const putFdProduct = (storeType, data) =>
  post(API_VERSION + url.API_PRODUCT + url.PUT_FD_PRODUCT, data)

export const deleteFdProduct = (storeType, data) =>
  post(API_VERSION + url.API_PRODUCT + url.DELETE_FD_PRODUCT, data)

export const putFdProductsStatus = (storeType, data) =>
  post(API_VERSION + url.PUT_FD_PRODUCTS_STATUS, data)

export const exportFdProducts = (storeType, id) =>
  get(API_VERSION + urlHelper(url.EXPORT_FD_PRODUCTS, storeType, id))

export const importFdProducts = data => {
  const formData = new FormData()

  Object.entries(data).map(([key, value]) => formData.append(key, value))

  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  }

  return post(API_VERSION + url.IMPORT_FD_PRODUCTS, formData, config)
}

export const importFdProductsVariations = data => {
  const formData = new FormData()

  Object.entries(data).map(([key, value]) => formData.append(key, value))

  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  }

  return post(API_VERSION + url.IMPORT_FD_PRODUCTS_VARIATIONS, formData, config)
}
export const importFdProductsCombine = data => {
  const formData = new FormData()

  Object.entries(data).map(([key, value]) => formData.append(key, value))

  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  }

  return post(API_VERSION + url.IMPORT_FD_PRODUCTS_COMBINE, formData, config)
}

// Vendor Delivery Cuisine
export const getFdCuisines = (storeType, data) =>
  post(API_VERSION + urlHelper(url.API_FD_CUISINES), data)
export const postFdCuisine = (storeType, data) =>
  post(API_VERSION + urlHelper(url.API_FD_CUISINES, url.ADD_FD_CUISINE), data)
export const getFdCuisine = (storeType, id) =>
  get(
    API_VERSION +
    urlHelper(url.API_FD_CUISINES, url.GET_FD_CUISINE, storeType, id)
  )
export const putFdCuisine = (storeType, data) =>
  post(API_VERSION + urlHelper(url.API_FD_CUISINES, url.PUT_FD_CUISINE), data)
export const deleteFdCuisine = (storeType, data) =>
  post(
    API_VERSION + urlHelper(url.API_FD_CUISINES, url.DELETE_FD_CUISINE),
    data
  )
export const putFdCuisinesStatus = (storeType, data) =>
  post(
    API_VERSION + urlHelper(url.API_FD_CUISINES, url.PUT_FD_CUISINES_STATUS),
    data
  )
export const exportFdCuisines = storeType =>
  get(API_VERSION + urlHelper(url.EXPORT_FD_CUISINES, storeType))

//  GROCERY BUSINESS TYPE
export const getFdBusinesstypes = (storeType, data) =>
  post(API_VERSION + urlHelper(url.API_FD_BUSINESS_TYPES), data)
export const postFdBusinesstype = (storeType, data) =>
  post(
    API_VERSION +
    urlHelper(url.API_FD_BUSINESS_TYPES, url.ADD_FD_BUSINESS_TYPE),
    data
  )
export const getFdBusinesstype = (storeType, id) =>
  get(
    API_VERSION +
    urlHelper(
      url.API_FD_BUSINESS_TYPES,
      url.GET_FD_BUSINESS_TYPE,
      storeType,
      id
    )
  )
export const putFdbusinesstype = (storeType, data) =>
  post(
    API_VERSION +
    urlHelper(url.API_FD_BUSINESS_TYPES, url.PUT_FD_BUSINESS_TYPE),
    data
  )
export const deleteFdBusinesstype = (storeType, data) =>
  post(
    API_VERSION +
    urlHelper(url.API_FD_BUSINESS_TYPES, url.DELETE_FD_BUSINESS_TYPE),
    data
  )
export const putFdBusinesstypesStatus = (storeType, data) =>
  post(
    API_VERSION +
    urlHelper(url.API_FD_BUSINESS_TYPES, url.PUT_FD_BUSINESS_TYPES_STATUS),
    data
  )
export const exportFdBusinesstypes = storeType =>
  get(API_VERSION + urlHelper(url.EXPORT_FD_BUSINESS_TYPES, storeType))

// Vendor Delivery Vehicle
export const getFdVehicles = (storeType, data) =>
  post(API_VERSION + urlHelper(url.API_FD_VEHICLES, url.GET_FD_VEHICLES), data)
export const postFdVehicle = (storeType, data) =>
  post(API_VERSION + urlHelper(url.API_FD_VEHICLES, url.ADD_FD_VEHICLE), data)
export const getFdVehicle = (storeType, id) =>
  get(
    API_VERSION +
    urlHelper(url.API_FD_VEHICLES, url.GET_FD_VEHICLE, storeType, id)
  )
export const putFdVehicle = (storeType, data) =>
  post(API_VERSION + urlHelper(url.API_FD_VEHICLES, url.PUT_FD_VEHICLE), data)
export const deleteFdVehicle = (storeType, data) =>
  post(
    API_VERSION + urlHelper(url.API_FD_VEHICLES, url.DELETE_FD_VEHICLE),
    data
  )
export const putFdVehiclesStatus = (storeType, data) =>
  post(
    API_VERSION + urlHelper(url.API_FD_VEHICLES, url.PUT_FD_VEHICLES_STATUS),
    data
  )

export const postVehicleList = data => post(url.VECHILE_TYPE_LIST, data)

// Terminology
export const getTerminologies = data =>
  post(API_VERSION + url.GET_TERMINOLOGIES, data)
export const putTerminology = data =>
  post(API_VERSION + url.PUT_TERMINOLOGY, data)

// Settings
export const getSettings = () => get(API_VERSION + url.GET_SETTINGS)
export const putSettings = data => post(API_VERSION + url.PUT_SETTINGS, data)
export const getStoreSettings = (storeType, id) =>
  get(
    API_VERSION +
    [url.API_SETTINGS, storeType, url.GET_STORE_SETTINGS, id].join("/")
  )
export const putStoreSettings = (storeType, data) =>
  post(
    API_VERSION +
    [url.API_SETTINGS, storeType, url.PUT_STORE_SETTINGS].join("/"),
    data
  )
export const getAccessList = () => get(API_VERSION + url.GET_ACCESS_LIST)
export const getStoreTypes = () => get(API_VERSION + url.GET_STORE_TYPES)
export const getStarted = () => get(API_VERSION + url.GET_STARTED)
export const deleteStore = () => post(API_VERSION + url.DELETE_STORE)

// get Domain

export const searchDomain = domain =>
  post(API_VERSION + url.SEARCH_DOMAIN, { domain })
export const buyDomain = data => post(API_VERSION + url.BUY_DOMAIN, data)

// Reports //
// Orders
export const getOrderReports = data =>
  post(API_VERSION + url.GET_REPORT_OF_ORDER, data)
// Users
export const getCustomerReports = data =>
  post(API_VERSION + url.GET_REPORT_OF_CUSTOMER, data)
// Users
export const getDriversReports = data =>
  post(API_VERSION + url.GET_REPORT_OF_DRIVERS, data)

// Dashboard
export const getDashboard = data =>
  get(
    API_VERSION + url.GET_DASHBOARD_REPORTS,
    {
      params: {
        startDate: data?.startDate,
        endDate: data?.endDate,
      },
    }
    // { data }

    // +
    // `?startDate=${data.startDate}&enDate=${endDate}`,{}

    // , {
    //   params: {
    //     sta
    //   }
    // }
  )

// Bird View
export const getBirdView = data => post(API_VERSION + url.GET_BIRD_VIEW, data)
export const assignDriver = data => post(API_VERSION + url.ASSIGN_DRIVER, data)

// Geofencing
export const getGeoFencings = data =>
  post(API_VERSION + url.GET_GEO_FENCINGS, data)
export const postGeoFencing = data =>
  post(API_VERSION + url.ADD_GEO_FENCING, data)
export const getGeoFencing = id => get(API_VERSION + url.GET_GEO_FENCING + id)
export const putGeoFencing = data =>
  post(API_VERSION + url.PUT_GEO_FENCING, data)
export const deleteGeoFencing = data =>
  post(API_VERSION + url.DELETE_GEO_FENCING, data)
export const putGeoFencingsStatus = data =>
  post(API_VERSION + url.PUT_GEO_FENCINGS_STATUS, data)

// Dispute
export const getDisputes = data => post(API_VERSION + url.GET_DISPUTES, data)
export const getDispute = id => get(API_VERSION + url.GET_DISPUTE + id)
export const postDisputeReply = data =>
  post(API_VERSION + url.POST_DISPUTE_REPLY, data)
export const deleteDisputeReply = data =>
  post(API_VERSION + url.DELETE_DISPUTE_REPLY, data)
export const putDisputeStatus = data =>
  post(API_VERSION + url.PUT_DISPUTE_STATUS, data)

// Dispatch
export const getDispatch = () => get(API_VERSION + url.GET_DISPATCH)
export const getDispatchRequests = data =>
  post(API_VERSION + url.GET_DISPATCH_REQUESTS, data)
export const postRequestDriver = data =>
  post(API_VERSION + url.POST_REQUEST_DRIVERS, data)
export const putAssigndriver = (id, data) =>
  put(API_VERSION + url.PUT_ASSIGN_DRIVER + id, data)
export const postDispatchRequest = data =>
  post(API_VERSION + url.POST_DISPATCH_REQUEST, data)
export const getDispatchFare = data =>
  post(API_VERSION + url.GET_DISPATCH_FARE, data)

//Pay360 Bank Account & Merchant
export const getBankAccount = () => get(API_VERSION + url.GET_BANK_ACCOUNTS)
export const postBankAccount = data =>
  post(API_VERSION + url.POST_BANK_ACCOUNT, data)
export const getMerchant = () => get(API_VERSION + url.GET_MERCHANT)
export const postMerchant = data => post(API_VERSION + url.POST_MERCHANT, data)
export const getMerchantAccount = id =>
  get(
    API_VERSION + url.GET_ACCOUNT_NUMBER + (id !== undefined ? "?id=" + id : "")
  )

// Driver Vehicle
export const driverVehicleList = data =>
  post(API_VERSION + url.DRIVER_VEHICLE_LIST, data)

//Get and Update Driver Bank Details
export const postDriverBankDetails = data =>
  post(API_VERSION + url.POST_DRIVER_BANK_LIST, data)

export const postUpdateDriverBankDetails = data =>
  post(API_VERSION + url.POST_UPDATE_DRIVER_BANK, data)
export const addDriverServices = data =>
  post(API_VERSION + url.ADD_DRIVER_SERVICES, data)

export const deleteDriverServices = data =>
  post(API_VERSION + url.DELETE_DRIVER_SERVICES, data)

export const deletevirtualAccount = data =>
  get(API_VERSION + url.DELETE_VIRTUAL_ACCOUNT + data.id)

// Reviews for Driver , Customer
export const postUserReviews = (data, query) =>
  post(API_VERSION + url.GET_USER_REVIEW + query, data)
export const postUserOrders = (data, query) =>
  post(API_VERSION + url.GET_USER_ORDERS + query, data)

export const getVendorList = data =>
  post(API_VERSION + url.GET_VENDOR_SUBADMIN, data)

export const getPackageServiceVendorList = ({ filter }) =>
  post(API_VERSION + url.GET_PACKAGE_SERIVCE_VENDOR_LIST, filter)
export const addPackageServiceVendor = data =>
  post(API_VERSION + url.ADD_PACKAGE_SERVICE_VENDOR, data)
export const getPackageServiceVendor = ({ id }) =>
  get(API_VERSION + url.GET_PACKAGE_SERVICE_VENDOR + id)
export const putPackageServiceVendor = data =>
  post(API_VERSION + url.PUT_PACKAGE_SERVICE_VENDOR, data)
export const deletePackageServiceVendor = ({ id }) =>
  get(API_VERSION + url.DELETE_PACKAGE_SERVICE_VENDOR + id)

export const getPackageServicePackageList = ({ filter }) =>
  post(API_VERSION + url.GET_PACKAGE_SERIVCE_PACKAGE_LIST, filter)
export const addPackageServicePackage = data =>
  post(API_VERSION + url.ADD_PACKAGE_SERVICE_PACKAGE, data)
export const getPackageServicePackage = ({ id }) =>
  get(API_VERSION + url.GET_PACKAGE_SERVICE_PACKAGE + id)
export const putPackageServicePackage = data =>
  post(API_VERSION + url.PUT_PACKAGE_SERVICE_PACKAGE, data)
export const deletePackageServicePackage = ({ id }) =>
  get(API_VERSION + url.DELETE_PACKAGE_SERVICE_PACKAGE + id)

// Product Batch
export const getProductBatch = data =>
  post(API_VERSION + url.GET_BATCH_PRODUCTS, data)

export const addProductBatch = data =>
  post(API_VERSION + url.ADD_BATCH_PRODUCTS, data)

export const getProductBatchDetails = data =>
  get(API_VERSION + url.VIEW_BATCH_PRODUCTS + data)