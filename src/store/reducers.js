import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Alert
import Alert from "./Alert/reducer"

// Authentication
import Login from "./auth/login/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
import Register from "./auth/register/reducer"

// Billing
import Billing from "./Billing/reducer"

// File
import File from "./File/reducer"

// Customers
import customers from "./customers/reducer"

// Faqs
import faqs from "./faq/reducer"

// Roles
import roles from "./SystemAccess/roles/reducer"

// Campaigns
import Campaigns from "./Campaigns/campaign/reducer"
import CampaignTemplate from "./Campaigns/campaign_template/reducer"

// Faqs
import subAdmins from "./SystemAccess/subAdmins/reducer"

//Blog Category
import BlogCategory from "./Blogs/category/reducer"

//Blog Tag
import BlogTag from "./Blogs/tag/reducer"

//Blog
import Blog from "./Blogs/blog/reducer"

// Promo Codes
import promocodes from "./promocodes/reducer"

// Promotions
import promotions from "./promotions/reducer"

// Gallery
import gallery from "./gallery/reducer"

// Content Pages
import contentpages from "./contentpages/reducer"

// Menu
import menus from "./menus/reducer"

// Email Templates
import emailtemplates from "./emailtemplates/reducer"

// Notifications
import notifications from "./notifications/reducer"

// Transactions
import transactions from "./transactions/reducer"

// Document Templates
import documentTemplates from "./DocumentTemplates/reducer"

// Food Delivery module
import FD_Restaurants from "./FoodDelivery/restaurants/reducer"
import FD_Drivers from "./FoodDelivery/drivers/reducer"
import FD_Attributes from "./FoodDelivery/attributes/reducer"
import FD_Categories from "./FoodDelivery/categories/reducer"
import FD_Addons from "./FoodDelivery/addons/reducer"
import FD_Products from "./FoodDelivery/products/reducer"
import FD_Cuisines from "./FoodDelivery/cuisine/reducer"
import FD_Businesstypes from "./FoodDelivery/businessType/reducer"
import FD_Settings from "./FoodDelivery/Settings/reducer"

// Food Delivery Orders
import FD_Orders from "./FoodDelivery/orders/reducer"

// Food Delivery Requests
import FD_Requests from "./FoodDelivery/requests/reducer"

// terminologies
import terminologies from "./terminologies/reducer"

// Settings
import Settings from "./Settings/reducer"

// Domain
import domain from "./domain/reducer"

// Reports
// Orders
import reports_Orders from "./reports_all/orders/reducer"
// Customer
import reports_Customers from "./reports_all/users/reducer"

// Dashboard
import dashboard from "./dashboard/reducer"

// Bird View
import track from "./track/reducer"

// Geofencing
import geofencing from "./geofencing/reducer"
import Disputes from "./FoodDelivery/dispute/reducer"

//Reviews
import Reviews from "./reviews/reducer"

//Dispatch
import Dispatch from "./dispatch/reducer"

import PackageServiceVendor from "./PackageServices/Vendors/reducer"
import PackageServicePackage from "./PackageServices/Packages/reducer"
import ProductBatchReducer from "./ProductBatch/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Alert,
  Login,
  ForgetPassword,
  Billing,
  File,
  customers,
  Campaigns,
  CampaignTemplate,
  faqs,
  roles,
  subAdmins,
  BlogCategory,
  BlogTag,
  Blog,
  promocodes,
  promotions,
  gallery,
  contentpages,
  menus,
  emailtemplates,
  notifications,
  transactions,
  documentTemplates,
  FD_Restaurants,
  FD_Orders,
  FD_Requests,
  FD_Drivers,
  FD_Attributes,
  FD_Categories,
  FD_Addons,
  FD_Products,
  FD_Cuisines,
  FD_Businesstypes,
  FD_Settings,
  terminologies,
  Settings,
  Profile,
  Register,
  domain,
  reports_Orders,
  reports_Customers,
  dashboard,
  track,
  Disputes,
  geofencing,
  Dispatch,
  Reviews,
  PackageServiceVendor,
  PackageServicePackage,
  ProductBatchReducer
})

export default rootReducer
