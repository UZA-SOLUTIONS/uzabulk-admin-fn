// LOGIN
export const GET_PUBLIC_DATA = "/store/public"
export const POST_SUPER_ADMIN_LOGIN = "/super-admin/store/login"
export const POST_LOGIN = "/store/login"
export const POST_FORGOT_PASSWORD = "/store/forgotpassword"
export const POST_RESET_PASSWORD = "/store/resetpassword"
export const SOCIAL_LOGIN = "/social-login"
export const POST_LOGOUT = "/store/logout"

// Profile
export const GET_CURRENT_USER = "/store/me"
export const PUT_PROFILE = "/store/updateprofile"
export const CHANGE_PASSWORD = "/store/changepassword"
export const GET_LANGUAGES = "/store/configs"
export const POST_ENABLE_NOTIFICATIONS = "/store/enablenotifications"

// SIGNUP
export const POST_REGISTER_EMAIL = "/store/signupemail"
export const POST_STORE_NAME = "/store/check"
export const POST_REGISTER = "/store/signup"

// Pay
export const POST_PAY = "/store/pay"
export const POST_PAY_ADJUSTMENT = "/store/payment/adjustment"

// Billing Plans
export const GET_CURRENT_PLAN = "/store/currentplan"
export const GET_BILLING_PLANS = "/store/billingplans"
export const POST_BILLING_CARD = "/store/card"
export const POST_UPGRADE_PLAN = "/store/upgradeplan"

// File
export const POST_FILE = "/file/add"
export const POST_REMOVE_FILE = "/file/remove"

// CUSTOMERS
export const GET_CUSTOMERS = "/store/users"
export const ADD_CUSTOMER = "/store/adduser"
export const GET_CUSTOMER = "/store/user"
export const PUT_CUSTOMER = "/store/updateuser"
export const DELETE_CUSTOMER = "/store/removeuser"
export const POST_CUSTOMER_ADDRESS = "/store/user/addaddress"
export const GET_CUSTOMER_ADDRESS = "/store/user/address"
export const PUT_CUSTOMER_ADDRESS = "/store/user/updateaddress"
export const DELETE_CUSTOMER_ADDRESS = "/store/user/removeaddress"
export const PUT_CUSTOMERS_STATUS = "/store/user/updatestatus/all"
export const EXPORT_CUSTOMERS = "/store/export/users"
export const EXPORT_ORDER_PDF = "/store/order/pdf"
export const IMPORT_CUSTOMERS = "/store/importUserViaCSV"

// Campaigns
export const GET_CAMPAIGNS = "/campaign"
export const ADD_CAMPAIGN = "/campaign/add"
export const GET_CAMPAIGN = "/campaign/view"
export const PUT_CAMPAIGN = "/campaign/update"
export const DELETE_CAMPAIGN = "/campaign/remove"
export const PUT_CAMPAIGNS_STATUS = "/campaign/updatestatus/all"

// Email Campaigns
export const GET_CAMPAIGN_TEMPLATES = "/campaign/email"
export const ADD_CAMPAIGN_TEMPLATE = "/campaign/email/add"
export const GET_CAMPAIGN_TEMPLATE = "/campaign/email/view"
export const PUT_CAMPAIGN_TEMPLATE = "/campaign/email/update"
export const DELETE_CAMPAIGN_TEMPLATE = "/campaign/email/remove"
export const PUT_CAMPAIGN_TEMPLATES_STATUS = "/campaign/email/updatestatus/all"

// FAQS
export const GET_FAQS = "/faq"
export const ADD_FAQ = "/faq/add"
export const GET_FAQ = "/faq/view"
export const PUT_FAQ = "/faq/update"
export const DELETE_FAQ = "/faq/remove"
export const PUT_FAQS_STATUS = "/faq/updatestatus/all"

// ROLES
export const GET_ROLES = "/store/roles"
export const ADD_ROLE = "/store/addrole"
export const GET_ROLE = "/store/role/view"
export const PUT_ROLE = "/store/updaterole"
export const DELETE_ROLE = "/store/archiverole"
export const PUT_ROLES_STATUS = "/store/roles/updatestatus/all"

// SUB-ADMINS
export const GET_SUB_ADMINS = "/subadmin"
export const ADD_SUB_ADMIN = "/subadmin/add"
export const GET_SUB_ADMIN = "/subadmin/view"
export const PUT_SUB_ADMIN = "/subadmin/update"
export const DELETE_SUB_ADMIN = "/subadmin/remove"
export const PUT_SUB_ADMINS_STATUS = "/subadmin/updatestatus/all"
export const DRIVER_DISPATCHER_LIST = "/store/dispatcher/driver/list"
export const CUSTOMER_DISPATCHER_LIST = "/store/dispatcher/customer/list"

//Blog Category

export const GET_BLOG_CATEGORIES = "/blog/category"
export const ADD_BLOG_CATEGORY = "/blog/category/add"
export const GET_BLOG_CATEGORY = "/blog/category/view"
export const PUT_BLOG_CATEGORY = "/blog/category//update"
export const DELETE_BLOG_CATEGORY = "/blog/category/remove"
export const PUT_BLOG_CATEGORIES_STATUS = "/blog/category/updatestatus/all"

//Blog Tag

export const GET_BLOG_TAGS = "/blog/tag"
export const ADD_BLOG_TAG = "/blog/tag/add"
export const GET_BLOG_TAG = "/blog/tag/view"
export const PUT_BLOG_TAG = "/blog/tag//update"
export const DELETE_BLOG_TAG = "/blog/tag/remove"
export const PUT_BLOG_TAGS_STATUS = "/blog/tag/updatestatus/all"

//Blog

export const GET_BLOGS = "/blog"
export const ADD_BLOG_ = "/blog/add"
export const GET_BLOG_ = "/blog/view"
export const PUT_BLOG_ = "/blog/update"
export const DELETE_BLOG_ = "/blog/remove"
export const PUT_BLOGS_STATUS = "/blog/updatestatus/all"

// Promo Codes
export const GET_PROMO_CODES = "/promocode"
export const ADD_PROMO_CODE = "/promocode/add"
export const GET_PROMO_CODE = "/promocode/view"
export const PUT_PROMO_CODE = "/promocode/update"
export const DELETE_PROMO_CODE = "/promocode/remove"
export const PUT_PROMO_CODES_STATUS = "/promocode/updatestatus/all"

// Promotions
export const GET_PROMOTIONS = "/promotion"
export const ADD_PROMOTION = "/promotion/add"
export const GET_PROMOTION = "/promotion/view"
export const PUT_PROMOTION = "/promotion/update"
export const DELETE_PROMOTION = "/promotion/remove"
export const PUT_PROMOTIONS_STATUS = "/promotion/updatestatus/all"

// Gallery
export const GET_GALLERIES = "/store/gallery/getGallery"
export const ADD_GALLERY = "/store/gallery/uploadImage"
export const GET_GALLERY = "/store/gallery/view"
export const PUT_GALLERY = "/store/gallery/update"
export const DELETE_GALLERY = "/store/gallery/remove"
export const PUT_GALLERIES_STATUS = "/store/gallery/updatestatus/all"

// Content Pages
export const GET_CONTENT_PAGES = "/content"
export const ADD_CONTENT_PAGE = "/content/add"
export const GET_CONTENT_PAGE = "/content/view"
export const PUT_CONTENT_PAGE = "/content/update"
export const DELETE_CONTENT_PAGE = "/content/remove"
export const PUT_CONTENT_PAGES_STATUS = "/content/updatestatus/all"

// Content Pages Fields
export const ADD_CONTENT_PAGE_FIELD = "/content/addfield"
export const GET_CONTENT_PAGE_FIELD = "/content/field/view"
export const PUT_CONTENT_PAGE_FIELD = "/content/updatefield"
export const DELETE_CONTENT_PAGE_FIELD = "/content/archivefield"
export const PUT_CONTENT_PAGE_FIELD_SORT = "/content/fields/sortorder"

// Menu
export const GET_MENUS = "/menu"
export const ADD_MENU = "/menu/add"
export const GET_MENU = "/menu/view"
export const PUT_MENU = "/menu/update"
export const DELETE_MENU = "/menu/remove"
export const PUT_MENUS_STATUS = "/menu/updatestatus/all"

// Menu Fields
export const GET_MENU_FIELDS = "/menu/items"
export const ADD_MENU_FIELD = "/menu/item/add"
export const GET_MENU_FIELD = "/menu/item/view"
export const PUT_MENU_FIELD = "/menu/item/edit"
export const DELETE_MENU_FIELD = "/menu/item/archive"
export const PUT_MENU_FIELD_SORT = "/menu/item/sortorder"

// Email Template Pages
export const GET_EMAIL_TEMPLATES = "/store/templates"
export const GET_EMAIL_TEMPLATE = "/store/template/view"
export const PUT_EMAIL_TEMPLATE = "/store/updatetemplate"
export const POST_RESET_EMAIL_TEMPLATE = "/store/reverttemplate"

export const GET_ORDER_REPORTS = "/store/ordersreports"
export const GET_USER_REPORTS = "/store/usersreports"

// Notification Pages
export const GET_NOTIFICATIONS = "/store/notifications"
export const POST_NOTIFICATION = "/store/sendnotification"

// Transactions
export const GET_TRANSACTIONS = "/store/transaction"
export const EXPORT_TRANSACTIONS = "/store/export/transactions"
export const SETTLEMENT_TRANSACTION = "/store/settelment/list"
export const WALLET_TRANSACTION = "/store/wallet/transation"

// Document Templates
export const GET_DOCUMENT_TEMPLATES = "/store/doctemplates"
export const ADD_DOCUMENT_TEMPLATE = "/store/adddoctemplate"
export const GET_DOCUMENT_TEMPLATE = "/store/doctemplate/view"
export const PUT_DOCUMENT_TEMPLATE = "/store/updatedoctemplate"
export const DELETE_DOCUMENT_TEMPLATE = "/store/removedoctemplate"
export const PUT_DOCUMENT_TEMPLATES_STATUS =
  "/store/doctemplate/updatestatus/all"

// Document Templates Fields
export const ADD_DOCUMENT_TEMPLATE_FIELD = "/store/doctemplate/addfield"
export const GET_DOCUMENT_TEMPLATE_FIELD = "/store/doctemplate/editfield"
export const PUT_DOCUMENT_TEMPLATE_FIELD = "/store/doctemplate/updatefield"
export const DELETE_DOCUMENT_TEMPLATE_FIELD = "/store/doctemplate/archivefield"
export const PUT_DOCUMENT_TEMPLATE_FIELD_SORT =
  "/store/doctemplate/fields/sortorder"

// export const GET_EDIT_DOCTEMPLATE_FIELD = "/doctemplate/editfield"

// Document
export const GET_DOCUMENTS = "/store/user/documents"
export const ADD_DOCUMENT = "/store/user/document/add"
export const GET_DOCUMENT = "/store/user/document/view"
export const PUT_DOCUMENT = "/store/user/document/add"
export const DELETE_DOCUMENT = "/store/document/archive"

//Vehicle Type
export const EDIT_VEHICLE_DRIVER = "/store/EditDriverVehicle"
export const VECHILE_TYPE_LIST = "/api/v1/store/vehicleTypes"
export const UPDATE_VHICLE_DRIVER = "/store/updateDriverVehicle"

// Terminology
export const GET_TERMINOLOGIES = "/terminology/getStoreTerminologyByStoreId"
export const PUT_TERMINOLOGY = "/terminology/updateStoreTerminologyById"

// Vendor Delivery Restaurants
export const GET_FD_VENDORS = "/store/vendors"
export const ADD_FD_VENDOR = "/store/addvendor"
export const GET_FD_VENDOR = "/store/vendor/view"
export const POST_FD_VENDOR = "/store/vendor/view"
export const PUT_FD_VENDOR = "/store/updatevendor"
export const DELETE_FD_VENDOR = "/store/archivevendor"
export const CLONE_FD_VENDOR = "/store/vendor/clone"
export const PUT_FD_VENDORS_STATUS = "/store/vendors/updatestatus/all"
export const PUT_FD_RESTAURANT_SETTINGS = "/setting/vendorsetting"
export const EXPORT_FD_VENDORS = "/store/export/vendors"
export const IMPORT_FD_VENDORS = "/store/importVendorViaCSV"
export const DELETE_FD_VENDOR_STRIPE_CONNECT = "/card/stripe/connect/remove"

// Vendor Delivery Orders
export const GET_FD_ORDERS = "/store/orders"
export const GET_FD_ORDERS_EXPORT = "/store/reports/orders/exports"
// export const GET_FD_ORDERS_POST = "/store/orders"
export const GET_FD_ORDER = "/store/order"
export const POST_REFUND = "/store/refund"
export const POST_ACCEPT_FD_ORDER = "/vendor/acceptrequest"
export const POST_REJECT_FD_ORDER = "/vendor/rejectrequest"
export const POST_INPROCESS_FD_ORDER = "/vendor/inprocess"
export const POST_READY_FD_ORDER = "/vendor/markready"
export const POST_COMPLETE_FD_ORDER = "/vendor/completeorder"
export const POST_CANCELLED_FD_ORDER = "/vendor/cancelRequest"
export const POST_FD_ORDER_STATUS = "/store/order/status"
export const POST_ALIBABA_FREIGHT_TEMPLATES = "/store/alibaba/freight-templates"
export const POST_ORDER_ALIBABA_LOGISTICS = "/store/order"
export const POST_ORDER_ALIBABA_LOGISTICS_SYNC = "/store/order"

// Vendor Delivery Drivers
export const API_FD_DRIVERS = "/store"
export const GET_FD_DRIVERS = "drivers"
export const ADD_FD_DRIVER = "adddriver"
export const GET_FD_DRIVER = "driver/view"
export const GET_FD_DRIVER_POST = "driver/view"
export const PUT_FD_DRIVER = "updatedriver"
export const DELETE_FD_DRIVER = "archivedriver"
export const PUT_FD_DRIVERS_STATUS = "drivers/updatestatus/all"
export const REMOVE_FRAUD_STATUS_DRIVER = "drivers/updatestatus/all"
export const EXPORT_DRIVERS = "/store/export/drivers"
export const IMPORT_DRIVERS = "/store/importDriverViaCSV"

// Vendor Delivery Attributes
export const GET_FD_ATTRIBUTES = "/attribute"
export const ADD_FD_ATTRIBUTE = "/attribute/add"
export const GET_FD_ATTRIBUTE = "/attribute/view"
export const PUT_FD_ATTRIBUTE = "/attribute/update"
export const DELETE_FD_ATTRIBUTE = "/attribute/archive"
export const PUT_FD_ATTRIBUTES_STATUS = "/attribute/updatestatus/all"
export const POST_FD_TERM_IN_ATTRIBUTE = "/term/add"

// Vendor Delivery Categories
export const API_CATEGORY = "/category"
export const GET_FD_CATEGORIES = ""
export const ADD_FD_CATEGORY = "/add"
export const GET_FD_CATEGORY = "/view"
export const PUT_FD_CATEGORY = "/update"
export const DELETE_FD_CATEGORY = "/archive"
export const PUT_FD_CATEGORIES_STATUS = "/category/updatestatus/all"
export const PUT_FD_CATEGORY_SORT = "/category/sortorder"
export const EXPORT_FD_CATEGORIES = "/store/export/vendor/categories"

// Vendor Delivery Addon
export const GET_FD_ADDONS = "/addon"
export const ADD_FD_ADDON = "/addon/add"
export const GET_FD_ADDON = "/addon/view"
export const PUT_FD_ADDON = "/addon/update"
export const DELETE_FD_ADDON = "/addon/archive"
export const PUT_FD_ADDONS_STATUS = "/addon/updatestatus/all"

// Vendor Delivery Product
export const API_PRODUCT = "/product"
export const GET_FD_PRODUCTS = ""
export const ADD_FD_PRODUCT = "/add"
export const GET_FD_PRODUCT = "/view/"
export const PUT_FD_PRODUCT = "/update"
export const DELETE_FD_PRODUCT = "/archive"
export const PUT_FD_PRODUCTS_STATUS = "/product/updatestatus/all"
export const EXPORT_FD_PRODUCTS = "/store/export/vendor/products"
export const IMPORT_FD_PRODUCTS = "/product/addProductCSV"
export const IMPORT_FD_PRODUCTS_VARIATIONS = "/product/addProductVariationCSV"
export const IMPORT_FD_PRODUCTS_COMBINE = "/product/importProductCombinedCSV"

// Vendor Delivery Cuisine
export const API_FD_CUISINES = "/cuisine"
export const GET_FD_CUISINES = ""
export const ADD_FD_CUISINE = "add"
export const GET_FD_CUISINE = "view"
export const PUT_FD_CUISINE = "update"
export const DELETE_FD_CUISINE = "archive"
export const PUT_FD_CUISINES_STATUS = "updatestatus/all"
export const EXPORT_FD_CUISINES = "/store/export/vendor/brands"

//GROCERY BUSINESS TYPE

export const API_FD_BUSINESS_TYPES = "/businessType"
export const GET_FD_BUSINESS_TYPES = ""
export const ADD_FD_BUSINESS_TYPE = "add"
export const GET_FD_BUSINESS_TYPE = "view"
export const PUT_FD_BUSINESS_TYPE = "update"
export const DELETE_FD_BUSINESS_TYPE = "archive"
export const PUT_FD_BUSINESS_TYPES_STATUS = "updatestatus/all"
export const EXPORT_FD_BUSINESS_TYPES = "/store/export/vendor/businesstypes"

// Vendor Delivery Vehicle Types
export const API_FD_VEHICLES = "/delivery/"
export const GET_FD_VEHICLES = "vehiclestypes"
export const ADD_FD_VEHICLE = "vehicletype/add"
export const GET_FD_VEHICLE = "vehicletype/view"
export const PUT_FD_VEHICLE = "vehicletype/update"
export const DELETE_FD_VEHICLE = "vehicletype/archive"
export const PUT_FD_VEHICLES_STATUS = "vehicletype/updatestatus/all"

// Settings
export const API_SETTINGS = "/setting"
export const GET_SETTINGS = "/setting/getstoresetting"
export const PUT_SETTINGS = "/setting/storesetting"
export const GET_STORE_SETTINGS = "storetype"
export const PUT_STORE_SETTINGS = "addsetting"
export const GET_ACCESS_LIST = "/setting/accesslist"
export const GET_STORE_TYPES = "/setting/storetypes"
export const GET_STARTED = "/setting/getStarted"
export const DELETE_STORE = "/setting/deletestoresetting"

// GET Started ////

// Domain
export const SEARCH_DOMAIN = "/store/domain/search"
export const BUY_DOMAIN = "/store/domain/buy"

// Reports

// Orders
export const GET_REPORT_OF_ORDER = "/store/reports/orders"
// Customers
export const GET_REPORT_OF_CUSTOMER = "/store/reports/users"
//Drivers
export const GET_REPORT_OF_DRIVERS = "/store/reports/drivers"
// Dashboard
export const GET_DASHBOARD_REPORTS = "/store/reports/dashboard"

// Map Markers
export const Available_Driver_IMG =
  "https://mnc.s3.us-east-2.amazonaws.com/1614603077486available-36.png"
export const BUSY_Driver_IMG =
  "https://mnc.s3.us-east-2.amazonaws.com/1614603174794BUSY-36.png"

export const DISPATCH_ICON =
  "https://uzalives3.s3.us-east-2.amazonaws.com/1640944078591carMarker.png"

// Bird View
export const GET_BIRD_VIEW = "/store/birdeyeview"
export const ASSIGN_DRIVER = "/store/birdeyeview/assign"

// Geofencing
export const GET_GEO_FENCINGS = "/geofence"
export const ADD_GEO_FENCING = "/geofence/add"
export const GET_GEO_FENCING = "/geofence/view/"
export const PUT_GEO_FENCING = "/geofence/update"
export const DELETE_GEO_FENCING = "/geofence/archive"
export const PUT_GEO_FENCINGS_STATUS = "/geofence/updatestatus/all"

//Dispute
export const GET_DISPUTES = "/dispute"
export const GET_DISPUTE = "/dispute/"
export const POST_DISPUTE_REPLY = "/dispute/admin/reply"
export const DELETE_DISPUTE_REPLY = "/dispute/admin/delete/reply"
export const PUT_DISPUTE_STATUS = "/dispute/update"

// Dispatch
export const GET_DISPATCH = "/dispatch"
export const GET_DISPATCH_REQUESTS = "/dispatch/request/list"
export const POST_REQUEST_DRIVERS = "/dispatch/request/nearbydrivers"
export const PUT_ASSIGN_DRIVER = "/dispatch/request/assign/driver/"
export const POST_DISPATCH_REQUEST = "/dispatch/request/create"
export const GET_DISPATCH_FARE = "/dispatch/request/fare"

//Pay 360 & Merchant
export const GET_BANK_ACCOUNTS = "/pay360/supplier/account"
export const POST_BANK_ACCOUNT = "/pay360/add/bankaccount/supplier"
export const GET_MERCHANT = "/pay360/supplier"
export const POST_MERCHANT = "/pay360/create/supplier"
export const GET_ACCOUNT_NUMBER = "/pay360/merchant/account"

//Driver Vehicle List
export const DRIVER_VEHICLE_LIST = "/store/listDriverVehicle"

//Driver Bank
export const POST_DRIVER_BANK_LIST = "/store/edit/driverbank"
export const POST_UPDATE_DRIVER_BANK = "/store/update/driverbank"

//Driver Services

export const ADD_DRIVER_SERVICES = "/store/services/add"
export const DELETE_DRIVER_SERVICES = "/store/services/delete"

//reviews for customer, drivers
export const GET_USER_REVIEW = "/store/users/reviews"
export const GET_USER_ORDERS = "/store/users/orders"

export const GET_VENDOR_SUBADMIN = "/store/dispatcher/vendor/list"

export const GET_PACKAGE_SERIVCE_VENDOR_LIST = "/package/vendor"
export const ADD_PACKAGE_SERVICE_VENDOR = "/package/vendor/add"
export const GET_PACKAGE_SERVICE_VENDOR = "/package/vendor/view/"
export const PUT_PACKAGE_SERVICE_VENDOR = "/package/vendor/update"
export const DELETE_PACKAGE_SERVICE_VENDOR = "/package/vendor/remove/"

export const GET_PACKAGE_SERIVCE_PACKAGE_LIST = "/package"
export const ADD_PACKAGE_SERVICE_PACKAGE = "/package/add"
export const GET_PACKAGE_SERVICE_PACKAGE = "/package/view/"
export const PUT_PACKAGE_SERVICE_PACKAGE = "/package/update"
export const DELETE_PACKAGE_SERVICE_PACKAGE = "/package/remove/"

export const WALLET_TRANSACTION_EXPORT = "/store/export/wallet/transactions"

//Delete virtual Account

export const DELETE_VIRTUAL_ACCOUNT = "/store/delete/virtualaccount/"

// Batch Products
export const GET_BATCH_PRODUCTS = "/product-batch/batch-list"
export const ADD_BATCH_PRODUCTS = "/product-batch/create-batch"
export const VIEW_BATCH_PRODUCTS = "/product-batch/batch-details/"

