import moment from "moment-timezone"
import worldCountries from "world-countries"

export const TOS_LINK = "https://projectName.com/terms-of-service"
export const PRIVACY_LINK = "https://projectName.com/privacy"
export const LEARN_MORE_LINK = "https://projectName.com/features"

/** App logo: `public/logo2.svg` (served at `/logo2.svg` with default CRA `PUBLIC_URL`) */
export const DEFAULT_APP_LOGO = `${process.env.PUBLIC_URL || ""}/logo2.svg`

export const USER_AUTH_KEY = "uza-admin-auth-user";

export const ROLES = {
  admin: "ADMIN",
  staff: "STAFF",
  vendor: "VENDOR",
  subVendor: "SUBVENDOR",
}
export const SERVICES = ["FOOD", "GROCERY", "MEDICINES"]
export const SERVICE_ICON = {
  customers: "bx bx-user-circle",
  faq: "bx bx-chat",
  contentPages: "bx bxs-book-content",
  globalSetting: "bx bx-cog",
  subAdmins: "fas fa-user-friends",
  transactions: "bx bx-transfer",
  FOOD: "mdi mdi-food",
  AIRBNB: "mdi mdi-food",
  GROCERY: "mdi mdi-truck-delivery-outline",
  MEDICINES: "fas fa-clinic-medical",
  OTHER: "mdi-truck-fast",
  restaurant: "bx bx-user-circle",
  vendor: "bx bx-user-circle",
  configuration: "bx bx-cog",
  catalog: "mdi mdi-application-cog",
  orders: "bx bx-shopping-bag",
  order: "bx bx-shopping-bag",
  Order: "bx bx-shopping-bag",
  Orders: "bx bx-shopping-bag",
  requests: "far fa-paper-plane",
  trip: "far fa-paper-plane",
  product: "bx bx-arrow-from-left",
  "promo-codes": "bx bx-barcode",
  category: "bx bx-cube-alt",
  "add-on": "bx bxs-add-to-queue",
  attributes: "bx bxs-purchase-tag",
  cuisine: "bx bx-restaurant",
  cuisines: "bx bx-restaurant",
  brand: "fab fa-redhat",
  brands: "fab fa-redhat",
}

export const SIDEBAR_WHITELIST_ROUTE = [
  "/reports/orders",
  "reports/bookings",
  "/reports/users",
  "/accounting/admin",
  "/accounting/withdrawal",
  "/accounting/wallet",
  "/dispatcher/listing",
  "/dispatcher/mapView",
]

export const ADMIN_SERVICE_ROUTE = {
  customers: {
    title: "customers",
    key: "customers",
    pageLocation: "Customers",
    icon: "bx bx-user-circle",
    hasProfile: true,
  },
  reviews: {
    title: "reviews",
    key: "reviews",
    pageLocation: "Reviews",
    icon: "bx bx-user-circle",
    hasProfile: true,
  },

  dispatch: {
    title: "dispatcher",
    key: "dispatcher",
    icon: "bx bx-car",
    pageLocation: true,
    noAdd: true,
    noEdit: true,
    subItems: {
      Listing: {
        title: "listing",
        key: "dispatcher/listing",
        pageLocation: "Dispatcher/Listing",
        noEdit: true,
      },
      MapView: {
        title: "map_view",
        key: "dispatcher/mapView",
        pageLocation: "Dispatcher/MapView",
        noAdd: true,
        noEdit: true,
      },
    },
  },
  dispute: {
    title: "dispute",
    key: "dispute",
    icon: "bx bx-chat",
    pageLocation: "Dispute",
    noAdd: true,
    noEdit: true,
    hasProfile: true,
  },

  transaction: {
    title: "transactions",
    key: "transactions",
    pageLocation: "Accounting/Admin",
    noAdd: true,
    noEdit: true,
    onlyVendor: true,
    onlyInBasicPlan: true,
  },
  userOrder: {
    title: "user_order",
    key: "user-order",
    pageLocation: "UserAllOrders",
    icon: "bx bx-user-circle",
    noAdd: true,
    noEdit: true,
    hasProfile: true,
    notForStore: [],
  },
  promotion: {
    title: "promotions",
    key: "promotions",
    icon: "bx bx-label",
    pageLocation: "Promotions",
  },
  productBatch: {
    title: "productBatch",
    key: "product-batch",
    icon: "bx bx-label",
    pageLocation: "ProductBatch",
    noEdit: true,
    noAdd: true,
    hasDetails: true
  },
  promoCode1: {
    title: "promo_codes",
    key: "promo-codes",
    pageLocation: "PromoCodes",
    icon: "bx bx-barcode",
    isGloble: true,
  },
  reports: {
    title: "reports",
    key: "reports",
    icon: "far fa-chart-bar",
    pageLocation: true,
    subItems: {
      orders: {
        title: "orders",
        key: "reports/orders",
        pageLocation: "Reports/orders/order",
      },
      users: {
        title: "customers",
        key: "reports/users",
        pageLocation: "Reports/users/customers",
      },
    },
  },
  accounting: {
    title: "accounting",
    key: "accounting",
    icon: "bx bx-transfer",
    pageLocation: true,
    notInBasicPlan: true,
    subItems: {
      admin: {
        title: "admin_transactions",
        key: "accounting/admin",
        pageLocation: "Accounting/Admin",
        noAdd: true,
        noEdit: true,
      },
      withdrawal: {
        title: "withdrawal_transactions",
        key: "accounting/withdrawal",
        pageLocation: "Accounting/Withdrawal",
        noAdd: true,
        noEdit: true,
      },
      settlement: {
        title: "settlement",
        key: "accounting/settlement",
        pageLocation: "Accounting/Settlement",
        noAdd: true,
        noEdit: true,
      },
      wallet: {
        title: "wallet_transactions",
        key: "accounting/wallet",
        pageLocation: "Accounting/Wallet",
        noAdd: true,
        noEdit: true,
      },
    },
  },
  blogs: {
    title: "Blogs",
    key: "blogs",
    pageLocation: true,
    icon: "bx bx-label",
    subItems: {
      blogCategory: {
        title: "Blog Category",
        key: "blog-category",
        pageLocation: "Blogs/Category",
      },
      blogTag: {
        title: "Blog Tag",
        key: "blog-tag",
        pageLocation: "Blogs/Tags",
      },
      blog: {
        title: "Blog",
        key: "blog",
        pageLocation: "Blogs/Blog",
      },
    },
  },
  subAdmins: {
    title: "system_access",
    key: "system-access",
    pageLocation: true,
    icon: "bx bx-group",
    subItems: {
      subAdmins: {
        title: "sub_admins",
        key: "sub-admins",
        pageLocation: "SystemAccess/SubAdmin",
      },
      roles: {
        title: "roles",
        key: "roles",
        pageLocation: "SystemAccess/Roles",
      },
    },
  },

  marketing: {
    title: "marketing",
    key: "marketing",
    icon: "bx bx-briefcase-alt",
    pageLocation: true,
    subItems: {
      campagin: {
        title: "campaign_list",
        key: "campaigns",
        pageLocation: "Marketing/Campaign",
      },
      campagin_templates: {
        title: "campaign_template",
        key: "campaign-templates",
        pageLocation: "Marketing/CampaignTemplate",
      },
    },
  },
  packageService: {
    title: "package_service",
    key: "package-services",
    icon: "bx bx-briefcase-alt",
    pageLocation: true,
    subItems: {
      packages: {
        title: "packages",
        key: "package-services/packages",
        pageLocation: "PackageServices/Packages",
      },
      vendors: {
        title: "vendors",
        key: "package-services/vendors",
        pageLocation: "PackageServices/Vendors",
      },
    },
  },
  configuration: {
    title: "configuration",
    key: "configuration",
    icon: "bx bx-cog",
    pageLocation: true,
    subItems: {
      faq: {
        title: "faqs",
        key: "faqs",
        pageLocation: "Faq",
      },
      contentPages: {
        title: "content_pages",
        key: "content-pages",
        pageLocation: "ContentPages",
        noAdd: true,
      },
      contentPagesFields: {
        title: "content_pages",
        key: "content-pages/:contentPageId/sections",
        pageLocation: "ContentPages/Fields",
        isNotRequired: true,
      },
      emailTemplate: {
        title: "email_templates",
        key: "email-templates",
        pageLocation: "EmailTemplates",
        noAdd: true,
      },
      terminology: {
        title: "terminology",
        key: "terminology",
        pageLocation: "Terminology",
        noAdd: true,
        noEdit: true,
      },
      themeSetting: {
        title: "theme_setting",
        key: "theme-settings",
        pageLocation: "ThemeSettings",
      },
      menus: {
        title: "website_menu",
        key: "menus",
        pageLocation: "Menus",
        noAdd: true,
      },
      menusFields: {
        title: "website_menu",
        key: "menus/:menuId/sections",
        pageLocation: "Menus/Fields",
        isNotRequired: true,
      },
      contentPagesMobile: {
        title: "app_settings",
        key: "app-settings",
        pageLocation: "ContentPages",
        noAdd: true,
        onlyInBasicPlan: true,
      },
      contentPagesMobileFields: {
        title: "app_settings",
        key: "app-settings/:contentPageId/sections",
        pageLocation: "ContentPages/Fields",
        isNotRequired: true,
        onlyInBasicPlan: true,
      },
      gallery: {
        title: "gallery",
        key: "gallery",
        pageLocation: "Gallery",
      },
      globalSetting: {
        title: "store_setting",
        key: "settings",
        pageLocation: "Settings",
      },
      // tax: {
      //   title: "Tax Settings",
      //   key: "tax-settings",
      //   pageLocation: "tax-settings",
      // },
      // --------They both will be hide
      bankaccount: {
        title: "bankaccount",
        key: "settings/bankaccount",
        pageLocation: "PayThreeSixty/BankAccount",
      },
      pay360merchant: {
        title: "pay360merchant",
        key: "settings/pay360merchant",
        pageLocation: "PayThreeSixty/Merchant",
      },
      //------------------
      orderSetting: {
        title: "order_setting",
        key: "order-settings",
        pageLocation: "FoodDelivery/Settings",
        onlyInPremiumPlan: true,
        onlyForStore: ["ECOMMERCE"],
        isTitleDynamic: true,
      },
      deliverySetting: {
        title: "delivery_setting",
        key: "delivery-settings",
        pageLocation: "FoodDelivery/Restaurant/Settings",
        onlyInBasicPlan: true,
        notInPremiumPlan: true,
        onlyForStore: ["ECOMMERCE"],
      },
    },
  },

  categories: {
    title: "categories",
    key: "categories",
    pageLocation: "Category",
    icon: "bx bx-list-check",
    hasProfile: true,
  },
}

/* Single Store & Single Category Routes Divide */
export const BASIC_ADMIN_SERVICE_ROUTE_PART1 = {
  customers: ADMIN_SERVICE_ROUTE.customers,
  dispatch: ADMIN_SERVICE_ROUTE.dispatch,
  dispute: ADMIN_SERVICE_ROUTE.dispute,
  transaction: ADMIN_SERVICE_ROUTE.transaction,
  categories: ADMIN_SERVICE_ROUTE.categories,
}

export const BASIC_ADMIN_SERVICE_ROUTE_PART2 = {
  /* notifications: ADMIN_SERVICE_ROUTE.notifications, */
  promotion: ADMIN_SERVICE_ROUTE.promotion,
  productBatch: ADMIN_SERVICE_ROUTE.productBatch,
  promoCode1: ADMIN_SERVICE_ROUTE.promoCode1,
  reports: ADMIN_SERVICE_ROUTE.reports,
  accounting: ADMIN_SERVICE_ROUTE.accounting,
  subAdmins: ADMIN_SERVICE_ROUTE.subAdmins,
  blogs: ADMIN_SERVICE_ROUTE.blogs,
  marketing: ADMIN_SERVICE_ROUTE.marketing,
  packageService: ADMIN_SERVICE_ROUTE.packageService,
  configuration: ADMIN_SERVICE_ROUTE.configuration,
}
/* Single Store & Single Category Routes Divide END */

export const VENDOR_SERVICES_ROUTE = {
  requests: {
    title: "orders",
    key: "requests",
    isTitleDynamic: true,
    pageLocation: "FoodDelivery/Request",
    noAdd: true,
    noEdit: true,
    onlyVendor: true,
    notForStore: ["TAXI", "PICKUPDROP"],
  },
  reviews: {
    title: "reviews",
    key: "reviews",
    pageLocation: "Reviews",
    icon: "bx bx-user-circle",
    hasProfile: true,
    noAdd: true,
    noEdit: true,
    notForStore: [],
  },
  userOrder: {
    title: "user_order",
    key: "user-order",
    pageLocation: "UserAllOrders",
    icon: "bx bx-user-circle",
    noAdd: true,
    noEdit: true,
    hasProfile: true,
    notForStore: [],
  },
  transaction: {
    title: "transactions",
    key: "transactions",
    pageLocation: "Accounting/Withdrawal",
    noAdd: true,
    noEdit: true,
    onlyVendor: true,
    notInBasicPlan: true,
    notInPremiumPlan: true,
    notForStore: ["AIRBNB"],
  },

  promoCode: {
    title: "promo_codes",
    key: "promo-codes",
    pageLocation: "FoodDelivery/PromoCodes",
    onlyVendor: true,
    notInBasicPlan: true,
    notInPremiumPlan: true,
    notForStore: ["TAXI", "PICKUPDROP", "AIRBNB"],
  },
  // category: {
  //   title: "categories",
  //   key: "category",
  //   pageLocation: "FoodDelivery/Category",
  //   onlyVendor: true,
  //   notInBasicPlan: true,
  //   notInPremiumPlan: true,
  //   onlyForStore: ["ECOMMERCE"],
  // },
  // brands: {
  //   title: "brand",
  //   key: "brand",
  //   isDynamic: true,
  //   pageLocation: "FoodDelivery/Cuisine",
  //   notInVendor: true,
  //   notInBasicPlan: true,
  //   notInPremiumPlan: true,
  //   onlyForStore: ["ECOMMERCE"],
  // },
  attribute: {
    title: "attributes",
    key: "attributes",
    pageLocation: "FoodDelivery/Attribute",
    onlyVendor: true,
    notInVendor: false,
    notInBasicPlan: true,
    notInPremiumPlan: true,
    isVthree: "false",
    onlyForStore: ["ECOMMERCE"],
  },
  products: {
    title: "product",
    key: "product",
    isDynamic: true,
    pageLocation: "FoodDelivery/Product",
    notInVendor: true,
    notInBasicPlan: true,
    notInPremiumPlan: true,
    onlyForStore: [],
  },

  // This is working as a categories // Using this object // Category is visible in nav menu.
  // categories: {
  //   title: "categories",
  //   key: "categories",
  //   isDynamic: true,
  //   pageLocation: "FoodDelivery/Category",
  //   notInVendor: true,
  //   notInBasicPlan: true,
  //   notInPremiumPlan: true,
  //   onlyForStore: ["ECOMMERCE"],
  // },
}
export const CATALOGS = {
  product: {
    ...VENDOR_SERVICES_ROUTE.product,
    notInBasicPlan: false,
    onlyVendor: false,
    // forvthree: "false"
  },
  category: {
    ...VENDOR_SERVICES_ROUTE.category,
    notInBasicPlan: false,
    onlyVendor: false,
    // forvthree: "false"
  },
  attribute: {
    ...VENDOR_SERVICES_ROUTE.attribute,
    notInBasicPlan: false,
    onlyVendor: false,
    // forvthree: "false"
    // version: [1, 2]
  },
}

export const CATALOGSvTHREE = {
  product: {
    ...VENDOR_SERVICES_ROUTE.product,
    notInBasicPlan: false,
    onlyVendor: false,
  },
  category: {
    ...VENDOR_SERVICES_ROUTE.category,
    notInBasicPlan: false,
    onlyVendor: false,
  },
}

//vendor menu routes
export const ADMIN_SUB_SERVICES_ROUTE = {
  // Restaurants key used for "Vendors"

  restaurants: {
    title: "restaurant",
    key: "restaurant",
    isDynamic: true,
    pageLocation: "FoodDelivery/Restaurant",
    hasProfile: true,
    hasSettings: true,
    notInBasicPlan: true,
    icon: "bx bx-user-circle",
    onlyForStore: ["ECOMMERCE"],
  },
  orders: {
    title: "orders",
    key: "orders",
    icon: "bx bx-shopping-bag",
    pageLocation: "FoodDelivery/Order",
    isTitleDynamic: true,
    hasProfile: true,
    noAdd: true,
    noEdit: true,
    notInVendor: true,
    onlyForStore: ["ECOMMERCE"],
  },
  ...VENDOR_SERVICES_ROUTE,
  storeTypeSetting: {
    title: "setting",
    key: "settings",
    icon: "bx bxs-cog",
    isTitleDynamic: true,
    pageLocation: "FoodDelivery/Settings",
    notInVendor: true,
    notInBasicPlan: true,
    notInPremiumPlan: true,
  },
}

export const VENDOR_SERVICES = [
  { title: "Order", key: "order" },
  { title: "Category", key: "category" },
  { title: "Products", key: "products" },
  { title: "Addon", key: "add-on" },
  { title: "Promo Codes", key: "promo-codes" },
  { title: "Settings", key: "settings" },
]

// Managing different names for same module on Store Level
export const SERVICE_NAMES = {
  ECOMMERCE: {
    vendor: "Vendor",
    vendors: "Vendors",
    restaurant: "Vendor",
    order: "Order",
    orders: "Order",
    requests: "Request",
    transactions: "Transactions",
    product: "Product",
    "promo-codes": "Promo Codes",
    // category: "Categories",
    "add-on": "Add on",
    attributes: "Attributes",
    cuisine: "Categorie",
    category: "Category",
    categories: "Categorie",
    brand: "Brand",
    brands: "Brands",
    settings: "ECOMMERCE Setting",
    drivers: "Drivers",
    "order-settings": "Order Setting",
  },
}

export const GET_SERVICE_NAME = ({ storeType, name = "vendor", label }) => {
  if (!!SERVICE_NAMES[storeType] && !!SERVICE_NAMES[storeType][name]) {
    if (name == "settings") {
      return (label?.toLowerCase() || storeType?.toLowerCase()) + " Setting"
    }
    return SERVICE_NAMES[storeType][name]
  } else if (
    !!DEFAULT_STORE_TYPE.SERVICE_NAMES &&
    !!DEFAULT_STORE_TYPE.SERVICE_NAMES[name]
  ) {
    if (name == "settings") {
      return (label?.toLowerCase() || storeType?.toLowerCase()) + " Setting"
    }
    return DEFAULT_STORE_TYPE.SERVICE_NAMES[name]
  }

  return "Products"
}

export const VENDOR_MENU = {
  FOOD: [
    {
      name: "Products",
      key: "productCount",
      to: `products`,
      version: [1, 2, 3],
    },
    {
      name: "Category",
      key: "categoryCount",
      to: `category`,
      version: [1, 2, 3],
    },
  ],
  SERVICEPROVIDER: [
    {
      name: "Products",
      key: "productCount",
      to: `products`,
      version: [1, 2, 3],
    },
  ],

  GROCERY: [
    {
      name: "Products",
      key: "productCount",
      to: `products`,
      version: [1, 2, 3],
    },
    // {
    //   name: "Category",
    //   key: "categoryCount",
    //   to: `category`,
    //   version: [1, 2, 3],
    // },
    {
      name: "Attributes",
      key: "attributeCount",
      to: `attributes`,
      version: [1, 2],
    },
  ],
  AIRBNB: [
    {
      name: "Services",
      key: "productCount",
      to: `services`,
      version: [1, 2, 3],
    },
  ],
  CARRENTAL: [
    {
      name: "Products",
      key: "productCount",
      to: `products`,
      version: [1, 2, 3],
    },
  ],
}

export const CATEGORY_FORM = {
  FOOD: "simple",
  GROCERY: "subCat",
}

export const ADDON_FORM = {
  FOOD: "optionsTag",
  CARRENTAL: "imageTag",
  AIRBNB: "imageTag",
}

export const PRICING_TYPE_LIST = {
  FOOD: [
    { label: "Unit", value: "unit" },
    { label: "Kg", value: "kg" },
    { label: "Hour", value: "hour" },
    { label: "Day", value: "day" },
  ],

  GROCERY: [
    { label: "Kg", value: "kg" },
    { label: "Gram", value: "gm" },
  ],

  CARRENTAL: [
    { label: "Hour", value: "hour" },
    { label: "Day", value: "day" },
  ],

  SERVICEPROVIDER: [
    { label: "Unit", value: "unit" },
    { label: "Hour", value: "hour" },
  ],
  AIRBNB: [
    { label: "Hour", value: "hour" },
    { label: "Day", value: "day" },
    { label: "Night", value: "night" },
  ],
}

export const PRODUCT_FORM = {
  FOOD: {
    description: false,
    featured_image: true,
    images: false,
    manage_stock: false,
    stock_quantity: false,
    variations: false,
    categories: true,
    addon: true,
    cuisine: false,
    veganType: true,
    guidelines: false,
    hotelinfo: false,
    amenities: false,
  },
  GROCERY: {
    description: true,
    featured_image: true,
    images: true,
    manage_stock: true,
    stock_quantity: true,
    variations: true,
    categories: true,
    addon: false,
    cuisine: true,
    veganType: false,
    guidelines: false,
    hotelinfo: false,
    amenities: false,
  },
  SERVICEPROVIDER: {
    description: true,
    featured_image: true,
    images: false,
    manage_stock: false,
    stock_quantity: false,
    variations: false,
    categories: false,
    addon: false,
    cuisine: false,
    veganType: false,
    guidelines: false,
    hotelinfo: false,
    amenities: false,
  },
  CARRENTAL: {
    addon: true,
    categories: true,
    cuisine: true,
    guidelines: true,
    featured_image: true,
    images: true,
    hotelinfo: false,
    amenities: false,
  },
  AIRBNB: {
    addon: false,
    categories: true,
    cuisine: false,
    // guidelines: true,
    featured_image: true,
    images: true,
    hotelinfo: true,
    amenities: true,
  },
}

export const VERSION_3_PRODUCT_FORM = {
  FOOD: {
    description: false,
    featured_image: true,
    images: false,
    manage_stock: false,
    stock_quantity: false,
    variations: false,
    categories: true,
    addon: true,
    cuisine: false,
    veganType: true,
  },
  GROCERY: {
    description: true,
    featured_image: true,
    images: true,
    manage_stock: true,
    stock_quantity: true,
    variations: false,
    categories: true,
    addon: true,
    cuisine: true,
    veganType: false,
  },
  SERVICEPROVIDER: {
    description: false,
    featured_image: true,
    images: false,
    manage_stock: false,
    stock_quantity: false,
    variations: false,
    categories: true,
    addon: true,
    cuisine: false,
    veganType: false,
  },
  CARRENTAL: {
    addon: true,
    categories: true,
    cuisine: true,
  },
}

// for hiding and showing module on store level
export const STORE_SETTINGS_FORM = {
  FOOD: {
    paymentoptions: false,
    showchildRide: false,
    userWalletDeductions: false,
    deliveryAreaVendor: true,
    deliveryAreaVendorTakeaway: true,
    deliveryAreaDriver: true,
    bookingAreaDriver: false,
    restaurantWaitTime: true,
    orderSchedule: true,
    dynamicOrderSchedule: false,
    deliveryMode: true,
    assignVehicleType: true,
    deliveryPlatform: true,
    freeDelivery: true,
    deliveryFee: true,
    taxSettings: true,
    taxLevel: true,
    commission: true,
    otpValidation: false,
    multiVehicleType: true,
    cancelPolicy: true,
    dynamicCancelPolicy: false,
    rideHailing: false,
    cityPricing: true,
    foodgrocery: true,
    bidding: false,
    vendorInfo: true,
    veganFilterActive: true,
    time: true,
    driverPerRequest: true,
    geofence: false,
    prePayment: false,
    deliveryTimeSlot: true,
    hourlyModule: false,
    multiStopModule: false,
    cloneVendor: true,
    driverFareSetting: false,
  },
  GROCERY: {
    paymentoptions: false,
    showchildRide: false,
    userWalletDeductions: false,
    deliveryAreaVendor: true,
    deliveryAreaVendorTakeaway: true,
    deliveryAreaDriver: true,
    bookingAreaDriver: false,
    restaurantWaitTime: true,
    orderSchedule: true,
    dynamicOrderSchedule: false,
    deliveryMode: true,
    assignVehicleType: true,
    deliveryPlatform: true,
    freeDelivery: true,
    deliveryFee: true,
    taxSettings: true,
    taxLevel: true,
    commission: true,
    otpValidation: false,
    multiVehicleType: true,
    cancelPolicy: true,
    dynamicCancelPolicy: false,
    rideHailing: false,
    cityPricing: true,
    foodgrocery: true,
    bidding: false,
    vendorInfo: true,
    veganFilterActive: true,
    time: true,
    driverPerRequest: true,
    geofence: false,
    prePayment: false,
    deliveryTimeSlot: true,
    hourlyModule: false,
    multiStopModule: false,
    driverFareSetting: false,
  },
  TAXI: {
    paymentoptions: true,
    showchildRide: true,
    deliveryAreaVendor: false,
    deliveryAreaVendorTakeaway: false,
    deliveryAreaDriver: false,
    bookingAreaDriver: true,
    restaurantWaitTime: false,
    orderSchedule: true,
    dynamicOrderSchedule: true,
    deliveryMode: false,
    deliveryPlatform: false,
    freeDelivery: false,
    assignVehicleType: true,
    deliveryFee: false,
    taxSettings: true,
    taxLevel: true,
    commission: false,
    otpValidation: true,
    multiVehicleType: true,
    cancelPolicy: true,
    dynamicCancelPolicy: true,
    rideHailing: true,
    cityPricing: true,
    foodgrocery: false,
    bidding: true,
    vendorInfo: false,
    veganFilterActive: false,
    time: true,
    driverPerRequest: true,
    userWalletDeductions: true,
    geofence: true,
    prePayment: true,
    deliveryTimeSlot: false,
    carPool: true,
    hourlyModule: true,
    multiStopModule: true,
    driverFareSetting: true,
  },
  PICKUPDROP: {
    paymentoptions: true,
    showchildRide: false,
    userWalletDeductions: true,
    deliveryAreaVendor: false,
    deliveryAreaVendorTakeaway: false,
    deliveryAreaDriver: false,
    bookingAreaDriver: true,
    restaurantWaitTime: false,
    orderSchedule: true,
    dynamicOrderSchedule: true,
    deliveryMode: false,
    deliveryPlatform: false,
    freeDelivery: false,
    assignVehicleType: true,
    deliveryFee: false,
    taxSettings: true,
    taxLevel: false,
    commission: false,
    otpValidation: true,
    multiVehicleType: true,
    cancelPolicy: true,
    dynamicCancelPolicy: true,
    rideHailing: false,
    cityPricing: true,
    foodgrocery: false,
    bidding: false,
    vendorInfo: false,
    veganFilterActive: false,
    time: true,
    driverPerRequest: true,
    geofence: true,
    prePayment: false,
    deliveryTimeSlot: false,
    hourlyModule: false,
    multiStopModule: false,
    driverFareSetting: false,
  },
  SERVICEPROVIDER: {
    paymentoptions: false,
    showchildRide: false,
    userWalletDeductions: false,
    deliveryAreaVendor: false,
    deliveryAreaVendorTakeaway: false,
    deliveryAreaDriver: true,
    bookingAreaDriver: false,
    restaurantWaitTime: false,
    orderSchedule: false,
    dynamicOrderSchedule: false,
    deliveryMode: false,
    assignVehicleType: false,
    deliveryPlatform: false,
    freeDelivery: false,
    deliveryFee: false,
    taxSettings: true,
    taxLevel: true,
    commission: true,
    otpValidation: true,
    multiVehicleType: false,
    cancelPolicy: true,
    dynamicCancelPolicy: true,
    rideHailing: false,
    cityPricing: true,
    foodgrocery: false,
    bidding: false,
    vendorInfo: false,
    veganFilterActive: false,
    time: true,
    driverPerRequest: true,
    geofence: false,
    prePayment: false,
    deliveryTimeSlot: false,
    hourlyModule: false,
    multiStopModule: false,
    driverFareSetting: false,
    firstOrderDiscount: true,
  },
  CARRENTAL: {
    paymentoptions: false,
    showchildRide: false,
    userWalletDeductions: false,
    deliveryAreaVendor: false,
    deliveryAreaVendorTakeaway: false,
    deliveryAreaDriver: false,
    restaurantWaitTime: false,
    deliveryMode: false,
    assignVehicleType: false,
    orderSchedule: false,
    deliveryPlatform: false,
    freeDelivery: false,
    deliveryFee: false,
    taxLevel: true,
    cancelPolicy: true,
    commission: true,
    foodgrocery: false,
    bidding: false,
    vendorInfo: false,
    veganFilterActive: false,
    time: false,
    driverPerRequest: false,
    geofence: false,
    prePayment: false,
    deliveryTimeSlot: false,
    hourlyModule: false,
    multiStopModule: false,
    driverFareSetting: false,
  },
  AIRBNB: {
    deliveryAreaVendor: false,
    showchildRide: false,
    deliveryAreaVendorTakeaway: false,
    deliveryAreaDriver: false,
    restaurantWaitTime: false,
    deliveryMode: false,
    assignVehicleType: false,
    orderSchedule: false,
    deliveryPlatform: false,
    freeDelivery: false,
    deliveryFee: false,
    taxLevel: true,
    cancelPolicy: true,
    commission: true,
    foodgrocery: false,
    bidding: false,
    vendorInfo: false,
    veganFilterActive: false,
    time: false,
    driverPerRequest: false,
    geofence: false,
    prePayment: false,
    deliveryTimeSlot: false,
    hourlyModule: false,
    multiStopModule: false,
    driverFareSetting: false,
  },
  PIZZA: {
    vendorInfo: true,
    showchildRide: false,
    veganFilterActive: true,
    time: true,
    driverPerRequest: true,
    geofence: false,
    prePayment: false,
    deliveryTimeSlot: true,
    hourlyModule: false,
    multiStopModule: false,
    driverFareSetting: false,
  },
  //copy of grocery
  LIQUOR: {
    paymentoptions: false,
    showchildRide: false,
    userWalletDeductions: false,
    deliveryAreaVendor: true,
    deliveryAreaVendorTakeaway: true,
    deliveryAreaDriver: true,
    bookingAreaDriver: false,
    restaurantWaitTime: true,
    orderSchedule: true,
    dynamicOrderSchedule: false,
    deliveryMode: true,
    assignVehicleType: true,
    deliveryPlatform: true,
    freeDelivery: true,
    deliveryFee: true,
    taxSettings: true,
    taxLevel: true,
    commission: true,
    otpValidation: false,
    multiVehicleType: true,
    cancelPolicy: true,
    dynamicCancelPolicy: false,
    rideHailing: false,
    cityPricing: true,
    foodgrocery: true,
    bidding: false,
    vendorInfo: true,
    veganFilterActive: true,
    time: true,
    driverPerRequest: true,
    geofence: false,
    prePayment: false,
    deliveryTimeSlot: false,
    hourlyModule: false,
    multiStopModule: false,
    driverFareSetting: false,
  },
}

export const VENDOR_SETTINGS_FORM = {
  FOOD: {
    Cuisines: true,
  },
  GROCERY: {
    Cuisines: false,
  },
  SERVICEPROVIDER: {
    Cuisines: true,
  },
}

export const SERVICE_STATUS = [
  "pending",
  "confirmed",
  // "inroute",
  "completed",
  "refunded",
  "rejected",
  "cancelled",
  "archived",
  "markReady",
]
export const BOOKING_STATUS = ["completed", "rejected", "cancelled"]

export const SERVICE_REFUND_TYPE = [
  { label: "No Refund", value: "noRefund" },
  { label: "Full Refund", value: "fullRefund" },
  { label: "Partial Refund", value: "partialRefund" },
]

export const DELIVERY_MODES = [
  { label: "takeaway", value: "TAKEAWAY" },
  { label: "delivery", value: "DELIVERY" },
]

export const PAYMENT_METHODS = ["Stripe", "Pay Stack"]

export const SOCIAL_MEDIA = ["facebook", "twitter", "instagram"]

export const WEEK_NAMES = moment.weekdays()

export const LANGUAGES = [
  { label: "English", value: "en" },
  /* { label: "Spanish", value: "es" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Russian", value: "ru" }, */
]

export const TIMEZONES = moment.tz.names().map(name => ({
  label: name,
  value: name,
  utc: "(GMT" + moment.tz(name).format("Z") + ")",
}))

export const COUNTRY_OPTIONS = worldCountries
  .filter(country => !!country.flag && country.name.common && country.idd.root)
  .map(country => ({
    name: country.name.common,
    label: country.name.common,
    value: country.name.common,
    flag: country.flag,
    countryCode: country.idd.root + country.idd.suffixes[0] || "",
  }))

export const CURRENCY_OPTIONS = [
  { value: "USD", label: "$" },
  { value: "AUD", label: "$" },
  { value: "CAD", label: "$" },
  { value: "GBP", label: "£" },
  { value: "EUR", label: "€" },
]

export const FONT_OPTIONS = [
  { label: "Arial", value: "Arial" },
  { label: "Roboto", value: "Roboto" },
]

export const INPUT_TYPES = [
  { label: "Text", value: "text" },
  { label: "Date Picker", value: "datePicker" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Select", value: "select" },
  { label: "File", value: "file" },
]

export const DOCUMNET_INPUT_TYPES = [
  { label: "Text", value: "text" },
  { label: "Date Picker", value: "datePicker" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Select", value: "select" },
  { label: "File", value: "file" },
  { label: "Info", value: "textarea" },
  { label: "Document", value: "document" },
]

export const CONTENT_PAGES = [
  { label: "Banner", value: "banner" },
  { label: "Feature", value: "feature" },
  { label: "Content Image", value: "contentImage" },
  { label: "Content", value: "content" },
  { label: "Slider", value: "slider" },
  { label: "Gallery", value: "gallery" },
  { label: "Testimonial", value: "testimonial" },
]

export const CONTENT_PAGE_IGNORE_SINGLE_VENDOR = ["banner", "storecategories"]
export const CONTENT_PAGE_IGNORE_SINGLE_CATEGORY = ["storecategories"]

export const CONTENT_INPUT_TYPES = {
  storecategories: [
    { label: "Title", value: "heading", input: "text", col: 6 },
    { label: "Sub Heading", value: "subHeading", input: "text", col: 6 },
  ],
  promotion: [
    { label: "Title", value: "heading", input: "text", col: 6 },
    { label: "Sub Heading", value: "subHeading", input: "text", col: 6 },
  ],
  recentBlog: [
    { label: "Title", value: "heading", input: "text", col: 6 },
    { label: "Sub Heading", value: "subHeading", input: "text", col: 6 },
    {
      label: "Category",
      value: "blogCategory",
      input: "custom_categoryselect",
    },
    {
      label: "Blog Type",
      value: "blogType",
      input: "select",
      items: [
        { label: "Recent", value: "recent" },
        { label: "Custom", value: "custom" },
      ],
    },
    {
      label: "Recent Blog No.",
      value: "recentBlogNo",
      input: "number",
      col: 6,
    },
    {
      label: "Blogs",
      value: "blogs",
      input: "custom_blogselect",
    },
  ],
  bestseller: [
    { label: "Title", value: "heading", input: "text", col: 6 },
    { label: "Sub Heading", value: "subHeading", input: "text", col: 6 },
  ],
  appcontent: [
    { label: "Title", value: "heading", input: "text", col: 6 },
    { label: "Sub Heading", value: "subHeading", input: "text", col: 6 },
    {
      label: "Description",
      value: "content",
      input: "textarea",
      rows: 2,
      col: 6,
    },
    { label: "Banner", value: "banner", input: "file", col: 6 },
    {
      label: "",
      value: "multipleContent",
      input: "loop",
      maxItems: 4,
      items: [
        {
          label: "Image (228X165 Pixel)",
          value: "banner",
          input: "file",
          col: 6,
        },
        { label: "Image Link", value: "buttonLink", input: "text", col: 6 },
      ],
    },
  ],
  banner: [
    { label: "Banner", value: "banner", input: "file", col: 6 },
    { label: "Show Search", value: "searchOption", input: "checkbox", col: 3 },
    { label: "Full width", value: "fullWidth", input: "checkbox", col: 3 },
    { label: "Content", value: "content", input: "html", rows: 2, col: 6 },
  ],
  feature: [
    { label: "Label", value: "label", input: "text", col: 6 },
    {
      label: "Background Color",
      value: "backgroundColor",
      input: "color",
      col: 6,
    },
    {
      label: "",
      value: "multipleContent",
      input: "loop",
      items: [
        { label: "Title", value: "heading", input: "text", col: 6 },
        { label: "Button Text", value: "buttonText", input: "text", col: 6 },
        { label: "Button Link", value: "buttonLink", input: "text", col: 6 },
        {
          label: "Image (228X165 Pixel)",
          value: "banner",
          input: "file",
          col: 6,
        },
        {
          label: "Description",
          value: "content",
          input: "html",
          rows: 2,
          col: 6,
        },
      ],
    },
  ],
  contentImage: [
    { label: "Button Text", value: "buttonText", input: "text", col: 6 },
    { label: "Button Link", value: "buttonLink", input: "text", col: 6 },
    { label: "Content", value: "content", input: "html", rows: 2, col: 6 },
    {
      label: "Background Color",
      value: "backgroundColor",
      input: "color",
      col: 3,
    },
    {
      label: "Image Position",
      value: "imagePosition",
      input: "switch",
      items: { left: "Left", right: "Right" },
      col: 3,
    },
    { label: "Image (626X417 Pixel)", value: "banner", input: "file", col: 6 },
  ],
  content: [
    { label: "Button Text", value: "buttonText", input: "text", col: 6 },
    { label: "Button Link", value: "buttonLink", input: "text", col: 6 },
    { label: "Content", value: "content", input: "html", rows: 2, col: 6 },
    {
      label: "Background Color",
      value: "backgroundColor",
      input: "color",
      col: 6,
    },
  ],
  slider: [
    {
      label: "Label",
      value: "label",
      input: "text",
      col: 6,
      condition: {
        outFields: true,
        key: "templateType",
        isInclude: true,
        value: ["carousel"],
      },
    },
    {
      label: "Description",
      value: "subHeading",
      input: "textarea",
      rows: 2,
      col: 6,
      condition: {
        outFields: true,
        key: "templateType",
        isInclude: true,
        value: ["carousel"],
      },
    },
    {
      label: "",
      value: "multipleContent",
      input: "loop",
      items: [
        {
          label: "Content",
          value: "content",
          input: "html",
          rows: 2,
          col: 6,
          condition: {
            outFields: true,
            key: "templateType",
            isInclude: true,
            notEqual: true,
            value: ["carousel"],
          },
        },
        {
          label: "Image (102X102 Pixel)",
          value: "banner",
          input: "file",
          col: 6,
        },
      ],
    },
  ],
  gallery: [
    { label: "Label", value: "label", input: "text", col: 6 },
    {
      label: "Description",
      value: "subHeading",
      input: "textarea",
      rows: 2,
      col: 6,
    },
    {
      label: "",
      value: "multipleContent",
      input: "loop",
      items: [
        {
          label: "Image (102X102 Pixel)",
          value: "banner",
          input: "file",
          col: 6,
        },
        { label: "Title", value: "heading", input: "text", col: 6 },
      ],
    },
  ],
  testimonial: [
    { label: "Label", value: "label", input: "text", col: 6 },
    {
      label: "Background Color",
      value: "backgroundColor",
      input: "color",
      col: 6,
    },
    {
      label: "",
      value: "multipleContent",
      input: "loop",
      items: [
        /* { label: "Button Text", value: "buttonText", input: "text", col: 6 }, */
        /* { label: "Title", value: "subHeading", input: "text", col: 6 }, */
        /*  { label: "Button Link", value: "buttonLink", input: "text", col: 6 }, */
        {
          label: "Content",
          value: "content",
          input: "html",
          rows: 2,
          col: 6,
        },
        { label: "Name", value: "heading", input: "text", col: 6 },
        {
          label: "Image (102X102 Pixel)",
          value: "banner",
          input: "file",
          col: 6,
        },
      ],
    },
  ],
  simpleBanner: [
    {
      label: "",
      value: "multipleContent",
      input: "loop",
      items: [
        {
          label: "Image (102X102 Pixel)",
          value: "banner",
          input: "file",
          col: 6,
        },
        {
          label: "Redirect To",
          value: "redirectTo",
          input: "select",
          items: [
            { label: "None", value: "none" },
            { label: "Product", value: "product" },
            { label: "Category", value: "category" },
          ],
        },
        {
          label: "Store",
          value: "storeType",
          input: "custom_select",
          col: 6,
          condition: {
            key: "redirectTo",
            isInclude: true,
            value: ["product", "category"],
          },
        },
        {
          label: "Vendor",
          value: "vendor",
          input: "custom_select",
          condition: {
            key: "redirectTo",
            isInclude: true,
            value: ["product", "category"],
          },
        },
        {
          label: "Product",
          value: "product",
          input: "custom_select",
          isMultiple: false,
          condition: {
            key: "redirectTo",
            isInclude: true,
            value: ["product"],
          },
        },
        {
          label: "Category",
          value: "category",
          input: "custom_select",
          condition: {
            key: "redirectTo",
            isInclude: true,
            value: ["category"],
          },
        },
      ],
    },
  ],
  categoryBanner: [
    {
      label: "",
      value: "multipleContent",
      input: "loop",
      items: [
        {
          label: "Image (102X102 Pixel)",
          value: "banner",
          input: "file",
          col: 6,
        },
        {
          label: "Store",
          value: "storeType",
          input: "custom_select",
          col: 6,
        },
        {
          label: "Vendor",
          value: "vendor",
          input: "custom_select",
        },
        {
          label: "Category",
          value: "category",
          input: "custom_select",
        },
      ],
    },
  ],
  productBanner: [
    {
      label: "",
      value: "multipleContent",
      input: "loop",
      items: [
        {
          label: "Image (102X102 Pixel)",
          value: "banner",
          input: "file",
          col: 6,
        },
        {
          label: "Store",
          value: "storeType",
          input: "custom_select",
          col: 6,
        },
        {
          label: "Vendor",
          value: "vendor",
          input: "custom_select",
        },
        {
          label: "Product",
          value: "product",
          input: "custom_select",
        },
      ],
    },
  ],
}

export const DEFAULT_STORE_TYPE = {
  SERVICE_NAMES: SERVICE_NAMES?.GROCERY,
  VENDOR_MENU: VENDOR_MENU?.GROCERY,
  CATEGORY_FORM: CATEGORY_FORM?.GROCERY,
  ADDON_FORM: ADDON_FORM?.FOOD,
  PRODUCT_FORM: PRODUCT_FORM?.GROCERY,
  VERSION_3_PRODUCT_FORM: VERSION_3_PRODUCT_FORM?.GROCERY,
  STORE_SETTINGS_FORM: STORE_SETTINGS_FORM?.GROCERY,
  VENDOR_SETTINGS_FORM: VENDOR_SETTINGS_FORM?.GROCERY,
  PRICING_TYPE_LIST: PRICING_TYPE_LIST?.FOOD,
}

export const USER_TYPES = [
  { label: "Customers", value: "customers" },
  { label: "Order", value: "order" },
  { label: "Vendors", value: "vendors" },
]

export const NOTIFICATION_SOUNDS = [
  { label: "no_sound", value: "false" },
  { label: "beep", value: "alarm-buzzer" },
  { label: "ringer", value: "oh-really" },
]

export const TOP_BAR_ICONS = [
  { label: "Clock", value: "⏲" },
  { label: "White Telephone", value: "☏" },
  { label: "Black Telephone", value: "☎" },
  { label: "Calendar", value: "🗓" },
]

export const STORE_KEYS = {
  mailgun: [
    { label: "MAILGUN API KEY", value: "MAILGUN_API_KEY" },
    { label: "MAILGUN DOMAIN", value: "MAILGUN_DOMAIN" },
    { label: "MAILGUN FROM", value: "MAILGUN_FROM" },
  ],
  twilio: [
    { label: "Account Sid", value: "accountSid" },
    { label: "Auth Token", value: "authToken" },
    { label: "Twilio From", value: "twilioFrom" },
  ],
  vonage: [
    { label: "Api Key", value: "apiKey" },
    { label: "Api Secret", value: "apiSecret" },
    { label: "From", value: "from" },
  ],

  smsLive247: [
    { label: "Api Key", value: "apiKey" },
    { label: "Sender Id", value: "senderID" },
  ],
  smsBulkNigeria: [
    { label: "From", value: "from" },
    { label: "Api Token", value: "apiToken" },
  ],
  firebase: [
    { label: "API Key", value: "FCM_APIKEY" },
    { label: "Auth Domain", value: "FCM_AUTHDOMAIN" },
    { label: "Project Id", value: "FCM_PROJECTID" },
    { label: "Storage Bucket", value: "FCM_STORAGEBUCKET" },
    { label: "Messaging Sender Id", value: "FCM_MESSAGINGSENDERID" },
    { label: "App Id", value: "FCM_APPID" },
    { label: "Measurement Id", value: "FCM_MEASUREMENTID" },
    { label: "Client Email", value: "FCM_CLIENT_EMAIL" },
    { label: "Private Key", value: "FCM_PRIVATE_KEY" },
  ],
  googleMapKey: [
    { label: "android_google_map_key", value: "android" },
    { label: "ios_google_map_key", value: "ios" },
    { label: "web_google_map_key", value: "web" },
    { label: "server_google_map_key", value: "server" },
  ],
}

export const INTERVAL = {
  month: "Monthly",
  semiAnnual: "Semi-Annual",
  year: "Annual",
}

export const DRIVER_STORETYPE = [
  { label: "Taxi", value: "TAXI" },
  { label: "Courier", value: "taxiVehicle" },
  { label: "Other", value: "OTHER" },
]

export const WEEK_NUMBERS = [
  { label: "Sun", value: 0 },
  { label: "Mon", value: 1 },
  { label: "Tus", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
]

export const STATUS_COLORS = {
  cancelled: "#f46a6a",
  confirmed: "#f8b426",
  archived: "#ec4561",
  completed: "#00b388",
  rejected: "#ec4561",
  inroute: "#ff9999",
  refund: "#999966",
  pending: "#233448",
  blocked: "#ec4561",
  approved: "#00b388",
}

export const RESTRICT_AREA = [
  { label: "none", value: "none" },
  { label: "geofence", value: "radius" },
]

export const SLUGS_NAME =
  process.env.REACT_APP_ENV === "production"
    ? {
      returnsies: "returnsies",
      oneTimeShop: "1timeshop",
      dewe: "cannazon",
      zaza: "cannabis-delivery-service",
      topup: "topup-fuel",
      lemonee: "lemonee-dtgcocmts", //"lemonee-dtgcocmts",
      taxidi: "taxidi",
      kucher: "kucher",
      confiLogistics: "confi-logistics-nig-ltd",
      singleStore: "single-store",
      purposeDeliveryService: "purpose-delivery-service",
      // zaza: "main-v2",
      caterPlus: "cater",
      honeyWay: "honey-s-way",
      kontaktem: "kontaktem",
      switch: "switch-transportation",
      tulumEats: "tulum-eats",
      airide: "ai-ride",
    }
    : {
      returnsies: "returnsies",
      oneTimeShop: "main-v2",
      dewe: "cannazon",
      zaza: "cannabis-delivery-service",
      topup: "topup-fuel",
      lemonee: "main-v2", //"lemonee-dtgcocmts",
      taxidi: "main-v23",
      kucher: "main-v23",
      confiLogistics: "main-v23",
      purposeDeliveryService: "main-v23",
      // zaza: "main-v2",
      singleStore: "main-v23",
      caterPlus: "main-v23",
      honeyWay: "main-v23",
      kontaktem: "main-v2",
      switch: "main-v2",
      tulumEats: "main-v2",
      airide: "main-v22",
    }

export const isHideThingTrue = (hideThings, name) => {
  if (!hideThings) {
    return false
  }
  return (
    hideThings?.filter(ht => ht.type == name && ht.value == true).length > 0
  )
}

/** Product batch menu + pages (1688 / one-time shop stores). */
export const isProductBatchEnabled = (settings = {}) => {
  const slug = settings?.slug || ""
  const alibabaStoreSlugs = [
    SLUGS_NAME.oneTimeShop,
    SLUGS_NAME.confiLogistics,
    "1timeshop",
    "confi-logistics-nig-ltd",
    "main-v2",
    "main-v23",
  ]
  if (alibabaStoreSlugs.includes(slug)) {
    return true
  }
  return (
    isHideThingTrue(settings.hideThings, "isProductBatch") ||
    isHideThingTrue(settings.hideThings, "isPromotions")
  )
}
// "driverlistdispatcher"

export const firstLetterCapital = str => {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export const API_STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCEDED: "SUCCEDED",
  FAILED: "FAILED",
}
